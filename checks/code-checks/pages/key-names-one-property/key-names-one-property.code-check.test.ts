import { afterAll, expect, test } from "bun:test"
import type { Change } from "@akasha/pages/change"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { declaring, landing, pathFor } from "../../../modules/scratch/check-scratch.module.code.ts"
import { keyNamesOneProperty } from "./key-names-one-property.code-check.code.ts"
import {
  NUMBER,
  ONE,
  PAGE_TYPE,
  rooted,
  scratch,
  TEXT,
  TWO,
  typing,
} from "./key-names-one-property.code-check.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return keyNamesOneProperty(change, cast.shadow)
}

test("a page type keying each of the properties it carries once is let through", () => {
  const root = rooted()
  declaring(root, "over", { pageTypeSlug: TEXT })
  const said = judged(
    landing(root, {
      [pathFor(PAGE_TYPE, "one")]: typing(root, "one", ONE, null, [
        { pagePropertySlug: "held", required: true, many: false },
        { pagePropertySlug: "over", required: false, many: false },
      ]),
    })
  )

  expect(said).toEqual([])
})

test("two declarations at one key naming different properties are refused", () => {
  const root = rooted()
  declaring(root, "held", { pageTypeSlug: NUMBER })
  typing(root, "over", TWO, null, [
    { pagePropertySlug: "number-property/held", required: false, many: false },
  ])
  const at = pathFor(PAGE_TYPE, "under")
  const said = judged(
    landing(root, {
      [at]: typing(root, "under", ONE, "over", [
        { pagePropertySlug: "text-property/held", required: true, many: false },
      ]),
    })
  )

  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(at)
  expect(said[0]?.reason).toContain("`text-property/held`")
  expect(said[0]?.reason).toContain("`number-property/held`")
  expect(said[0]?.reason).toContain("`over`")
})
