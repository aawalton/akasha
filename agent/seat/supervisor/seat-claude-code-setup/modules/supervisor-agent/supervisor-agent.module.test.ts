import { expect, test } from "bun:test"
import { modelAccount } from "akasha/agent/model/account/model-account.page-type.ts"
import type { OAuthCredential } from "akasha/agent/model/account/modules/oauth-types/oauth-types.module.code.ts"
import { aawalton } from "akasha/agent/model/account/pages/aawalton/aawalton.model-account.ts"
import { DEFAULT_ACCOUNT } from "akasha/agent/seat/launching/seat-launching.module.code.ts"
import {
  type AccountResolutionDeps,
  selectAccountAndWriteCredential,
} from "akasha/agent/seat/supervisor/seat-claude-code-setup/modules/supervisor-agent/supervisor-agent.module.code.ts"

const HOUR_MS = 3_600_000

function credentialFor(account: string): OAuthCredential {
  return {
    account,
    accessToken: "access",
    refreshToken: "refresh",
    expiresAt: Date.now() + 24 * HOUR_MS,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
  }
}

function asking(): { readonly deps: AccountResolutionDeps; readonly asked: string[] } {
  const asked: string[] = []
  const deps: AccountResolutionDeps = {
    getCredentialByAccount: async (account) => {
      asked.push(account)
      return credentialFor(account)
    },
    getBestCredential: async () => null,
    modelAccountPageExists: async () => true,
    writeCredentialFile: () => undefined,
    configDirForAccount: (account) => `/config/${account}`,
    log: "",
  }
  return { deps, asked }
}

test("an account named as a model account is selected by its slug alone", async () => {
  const { deps, asked } = asking()
  const named = `${modelAccount.slug}/${aawalton.slug}`
  expect(await selectAccountAndWriteCredential(named, deps)).toBe(aawalton.slug)
  expect(asked).toEqual([aawalton.slug])
})

test("an account named by its slug is selected by that slug", async () => {
  const { deps, asked } = asking()
  expect(await selectAccountAndWriteCredential(aawalton.slug, deps)).toBe(aawalton.slug)
  expect(asked).toEqual([aawalton.slug])
})

test("a seat naming no account is given the default account seat launching gives", async () => {
  const { deps, asked } = asking()
  expect(await selectAccountAndWriteCredential(undefined, deps)).toBe(DEFAULT_ACCOUNT)
  expect(asked).toEqual([DEFAULT_ACCOUNT])
})
