import { computeModelGatewayTreeVersion } from "akasha/agent/model/gateway/modules/gateway-tree-version/gateway-tree-version.module.code.ts"
import { startProxyLivenessMonitor } from "akasha/agent/seat/model-gateway/modules/supervisor-gateway-liveness/supervisor-gateway-liveness.module.code.ts"
import type { ProxyLivenessRuleSource } from "akasha/agent/seat/model-gateway/modules/supervisor-gateway-liveness-rule/supervisor-gateway-liveness-rule.module.code.ts"
import { handleProxyVersionUpdate } from "akasha/agent/seat/model-gateway/modules/supervisor-gateway-version/supervisor-gateway-version.module.code.ts"
import { pollAgentAction } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-poll-agent-action/supervisor-poll-agent-action.module.code.ts"
import { autoCompactPoll } from "akasha/agent/seat/supervisor/supervisor-compacting/modules/supervisor-compact-poll/supervisor-compact-poll.module.code.ts"
import { LIVE_IDLE_RULE } from "akasha/agent/seat/supervisor/supervisor-idleness/modules/supervisor-idle-rule/supervisor-idle-rule.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  getAgentActionHandler,
  getOAuthProxyHandle,
} from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-state/supervisor-state.module.code.ts"
import { startLimitResumeMonitor } from "akasha/agent/seat/supervisor/supervisor-resuming/modules/supervisor-limit-resume/supervisor-limit-resume.module.code.ts"
import { startWaitResumeMonitor } from "akasha/agent/seat/supervisor/supervisor-resuming/modules/supervisor-wait-resume/supervisor-wait-resume.module.code.ts"
import { buildHeartbeatMonitor } from "akasha/agent/seat/supervisor/supervisor-ticking/modules/supervisor-heartbeat/supervisor-heartbeat.module.code.ts"
import { browserReapPoll } from "akasha/agent/seat/supervisor/supervisor-tooling/modules/browser-reaping/browser-reaping.module.code.ts"
import { pollSupervisorFileVersion } from "akasha/agent/seat/supervisor-restart/modules/supervisor-file-version/supervisor-file-version.module.code.ts"
import { handleVersionUpdate } from "akasha/agent/seat/supervisor-restart/modules/supervisor-self-heal/supervisor-self-heal.module.code.ts"
import {
  SELF_HEAL_STATE,
  SUPERVISOR_SCRIPT,
} from "akasha/agent/seat/supervisor-restart/modules/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"
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
  proxyLivenessRule: ProxyLivenessRuleSource
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
        getClaudePid: () => SELF_HEAL_STATE.getClaudePidForSelfHeal(),
        log,
      }),
      autoCompactPoll({
        getAgentId: args.getAgentId,
        getClaudePid: () => SELF_HEAL_STATE.getClaudePidForSelfHeal(),
        getProxyPort: () => getOAuthProxyHandle()?.port ?? null,
        idleRule: LIVE_IDLE_RULE,
        log,
      }),
    ],
  })

  const proxyLivenessMonitor = startProxyLivenessMonitor({
    getProxyHandle: getOAuthProxyHandle,
    getAgentId: args.getAgentId,
    registrationAccount: args.registrationAccount,
    getLogDir: args.getLogDir,
    proxyLivenessRule: args.proxyLivenessRule,
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
