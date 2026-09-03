import {
  DOORS,
  fileRefreshedFrom,
  fileWatched,
} from "@akasha/agents/claude-account-credential-file"
import { terminalHealthMarks } from "@akasha/agents/claude-account-health"
import { DOORS as EFFECT_DOORS, markedOn } from "@akasha/agents/oauth-effects"
import { readingIn } from "@akasha/indexes"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { valueAt } from "@akasha/pages-system/page-value"
import { isAccountTerminal, markAccountTerminal } from "@tools/lib/account-terminal"
import { reportOAuthRecovered, reportTerminalOAuthError } from "@tools/lib/agent-health-write"
import type { ProxyAdoptionRuleSource } from "@tools/lib/supervisor-proxy-adoption-rule"
import {
  type SupervisorOAuthProxyHandle,
  spawnOrAdoptOAuthProxy,
} from "@tools/lib/supervisor-spawn-oauth-proxy"
import { configDirForAccount, LOG } from "../supervisor-config/supervisor-config.module.code.ts"
import { guardTick } from "../supervisor-guard-tick/supervisor-guard-tick.module.code.ts"
import { writePacingSnapshot } from "../supervisor-usage-snapshot/supervisor-usage-snapshot.module.code.ts"

export async function runCredentialPullTick(args: {
  account: string
  getAgentId: () => string | null
}): Promise<void> {
  const { account } = args

  if (isAccountTerminal(account)) {
    return
  }

  const root = rootFor(resolveRoots(), AKASHA)
  const configDir = configDirForAccount(account)

  writePacingSnapshot(account, configDir)

  let result: ReturnType<typeof fileRefreshedFrom>
  try {
    result = fileRefreshedFrom({
      root,
      slug: account,
      dir: configDir,
      doors: DOORS,
      logPrefix: LOG,
    })
  } catch (err) {
    console.error(`${LOG} Credential refresh error:`, err)
    return
  }

  if (result.refreshed) return

  if (result.terminal && markAccountTerminal(account)) {
    markedOn(root, EFFECT_DOORS, account, terminalHealthMarks(Date.now()), LOG)
    reportTerminalOAuthError(account, {}, LOG)
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
  const root = rootFor(resolveRoots(), AKASHA)

  const stopCredentialFileWatch = fileWatched({
    root,
    dir: configDir,
    slugOf: () => account,
    doors: DOORS,
    reading: readingIn(root),
    pageOf: (path) => valueAt(path, root),
    logPrefix: LOG,
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
