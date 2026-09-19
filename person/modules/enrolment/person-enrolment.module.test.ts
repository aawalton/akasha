import { expect, test } from "bun:test"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  asAccount,
  asContributor,
  contributorNamed,
  personSlugFor,
  personSlugForAccount,
  personSlugForContributor,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import {
  noNap,
  recordingFetcher,
} from "akasha/person/modules/enrolment/person-enrolment.module.test-fixtures.ts"

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
  const read = await personSlugForAccount("an-account", answering([{ slug: "alan" }]), noNap)
  expect(read).toEqual({ ok: true, personSlug: "alan" })
})

test("an account no person states is nobody", async () => {
  const read = await personSlugForAccount(ACCOUNT_NOBODY_STATES, answering([]), noNap)
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

const A_CONTRIBUTOR = "contributor-9bc4d42501098ce9fad8a73ad03e2ef5d1e89b4a1fac8426b100f7c4d7e5e3d4"

const A_CONTRIBUTOR_AT = `contributor/${A_CONTRIBUTOR}`

test("a bare contributor slug and the qualified form name the same contributor", () => {
  expect(contributorNamed(A_CONTRIBUTOR)).toBe(A_CONTRIBUTOR_AT)
  expect(contributorNamed(A_CONTRIBUTOR_AT)).toBe(A_CONTRIBUTOR_AT)
})

test("a contributor named under another page type is nobody", () => {
  expect(contributorNamed(`person/${A_CONTRIBUTOR}`)).toBeNull()
  expect(contributorNamed("   ")).toBeNull()
})

test("the contributor a person names is read back to that person", async () => {
  const read = await personSlugForContributor(A_CONTRIBUTOR, answering([{ slug: "alan" }]), noNap)
  expect(read).toEqual({ ok: true, personSlug: "alan" })
})

test("the contributor is asked for as the person page holds it", async () => {
  const recording = recordingFetcher()
  await personSlugForContributor(A_CONTRIBUTOR, recording.fetcher, noNap)
  expect(recording.sent().pageTypeSlug).toBe("person")
  expect(recording.sent().where).toEqual({ contributor: { is: A_CONTRIBUTOR_AT } })
})

test("a contributor no person names is nobody", async () => {
  const read = await personSlugForContributor(A_CONTRIBUTOR, answering([]), noNap)
  expect(read.ok).toBe(false)
  if (read.ok) return
  expect(read.unread).toBe(false)
  expect(read.why).toContain("no person states the contributor")
})

test("a session naming no contributor is nobody and costs no question", async () => {
  let asked = false
  const fetcher: Fetcher = async () => {
    asked = true
    return new Response("{}", { headers: { "content-type": "application/json" } })
  }
  const read = await personSlugForContributor("   ", fetcher, noNap)
  expect(asked).toBe(false)
  expect(read.ok).toBe(false)
  if (read.ok) return
  expect(read.unread).toBe(false)
})

test("a contributor two people name is read to neither", async () => {
  const read = await personSlugForContributor(
    A_CONTRIBUTOR,
    answering([{ slug: "alan" }, { slug: "jenny" }]),
    noNap
  )
  expect(read.ok).toBe(false)
  if (read.ok) return
  expect(read.unread).toBe(true)
  expect(read.why).toContain("alan and jenny")
})

test("person pages that went unread leave a contributor reading to nobody", async () => {
  const read = await personSlugForContributor(A_CONTRIBUTOR, refusing(500), noNap)
  expect(read.ok).toBe(false)
  if (read.ok) return
  expect(read.unread).toBe(true)
  expect(read.why).toContain("went unread")
})

test("whoever a caller is decides which key the person pages are asked under", async () => {
  const byContributor = recordingFetcher()
  await personSlugFor(asContributor(A_CONTRIBUTOR), byContributor.fetcher, noNap)
  expect(byContributor.sent().where).toEqual({ contributor: { is: A_CONTRIBUTOR_AT } })
  const byAccount = recordingFetcher()
  await personSlugFor(asAccount("9ba554f7"), byAccount.fetcher, noNap)
  expect(byAccount.sent().where).toEqual({ supabaseAuthUserId: { is: "9ba554f7" } })
})
