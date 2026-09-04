import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from "bun:test"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import {
  type AuthFailedRetryArgs,
  attemptAuthFailedRetry,
} from "./auth-failed-retry.module.code.ts"

const BODY = '{"error":{"type":"authentication_error"}}'

function credential(overrides: Partial<OAuthCredential> = {}): OAuthCredential {
  return {
    account: "alpha",
    accessToken: "token-old",
    refreshToken: "refresh",
    expiresAt: 1_000,
    scopes: ["user:inference"],
    subscriptionType: "max",
    rateLimitTier: null,
    ...overrides,
  }
}

function unauthorized(overrides: ResponseInit = {}): Response {
  return new Response(BODY, { status: 401, statusText: "Unauthorized", ...overrides })
}

function argsFor(
  fresh: OAuthCredential | null,
  overrides: Partial<AuthFailedRetryArgs> = {}
): AuthFailedRetryArgs {
  return {
    res: unauthorized(),
    currentAccount: "alpha",
    currentToken: "token-old",
    trail: ["alpha"],
    method: "POST",
    pathname: "/v1/messages",
    logPrefix: "[gateway]",
    getFreshToken: async () => fresh,
    ...overrides,
  }
}

const LOGS: { error: string[]; output: string[] } = { error: [], output: [] }

beforeEach(() => {
  LOGS.error = []
  LOGS.output = []
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

describe("The credential store is handed in as a function.", () => {
  test("the handed-in function is what supplies the credential", async () => {
    const handed = credential({ accessToken: "token-new" })
    const outcome = await attemptAuthFailedRetry(argsFor(handed))
    expect(outcome.kind).toBe("retry")
    if (outcome.kind === "retry") expect(outcome.credential).toBe(handed)
  })
})

describe("The store is asked for the account that met the 401.", () => {
  test("the account asked for is the current account", async () => {
    const asked: string[] = []
    await attemptAuthFailedRetry(
      argsFor(null, {
        currentAccount: "beta",
        trail: ["alpha", "beta"],
        getFreshToken: async (account) => {
          asked.push(account)
          return null
        },
      })
    )
    expect(asked).toEqual(["beta"])
  })
})

describe("A store holding no credential for the account ends the attempt.", () => {
  test("a null credential gives a response", async () => {
    const outcome = await attemptAuthFailedRetry(argsFor(null))
    expect(outcome.kind).toBe("response")
  })
})

describe("A store holding the token that failed ends the attempt.", () => {
  test("an unchanged access token gives a response", async () => {
    const outcome = await attemptAuthFailedRetry(argsFor(credential({ accessToken: "token-old" })))
    expect(outcome.kind).toBe("response")
  })
})

describe("A store holding a token other than the one that failed is a retry.", () => {
  test("a changed access token gives a retry", async () => {
    const outcome = await attemptAuthFailedRetry(argsFor(credential({ accessToken: "token-new" })))
    expect(outcome.kind).toBe("retry")
  })
})

describe("Two credentials are told apart by access token alone.", () => {
  test("a fresh expiry with the same token still ends the attempt", async () => {
    const outcome = await attemptAuthFailedRetry(
      argsFor(credential({ accessToken: "token-old", expiresAt: 9_999_999, scopes: ["other"] }))
    )
    expect(outcome.kind).toBe("response")
    expect(LOGS.error[0]).toContain("reread=same-token")
  })
})

describe("A retry hands back a credential and no account.", () => {
  test("the retry outcome names only kind and credential", async () => {
    const outcome = await attemptAuthFailedRetry(argsFor(credential({ accessToken: "token-new" })))
    expect(Object.keys(outcome).sort()).toEqual(["credential", "kind"])
  })
})

describe("An ended attempt hands back the body text read from the original.", () => {
  test("the body text survives", async () => {
    const outcome = await attemptAuthFailedRetry(argsFor(null))
    expect(outcome.kind).toBe("response")
    if (outcome.kind === "response") expect(await outcome.response.text()).toBe(BODY)
  })
})

describe("An ended attempt hands back the status text of the original.", () => {
  test("the status text survives", async () => {
    const outcome = await attemptAuthFailedRetry(
      argsFor(null, { res: unauthorized({ statusText: "Nope" }) })
    )
    expect(outcome.kind).toBe("response")
    if (outcome.kind === "response") expect(outcome.response.statusText).toBe("Nope")
  })
})

describe("An ended attempt hands back the headers of the original.", () => {
  test("a header survives", async () => {
    const outcome = await attemptAuthFailedRetry(
      argsFor(null, { res: unauthorized({ headers: { "x-request-id": "abc" } }) })
    )
    expect(outcome.kind).toBe("response")
    if (outcome.kind === "response") {
      expect(outcome.response.headers.get("x-request-id")).toBe("abc")
    }
  })
})

describe("An ended attempt hands back status 401.", () => {
  test("the status is 401", async () => {
    const outcome = await attemptAuthFailedRetry(argsFor(null))
    expect(outcome.kind).toBe("response")
    if (outcome.kind === "response") expect(outcome.response.status).toBe(401)
  })
})

describe("A caller cannot tell a missing credential from an unchanged token.", () => {
  test("both endings give the same status and body", async () => {
    const missing = await attemptAuthFailedRetry(argsFor(null))
    const unchanged = await attemptAuthFailedRetry(
      argsFor(credential({ accessToken: "token-old" }))
    )
    expect(missing.kind).toBe("response")
    expect(unchanged.kind).toBe("response")
    if (missing.kind === "response" && unchanged.kind === "response") {
      expect(missing.response.status).toBe(unchanged.response.status)
      expect(await missing.response.text()).toBe(await unchanged.response.text())
      expect(Object.keys(missing).sort()).toEqual(Object.keys(unchanged).sort())
    }
  })
})

describe("Why an attempt ended is written to the error log.", () => {
  test("a missing credential names no-fresh-token", async () => {
    await attemptAuthFailedRetry(argsFor(null))
    expect(LOGS.error).toHaveLength(1)
    expect(LOGS.error[0]).toContain("reread=no-fresh-token")
  })

  test("an unchanged token names same-token", async () => {
    await attemptAuthFailedRetry(argsFor(credential({ accessToken: "token-old" })))
    expect(LOGS.error).toHaveLength(1)
    expect(LOGS.error[0]).toContain("reread=same-token")
  })
})

describe("A retry is written to the output log.", () => {
  test("a retry writes to the output log and not the error log", async () => {
    await attemptAuthFailedRetry(argsFor(credential({ accessToken: "token-new" })))
    expect(LOGS.error).toHaveLength(0)
    expect(LOGS.output).toHaveLength(1)
    expect(LOGS.output[0]).toContain("401 observed account=alpha")
  })
})

describe("The error log names the whole trail of accounts rather than the current account.", () => {
  test("the trail is joined into the error line", async () => {
    await attemptAuthFailedRetry(
      argsFor(null, { currentAccount: "gamma", trail: ["alpha", "beta", "gamma"] })
    )
    expect(LOGS.error[0]).toContain("account=alpha→beta→gamma")
  })
})

describe("Nothing here reaches a network.", () => {
  test("fetch is never called", async () => {
    const fetchSpy = spyOn(globalThis, "fetch")
    await attemptAuthFailedRetry(argsFor(credential({ accessToken: "token-new" })))
    await attemptAuthFailedRetry(argsFor(null))
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })
})

describe("A caller replays each account at most once.", () => {
  test("nothing here stops a second attempt on the same account", async () => {
    const first = await attemptAuthFailedRetry(argsFor(credential({ accessToken: "token-new" })))
    const second = await attemptAuthFailedRetry(argsFor(credential({ accessToken: "token-new" })))
    expect(first.kind).toBe("retry")
    expect(second.kind).toBe("retry")
  })
})

describe("The status handed back is 401 even where the original carries another status.", () => {
  test("a 503 comes back as a 401", async () => {
    const outcome = await attemptAuthFailedRetry(
      argsFor(null, { res: new Response(BODY, { status: 503, statusText: "Unavailable" }) })
    )
    expect(outcome.kind).toBe("response")
    if (outcome.kind === "response") expect(outcome.response.status).toBe(401)
  })
})

describe("A body that cannot be read throws out of the attempt.", () => {
  test("an errored stream rejects", async () => {
    const res = new Response(
      new ReadableStream({
        start(controller) {
          controller.error(new Error("stream blew up"))
        },
      })
    )
    await expect(attemptAuthFailedRetry(argsFor(null, { res }))).rejects.toThrow("stream blew up")
  })
})

describe("The body is read even where the attempt ends in a retry.", () => {
  test("the original body is consumed on the retry path", async () => {
    const res = unauthorized()
    const outcome = await attemptAuthFailedRetry(
      argsFor(credential({ accessToken: "token-new" }), { res })
    )
    expect(outcome.kind).toBe("retry")
    expect(res.bodyUsed).toBe(true)
  })
})

describe("An ended attempt carries the content-encoding of a body already decoded.", () => {
  test("content-encoding survives a decoded body", async () => {
    const outcome = await attemptAuthFailedRetry(
      argsFor(null, { res: unauthorized({ headers: { "content-encoding": "gzip" } }) })
    )
    expect(outcome.kind).toBe("response")
    if (outcome.kind === "response") {
      expect(outcome.response.headers.get("content-encoding")).toBe("gzip")
      expect(await outcome.response.text()).toBe(BODY)
    }
  })
})

describe("An ended attempt carries the content-length of the compressed body.", () => {
  test("content-length survives even where the text is longer", async () => {
    const outcome = await attemptAuthFailedRetry(
      argsFor(null, { res: unauthorized({ headers: { "content-length": "57" } }) })
    )
    expect(outcome.kind).toBe("response")
    if (outcome.kind === "response") {
      expect(outcome.response.headers.get("content-length")).toBe("57")
      expect(BODY.length).toBe(41)
    }
  })
})
