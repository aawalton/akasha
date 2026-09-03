import { closeSync, mkdirSync, openSync } from "node:fs"
import { join } from "node:path"
import { supervisorSocketPath } from "@akasha/seat-system/supervisor-log-path"
import type { ProxyAdoptionRuleSource } from "@akasha/seat-system/supervisor-proxy-adoption-rule"
import { stopByPid, stopProxyIfOwned } from "@akasha/seat-system/supervisor-proxy-ownership"
import {
  PORT_READ_BUDGET_MS,
  readFirstLineAsPort,
} from "@akasha/seat-system/supervisor-proxy-port-line"
import { pidAliveOrRefuse } from "@akasha/utils-process/pid-signal"
import { pidsListeningOn, portIsHeld } from "@akasha/utils-process/port-holding"
import { readProcEnvVar } from "@akasha/utils-process/proc-environ"
import { modelGatewayEntrypoint } from "@tools/lib/model-gateway-tree-version"
import { type OAuthProxyState, readProxyState } from "@tools/lib/seat-proxy-state"
import { readAdoptedClaudeProxyPort } from "../supervisor-adopted-claude-port/supervisor-adopted-claude-port.module.code.ts"

const STALE_PROXY_SHUTDOWN_BUDGET_MS = 5_000

const POLL_INTERVAL_MS = 100

// THIS DEADLINE SAYS HOW LONG A GATEWAY MAY BE BUSY BEFORE IT IS CALLED DEAD, AND BUSY IS NOT DEAD.
// `/healthz` returns a constant with nothing awaited, so what it measures is not the handler but
// whether the event loop can reach it. A gateway carrying a seat's subagents was measured answering
// in 1.4s to over 9s while serving every request correctly. One deadline stands here for both the
// adopt path and the liveness monitor: two constants for one decision is how the monitor came to be
// raised while this one stayed at a second, and a gateway can be alive to one and dead to the other.
export const HEALTHZ_TIMEOUT_MS = 10_000

const STDERR_LOG = "oauth-proxy.stderr.log"

function assertNever(value: never): never {
  const rendered = typeof value === "string" ? value : JSON.stringify(value)
  throw new Error(`assertNever: unhandled variant ${rendered}`)
}

async function fetchHealthzOk(port: number): Promise<boolean> {
  try {
    const res = await fetch(`http://localhost:${port}/healthz`, {
      signal: AbortSignal.timeout(HEALTHZ_TIMEOUT_MS),
    })
    return res.ok
  } catch {
    return false
  }
}

export type SupervisorOAuthProxyHandle = {
  pid: number
  port: number
  socketPath: string
  adopted: boolean
  stop: () => undefined
}

export type SpawnOAuthProxyArgs = {
  agentId: string
  registrationAccount: string
  logDir: string
  oauthProxyVersion: string
  adoptedClaudePid?: number | null
}

export async function spawnOrAdoptOAuthProxy(
  args: SpawnOAuthProxyArgs,
  proxyAdoptionRule: ProxyAdoptionRuleSource
): Promise<SupervisorOAuthProxyHandle> {
  const { agentId, oauthProxyVersion } = args

  const state = readProxyState(agentId)
  if (state != null && pidAliveOrRefuse(state.pid)) {
    const versionMatches = state.oauthProxyVersion === oauthProxyVersion
    const healthy = versionMatches ? true : await fetchHealthzOk(state.port)
    const { value: decision } = await proxyAdoptionRule({
      hasLiveProxy: true,
      versionMatches,
      healthy,
    })
    switch (decision) {
      case "adopt":
      case "adopt-with-drift": {
        if (decision === "adopt-with-drift") {
          console.log(
            `[supervisor] oauth-proxy tree-version drift — adopting live proxy ` +
              `(running ${state.oauthProxyVersion} != current ${oauthProxyVersion}); ` +
              `drift surfaces via 'ops model-gateway status', apply with ` +
              `'ops model-gateway swap' (#14982)`
          )
        }
        return {
          pid: state.pid,
          port: state.port,
          socketPath: supervisorSocketPath(agentId),
          adopted: true,
          stop: () => stopProxyIfOwned(agentId, state.pid),
        }
      }
      case "spawn-fresh":
        return await respawnOAuthProxy(args, state)
      default:
        return assertNever(decision)
    }
  }

  const requiredPort =
    args.adoptedClaudePid != null ? (readAdoptedClaudeProxyPort(args.adoptedClaudePid) ?? 0) : 0
  if (requiredPort !== 0) {
    console.log(
      `[supervisor] oauth-proxy state stale/missing — binding fresh proxy to adopted Claude's port ${requiredPort}`
    )
    await freePortForAdoptedClaude(requiredPort, agentId)
  }
  return await spawnFreshProxy(args, requiredPort)
}

/**
 * Clear whoever is holding the port an adopted Claude is already pointed at.
 *
 * ADOPTED CLAUDE CANNOT BE RE-POINTED, so this one port is the only one a fresh proxy may bind. A
 * proxy orphaned by a supervisor that died without stopping it goes on holding that port, the bind
 * fails for as long as it lives, and the new supervisor dies during boot leaving the terminal dead.
 * The recorded state cannot say who to stop, because reaching this point is what it means for that
 * state to be missing.
 *
 * ONLY THIS SEAT'S OWN PROXY IS STOPPED. A holder belonging to another agent is reported and left
 * running: taking it down would break a seat that is working, and one port two live seats both
 * need is a conflict this is in no position to settle.
 */
