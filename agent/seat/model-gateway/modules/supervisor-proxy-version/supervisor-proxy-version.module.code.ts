import { computeModelGatewayTreeVersion } from "akasha/agent/model/gateway/modules/gateway-tree-version/gateway-tree-version.module.code.ts"
import {
  type OAuthProxyState,
  readProxyState,
} from "akasha/agent/seat/model-gateway/modules/seat-proxy-state/seat-proxy-state.module.code.ts"
import {
  respawnOAuthProxy,
  type SpawnOAuthProxyArgs,
  type SupervisorOAuthProxyHandle,
} from "akasha/agent/seat/model-gateway/modules/supervisor-spawn-oauth-proxy/supervisor-spawn-oauth-proxy.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import { setOAuthProxyHandle } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-state/supervisor-state.module.code.ts"
import { pidAliveOrRefuse } from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"

export interface RespawnProxyDeps {
  respawn: (
    args: SpawnOAuthProxyArgs,
    state: OAuthProxyState
  ) => Promise<SupervisorOAuthProxyHandle>
  setProxyHandle: (handle: SupervisorOAuthProxyHandle) => void
  log: (line: string) => void
}

async function respawnProxy(
  opts: {
    respawnArgs: SpawnOAuthProxyArgs
    state: OAuthProxyState
    newVersion: string
  },
  deps: RespawnProxyDeps
): Promise<void> {
  const newProxy = await deps.respawn(opts.respawnArgs, opts.state)
  deps.setProxyHandle(newProxy)
  deps.log(
    `OAuth-proxy respawned: pid=${newProxy.pid} port=${newProxy.port} version=${opts.newVersion}`
  )
}

let baseline: string | null = null
let respawnFn: ((newVersion: string) => void) | null = null

function setProxyRespawnFn(fn: ((newVersion: string) => void) | null): undefined {
  respawnFn = fn
}

export function triggerProxySwap(): boolean {
  if (respawnFn == null) {
    console.error(`${LOG} proxy-swap requested but respawn fn not wired — skipping`)
    return false
  }
  const target = computeModelGatewayTreeVersion()
  console.log(`${LOG} Manual proxy-swap dispatched — swapping proxy to on-disk version ${target}`)
  respawnFn(target)
  return true
}

export function handleProxyVersionUpdate(version: string | null): undefined {
  if (version == null || version === "") return
  if (baseline === null) {
    baseline = version
    console.log(`${LOG} OAuth-proxy version marker initialized: ${version}`)
    return
  }
  if (version === baseline) return
  console.log(
    `${LOG} New OAuth-proxy version detected: ${baseline} -> ${version} — ` +
      "auto-swap disarmed; apply via 'akasha model gateway swap'"
  )
  baseline = version
}

export function installProxyVersionSubsystem(args: {
  agentIdHandle: { readonly id: string | null }
  selectedAccount: string
  getLogDir: () => string
}): undefined {
  const { agentIdHandle, selectedAccount, getLogDir } = args
  setProxyRespawnFn((newVersion) => {
    const currentAgentId = agentIdHandle.id
    if (currentAgentId == null) {
      console.log(`${LOG} OAuth-proxy respawn skipped — no current agent id`)
      return
    }
    const state = readProxyState(currentAgentId)
    if (state == null || !pidAliveOrRefuse(state.pid)) {
      console.log(`${LOG} OAuth-proxy respawn skipped — the seat names no live proxy`)
      return
    }
    void respawnProxy(
      {
        respawnArgs: {
          agentId: currentAgentId,
          registrationAccount: selectedAccount,
          logDir: getLogDir(),
          oauthProxyVersion: newVersion,
        },
        state,
        newVersion,
      },
      {
        respawn: respawnOAuthProxy,
        setProxyHandle: setOAuthProxyHandle,
        log: (line) => console.log(`${LOG} ${line}`),
      }
    ).catch((err) => {
      console.error(`${LOG} OAuth-proxy respawn failed:`, err)
    })
  })
}
