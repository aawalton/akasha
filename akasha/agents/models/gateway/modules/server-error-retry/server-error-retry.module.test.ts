import { afterEach, beforeEach, expect, mock, spyOn, test } from "bun:test"
import type { Forward } from "../forward/forward.module.code.ts"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import type { ObserverSlot } from "../observer-slot/observer-slot.module.code.ts"
import {
  attemptServerErrorRetry,
  mayBeServerError,
  type ServerErrorRetryArgs,
} from "./server-error-retry.module.code.ts"

const OVERLOADED = JSON.stringify({
  type: "error",
  error: { type: "overloaded_error", message: "upstream is overloaded" },
})

const NOT_A_SERVER_ERROR = JSON.stringify({
  type: "error",
  error: { type: "rate_limit_error", message: "at the limit" },
})

const SCHEDULE = [10, 20] as const

const LOGS: { error: string[]; output: string[] } = { error: [], output: [] }

const WAITED: number[] = []

beforeEach(() => {
  LOGS.error = []
  LOGS.output = []
  WAITED.length = 0
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

function credential(): OAuthCredential {
  return {
    account: "alpha",
    accessToken: "fake-access-alpha",
    refreshToken: "fake-refresh-alpha",
    expiresAt: 1_000,
    scopes: ["user:inference"],
    subscriptionType: "max",
    rateLimitTier: null,
  }
}

function forwardAnswering(answers: readonly (() => Response)[]): {
  forward: Forward
  calls: () => number
} {
  let call = 0
  const forward: Forward = async () => {
    const answer = answers[Math.min(call, answers.length - 1)]
    call += 1
    if (answer === undefined) throw new Error("the forward was handed no answer")
    return answer()
  }
  return { forward, calls: () => call }
}

function argsFor(
  forward: Forward,
  overrides: Partial<ServerErrorRetryArgs> = {}
): ServerErrorRetryArgs {
  const observerSlot: ObserverSlot = { current: null }
  return {
    res: new Response(OVERLOADED, { status: 529, statusText: "Overloaded" }),
    req: new Request("http://localhost/v1/messages", { method: "POST" }),
    currentAccount: "alpha",
    currentCred: credential(),
    bodyBuffer: null,
    observerSlot,
    trail: ["alpha"],
    method: "POST",
    pathname: "/v1/messages",
    logPrefix: "[gateway]",
    forward,
    schedule: SCHEDULE,
    sleep: async (ms): Promise<undefined> => {
      WAITED.push(ms)
    },
    ...overrides,
  }
}

test("the statuses a retry may be made against are 429, 500, 502, 503 and 529", () => {
  expect([429, 500, 502, 503, 529].every(mayBeServerError)).toBe(true)
})

test("a status outside that set is no server error to retry", () => {
  expect([200, 400, 401, 403, 404, 504].some(mayBeServerError)).toBe(false)
})

test("a response the classifier does not match resolves with no retry", async () => {
  const { forward, calls } = forwardAnswering([() => new Response("never")])
  const outcome = await attemptServerErrorRetry(
    argsFor(forward, {
      res: new Response(NOT_A_SERVER_ERROR, { status: 429, statusText: "Too Many Requests" }),
    })
  )
  expect(outcome.kind).toBe("resolved")
  expect(calls()).toBe(0)
})

test("a response the classifier does not match resolves carrying its own body", async () => {
  const { forward } = forwardAnswering([() => new Response("never")])
  const outcome = await attemptServerErrorRetry(
    argsFor(forward, {
      res: new Response(NOT_A_SERVER_ERROR, { status: 429, statusText: "Too Many Requests" }),
    })
  )
  if (outcome.kind !== "resolved") throw new Error("the response was not resolved")
  expect(await outcome.res.text()).toBe(NOT_A_SERVER_ERROR)
})

test("a matched error that clears on the first retry resolves with the retried response", async () => {
  const { forward, calls } = forwardAnswering([() => new Response("ok", { status: 200 })])
  const outcome = await attemptServerErrorRetry(argsFor(forward))
  if (outcome.kind !== "resolved") throw new Error("the overload was not resolved")
  expect(await outcome.res.text()).toBe("ok")
  expect(calls()).toBe(1)
})

test("a retry waits the schedule at the attempt's index", async () => {
  const { forward } = forwardAnswering([
    () => new Response(OVERLOADED, { status: 529 }),
    () => new Response(OVERLOADED, { status: 529 }),
  ])
  await attemptServerErrorRetry(argsFor(forward))
  expect(WAITED).toEqual([10, 20])
})

test("a retry-after header sets the wait rather than the schedule", async () => {
  const { forward } = forwardAnswering([() => new Response("ok", { status: 200 })])
  await attemptServerErrorRetry(
    argsFor(forward, {
      res: new Response(OVERLOADED, { status: 529, headers: { "retry-after": "3" } }),
    })
  )
  expect(WAITED).toEqual([3000])
})

test("an error persisting through the schedule is answered persistent", async () => {
  const { forward, calls } = forwardAnswering([() => new Response(OVERLOADED, { status: 529 })])
  const outcome = await attemptServerErrorRetry(argsFor(forward))
  expect(outcome.kind).toBe("persistent")
  expect(calls()).toBe(SCHEDULE.length)
})

test("a persistent error carries the body of the last attempt", async () => {
  const { forward } = forwardAnswering([
    () => new Response("the last body", { status: 503, statusText: "Service Unavailable" }),
  ])
  const outcome = await attemptServerErrorRetry(argsFor(forward))
  if (outcome.kind !== "persistent") throw new Error("the overload did not persist")
  expect(await outcome.response.text()).toBe("the last body")
})

test("a persistent error carries the status of the last attempt", async () => {
  const { forward } = forwardAnswering([
    () => new Response("the last body", { status: 503, statusText: "Service Unavailable" }),
  ])
  const outcome = await attemptServerErrorRetry(argsFor(forward))
  if (outcome.kind !== "persistent") throw new Error("the overload did not persist")
  expect(outcome.response.status).toBe(503)
})

test("a persistent error is written about on the error seam", async () => {
  const { forward } = forwardAnswering([() => new Response(OVERLOADED, { status: 529 })])
  await attemptServerErrorRetry(argsFor(forward))
  expect(LOGS.error.join("\n")).toContain("server-error=persistent-after-2-retries")
})

test("every retry is written about before it is made", async () => {
  const { forward } = forwardAnswering([() => new Response(OVERLOADED, { status: 529 })])
  await attemptServerErrorRetry(argsFor(forward))
  expect(LOGS.output.filter((line) => line.includes("class=server-error")).length).toBe(2)
})

test("a retried response outside the retriable statuses resolves at once", async () => {
  const { forward, calls } = forwardAnswering([() => new Response("teapot", { status: 418 })])
  const outcome = await attemptServerErrorRetry(argsFor(forward))
  expect(outcome.kind).toBe("resolved")
  expect(calls()).toBe(1)
})

test("a retried 429 the classifier does not match resolves at once", async () => {
  const { forward, calls } = forwardAnswering([
    () => new Response(NOT_A_SERVER_ERROR, { status: 429 }),
  ])
  const outcome = await attemptServerErrorRetry(argsFor(forward))
  expect(outcome.kind).toBe("resolved")
  expect(calls()).toBe(1)
})

test("an empty schedule makes no retry and answers persistent", async () => {
  const { forward, calls } = forwardAnswering([() => new Response("never")])
  const outcome = await attemptServerErrorRetry(argsFor(forward, { schedule: [] }))
  expect(outcome.kind).toBe("persistent")
  expect(calls()).toBe(0)
})

test("the forward is handed the token of the account being retried", async () => {
  const seen: (string | null)[] = []
  const forward: Forward = async (_incoming, accessToken) => {
    seen.push(accessToken)
    return new Response("ok", { status: 200 })
  }
  await attemptServerErrorRetry(argsFor(forward))
  expect(seen).toEqual(["fake-access-alpha"])
})
