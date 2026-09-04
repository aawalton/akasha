import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { pageFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { shadowFor } from "@akasha/pages-system/shadow"
import {
  declaring,
  edging,
  founded,
  landing,
  pathFor,
  typed,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  ONE,
  PAGE_TYPE,
  propertied,
  RECORD,
  recording,
  restating,
  TEXT,
  THREE,
  TWO,
  typing,
} from "../key-names-one-property/key-names-one-property.code-check.test-fixtures.ts"
import { restatementNarrowsSomething } from "./restatement-narrows-something.code-check.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-restated-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, TEXT, "page-property")
  typed(root, RECORD, "page-property")
  typed(root, PAGE_TYPE, "domain")
  declaring(root, "properties", { pageTypeSlug: RECORD })
  declaring(root, "held", { pageTypeSlug: TEXT })
  return root
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return restatementNarrowsSomething(change, cast.shadow)
}

test("a restatement saying again what the type above it says is refused", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: false },
    { required: true, many: false }
  )

  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor(PAGE_TYPE, "under"))
  expect(said[0]?.reason).toContain("narrows nothing")
  expect(said[0]?.reason).toContain("`text-property/held`")
  expect(said[0]?.reason).toContain("`under`")
  expect(said[0]?.reason).toContain("`over`")
})

test("a restatement making an optional property required is let through", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: false, many: false },
    { required: true, many: false }
  )

  expect(said).toEqual([])
})

test("a restatement lowering a max is let through", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: true, max: 20 },
    { required: true, many: true, max: 5 }
  )

  expect(said).toEqual([])
})

test("a restatement binding a max that stood unbounded is let through", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: true, max: null },
    { required: true, many: true, max: 5 }
  )

  expect(said).toEqual([])
})

test("a restatement lowering a total is let through", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: true, max: null, total: 100 },
    { required: true, many: true, max: null, total: 50 }
  )

  expect(said).toEqual([])
})

test("a restatement taking a value out of the commit is let through", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: false },
    { required: true, many: false, uncommitted: true }
  )

  expect(said).toEqual([])
})

test("a restatement taking a value out of the open is let through", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: false },
    { required: true, many: false, secret: true }
  )

  expect(said).toEqual([])
})

test("a restatement loosening what is required is left to the check refusing that", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: false },
    { required: false, many: false }
  )

  expect(said).toEqual([])
})

test("a restatement raising a max is left to the check refusing that", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: true, max: 5 },
    { required: true, many: true, max: 20 }
  )

  expect(said).toEqual([])
})

test("a restatement turning a property from one to many is left to the check refusing that", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: false },
    { required: true, many: true }
  )

  expect(said).toEqual([])
})

test("a restatement raising a total alone is refused for narrowing nothing", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: true, max: null, total: 50 },
    { required: true, many: true, max: null, total: 100 }
  )

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("narrows nothing")
})

test("a property no type above declares is let through", () => {
  const root = rooted()
  typing(root, "over", TWO, null, [])
  const said = judged(
    landing(root, {
      [pathFor(PAGE_TYPE, "under")]: typing(root, "under", ONE, "over", [
        { pagePropertySlug: "held", required: true, many: false },
      ]),
    })
  )

  expect(said).toEqual([])
})

test("a page type saying one property twice over is let through", () => {
  const root = rooted()
  const said = judged(
    landing(root, {
      [pathFor(PAGE_TYPE, "one")]: typing(root, "one", ONE, null, [
        { pagePropertySlug: "held", required: true, many: false },
        { pagePropertySlug: "held", required: true, many: false },
      ]),
    })
  )

  expect(said).toEqual([])
})

test("a record property saying one field twice over is let through", () => {
  const root = rooted()
  const said = judged(
    landing(root, {
      [pathFor(RECORD, "taking")]: recording(root, "taking", ONE, [
        { pagePropertySlug: "held", required: true, many: false },
        { pagePropertySlug: "held", required: true, many: false },
      ]),
    })
  )

  expect(said).toEqual([])
})

test("a page type is judged when the change carries a property it declares", () => {
  const root = rooted()
  const at = pathFor(PAGE_TYPE, "under")
  typing(root, "over", TWO, null, [{ pagePropertySlug: "held", required: true, many: false }])
  typing(root, "under", ONE, "over", [{ pagePropertySlug: "held", required: true, many: false }])
  pageFiled(root, ONE, at)
  edging(root, THREE, "page-property-slug", ONE, at)
  const said = judged(
    landing(root, { [pathFor(TEXT, "held")]: propertied(root, TEXT, "held", THREE) })
  )

  expect(said.map((one) => one.path)).toEqual([at])
})

test("a declaration reaching no page property is passed over rather than judged", () => {
  const root = rooted()
  typing(root, "over", TWO, null, [{ pagePropertySlug: "nowhere", required: true, many: false }])
  const said = judged(
    landing(root, {
      [pathFor(PAGE_TYPE, "under")]: typing(root, "under", ONE, "over", [
        { pagePropertySlug: "nowhere", required: true, many: false },
      ]),
    })
  )

  expect(said).toEqual([])
})
