import { expect, test } from "bun:test"
import {
  LOOKING_ONLY,
  lookingRefused,
  looksOnly,
  signedInAs,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { authServer } from "akasha/alan/harness/better-auth-rr/modules/google-auth-server/google-auth-server.module.code.ts"
import { APP_AUDIENCE } from "akasha/alan/harness/handover-rr/modules/handover-app/handover-app.module.code.ts"
import {
  challengeFor,
  handoverCodeFor,
} from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import { exportPKCS8, exportSPKI, generateKeyPair } from "jose"

const ALAN = "contributor-alan"

const JENNY = "contributor-jenny"

const VERIFIER = "a-secret-the-driver-keeps-and-never-sends"

const SEND_AT = "https://alanwalton.com/api/seat/message"

const pair = await generateKeyPair("EdDSA", { crv: "Ed25519", extractable: true })

process.env.HANDOVER_SIGNING_KEY = await exportPKCS8(pair.privateKey)

process.env.HANDOVER_PUBLIC_KEY = await exportSPKI(pair.publicKey)

process.env.ALANWALTON_SESSION_KEY = "a-session-key-for-this-test-alone-and-long-enough"

process.env.GOOGLE_OAUTH_CLIENT_ID = "a-client-id"

process.env.GOOGLE_OAUTH_CLIENT_SECRET = "a-client-secret"

const opened = await authServer().$context

for (const contributor of [ALAN, JENNY]) {
  await opened.internalAdapter.createUser(
    {
      name: contributor,
      email: `${contributor}@handover.invalid`,
      emailVerified: true,
      contributor,
    },
    { method: "app-handover" }
  )
}

async function cookieFor(contributor: string, look: boolean): Promise<string> {
  const challenge = await challengeFor(VERIFIER)
  const code = await handoverCodeFor({ audience: APP_AUDIENCE, contributor, challenge, look })
  const traded = await authServer().api.appHandoverExchange({
    body: { code, verifier: VERIFIER },
    headers: new Headers(),
    returnHeaders: true,
  })
  return traded.headers
    .getSetCookie()
    .map((one) => one.split(";")[0] ?? "")
    .join("; ")
}

const READ_AT = "https://alanwalton.com/api/ask"

const READ_BY_POST: ReadonlySet<string> = new Set([new URL(READ_AT).pathname])

function asked(method: string, cookie: string, at: string = SEND_AT): Request {
  return new Request(at, { method, headers: { cookie } })
}

function refusedOf(request: Request): Promise<Response | null> {
  return lookingRefused(request, READ_BY_POST)
}

test("a session to look only posts to a path read by post", async () => {
  const cookie = await cookieFor(JENNY, true)
  expect(await refusedOf(asked("POST", cookie, READ_AT))).toBe(null)
})

test("a session traded for a code to look only is signed in and looks only", async () => {
  const cookie = await cookieFor(JENNY, true)
  expect((await signedInAs(asked("GET", cookie)))?.contributor).toBe(JENNY)
  expect(await looksOnly(asked("GET", cookie))).toBe(true)
})

test("a session to look only is refused a send", async () => {
  const cookie = await cookieFor(JENNY, true)
  const refused = await refusedOf(asked("POST", cookie))
  expect(refused?.status).toBe(403)
  expect(await refused?.json()).toEqual({ ok: false, error: LOOKING_ONLY })
})

test("a session to look only is refused a put and a delete", async () => {
  const cookie = await cookieFor(JENNY, true)
  expect((await refusedOf(asked("PUT", cookie)))?.status).toBe(403)
  expect((await refusedOf(asked("DELETE", cookie)))?.status).toBe(403)
})

test("a session to look only still looks", async () => {
  const cookie = await cookieFor(JENNY, true)
  expect(await refusedOf(asked("GET", cookie))).toBe(null)
})

test("Alan's driven session sends as before", async () => {
  const cookie = await cookieFor(ALAN, false)
  expect((await signedInAs(asked("GET", cookie)))?.contributor).toBe(ALAN)
  expect(await looksOnly(asked("GET", cookie))).toBe(false)
  expect(await refusedOf(asked("POST", cookie))).toBe(null)
})

test("nobody is left to the route to refuse", async () => {
  expect(await refusedOf(asked("POST", ""))).toBe(null)
})
