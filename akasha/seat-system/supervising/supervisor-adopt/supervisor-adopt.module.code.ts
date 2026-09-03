import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs"
import { resolveRemoteControlEnv } from "@akasha/seat-system/supervisor-remote-control-env"
import type { InheritedProc } from "@akasha/seat-system/supervisor-types"
import { buildClaudeArgv, refuseMissingCwd } from "@tools/lib/claude-launch-args"
import type {
  ChildExitRuleSource,
  ChildExitStatus,
} from "../supervisor-child-exit-rule/supervisor-child-exit-rule.module.code.ts"
import {
  asRecord,
  CLAUDE_CONFIG_PATH,
  readClaudeConfigDeclaration,
  reconcileClaudeConfig,
} from "../supervisor-claude-config/supervisor-claude-config.module.code.ts"
import { HOME_DIR, LOG } from "../supervisor-config/supervisor-config.module.code.ts"
import { buildSupervisorEnv } from "../supervisor-env/supervisor-env.module.code.ts"
import {
  isProcessAlive,
  signalPid,
  waitForPidExit,
} from "../supervisor-exec/supervisor-exec.module.code.ts"
import type { SupervisorHandoff } from "../supervisor-handoff-env/supervisor-handoff-env.module.code.ts"

export function adoptInheritedProc(pid: number, childExitRule: ChildExitRuleSource): InheritedProc {
  if (!isProcessAlive(pid)) {
    throw new InheritedPidDeadError(pid)
  }
  let killed = false
  let observed: ChildExitStatus = { exitCode: null, signal: null }
  const waited = waitForPidExit(pid, childExitRule).then((status) => {
    observed = status
    return status
  })
  return {
    pid,
    exited: waited.then(async (status) => (await childExitRule.collapse(status)).value),
    exitStatus: () => observed,
    kill: (_signal?: string | number) => {
      if (killed) return
      killed = true
      try {
        signalPid(pid, "SIGTERM")
      } catch (err) {
        console.error(`${LOG} signalPid(${pid}, SIGTERM) failed:`, err)
      }
    },
  }
}

export class InheritedPidDeadError extends Error {
  constructor(pid: number) {
    super(`inherited Claude PID ${pid} is not alive at boot — falling through to fresh spawn`)
    this.name = "InheritedPidDeadError"
  }
}

export function resolveClaudeHandoff(
  handoff: Pick<SupervisorHandoff, "claude">,
  inplaceFlag: string | undefined
): SupervisorHandoff["claude"] {
  if (inplaceFlag === "0") return null
  if (!handoff.claude) return null
  try {
    if (!isProcessAlive(handoff.claude.pid)) {
      console.warn(
        `${LOG} inherited Claude PID ${handoff.claude.pid} is not alive at boot — falling through to fresh spawn`
      )
      return null
    }
  } catch (err) {
    console.warn(`${LOG} isProcessAlive(${handoff.claude.pid}) failed:`, err)
    return null
  }
  return handoff.claude
}

export function spawnClaudeChild(opts: {
  cliArgs: readonly string[]
  currentPrompt: string
  cwd: string
  agentId: string
  sessionId: string
  configDir: string
  anthropicBaseUrl: string
  anthropicAuthToken?: string
  headless: boolean
  remoteControlOn: boolean
  proxySocketPath: string
  autoCompactWindow?: string
  effortLevel?: string
  subagentModel?: string
  subagentSpawnDepth: string
  toolTimeout: string
  resumeThresholdMinutes: string
  resumeTokenThreshold: string
}): InheritedProc {
  const { cliArgs, currentPrompt, cwd, agentId, sessionId, configDir, anthropicBaseUrl } = opts
  const remoteControl = resolveRemoteControlEnv({
    remoteControlWanted: opts.remoteControlOn,
    socketPath: opts.proxySocketPath,
    configDir,
    log: (msg) => console.log(`${LOG} ${msg}`),
  })
  const argv = buildClaudeArgv({ flags: cliArgs, prompt: currentPrompt })
  refuseMissingCwd(cwd, argv)
  const sub = Bun.spawn([...argv], {
    cwd,
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
    env: buildSupervisorEnv({
      baseEnv: process.env,
      agentId,
      sessionId,
      configDir,
      anthropicBaseUrl,
      anthropicAuthToken: opts.anthropicAuthToken,
      headless: opts.headless,
      supervisorPid: process.pid,
      autoCompactWindow: opts.autoCompactWindow,
      effortLevel: opts.effortLevel,
      subagentModel: opts.subagentModel,
      subagentSpawnDepth: opts.subagentSpawnDepth,
      toolTimeout: opts.toolTimeout,
      resumeThresholdMinutes: opts.resumeThresholdMinutes,
      resumeTokenThreshold: opts.resumeTokenThreshold,
      remoteControl,
    }),
  })
  return {
    pid: sub.pid,
    exited: sub.exited,
    exitStatus: () => ({ exitCode: sub.exitCode, signal: sub.signalCode }),
    kill: (signal) => {
      if (typeof signal === "number") {
        sub.kill(signal)
      } else {
        sub.kill("SIGTERM")
      }
    },
  }
}

export function reconcileAgentBootFiles(
  configDir: string,
  inheritedClaude: SupervisorHandoff["claude"]
): undefined {
  if (inheritedClaude) {
    console.log(
      `${LOG} adopt: skipping .claude.json reconcile (inherited from previous supervisor)`
    )
    return
  }
  const declared = readClaudeConfigDeclaration()
  if (declared === null) {
    console.error(
      `${LOG} adopt: nothing readable at ${CLAUDE_CONFIG_PATH}, so this seat boots on whatever ` +
        `${configDir}/.claude.json already says. Where that leaves the spawn directory untrusted, ` +
        `Claude drops the hooks and permissions the settings declare and says nothing.`
    )
    return
  }
  const path = `${configDir}/.claude.json`
  let existing: Record<string, unknown> = {}
  if (existsSync(path)) {
    let parsed: Record<string, unknown> | null = null
    try {
      parsed = asRecord(JSON.parse(readFileSync(path, "utf8")))
    } catch (err) {
      console.error(`${LOG} adopt: ${path} did not parse, so nothing was reconciled into it:`, err)
      return
    }
    if (parsed === null) {
      console.error(`${LOG} adopt: ${path} holds no JSON object, so nothing was reconciled into it`)
      return
    }
    existing = parsed
  }
  const tmp = `${path}.tmp-${process.pid}`
  writeFileSync(tmp, JSON.stringify(reconcileClaudeConfig(existing, declared, HOME_DIR)))
  renameSync(tmp, path)
}
