import { expect, test } from "bun:test"
import {
  ALAN,
  asked,
  cookieFor,
  JENNY,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.test-fixtures.ts"
import {
  LOOKING_ONLY,
  lookingRefused,
  looksOnly,
} from "akasha/alan/harness/better-auth-rr/modules/looking-refusal/looking-refusal.module.code.ts"

const READ_AT = "https://alanwalton.com/api/ask"

const READ_BY_POST: ReadonlySet<string> = new Set([new URL(READ_AT).pathname])

function refusedOf(request: Request): Promise<Response | null> {
  return lookingRefused(request, READ_BY_POST)
}

test("a session to look only posts to a path read by post", async () => {
  const cookie = await cookieFor(JENNY, true)
  expect(await refusedOf(asked("POST", cookie, READ_AT))).toBe(null)
})

test("a session traded for a code to look only looks only", async () => {
  const cookie = await cookieFor(JENNY, true)
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
  expect(await looksOnly(asked("GET", cookie))).toBe(false)
  expect(await refusedOf(asked("POST", cookie))).toBe(null)
})

test("nobody is left to the route to refuse", async () => {
  expect(await refusedOf(asked("POST", ""))).toBe(null)
})
