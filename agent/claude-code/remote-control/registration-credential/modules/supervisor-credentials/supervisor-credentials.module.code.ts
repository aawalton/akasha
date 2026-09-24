import {
  clearAccountTerminal,
  isAccountTerminal,
  markAccountTerminal,
} from "akasha/agent/claude-code/remote-control/registration-credential/modules/account-terminal/account-terminal.module.code.ts"
import {
  reportOAuthRecovered,
  reportTerminalOAuthError,
} from "akasha/agent/claude-code/remote-control/registration-credential/modules/oauth-health-lines/oauth-health-lines.module.code.ts"
import {
  DOORS,
  fileRefreshedFrom,
  fileWatched,
} from "akasha/agent/model/account/modules/credential-file/model-account-credential-file.module.code.ts"
import { terminalHealthMarks } from "akasha/agent/model/account/modules/health/model-account-health.module.code.ts"
import {
  DOORS as EFFECT_DOORS,
  markedOn,
} from "akasha/agent/model/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import {
  type SupervisorOAuthProxyHandle,
  spawnOrAdoptOAuthProxy,
} from "akasha/agent/seat/model-gateway/modules/supervisor-spawn-gateway/supervisor-spawn-gateway.module.code.ts"
import { writePacingSnapshot } from "akasha/agent/seat/supervisor/seat-claude-code-setup/modules/supervisor-usage-snapshot/supervisor-usage-snapshot.module.code.ts"
import {
  configDirForAccount,
  LOG,
} from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import { guardTick } from "akasha/agent/seat/supervisor/supervisor-ticking/modules/supervisor-guard-tick/supervisor-guard-tick.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

async function runCredentialPullTick(args: {
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
      clearAccountTerminal(a)
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

  const proxy = await spawnOrAdoptOAuthProxy({
    agentId: proxyOwnerAgentId,
    registrationAccount: account,
    logDir: getLogDir(),
    oauthProxyVersion,
    adoptedClaudePid,
  })

  return { stopCredentialWatch, credentialRefreshTimer, proxy }
}
