import {
  buildClaudeArgv,
  refuseMissingCwd,
} from "akasha/agent/claude-code/modules/claude-launch-args/claude-launch-args.module.code.ts"
import { resolveRemoteControlEnv } from "akasha/agent/claude-code/remote-control/modules/env/claude-code-remote-control-env.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import type { InheritedProc } from "akasha/agent/seat/supervisor/modules/supervisor-types/supervisor-types.module.code.ts"
import { buildSupervisorEnv } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-env/supervisor-env.module.code.ts"
import { signalNamed } from "akasha/code/spawning/modules/running/running.module.code.ts"

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
    exitStatus: () => ({ exitCode: sub.exitCode, signal: signalNamed(sub.signalCode) }),
    kill: (signal) => {
      if (typeof signal === "number") {
        sub.kill(signal)
      } else {
        sub.kill("SIGTERM")
      }
    },
  }
}
