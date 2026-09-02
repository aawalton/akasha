import { expect, test } from "bun:test"
import type { Fetcher } from "../store-reaching/store-reaching.module.code.ts"
import { noNap } from "../store-reaching/store-reaching.module.test-fixtures.ts"
import { askComposed } from "./store-spelled-asking.module.code.ts"

function answering(rows: readonly Record<string, unknown>[]): {
  fetcher: Fetcher
  sent: () => string
} {
  let held: string | null = null
  return {
    fetcher: async (_url, init) => {
      held = String(init.body)
      return new Response(JSON.stringify({ rows }), {
        headers: { "content-type": "application/json" },
      })
    },
    sent: () => {
      if (held === null) throw new Error("the store was not reached")
      return held
    },
  }
}

test("a declared multi-word key goes to the store camelized and answers as both", async () => {
  const store = answering([{ valueSlug: "a" }])
  const asked = await askComposed(
    { "page-type": "temper-skill", keys: ["value-slug"], where: { "value-slug": { is: "a" } } },
    store.fetcher,
    noNap
  )
  expect(store.sent()).toContain("valueSlug")
  expect(store.sent()).not.toContain("value-slug")
  if (!asked.ok) throw new Error(asked.why)
  expect(asked.answer.rows[0]?.values).toEqual({ valueSlug: "a", "value-slug": "a" })
})

test("a row narrowed here to a multi-word key keeps what the store answered", async () => {
  const store = answering([{ valueSlug: "a", name: "ab" }])
  const asked = await askComposed(
    { "page-type": "temper-skill", keys: ["value-slug"], where: { name: { contains: "a" } } },
    store.fetcher,
    noNap
  )
  if (!asked.ok) throw new Error(asked.why)
  expect(asked.answer.rows[0]?.values).toEqual({ valueSlug: "a", "value-slug": "a" })
})

test("a multi-word key no row carries is named unfound", async () => {
  const store = answering([{ valueSlug: "a" }])
  const asked = await askComposed(
    { "page-type": "temper-skill", keys: ["value-slug", "effect-value"] },
    store.fetcher,
    noNap
  )
  if (!asked.ok) throw new Error(asked.why)
  expect(asked.answer.unfound).toEqual(["effect-value"])
})

test("a refusal the store states comes back unchanged", async () => {
  const asked = await askComposed(
    { "page-type": "temper-skill" },
    async () => new Response(JSON.stringify({ refused: "no such page type" }), { status: 400 }),
    noNap
  )
  expect(asked.ok).toBe(false)
  if (asked.ok) return
  expect(asked.why).toContain("no such page type")
})
