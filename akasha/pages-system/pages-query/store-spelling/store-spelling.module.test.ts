import { expect, test } from "bun:test"
import type { Asked, ComposedQuery } from "../store-page-asking/store-page-asking.module.code.ts"
import {
  askedAsSpelled,
  bothSpellings,
  storeSpelled,
  unfoundIn,
} from "./store-spelling.module.code.ts"

function answering(rows: readonly Record<string, unknown>[]): {
  ask: (asked: ComposedQuery) => Promise<Asked>
  asked: () => ComposedQuery
} {
  let held: ComposedQuery | null = null
  return {
    ask: async (one) => {
      held = one
      return {
        ok: true,
        answer: {
          n: rows.length,
          value: null,
          over: null,
          rows: rows.map((values) => ({ values: { ...values } })),
          faults: [],
          omitted: [],
          unfound: [],
        },
      }
    },
    asked: () => {
      if (held === null) throw new Error("nothing was asked")
      return held
    },
  }
}

test("a declared key goes to the store camelized", () => {
  const spelled = storeSpelled({
    "page-type": "temper-skill",
    keys: ["value-slug", "id"],
    "count-by": ["skill-line-id"],
    "sort-by": "ability-id",
    target: "effect-value",
    where: { "skill-type": "active" },
  })
  expect(spelled.keys).toEqual(["valueSlug", "id"])
  expect(spelled["count-by"]).toEqual(["skillLineId"])
  expect(spelled["sort-by"]).toBe("abilityId")
  expect(spelled.target).toBe("effectValue")
  expect(spelled.where).toEqual({ skillType: "active" })
})

test("a key already spelt the store's way is left as it is", () => {
  expect(storeSpelled({ "page-type": "t", keys: ["valueSlug"] }).keys).toEqual(["valueSlug"])
})

test("a row answers under both spellings and neither overwrites the other", () => {
  const both = bothSpellings({ valueSlug: "a", id: "b" })
  expect(both).toEqual({ valueSlug: "a", "value-slug": "a", id: "b" })
  expect(bothSpellings({ valueSlug: "a", "value-slug": "z" })["value-slug"]).toBe("z")
})

test("a key no row carries is unfound, and an empty answer names none", () => {
  const rows = [{ values: { valueSlug: "a" } }]
  expect(unfoundIn({ "page-type": "t", keys: ["value-slug", "missing-one"] }, rows)).toEqual([
    "missing-one",
  ])
  expect(unfoundIn({ "page-type": "t", keys: ["missing-one"] }, [])).toEqual([])
})

test("asking spells the question and answers both spellings", async () => {
  const store = answering([{ valueSlug: "a" }])
  const asked = await askedAsSpelled({ "page-type": "t", keys: ["value-slug", "gone"] }, store.ask)
  expect(store.asked().keys).toEqual(["valueSlug", "gone"])
  if (!asked.ok) throw new Error(asked.why)
  expect(asked.answer.rows[0]?.values).toEqual({ valueSlug: "a", "value-slug": "a" })
  expect(asked.answer.unfound).toEqual(["gone"])
})

test("a refusal comes back as it stood", async () => {
  const asked = await askedAsSpelled({ "page-type": "t" }, async () => ({
    ok: false,
    why: "no",
    status: 400,
  }))
  expect(asked).toEqual({ ok: false, why: "no", status: 400 })
})
