import { expect, test } from "bun:test"
import { askComposed } from "akasha/page/query/modules/store-page-asking/store-page-asking.module.code.ts"
import type { Fetcher } from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"
import { noNap } from "akasha/page/query/modules/store-reaching/store-reaching.module.test-fixtures.ts"

function answering(each: readonly (readonly Record<string, unknown>[])[]): Fetcher {
  let round = 0
  return async () => {
    const rows = each[Math.min(round, each.length - 1)] ?? []
    round += 1
    return new Response(JSON.stringify({ rows }), {
      headers: { "content-type": "application/json" },
    })
  }
}

test("a composed query is put to the store and answered with its rows", async () => {
  const asked = await askComposed(
    { "page-type": "finding" },
    answering([[{ slug: "one", claim: "a claim" }]]),
    noNap
  )
  expect(asked.ok).toBe(true)
  if (!asked.ok) return
  expect(asked.answer.n).toBe(1)
  expect(asked.answer.rows).toEqual([{ values: { slug: "one", claim: "a claim" } }])
})
