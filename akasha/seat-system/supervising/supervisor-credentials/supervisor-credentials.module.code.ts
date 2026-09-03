import { isAccountTerminal, markAccountTerminal } from "@tools/lib/account-terminal"
import { reportOAuthRecovered, reportTerminalOAuthError } from "@tools/lib/agent-health-write"
import { LIVE_HEALTH, writeTerminalHealth } from "@tools/lib/oauth-account-health"
import { refreshCredentialFromPage, watchCredentialFile } from "@tools/lib/oauth-file"
import type { ProxyAdoptionRuleSource } from "@tools/lib/supervisor-proxy-adoption-rule"
import {
  type SupervisorOAuthProxyHandle,
  spawnOrAdoptOAuthProxy,
} from "@tools/lib/supervisor-spawn-oauth-proxy"
import { writePacingSnapshot } from "@tools/lib/supervisor-usage-snapshot"
import { configDirForAccount, LOG } from "../supervisor-config/supervisor-config.module.code.ts"
import { guardTick } from "../supervisor-guard-tick/supervisor-guard-tick.module.code.ts"

export async function runCredentialPullTick(args: {
  account: string
  getAgentId: () => string | null
}): Promise<void> {
  const { account, getAgentId } = args

  if (isAccountTerminal(account)) {
    return
  }

  const configDir = configDirForAccount(account)

  writePacingSnapshot(account, configDir)

  let result: Awaited<ReturnType<typeof refreshCredentialFromPage>>
  try {
    result = await refreshCredentialFromPage(account, configDir, LOG)
  } catch (err) {
    console.error(`${LOG} Credential refresh error:`, err)
    return
  }

  const id = getAgentId()
  if (result.refreshed) return

  if (result.terminal) {
    if (markAccountTerminal(account)) {
      await writeTerminalHealth({ account, logPrefix: LOG }, LIVE_HEALTH)
      reportTerminalOAuthError(
        account,
        {
          code: result.error?.code,
          description: result.error?.description,
        },
        LOG
      )
    }
    return
  }

  if (result.error != null) {
    console.error(
      `${LOG} OAuth refresh failed (${result.error.code ?? "unknown"})${result.error.description != null ? `: ${result.error.description}` : ""}`
    )
  }
}

export async function buildCredentialSubsystem(args: {
  account: string
  configDir: string
  agentIdHandle: { readonly id: string | null }
  getLogDir: () => string
  proxyOwnerAgentId: string
  oauthProxyVersion: string
  adoptedClaudePid: number | null
  proxyAdoptionRule: ProxyAdoptionRuleSource
}): Promise<{
  stopCredentialWatch: () => void
  credentialRefreshTimer: ReturnType<typeof setInterval>
  proxy: SupervisorOAuthProxyHandle
}> {
  const { account, configDir, agentIdHandle, getLogDir, proxyOwnerAgentId, oauthProxyVersion } =
    args
  const { adoptedClaudePid } = args
  const getId = () => agentIdHandle.id

  const stopCredentialFileWatch = watchCredentialFile(() => account, configDir, LOG, {
    shouldSkip: (a) => isAccountTerminal(a),
    onReauthDetected: (a) => {
      reportOAuthRecovered(a, "credential file re-auth detected", LOG)
    },
    onPushResult: (result) => {
      if (result.ok) return
      console.error(`${LOG} Credential push failed:`, result.error)
    },
  })

  const stopCredentialWatch = stopCredentialFileWatch

  const credentialRefreshTimer = setInterval(
    () => {
      guardTick(
        () => runCredentialPullTick({ account, getAgentId: getId }),
        (err) => console.error(`${LOG} credential pull tick error:`, err)
      )
    },
    5 * 60 * 1000
  )

  const proxy = await spawnOrAdoptOAuthProxy(
    {
      agentId: proxyOwnerAgentId,
      registrationAccount: account,
      logDir: getLogDir(),
      oauthProxyVersion,
      adoptedClaudePid,
    },
    args.proxyAdoptionRule
  )

  return { stopCredentialWatch, credentialRefreshTimer, proxy }
}
