import type { CredentialPick, OAuthCredential } from "@akasha/agents/oauth-types"
import { REFRESH_BUFFER_MS } from "@tools/lib/oauth-constants"
import type { RefreshOutcome } from "@tools/lib/oauth-credentials"
import { getBestCredential } from "@tools/lib/oauth-credentials"
import { writeCredentialFile } from "@tools/lib/oauth-file"
import { accountsWithPages, credentialByAccountFromPage } from "@tools/lib/oauth-page-credential"
import { configDirForAccount, LOG } from "../supervisor-config/supervisor-config.module.code.ts"

export interface AccountResolutionDeps {
  getCredentialByAccount: (account: string, logPrefix?: string) => Promise<OAuthCredential | null>
  getBestCredential: (logPrefix?: string) => Promise<CredentialPick | null>
  claudeAccountPageExists: (account: string) => Promise<boolean>
  writeCredentialFile: (configDir: string, credential: OAuthCredential) => void
  configDirForAccount: (account: string) => string
  log: string
}

const defaultAccountResolutionDeps: AccountResolutionDeps = {
  getCredentialByAccount: async (account: string, logPrefix?: string) =>
    credentialByAccountFromPage(account, logPrefix),
  getBestCredential,
  claudeAccountPageExists: async (account: string) => accountsWithPages().includes(account),
  writeCredentialFile,
  configDirForAccount,
  log: LOG,
}

const DEFAULT_REGISTRATION_ACCOUNT = "aawalton"

export async function selectAccountAndWriteCredential(
  requestedAccount: string | undefined,
  deps: AccountResolutionDeps = defaultAccountResolutionDeps,
  interactive = false
): Promise<string> {
  const pinned =
    requestedAccount !== undefined && requestedAccount.length > 0 ? requestedAccount : undefined
  const effectiveAccount = pinned ?? DEFAULT_REGISTRATION_ACCOUNT
  const cred = await deps.getCredentialByAccount(effectiveAccount, deps.log)
  if (cred) {
    const now = Date.now()
    if (cred.expiresAt <= now) {
      const dead =
        `Registration account "${effectiveAccount}" expired at ` +
        `${new Date(cred.expiresAt).toISOString()} and nothing here renews one. ` +
        `Claude account upkeep is what renews a token, and it has not reached this account — ` +
        `\`systemctl --user status claude-account-upkeep-service\` is where that starts.`
      if (!interactive) {
        throw new Error(
          `${dead} A headless session cannot re-authenticate — re-auth interactively ` +
            `via the account's c-alias (c1/c2/c3/c4) and /login.`
        )
      }
      console.warn(`${deps.log} ${dead} Launching in re-auth mode; run /login to re-authenticate.`)
      return effectiveAccount
    }
    if (cred.expiresAt < now + REFRESH_BUFFER_MS) {
      console.warn(
        `${deps.log} Registration account "${effectiveAccount}" expires at ` +
          `${new Date(cred.expiresAt).toISOString()}, inside the reader's buffer — upkeep is behind.`
      )
    }
    deps.writeCredentialFile(deps.configDirForAccount(cred.account), cred)
    console.log(`${deps.log} Using pinned account: ${cred.account}`)
    return cred.account
  }
  if (interactive && pinned !== undefined) {
    let accountPageExists: boolean
    try {
      accountPageExists = await deps.claudeAccountPageExists(effectiveAccount)
    } catch (err) {
      throw new Error(
        `Registration account "${effectiveAccount}" could not be read because its pages ` +
          `could not be reached (${err instanceof Error ? err.message : String(err)}). ` +
          `Nothing here says whether the account exists. Re-launch once they can be read.`
      )
    }
    if (!accountPageExists) {
      throw new Error(
        `Registration account "${effectiveAccount}" does not exist — no claude-account page. ` +
          `Check the spelling of -a, or onboard it with ` +
          `\`akasha claude-account-add ${effectiveAccount} --email <email>\` ` +
          `and re-launch to run /login.`
      )
    }
    console.warn(
      `${deps.log} Pinned account "${effectiveAccount}" has no credential yet — ` +
        `launching in bootstrap mode. Run /login to authenticate this account.`
    )
    return effectiveAccount
  }
  console.warn(
    `${deps.log} Pinned account "${effectiveAccount}" not found, falling back to best available`
  )
  const picked = await deps.getBestCredential(deps.log)
  if (!picked) throw new Error("No managed credential available")
  deps.writeCredentialFile(deps.configDirForAccount(picked.credential.account), picked.credential)
  console.log(`${deps.log} Using account: ${picked.credential.account}`)
  return picked.credential.account
}
