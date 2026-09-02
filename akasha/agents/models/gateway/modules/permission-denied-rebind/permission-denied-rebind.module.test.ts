import { afterEach, beforeEach, expect, mock, spyOn, test } from "bun:test"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import {
  attemptPermissionDeniedRebind,
  type PermissionDeniedRebindArgs,
} from "./permission-denied-rebind.module.code.ts"

const DENIED = JSON.stringify({
  type: "error",
  error: { type: "permission_error", message: "this account may not reach that model" },
})

const UNMATCHED = JSON.stringify({
  type: "error",
  error: { type: "invalid_request_error", message: "no" },
})

const LOGS: { error: string[]; output: string[]; answered: Array<readonly [string, number]> } = {
  error: [],
  output: [],
  answered: [],
}

const MARKED: Array<readonly [string, string]> = []

beforeEach(() => {
  LOGS.error = []
  LOGS.output = []
  LOGS.answered = []
  MARKED.length = 0
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

function argsFor(overrides: Partial<PermissionDeniedRebindArgs> = {}): PermissionDeniedRebindArgs {
  return {
    res: new Response(DENIED, { status: 403, statusText: "Forbidden" }),
    currentAccount: "alpha",
    trail: ["alpha"],
    tried: new Set(["alpha"]),
    method: "POST",
    pathname: "/v1/messages",
    logPrefix: "[gateway]",
    pickAccount: async () => "beta",
    getFreshToken: async (account) => credential(account),
    logRes: (account, status): undefined => {
      LOGS.answered.push([account, status])
    },
    markDisabled: async (account, reason): Promise<undefined> => {
      MARKED.push([account, reason])
    },
    ...overrides,
  }
}

test("a 403 the classifier matches moves the request to another account", async () => {
  const outcome = await attemptPermissionDeniedRebind(argsFor())
  if (outcome.kind !== "rebind") throw new Error("the denial moved the request nowhere")
  expect(outcome.account).toBe("beta")
})

test("a rebind carries the credential read for the account moved to", async () => {
  const outcome = await attemptPermissionDeniedRebind(argsFor())
  if (outcome.kind !== "rebind") throw new Error("the denial moved the request nowhere")
  expect(outcome.cred.account).toBe("beta")
})

test("a matched denial disables the account that was refused", async () => {
  await attemptPermissionDeniedRebind(argsFor())
  expect(MARKED).toEqual([["alpha", "this account may not reach that model"]])
})

test("a matched denial disables before another account is chosen", async () => {
  const order: string[] = []
  await attemptPermissionDeniedRebind(
    argsFor({
      markDisabled: async (): Promise<undefined> => {
        order.push("marked")
      },
      pickAccount: async () => {
        order.push("picked")
        return "beta"
      },
    })
  )
  expect(order).toEqual(["marked", "picked"])
})

test("the accounts already tried are kept from the choice", async () => {
  let excluded: ReadonlySet<string> | null = null
  await attemptPermissionDeniedRebind(
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

test("a 403 the classifier does not match is answered rather than rebound", async () => {
  const outcome = await attemptPermissionDeniedRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 403, statusText: "Forbidden" }) })
  )
  expect(outcome.kind).toBe("response")
})

test("an unmatched 403 disables no account", async () => {
  await attemptPermissionDeniedRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 403, statusText: "Forbidden" }) })
  )
  expect(MARKED).toEqual([])
})

test("an unmatched 403 on a trail of one account goes to the seam handed in", async () => {
  await attemptPermissionDeniedRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 403, statusText: "Forbidden" }) })
  )
  expect(LOGS.answered).toEqual([["alpha", 403]])
})

test("an unmatched 403 on a longer trail names every account reached", async () => {
  await attemptPermissionDeniedRebind(
    argsFor({
      res: new Response(UNMATCHED, { status: 403, statusText: "Forbidden" }),
      trail: ["alpha", "beta"],
    })
  )
  expect(LOGS.output.join("\n")).toContain("account=alpha→beta status=403")
})

test("an answer carries the body text upstream sent", async () => {
  const outcome = await attemptPermissionDeniedRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 403, statusText: "Forbidden" }) })
  )
  if (outcome.kind !== "response") throw new Error("the denial was rebound")
  expect(await outcome.response.text()).toBe(UNMATCHED)
})

test("an answer carries the status text upstream sent", async () => {
  const outcome = await attemptPermissionDeniedRebind(
    argsFor({ res: new Response(UNMATCHED, { status: 403, statusText: "Forbidden" }) })
  )
  if (outcome.kind !== "response") throw new Error("the denial was rebound")
  expect(outcome.response.statusText).toBe("Forbidden")
})

test("no account left to choose is answered rather than rebound", async () => {
  const outcome = await attemptPermissionDeniedRebind(argsFor({ pickAccount: async () => null }))
  expect(outcome.kind).toBe("response")
})

test("no account left to choose is written about as no-viable-account", async () => {
  await attemptPermissionDeniedRebind(argsFor({ pickAccount: async () => null }))
  expect(LOGS.output.join("\n")).toContain("rebind=no-viable-account disabled=true")
})

test("an account already tried coming back is written about as looped", async () => {
  await attemptPermissionDeniedRebind(argsFor({ pickAccount: async () => "alpha" }))
  expect(LOGS.output.join("\n")).toContain("rebind=looped disabled=true")
})

test("an account with no fresh token is answered rather than rebound", async () => {
  const outcome = await attemptPermissionDeniedRebind(argsFor({ getFreshToken: async () => null }))
  expect(outcome.kind).toBe("response")
})

test("an account with no fresh token names that account in the line written", async () => {
  await attemptPermissionDeniedRebind(argsFor({ getFreshToken: async () => null }))
  expect(LOGS.output.join("\n")).toContain("account=alpha→beta status=403 rebind=no-fresh-token")
})

test("a matched denial writes the reason the account was disabled for", async () => {
  await attemptPermissionDeniedRebind(argsFor())
  expect(LOGS.output.join("\n")).toContain(
    "403 permission_error observed account=alpha; disable+rebind"
  )
})

test("nothing here is written to the error seam", async () => {
  await attemptPermissionDeniedRebind(argsFor({ pickAccount: async () => null }))
  expect(LOGS.error).toEqual([])
})
