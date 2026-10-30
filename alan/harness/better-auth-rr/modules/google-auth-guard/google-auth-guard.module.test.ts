import { expect, test } from "bun:test"
import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  ALAN,
  asked,
  cookieFor,
  JENNY,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.test-fixtures.ts"

test("a session traded for a code to look only is signed in", async () => {
  const cookie = await cookieFor(JENNY, true)
  expect((await signedInAs(asked("GET", cookie)))?.contributor).toBe(JENNY)
})

test("Alan's driven session is signed in as Alan", async () => {
  const cookie = await cookieFor(ALAN, false)
  expect((await signedInAs(asked("GET", cookie)))?.contributor).toBe(ALAN)
})

test("a request with no cookie is nobody", async () => {
  expect(await signedInAs(asked("GET", ""))).toBe(null)
})
