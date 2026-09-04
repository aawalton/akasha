import { afterEach, beforeEach, expect, mock, spyOn, test } from "bun:test"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import {
  attemptModelUnavailableRebind,
  type ModelUnavailableRebindArgs,
} from "./model-unavailable-rebind.module.code.ts"

const MISSING = JSON.stringify({
  type: "error",
  error: { type: "not_found_error", message: "model: claude-opus-5" },
})

const UNMATCHED = JSON.stringify({
  type: "error",
  error: { type: "invalid_request_error", message: "no" },
})

const LOGS: { error: string[]; output: string[] } = { error: [], output: [] }

const MARKED: Array<readonly [string, string]> = []

const CLEARED: string[] = []

beforeEach(() => {
  LOGS.error = []
  LOGS.output = []
  MARKED.length = 0
  CLEARED.length = 0
  spyOn(console, "error").mockImplementation((...parts: unknown[]) => {
    LOGS.error.push(parts.map(String).join(" "))
  })
  spyOn(console, "log").mockImplementation((...parts: unknown[]) => {
    LOGS.output.push(parts.map(String).join(" "))
  })
})

afterEach(() => {
  mock.restore()
})

function credential(account: string): OAuthCredential {
  return {
    account,
    accessToken: `fake-access-${account}`,
    refreshToken: `fake-refresh-${account}`,
    expiresAt: 1_000,
    scopes: ["user:inference"],
    subscriptionType: "max",
    rateLimitTier: null,
  }
}

function argsFor(overrides: Partial<ModelUnavailableRebindArgs> = {}): ModelUnavailableRebindArgs {
  return {
    res: new Response(MISSING, { status: 404, statusText: "Not Found" }),
    currentAccount: "alpha",
    trail: ["alpha"],
    tried: new Set(["alpha"]),
    method: "POST",
    pathname: "/v1/messages",
    logPrefix: "[gateway]",
    markedByReason: new Map<string, string>(),
    pickAccount: async () => "beta",
    getFreshToken: async (account) => credential(account),
    markDisabled: async (account, reason): Promise<undefined> => {
      MARKED.push([account, reason])
    },
    clearDisabled: async (account): Promise<undefined> => {
      CLEARED.push(account)
    },
    ...overrides,
  }
}

test("a 404 the classifier matches moves the request to another account", async () => {
  const outcome = await attemptModelUnavailableRebind(argsFor())
  if (outcome.kind !== "rebind") throw new Error("the missing model moved the request nowhere")
  expect(outcome.account).toBe("beta")
})

test("a rebind carries the credential read for the account moved to", async () => {
  const outcome = await attemptModelUnavailableRebind(argsFor())
  if (outcome.kind !== "rebind") throw new Error("the missing model moved the request nowhere")
  expect(outcome.cred.account).toBe("beta")
})

test("a matched 404 disables the account under a model_unavailable reason", async () => {
  await attemptModelUnavailableRebind(argsFor())
  expect(MARKED).toEqual([["alpha", "model_unavailable: model: claude-opus-5"]])
})

test("a matched 404 files the account against the reason it was disabled for", async () => {
  const markedByReason = new Map<string, string>()
  await attemptModelUnavailableRebind(argsFor({ markedByReason }))
  expect(markedByReason.get("model: claude-opus-5")).toBe("alpha")
})

test("the same reason on a second account clears the first account", async () => {
  const markedByReason = new Map<string, string>([["model: claude-opus-5", "alpha"]])
  await attemptModelUnavailableRebind(argsFor({ markedByReason, currentAccount: "beta" }))
  expect(CLEARED).toEqual(["alpha"])
})

test("the same reason on a second account is answered rather than rebound", async () => {
  const markedByReason = new Map<string, string>([["model: claude-opus-5", "alpha"]])
  const outcome = await attemptModelUnavailableRebind(
    argsFor({ markedByReason, currentAccount: "beta" })
  )
  expect(outcome.kind).toBe("response")
})

test("the same reason on a second account disables no further account", async () => {
  const markedByReason = new Map<string, string>([["model: claude-opus-5", "alpha"]])
  await attemptModelUnavailableRebind(argsFor({ markedByReason, currentAccount: "beta" }))
  expect(MARKED).toEqual([])
})

test("the same reason on the same account disables that account again", async () => {
  const markedByReason = new Map<string, string>([["model: claude-opus-5", "alpha"]])
  await attemptModelUnavailableRebind(argsFor({ markedByReason }))
  expect(CLEARED).toEqual([])
  expect(MARKED.length).toBe(1)
})

test("a 404 the classifier does not match is answered rather than rebound", async () => {
  const outcome = await attemptModelUnavailableRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 404, statusText: "Not Found" }) })
  )
  expect(outcome.kind).toBe("response")
})

test("an unmatched 404 is written about as none-unmatched", async () => {
  await attemptModelUnavailableRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 404, statusText: "Not Found" }) })
  )
  expect(LOGS.error.join("\n")).toContain("rebind=none-unmatched")
})

test("an unmatched 404 disables no account", async () => {
  await attemptModelUnavailableRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 404, statusText: "Not Found" }) })
  )
  expect(MARKED).toEqual([])
})

test("an answer carries the body text upstream sent", async () => {
  const outcome = await attemptModelUnavailableRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 404, statusText: "Not Found" }) })
  )
  if (outcome.kind !== "response") throw new Error("the missing model was rebound")
  expect(await outcome.response.text()).toBe(UNMATCHED)
})

test("an answer carries the status text upstream sent", async () => {
  const outcome = await attemptModelUnavailableRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 404, statusText: "Not Found" }) })
  )
  if (outcome.kind !== "response") throw new Error("the missing model was rebound")
  expect(outcome.response.statusText).toBe("Not Found")
})

test("no account left to choose is answered rather than rebound", async () => {
  const outcome = await attemptModelUnavailableRebind(argsFor({ pickAccount: async () => null }))
  expect(outcome.kind).toBe("response")
})

test("no account left to choose is written about as no-viable-account", async () => {
  await attemptModelUnavailableRebind(argsFor({ pickAccount: async () => null }))
  expect(LOGS.error.join("\n")).toContain("rebind=no-viable-account disabled=true")
})

test("an account already tried coming back is written about as looped", async () => {
  await attemptModelUnavailableRebind(argsFor({ pickAccount: async () => "alpha" }))
  expect(LOGS.error.join("\n")).toContain("rebind=looped disabled=true")
})

test("an account with no fresh token is answered rather than rebound", async () => {
  const outcome = await attemptModelUnavailableRebind(argsFor({ getFreshToken: async () => null }))
  expect(outcome.kind).toBe("response")
})

test("an account with no fresh token names that account in the line written", async () => {
  await attemptModelUnavailableRebind(argsFor({ getFreshToken: async () => null }))
  expect(LOGS.error.join("\n")).toContain("account=alpha→beta status=404 rebind=no-fresh-token")
})

test("the accounts already tried are kept from the choice", async () => {
  let excluded: ReadonlySet<string> | null = null
  await attemptModelUnavailableRebind(
    argsFor({
      tried: new Set(["alpha", "beta"]),
      pickAccount: async (exclude) => {
        excluded = exclude
        return "gamma"
      },
    })
  )
  expect([...(excluded ?? new Set<string>())].sort()).toEqual(["alpha", "beta"])
})
