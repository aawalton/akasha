import { computeModelGatewayTreeVersion } from "@akasha/agents/gateway-tree-version"
import { LOG } from "@akasha/seat-system/supervisor-config"
import { buildHeartbeatMonitor } from "@akasha/seat-system/supervisor-heartbeat"
import { pollAgentAction } from "@akasha/seat-system/supervisor-poll-agent-action"
import { getAgentActionHandler, getOAuthProxyHandle } from "@akasha/seat-system/supervisor-state"
import { startWaitResumeMonitor } from "@akasha/seat-system/supervisor-wait-resume"
import { startProxyLivenessMonitor } from "../../oauth-proxy/supervisor-proxy-liveness/supervisor-proxy-liveness.module.code.ts"
import type { ProxyLivenessRuleSource } from "../../oauth-proxy/supervisor-proxy-liveness-rule/supervisor-proxy-liveness-rule.module.code.ts"
import { handleProxyVersionUpdate } from "../../oauth-proxy/supervisor-proxy-version/supervisor-proxy-version.module.code.ts"
import { pollSupervisorFileVersion } from "../../self-healing/supervisor-file-version/supervisor-file-version.module.code.ts"
import { handleVersionUpdate } from "../../self-healing/supervisor-self-heal/supervisor-self-heal.module.code.ts"
import { SUPERVISOR_SCRIPT } from "../../self-healing/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"
import { startLimitResumeMonitor } from "../supervisor-limit-resume/supervisor-limit-resume.module.code.ts"

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
