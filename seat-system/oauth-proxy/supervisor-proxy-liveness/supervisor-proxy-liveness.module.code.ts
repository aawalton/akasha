import { computeModelGatewayTreeVersion } from "akasha/agents/models/gateway/modules/gateway-tree-version/gateway-tree-version.module.code.ts"
import {
  type OAuthProxyState,
  readProxyState,
} from "akasha/agents/seats/modules/proxy-state/seat-proxy-state.module.code.ts"
import type {
  ProxyLivenessRuleSource,
  ProxyLivenessState,
} from "akasha/seat-system/oauth-proxy/supervisor-proxy-liveness-rule/supervisor-proxy-liveness-rule.module.code.ts"
import {
  fetchHealthzOk,
  respawnOAuthProxy,
  type SupervisorOAuthProxyHandle,
} from "akasha/seat-system/oauth-proxy/supervisor-spawn-oauth-proxy/supervisor-spawn-oauth-proxy.module.code.ts"
import { LOG } from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import { guardTick } from "akasha/seat-system/supervising/supervisor-guard-tick/supervisor-guard-tick.module.code.ts"
import { setOAuthProxyHandle } from "akasha/seat-system/supervising/supervisor-state/supervisor-state.module.code.ts"
import { assertNever } from "akasha/utils/narrow/modules/assert-never/assert-never.module.code.ts"
import { pidAliveOrRefuse } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"

const PROXY_LIVENESS_INTERVAL_MS = 30_000

export function startProxyLivenessMonitor(opts: {
  getProxyHandle: () => SupervisorOAuthProxyHandle | null
  getAgentId: () => string | null
  registrationAccount: string
  getLogDir: () => string
  proxyLivenessRule: ProxyLivenessRuleSource
}): { stop: () => void } {
  let state: ProxyLivenessState | null = null
  let tickInFlight = false

  const respawn = async (handle: SupervisorOAuthProxyHandle): Promise<undefined> => {
    const agentId = opts.getAgentId()
    if (agentId == null) {
      console.error(`${LOG} proxy-liveness: respawn skipped — no current agent id`)
      return
    }
    try {
      const oauthProxyVersion = computeModelGatewayTreeVersion()
      const currentState: OAuthProxyState = readProxyState(agentId) ?? {
        pid: handle.pid,
        port: handle.port,
        oauthProxyVersion,
      }
      console.log(
        `${LOG} proxy-liveness: proxy unhealthy (pid=${handle.pid} port=${handle.port}) — respawning`
      )
      const newProxy = await respawnOAuthProxy(
        {
          agentId,
          registrationAccount: opts.registrationAccount,
          logDir: opts.getLogDir(),
          oauthProxyVersion,
        },
        currentState
      )
      setOAuthProxyHandle(newProxy)
      console.log(
        `${LOG} proxy-liveness: respawned oauth-proxy pid=${newProxy.pid} port=${newProxy.port}`
      )
    } catch (err) {
      console.error(`${LOG} proxy-liveness: respawn failed:`, err)
    }
  }

  const tick = async (): Promise<undefined> => {
    if (tickInFlight) return
    tickInFlight = true
    try {
      const handle = opts.getProxyHandle()
      if (handle == null) return
      const healthy = pidAliveOrRefuse(handle.pid) && (await fetchHealthzOk(handle.port))
      const { value: result } = await opts.proxyLivenessRule(state, healthy)
      state = result.state
      switch (result.action) {
        case "none":
          break
        case "respawn":
          await respawn(handle)
          break
        case "give-up":
          console.error(
            `${LOG} proxy-liveness: GIVING UP — proxy on port ${handle.port} still unhealthy after repeated respawns; agents on this supervisor may be credential-less until the proxy recovers or the supervisor restarts`
          )
          break
        default:
          assertNever(result.action)
      }
    } finally {
      tickInFlight = false
    }
  }

  const timer = setInterval(() => {
    guardTick(tick, (err) => console.error(`${LOG} proxy-liveness: tick error:`, err))
  }, PROXY_LIVENESS_INTERVAL_MS)
  return {
    stop: () => {
      clearInterval(timer)
    },
  }
}
