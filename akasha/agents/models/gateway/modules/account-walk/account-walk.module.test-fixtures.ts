import type { Forward } from "../forward/forward.module.code.ts"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import type { ObserverSlot } from "../observer-slot/observer-slot.module.code.ts"
import type { AccountWalkArgs, AccountWalkSeams } from "./account-walk.module.code.ts"

export type Said = {
  readonly output: string[]
  readonly error: string[]
  readonly warn: string[]
}

export type Acts = {
  readonly atLimit: string[]
  readonly disabled: Array<readonly [string, string]>
  readonly cleared: string[]
  readonly repolled: string[]
}

export type Sent = {
  readonly account: string | null
  readonly token: string | null
  readonly beta: string | null
  readonly body: string | null
}

export function credentialFor(account: string): OAuthCredential {
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

export function bodyOf(value: unknown): ArrayBuffer {
  const bytes = new TextEncoder().encode(JSON.stringify(value))
  const out = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(out).set(bytes)
  return out
}

export function overloaded(status: number): Response {
  return new Response(
    JSON.stringify({ type: "error", error: { type: "overloaded_error", message: "busy" } }),
    { status }
  )
}

export function capacityLimited(): Response {
  return new Response(
    JSON.stringify({ type: "error", error: { type: "rate_limit_error", message: "at the limit" } }),
    { status: 429 }
  )
}

export function permissionDenied(): Response {
  return new Response(
    JSON.stringify({ type: "error", error: { type: "permission_error", message: "no reach" } }),
    { status: 403, statusText: "Forbidden" }
  )
}

export function modelMissing(): Response {
  return new Response(
    JSON.stringify({ type: "error", error: { type: "not_found_error", message: "no model" } }),
    { status: 404, statusText: "Not Found" }
  )
}

export function forcedToolChoiceRefused(): Response {
  return new Response(
    JSON.stringify({
      type: "error",
      error: {
        type: "invalid_request_error",
        message: "tool_choice forces tool use is not compatible with thinking",
      },
    }),
    { status: 400, statusText: "Bad Request" }
  )
}

export function unauthorized(): Response {
  return new Response(JSON.stringify({ type: "error", error: { type: "authentication_error" } }), {
    status: 401,
    statusText: "Unauthorized",
  })
}

export type WalkHarness = {
  readonly said: Said
  readonly acts: Acts
  readonly sent: Sent[]
  readonly seams: AccountWalkSeams
  readonly argsWith: (overrides?: Partial<AccountWalkArgs>) => AccountWalkArgs
}

export type HarnessOptions = {
  readonly answers: readonly (() => Response)[]
  readonly accounts?: readonly string[]
  readonly freshTokens?: (account: string) => Promise<OAuthCredential | null>
  readonly originalBody?: ArrayBuffer | null
  readonly seams?: Partial<AccountWalkSeams>
}

export function buildHarness(options: HarnessOptions): WalkHarness {
  const said: Said = { output: [], error: [], warn: [] }
  const acts: Acts = { atLimit: [], disabled: [], cleared: [], repolled: [] }
  const sent: Sent[] = []
  const accounts = [...(options.accounts ?? ["alpha", "beta"])]
  let answered = 0

  const forward: Forward = async (incoming, accessToken, bodyBuffer, account) => {
    sent.push({
      account,
      token: accessToken,
      beta: incoming.headers.get("anthropic-beta"),
      body: bodyBuffer === null ? null : new TextDecoder().decode(bodyBuffer),
    })
    const answer = options.answers[Math.min(answered, options.answers.length - 1)]
    answered += 1
    if (answer === undefined) throw new Error("the forward was handed no answer")
    return answer()
  }

  const seams: AccountWalkSeams = {
    logPrefix: "[gateway]",
    pickAccount: async (exclude) => {
      const kept =
        exclude === undefined
          ? accounts
          : accounts.filter((one) =>
              typeof exclude === "string" ? one !== exclude : !exclude.has(one)
            )
      const first = kept[0]
      return first === undefined ? null : { account: first }
    },
    getFreshToken: options.freshTokens ?? (async (account) => credentialFor(account)),
    forward,
    markAtLimit: async ({ account }): Promise<undefined> => {
      acts.atLimit.push(account)
    },
    markDisabled: async (account, reason): Promise<undefined> => {
      acts.disabled.push([account, reason])
    },
    clearDisabled: async (account): Promise<undefined> => {
      acts.cleared.push(account)
    },
    repollAfterLimit: async (account): Promise<undefined> => {
      acts.repolled.push(account)
    },
    ...options.seams,
  }

  const argsWith = (overrides: Partial<AccountWalkArgs> = {}): AccountWalkArgs => {
    const observerSlot: ObserverSlot = { current: null }
    return {
      req: new Request("http://localhost/v1/messages", { method: "POST" }),
      observerSlot,
      originalBody: options.originalBody ?? null,
      method: "POST",
      pathname: "/v1/messages",
      seams,
      ...overrides,
    }
  }

  return { said, acts, sent, seams, argsWith }
}
