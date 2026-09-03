import {
  respawnOAuthProxy,
  type SpawnOAuthProxyArgs,
  type SupervisorOAuthProxyHandle,
} from "@akasha/seat-system/supervisor-spawn-oauth-proxy"
import { setOAuthProxyHandle } from "@akasha/seat-system/supervisor-state"
import { pidAliveOrRefuse } from "@akasha/utils-process/pid-signal"
import { computeModelGatewayTreeVersion } from "@tools/lib/model-gateway-tree-version"
import { type OAuthProxyState, readProxyState } from "@tools/lib/seat-proxy-state"
import { LOG } from "../supervisor-config/supervisor-config.module.code.ts"

export interface RespawnProxyDeps {
  respawn: (
    args: SpawnOAuthProxyArgs,
    state: OAuthProxyState
  ) => Promise<SupervisorOAuthProxyHandle>
  setProxyHandle: (handle: SupervisorOAuthProxyHandle) => void
  log: (line: string) => void
}

export async function respawnProxy(
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
let unsubProxyVersion: (() => void) | null = null
let pendingVersion: string | null = null

export function setProxyRespawnFn(fn: ((newVersion: string) => void) | null): undefined {
  respawnFn = fn
}

export function setUnsubProxyVersion(unsub: (() => void) | null): undefined {
  unsubProxyVersion = unsub
}

export function teardownProxyVersionSubscription(): undefined {
  if (unsubProxyVersion) {
    try {
      unsubProxyVersion()
    } catch {}
    unsubProxyVersion = null
  }
}

export function getPendingProxyVersion(): string | null {
  return pendingVersion
}

export function triggerProxySwap(): boolean {
  if (respawnFn == null) {
    console.error(`${LOG} proxy-swap requested but respawn fn not wired — skipping`)
    return false
  }
  const target = computeModelGatewayTreeVersion()
  console.log(`${LOG} Manual proxy-swap dispatched — swapping proxy to on-disk version ${target}`)
  respawnFn(target)
  pendingVersion = null
  return true
}

export function _resetProxyVersionStateForTesting(): undefined {
  baseline = null
  respawnFn = null
  unsubProxyVersion = null
  pendingVersion = null
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
      `recorded as pending (auto-swap disarmed; apply via 'ops model-gateway swap')`
  )
  baseline = version
  pendingVersion = version
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
