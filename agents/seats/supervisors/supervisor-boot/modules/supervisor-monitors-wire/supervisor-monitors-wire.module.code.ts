import { computeModelGatewayTreeVersion } from "akasha/agents/models/gateway/modules/gateway-tree-version/gateway-tree-version.module.code.ts"
import { startProxyLivenessMonitor } from "akasha/agents/seats/oauth-proxy/modules/supervisor-proxy-liveness/supervisor-proxy-liveness.module.code.ts"
import type { ProxyLivenessRuleSource } from "akasha/agents/seats/oauth-proxy/modules/supervisor-proxy-liveness-rule/supervisor-proxy-liveness-rule.module.code.ts"
import { handleProxyVersionUpdate } from "akasha/agents/seats/oauth-proxy/modules/supervisor-proxy-version/supervisor-proxy-version.module.code.ts"
import { pollSupervisorFileVersion } from "akasha/agents/seats/self-healing/modules/supervisor-file-version/supervisor-file-version.module.code.ts"
import { handleVersionUpdate } from "akasha/agents/seats/self-healing/modules/supervisor-self-heal/supervisor-self-heal.module.code.ts"
import { SUPERVISOR_SCRIPT } from "akasha/agents/seats/self-healing/modules/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"
import { buildHeartbeatMonitor } from "akasha/agents/seats/supervisors/modules/supervisor-heartbeat/supervisor-heartbeat.module.code.ts"
import { pollAgentAction } from "akasha/agents/seats/supervisors/supervisor-actions/modules/supervisor-poll-agent-action/supervisor-poll-agent-action.module.code.ts"
import { LOG } from "akasha/agents/seats/supervisors/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  getAgentActionHandler,
  getOAuthProxyHandle,
} from "akasha/agents/seats/supervisors/supervisor-process/modules/supervisor-state/supervisor-state.module.code.ts"
import { startLimitResumeMonitor } from "akasha/agents/seats/supervisors/supervisor-resuming/modules/supervisor-limit-resume/supervisor-limit-resume.module.code.ts"
import { startWaitResumeMonitor } from "akasha/agents/seats/supervisors/supervisor-resuming/modules/supervisor-wait-resume/supervisor-wait-resume.module.code.ts"

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
