import { closeSync, mkdirSync, openSync } from "node:fs"
import { dirname, join } from "node:path"
import { seatNameForAgent } from "@akasha/seat-system/seat-presence-read"
import { supervisorSocketPath } from "@akasha/seat-system/supervisor-log-path"
import { readFirstLineAsPort } from "@akasha/seat-system/supervisor-proxy-port-line"

export const ENTRY_REL = "agents/models/gateway/modules/proxy-entry/proxy-entry.module.code.ts"

export const STDERR_LOG = "oauth-proxy.stderr.log"

export const AGENT_PREFIX = "model-gateway-start-"

export const NAMED_ACCOUNT = "model-gateway-start"

export const NAMED_VERSION = "model-gateway-start"

export const PORT_BUDGET_MS = 10_000

export type Asked = {
  readonly agentId: string
  readonly logDir: string | null
  readonly port: number
  readonly account: string
  readonly version: string
  readonly keep: boolean
  readonly budgetMs: number
}

export type Spawned = {
  readonly pid: number | undefined
  readonly outOf: () => ReadableStream<Uint8Array> | undefined
  readonly loosed: () => undefined
  readonly stopped: () => undefined
}

export type RunSeams = {
  readonly seatOf: (agentId: string) => string | null
  readonly madeDir: (at: string) => undefined
  readonly spawned: (entry: string, env: Record<string, string>, errAt: string) => Spawned
  readonly ported: (
    out: ReadableStream<Uint8Array> | undefined,
    budgetMs: number
  ) => Promise<number>
  readonly socketFor: (agentId: string) => string
}

export type Started = {
  readonly entry: string
  readonly agentId: string
  readonly pid: number
  readonly port: number
  readonly socketPath: string
  readonly logDir: string
  readonly kept: boolean
}

export function entryIn(root: string): string {
  return join(root, ENTRY_REL)
}

export function agentIdFor(at: number, salt: number): string {
  return `${AGENT_PREFIX}${at.toString(36)}-${salt.toString(36)}`
}

export function envFor(asked: Asked, logDir: string): Record<string, string> {
  return {
    OAUTH_PROXY_AGENT_ID: asked.agentId,
    OAUTH_PROXY_REGISTRATION_ACCOUNT: asked.account,
    OAUTH_PROXY_LOG_DIR: logDir,
    OAUTH_PROXY_VERSION: asked.version,
    OAUTH_PROXY_PORT: String(asked.port),
  }
}

export function saidOf(started: Started): readonly string[] {
  return [
    `entry ${started.entry}`,
    `agent ${started.agentId}`,
    `process ${started.pid}`,
    `port ${started.port}`,
    `socket ${started.socketPath}`,
    `log ${started.logDir}`,
    started.kept
      ? `the gateway is left running — stop it with \`kill ${started.pid}\``
      : "the gateway printed its port and was stopped again",
  ]
}

export async function startedOn(
  root: string,
  asked: Asked,
  seams: RunSeams
): Promise<Started | string> {
  const seat = seams.seatOf(asked.agentId)
  if (seat !== null) {
    return (
      `\`${asked.agentId}\` is the agent id of the seat \`${seat}\`, and a gateway started ` +
      "under it would write over the proxy state that seat is serving from. Name an agent id " +
      "no seat answers to, or give none and one is made for you."
    )
  }
  const socketPath = seams.socketFor(asked.agentId)
  const logDir = asked.logDir ?? dirname(socketPath)
  seams.madeDir(logDir)
  const entry = entryIn(root)
  const proc = seams.spawned(entry, envFor(asked, logDir), join(logDir, STDERR_LOG))
  const pid = proc.pid
  if (pid === undefined) {
    proc.stopped()
    return "the gateway was spawned and no process id came back, so nothing can be reported"
  }
  let port: number
  try {
    port = await seams.ported(proc.outOf(), asked.budgetMs)
  } catch (thrown) {
    proc.stopped()
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return `the gateway at \`${entry}\` printed no port and was stopped — ${why}`
  }
  if (asked.keep) proc.loosed()
  else proc.stopped()
  return { entry, agentId: asked.agentId, pid, port, socketPath, logDir, kept: asked.keep }
}

export const RUN_SEAMS: RunSeams = {
  seatOf: (agentId) => seatNameForAgent(agentId),
  madeDir: (at): undefined => {
    mkdirSync(at, { recursive: true })
  },
  spawned: (entry, env, errAt) => {
    const fd = openSync(errAt, "a")
    try {
      const proc = Bun.spawn(["bun", entry], {
        stdio: ["ignore", "pipe", fd],
        env: { ...process.env, ...env },
      })
      return {
        pid: proc.pid,
        outOf: () => (proc.stdout instanceof ReadableStream ? proc.stdout : undefined),
        loosed: (): undefined => {
          proc.unref()
        },
        stopped: (): undefined => {
          proc.kill()
        },
      }
    } finally {
      closeSync(fd)
    }
  },
  ported: (out, budgetMs) => readFirstLineAsPort(out, budgetMs),
  socketFor: (agentId) => supervisorSocketPath(agentId),
}
