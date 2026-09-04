import { expect, test } from "bun:test"
import type { RefreshOutcome } from "../../../../claude-accounts/modules/oauth/claude-account-oauth.module.code.ts"
import type { OAuthEffects } from "../oauth-effects/oauth-effects.module.code.ts"
import type { OAuthProxy, StartOAuthProxyOptions } from "./proxy-start.module.code.ts"

type Same<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false

const ROOT = "/var/tmp/a-root-that-is-not-read"

const FAKE_TOKEN = "fake-access-token-for-a-test"

function refuse(): never {
  throw new Error("nothing here reaches an account")
}

const EFFECTS: OAuthEffects = {
  getBestCredential: refuse,
  getCredentialByAccount: refuse,
  markAccountAtLimit: refuse,
  repollUsageAfter429: refuse,
  getClaudeAccountPacing: refuse,
  markAccountSubscriptionDisabled: refuse,
  clearAccountSubscriptionDisabled: refuse,
}

const BARE: StartOAuthProxyOptions = { port: 0, root: ROOT }

const WHOLE: StartOAuthProxyOptions = {
  port: 4321,
  root: ROOT,
  logPrefix: "[gw]",
  onRefreshOutcome: () => undefined,
  isAccountTerminal: (account) => account === "aine",
  getLogDir: () => "/var/tmp/a-log-directory",
  upstreamIdleTimeoutMs: 600_000,
  downstreamKeepaliveMs: 3_500,
  unixSocketPath: "/var/tmp/a-socket/rc.sock",
  oauth: EFFECTS,
}

const PORT_IS_REQUIRED: Same<Pick<StartOAuthProxyOptions, "port">, { readonly port: number }> = true

const ROOT_IS_REQUIRED: Same<Pick<StartOAuthProxyOptions, "root">, { readonly root: string }> = true

const PREFIX_IS_OPTIONAL: Same<
  Pick<StartOAuthProxyOptions, "logPrefix">,
  { readonly logPrefix?: string | undefined }
> = true

const PORT_HANDED_BACK_IS_A_NUMBER: Same<Pick<OAuthProxy, "port">, { readonly port: number }> = true

const NO_TOKEN_OPTION: Same<Extract<keyof StartOAuthProxyOptions, "accessToken">, never> = true

const NO_ACCOUNT_OPTION: Same<Extract<keyof StartOAuthProxyOptions, "account">, never> = true

test("a gateway is started with the port and the root and nothing else", () => {
  expect(BARE.port).toBe(0)
  expect(BARE.root).toBe(ROOT)
  expect(Object.keys(BARE).sort()).toEqual(["port", "root"])
})

test("the port and the root are the two options a caller must name", () => {
  expect(PORT_IS_REQUIRED).toBe(true)
  expect(ROOT_IS_REQUIRED).toBe(true)
})

test("every option beside the port and the root is optional", () => {
  const keys: readonly (keyof StartOAuthProxyOptions)[] = [
    "logPrefix",
    "onRefreshOutcome",
    "isAccountTerminal",
    "getLogDir",
    "upstreamIdleTimeoutMs",
    "downstreamKeepaliveMs",
    "unixSocketPath",
    "oauth",
  ]
  for (const key of keys) expect(Object.hasOwn(BARE, key)).toBe(false)
  expect(PREFIX_IS_OPTIONAL).toBe(true)
})

test("an options value naming every option typechecks", () => {
  expect(Object.keys(WHOLE).length).toBe(10)
  expect(WHOLE.logPrefix).toBe("[gw]")
  expect(WHOLE.upstreamIdleTimeoutMs).toBe(600_000)
  expect(WHOLE.downstreamKeepaliveMs).toBe(3_500)
  expect(WHOLE.unixSocketPath).toBe("/var/tmp/a-socket/rc.sock")
})

test("the effects a gateway reaches accounts through may be handed in", () => {
  expect(WHOLE.oauth).toBe(EFFECTS)
  expect(BARE.oauth).toBeUndefined()
})

test("the directory a transport row lands in is handed in as a call", () => {
  expect(WHOLE.getLogDir?.()).toBe("/var/tmp/a-log-directory")
})

test("the terminal test answers whether one account is terminal", () => {
  expect(WHOLE.isAccountTerminal?.("aine")).toBe(true)
  expect(WHOLE.isAccountTerminal?.("ctw")).toBe(false)
})

test("the refresh outcome hook is told the account and the outcome", () => {
  const seen: string[] = []
  const outcomes: RefreshOutcome[] = []
  const options: StartOAuthProxyOptions = {
    port: 0,
    root: ROOT,
    onRefreshOutcome: (account, outcome) => {
      seen.push(account)
      outcomes.push(outcome)
      return undefined
    },
  }
  const failed: RefreshOutcome = { ok: false, terminal: true, reason: "http-error", status: 400 }
  options.onRefreshOutcome?.("aine", failed)
  expect(seen).toEqual(["aine"])
  expect(outcomes[0]?.ok).toBe(false)
})

test("a refresh outcome that worked reaches the hook as the credential it carries", () => {
  const seen: string[] = []
  const held: RefreshOutcome[] = []
  const worked: RefreshOutcome = {
    ok: true,
    credential: {
      account: "aine",
      accessToken: FAKE_TOKEN,
      refreshToken: FAKE_TOKEN,
      expiresAt: 1_700_000_000_000,
      scopes: [],
      subscriptionType: null,
      rateLimitTier: null,
    },
  }
  const options: StartOAuthProxyOptions = {
    port: 0,
    root: ROOT,
    onRefreshOutcome: (account, outcome) => {
      seen.push(account)
      held.push(outcome)
      return undefined
    },
  }
  options.onRefreshOutcome?.("aine", worked)
  expect(seen).toEqual(["aine"])
  expect(held[0]?.ok).toBe(true)
})

test("a started gateway hands back the port that gateway bound", () => {
  const flushed: string[] = []
  let stopped = 0
  const proxy: OAuthProxy = {
    port: 4321,
    stop: () => {
      stopped += 1
    },
    flushAll: (reason) => {
      flushed.push(reason)
    },
  }
  expect(proxy.port).toBe(4321)
  expect(proxy.stop()).toBeUndefined()
  expect(stopped).toBe(1)
  expect(proxy.flushAll("proxy shutting down")).toBeUndefined()
  expect(flushed).toEqual(["proxy shutting down"])
  expect(PORT_HANDED_BACK_IS_A_NUMBER).toBe(true)
})

test("what a started gateway hands back names three things and no more", () => {
  const proxy: OAuthProxy = { port: 1, stop: () => undefined, flushAll: () => undefined }
  expect(Object.keys(proxy).sort()).toEqual(["flushAll", "port", "stop"])
})

test("no option here carries a token or an account name", () => {
  expect(NO_TOKEN_OPTION).toBe(true)
  expect(NO_ACCOUNT_OPTION).toBe(true)
  expect(JSON.stringify(BARE)).not.toContain(FAKE_TOKEN)
})