async function freePortForAdoptedClaude(port: number, agentId: string): Promise<undefined> {
  for (const holder of pidsListeningOn(port)) {
    const owner = readProcEnvVar(holder, "OAUTH_PROXY_AGENT_ID")
    if (owner !== agentId) {
      console.error(
        `[supervisor] port ${port} is held by pid ${holder}, which belongs to ` +
          `${owner ?? "no agent"} rather than ${agentId} — leaving it running`
      )
      continue
    }
    console.log(
      `[supervisor] stopping this seat's orphaned oauth-proxy (pid ${holder}) to free port ${port}`
    )
    stopByPid(holder)
  }
  if (await waitForPortFree(port, STALE_PROXY_SHUTDOWN_BUDGET_MS)) return
  console.error(`[supervisor] port ${port} is still held after ${STALE_PROXY_SHUTDOWN_BUDGET_MS}ms`)
}

export async function respawnOAuthProxy(
  args: SpawnOAuthProxyArgs,
  currentState: OAuthProxyState
): Promise<SupervisorOAuthProxyHandle> {
  stopByPid(currentState.pid)
  await waitForPidGone(currentState.pid, STALE_PROXY_SHUTDOWN_BUDGET_MS)
  return await spawnFreshProxy(args, currentState.port)
}

/**
 * Where the gateway's stderr is sent.
 *
 * NEVER INHERITED, because the supervisor's stderr is the seat's terminal. Anything the gateway or
 * the runtime under it writes there is painted straight over the display of a seat that is working
 * perfectly well — an upstream fetch error interleaves with Claude's own drawing and reads as a
 * crash, when nothing has crashed at all.
 *
 * A FILE RATHER THAN DISCARDED, so an error the runtime prints past the gateway's own size-capped
 * `oauth-proxy.log` still leaves a record somewhere.
 *
 * DISCARDED RATHER THAN INHERITED WHERE THE FILE WILL NOT OPEN, because losing the record costs a
 * diagnosis, while falling back to the terminal costs the seat its display.
 */
function openStderrLog(logDir: string): number | null {
  try {
    mkdirSync(logDir, { recursive: true })
    return openSync(join(logDir, STDERR_LOG), "a")
  } catch (err) {
    console.error(`[supervisor] could not open the oauth-proxy stderr log under ${logDir}:`, err)
    return null
  }
}

async function spawnFreshProxy(
  args: SpawnOAuthProxyArgs,
  requestedPort: number
): Promise<SupervisorOAuthProxyHandle> {
  const entrypoint = resolveEntrypoint()
  const stderrFd = openStderrLog(args.logDir)
  let proc: ReturnType<typeof Bun.spawn>
  try {
    proc = Bun.spawn(["bun", entrypoint], {
      stdio: ["ignore", "pipe", stderrFd ?? "ignore"],
      env: {
        ...process.env,
        OAUTH_PROXY_AGENT_ID: args.agentId,
        OAUTH_PROXY_REGISTRATION_ACCOUNT: args.registrationAccount,
        OAUTH_PROXY_LOG_DIR: args.logDir,
        OAUTH_PROXY_VERSION: args.oauthProxyVersion,
        OAUTH_PROXY_PORT: String(requestedPort),
      },
    })
  } finally {
    if (stderrFd !== null) closeSync(stderrFd)
  }
  const pid = proc.pid
  if (typeof pid !== "number") {
    throw new Error("oauth-proxy spawn: Bun.spawn returned no pid")
  }
  const out = proc.stdout
  if (!(out instanceof ReadableStream)) {
    stopByPid(pid)
    throw new Error("oauth-proxy spawn: Bun.spawn gave no readable stdout to read the port from")
  }
  let port: number
  try {
    port = await readFirstLineAsPort(out, PORT_READ_BUDGET_MS)
  } catch (err) {
    stopByPid(pid)
    throw err
  }
  proc.unref()
  return {
    pid,
    port,
    socketPath: supervisorSocketPath(args.agentId),
    adopted: false,
    stop: () => stopProxyIfOwned(args.agentId, pid),
  }
}

function resolveEntrypoint(): string {
  return modelGatewayEntrypoint()
}

async function waitForPidGone(pid: number, budgetMs: number): Promise<boolean> {
  const deadline = Date.now() + budgetMs
  while (Date.now() < deadline) {
    if (!pidAliveOrRefuse(pid)) return true
    await sleep(POLL_INTERVAL_MS)
  }
  return !pidAliveOrRefuse(pid)
}

async function waitForPortFree(port: number, budgetMs: number): Promise<boolean> {
  const deadline = Date.now() + budgetMs
  while (Date.now() < deadline) {
    if (!portIsHeld(port)) return true
    await sleep(POLL_INTERVAL_MS)
  }
  return !portIsHeld(port)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
