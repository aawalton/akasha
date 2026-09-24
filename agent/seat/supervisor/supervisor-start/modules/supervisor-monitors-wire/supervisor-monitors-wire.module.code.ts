import { computeModelGatewayTreeVersion } from "akasha/agent/model/gateway/modules/gateway-tree-version/gateway-tree-version.module.code.ts"
import { startProxyLivenessMonitor } from "akasha/agent/seat/model-gateway/modules/supervisor-gateway-liveness/supervisor-gateway-liveness.module.code.ts"

import { handleProxyVersionUpdate } from "akasha/agent/seat/model-gateway/modules/supervisor-gateway-version/supervisor-gateway-version.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  getAgentActionHandler,
  getOAuthProxyHandle,
} from "akasha/agent/seat/supervisor/modules/supervisor-state/supervisor-state.module.code.ts"
import { autoCompactPoll } from "akasha/agent/seat/supervisor/seat-auto-compact/modules/supervisor-compact-poll/supervisor-compact-poll.module.code.ts"
import { startLimitResumeMonitor } from "akasha/agent/seat/supervisor/seat-work-restart/modules/supervisor-limit-resume/supervisor-limit-resume.module.code.ts"
import { startWaitResumeMonitor } from "akasha/agent/seat/supervisor/seat-work-restart/modules/supervisor-wait-resume/supervisor-wait-resume.module.code.ts"
import { pollAgentAction } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-poll-agent-action/supervisor-poll-agent-action.module.code.ts"
import { buildHeartbeatMonitor } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-heartbeat/supervisor-heartbeat.module.code.ts"
import { browserReapPoll } from "akasha/agent/seat/supervisor/supervisor-tooling/modules/browser-reaping/browser-reaping.module.code.ts"
import { handleVersionUpdate } from "akasha/agent/seat/supervisor-restart/modules/on-change/supervisor-restart-on-change.module.code.ts"
import {
  SUPERVISOR_RESTART_STATE,
  SUPERVISOR_SCRIPT,
} from "akasha/agent/seat/supervisor-restart/modules/state/supervisor-restart-state.module.code.ts"
import { pollSupervisorFileVersion } from "akasha/agent/seat/supervisor-restart/modules/supervisor-file-version/supervisor-file-version.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

export type PerAgentMonitors = {
  heartbeatTimer: ReturnType<typeof setInterval>
  proxyLivenessMonitor: { stop: () => void }
  limitResumeMonitor: { stop: () => void }
  waitResumeMonitor: { stop: () => void }
}

export function startPerAgentMonitors(args: {
  getAgentId: () => string | null
  registrationAccount: string
  getLogDir: () => string
}): PerAgentMonitors {
  const log = (line: string): undefined => {
    console.log(`${LOG} ${line}`)
  }

  const { heartbeatTimer } = buildHeartbeatMonitor({
    getAgentId: args.getAgentId,
    registrationAccount: args.registrationAccount,
    polls: [
      {
        name: "supervisor-files",
        run: () => pollSupervisorFileVersion(SUPERVISOR_SCRIPT, handleVersionUpdate),
      },
      {
        name: "proxy-version",
        run: async () => {
          handleProxyVersionUpdate(computeModelGatewayTreeVersion())
        },
      },
      {
        name: "agent-action",
        run: () =>
          pollAgentAction(args.getAgentId, async (event) => {
            await getAgentActionHandler()?.(event)
          }),
      },
      browserReapPoll({
        getClaudePid: () => SUPERVISOR_RESTART_STATE.getClaudePid(),
        log,
      }),
      autoCompactPoll({
        getAgentId: args.getAgentId,
        getClaudePid: () => SUPERVISOR_RESTART_STATE.getClaudePid(),
        getProxyPort: () => getOAuthProxyHandle()?.port ?? null,
        log,
      }),
    ],
  })

  const proxyLivenessMonitor = startProxyLivenessMonitor({
    getProxyHandle: getOAuthProxyHandle,
    getAgentId: args.getAgentId,
    registrationAccount: args.registrationAccount,
    getLogDir: args.getLogDir,
  })

  const limitResumeMonitor = startLimitResumeMonitor({ getAgentId: args.getAgentId, log })

  const waitResumeMonitor = startWaitResumeMonitor({ getAgentId: args.getAgentId, log })

  return {
    heartbeatTimer,
    proxyLivenessMonitor,
    limitResumeMonitor,
    waitResumeMonitor,
  }
}
