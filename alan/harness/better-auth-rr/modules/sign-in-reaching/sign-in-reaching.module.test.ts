import { afterEach, expect, test } from "bun:test"
import { reachSignIn } from "akasha/alan/harness/better-auth-rr/modules/sign-in-reaching/sign-in-reaching.module.code.ts"
import { z } from "zod"

const SENT_BODY = z.record(z.string(), z.unknown())

const HELD_FETCH = globalThis.fetch

afterEach(() => {
  globalThis.fetch = HELD_FETCH
})

function answering(contributors: readonly unknown[]): Record<string, unknown>[] {
  const writes: Record<string, unknown>[] = []
  globalThis.fetch = ((url: string, init: RequestInit) => {
    const body = SENT_BODY.parse(JSON.parse(String(init.body)))
    if (String(url).endsWith("/write")) {
      writes.push(body)
      return Promise.resolve(Response.json({ commit: "a".repeat(40), wrote: [], took: [] }))
    }
    const rows = body.pageTypeSlug === "contributor" ? contributors : []
    return Promise.resolve(Response.json({ rows, n: rows.length, at: "commit-asked" }))
  }) as typeof fetch
  return writes
}

const SIGNING = { provider: "google", subject: "one", email: "a@b.c", emailVerified: true }

function freshIn(writes: readonly Record<string, unknown>[]): readonly unknown[] {
  return (writes[0]?.pages as Record<string, unknown>[]).map((one) => [one.fresh, one.merge])
}

test("a person reaching no contributor writes the contributor and the sign-in as new", async () => {
  const writes = answering([])
  const said = await reachSignIn(SIGNING)
  expect("opened" in said && said.opened).toBe(true)
  expect(freshIn(writes)).toEqual([
    [true, undefined],
    [true, undefined],
  ])
})

test("a sign-in reaching a contributor already there writes only the sign-in, as new", async () => {
  const writes = answering([{ slug: "held" }])
  const said = await reachSignIn(SIGNING)
  expect("opened" in said && said.opened).toBe(false)
  expect(freshIn(writes)).toEqual([[true, undefined]])
})
