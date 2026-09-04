import { expect, test } from "bun:test"
import type {
  AccountState,
  CredentialDoc,
  CredentialPick,
  OAuthCredential,
} from "./oauth-types.module.code.ts"

type Same<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false

type Writable<T> = { -readonly [K in keyof T]: T[K] }

const CREDENTIAL: OAuthCredential = {
  account: "acct-a",
  accessToken: "at",
  refreshToken: "rt",
  expiresAt: 1_700_000_000_000,
  scopes: ["user:inference"],
  subscriptionType: "max",
  rateLimitTier: "tier-2",
}

const ACCOUNT_STATE: AccountState = {
  account: "acct-a",
  fiveHourUtil: 0.4,
  sevenDayUtil: 0.1,
  sevenDayResetsAt: "2026-09-09T00:00:00Z",
  fiveHourResetsAt: null,
  subscriptionType: "max",
  subscriptionDisabled: false,
  fiveHourAtLimitUntil: null,
  renewalTerminal: false,
  accessTokenExpiresAt: 1_700_000_000_000,
}

const BARE_DOC: CredentialDoc = {
  account: "acct-a",
  accessToken: "at",
  refreshToken: "rt",
  expiresAt: 1_700_000_000_000,
}

const PICK: CredentialPick = { credential: CREDENTIAL, fiveHourResetsAtMs: null }

const CREDENTIAL_AS_DOC: CredentialDoc = CREDENTIAL

const SCOPES_OPTIONAL_ON_DOC: Same<
  Pick<CredentialDoc, "scopes">,
  { scopes?: readonly string[] | undefined }
> = true

const SCOPES_REQUIRED_ON_CREDENTIAL: Same<
  Pick<OAuthCredential, "scopes">,
  { scopes: readonly string[] }
> = true

const DISABLED_AT_OFF_CREDENTIAL: Same<
  Extract<keyof OAuthCredential, "subscriptionDisabledAt">,
  never
> = true

const DISABLED_AT_ON_DOC: Same<
  Extract<keyof CredentialDoc, "subscriptionDisabledAt">,
  "subscriptionDisabledAt"
> = true

const ALERTED_AT_OFF_CREDENTIAL: Same<
  Extract<keyof OAuthCredential, "terminalAlertedAt">,
  never
> = true

const ALERTED_AT_ON_DOC: Same<
  Extract<keyof CredentialDoc, "terminalAlertedAt">,
  "terminalAlertedAt"
> = true

const ACCOUNT_STATE_IS_FROZEN: Same<Writable<AccountState>, AccountState> = false

const CREDENTIAL_IS_WRITABLE: Same<Writable<OAuthCredential>, OAuthCredential> = true

const PICK_RESET_IS_MILLISECONDS: Same<CredentialPick["fiveHourResetsAtMs"], number | null> = true

const STATE_RESET_IS_TEXT: Same<AccountState["fiveHourResetsAt"], string | null> = true

const ACCOUNT_STATE_HOLDS_NO_TOKEN: Same<
  Extract<keyof AccountState, "accessToken" | "refreshToken">,
  never
> = true

const STATE_HOLDS_NO_DISABLED_TIMESTAMP: Same<
  Extract<keyof AccountState, "subscriptionDisabledAt">,
  never
> = true

const CREDENTIAL_EXPIRY_IS_UNSUFFIXED: Same<
  Extract<keyof OAuthCredential, "expiresAtMs">,
  never
> = true

test("nothing here runs", async () => {
  const loaded = await import("./oauth-types.module.code.ts")
  expect(Object.keys(loaded)).toEqual([])
})

test("an OAuthCredential is a CredentialDoc", () => {
  expect(CREDENTIAL_AS_DOC).toBe(CREDENTIAL)
  expect(CREDENTIAL_AS_DOC.account).toBe("acct-a")
})

test("a CredentialDoc names scopes as an optional field", () => {
  expect(SCOPES_OPTIONAL_ON_DOC).toBe(true)
  expect(Object.keys(BARE_DOC).sort()).toEqual([
    "accessToken",
    "account",
    "expiresAt",
    "refreshToken",
  ])
})

test("an OAuthCredential names scopes as a required field", () => {
  expect(SCOPES_REQUIRED_ON_CREDENTIAL).toBe(true)
  expect(CREDENTIAL.scopes).toEqual(["user:inference"])
})

test("an OAuthCredential drops the subscriptionDisabledAt a CredentialDoc carries", () => {
  expect(DISABLED_AT_OFF_CREDENTIAL).toBe(true)
  expect(DISABLED_AT_ON_DOC).toBe(true)
})

test("an OAuthCredential drops the terminalAlertedAt a CredentialDoc carries", () => {
  expect(ALERTED_AT_OFF_CREDENTIAL).toBe(true)
  expect(ALERTED_AT_ON_DOC).toBe(true)
})

test("every AccountState field is readonly", () => {
  expect(ACCOUNT_STATE_IS_FROZEN).toBe(false)
})

test("a CredentialPick pairs one credential with the five-hour reset in milliseconds", () => {
  expect(PICK.credential).toBe(CREDENTIAL)
  expect(PICK.fiveHourResetsAtMs).toBe(null)
  expect(PICK_RESET_IS_MILLISECONDS).toBe(true)
  expect(Object.keys(PICK).sort()).toEqual(["credential", "fiveHourResetsAtMs"])
})

test("an AccountState carries no token", () => {
  expect(ACCOUNT_STATE_HOLDS_NO_TOKEN).toBe(true)
  expect(Object.keys(ACCOUNT_STATE)).not.toContain("accessToken")
  expect(Object.keys(ACCOUNT_STATE)).toContain("accessTokenExpiresAt")
})

test("an AccountState reads the disabled flag rather than the disabled timestamp", () => {
  expect(STATE_HOLDS_NO_DISABLED_TIMESTAMP).toBe(true)
  expect(ACCOUNT_STATE.subscriptionDisabled).toBe(false)
})

test("an OAuthCredential names its expiry expiresAt rather than naming the unit", () => {
  expect(CREDENTIAL_EXPIRY_IS_UNSUFFIXED).toBe(true)
  expect(Object.keys(CREDENTIAL)).toContain("expiresAt")
})

test("no OAuthCredential field is readonly", () => {
  expect(CREDENTIAL_IS_WRITABLE).toBe(true)
})

test("a five-hour reset is an ISO string on AccountState and milliseconds on CredentialPick", () => {
  expect(STATE_RESET_IS_TEXT).toBe(true)
  expect(PICK_RESET_IS_MILLISECONDS).toBe(true)
  expect(ACCOUNT_STATE.sevenDayResetsAt).toBe("2026-09-09T00:00:00Z")
})

test("a CredentialDoc carries the disabled flag beside the disabled timestamp", () => {
  const both: CredentialDoc = {
    ...BARE_DOC,
    subscriptionDisabled: true,
    subscriptionDisabledAt: 1_700_000_000_000,
  }
  expect(both.subscriptionDisabled).toBe(true)
  expect(both.subscriptionDisabledAt).toBe(1_700_000_000_000)
})
