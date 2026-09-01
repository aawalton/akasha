import { expect, test } from "bun:test"
import type { Fetcher } from "@akasha/pages-system-service/calling"
import { personSlugForAccount } from "./person-enrolment.module.code.ts"
import {
  accountStatedBy,
  noNap,
  overTheLiveStore,
  recordingFetcher,
} from "./person-enrolment.module.test-fixtures.ts"

const ACCOUNT_NOBODY_STATES = "00000000-0000-7000-8000-000000000000"

function answering(rows: readonly Record<string, unknown>[]): Fetcher {
  return async () =>
    new Response(JSON.stringify({ rows }), { headers: { "content-type": "application/json" } })
}

function refusing(status: number): Fetcher {
  return async () =>
    new Response(JSON.stringify({ refused: "no" }), {
      status,
      headers: { "content-type": "application/json" },
    })
}

test("the account a person states is read back to that person", async () => {
  const read = await overTheLiveStore(async () =>
    personSlugForAccount(await accountStatedBy("alan"))
  )
  expect(read).toEqual({ ok: true, personSlug: "alan" })
})

test("an account no person states is nobody", async () => {
  const read = await overTheLiveStore(async () => personSlugForAccount(ACCOUNT_NOBODY_STATES))
  expect(read.ok).toBe(false)
  if (read.ok) return
  expect(read.unread).toBe(false)
  expect(read.why).toContain("no person states the account")
})

test("the account is asked for under the key a person carries it by", async () => {
  const recording = recordingFetcher()
  await personSlugForAccount("9ba554f7", recording.fetcher, noNap)
  expect(recording.sent().pageTypeSlug).toBe("person")
  expect(recording.sent().where).toEqual({ supabaseAuthUserId: { is: "9ba554f7" } })
})

test("an account stating nothing is nobody and costs no question", async () => {
  let asked = false
  const fetcher: Fetcher = async () => {
    asked = true
    return new Response("{}", { headers: { "content-type": "application/json" } })
  }
  const read = await personSlugForAccount("   ", fetcher, noNap)
  expect(asked).toBe(false)
  expect(read.ok).toBe(false)
  if (read.ok) return
  expect(read.unread).toBe(false)
})

test("an account two people state is read to neither", async () => {
  const read = await personSlugForAccount(
    "one-account",
    answering([{ slug: "alan" }, { slug: "jenny" }]),
    noNap
  )
  expect(read.ok).toBe(false)
  if (read.ok) return
  expect(read.unread).toBe(true)
  expect(read.why).toContain("alan and jenny")
})

test("pages that went unread are told apart from pages naming nobody", async () => {
  const read = await personSlugForAccount("one-account", refusing(500), noNap)
  expect(read.ok).toBe(false)
  if (read.ok) return
  expect(read.unread).toBe(true)
  expect(read.why).toContain("went unread")
})
