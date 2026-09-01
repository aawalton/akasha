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
import { keyNamesOneProperty } from "./key-names-one-property.code-check.code.ts"
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
} from "./key-names-one-property.code-check.test-fixtures.ts"

const NUMBER = "number-property"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-keyed-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, TEXT, "page-property")
  typed(root, NUMBER, "page-property")
  typed(root, RECORD, "page-property")
  typed(root, PAGE_TYPE, "domain")
  declaring(root, "properties", { pageTypeSlug: RECORD })
  declaring(root, "held", { pageTypeSlug: TEXT })
  return root
}

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

test("a restatement loosening a required property is refused", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: false },
    { required: false, many: false }
  )

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`required` falls")
  expect(said[0]?.reason).toContain("`under`")
  expect(said[0]?.reason).toContain("`over`")
})

test("a restatement turning a property from one to many is refused", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: false },
    { required: true, many: true }
  )

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`many` turns from `false` to `true`")
})

test("a restatement raising a max is refused", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: true, max: 5 },
    { required: true, many: true, max: 20 }
  )

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`max` rises from `5` to `20`")
})

test("a restatement letting a bounded property go unbounded is refused", () => {
  const root = rooted()
  const said = restating(
    root,
    judged,
    { required: true, many: true, max: 5 },
    { required: true, many: true, max: null }
  )

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`max` rises from `5` to `none`")
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

test("a declaration reaching no page property is passed over rather than judged", () => {
  const root = rooted()
  typing(root, "over", TWO, null, [{ pagePropertySlug: "nowhere", required: true, many: false }])
  const said = judged(
    landing(root, {
      [pathFor(PAGE_TYPE, "under")]: typing(root, "under", ONE, "over", [
        { pagePropertySlug: "nowhere", required: false, many: false },
        { pagePropertySlug: "held", required: true, many: false },
      ]),
    })
  )

  expect(said).toEqual([])
})

test("a page type is judged when the change carries a property it declares", () => {
  const root = rooted()
  declaring(root, "held", { pageTypeSlug: NUMBER })
  const at = pathFor(PAGE_TYPE, "over")
  typing(root, "over", TWO, null, [
    { pagePropertySlug: "text-property/held", required: true, many: false },
    { pagePropertySlug: "number-property/held", required: false, many: false },
  ])
  pageFiled(root, TWO, at)
  edging(root, THREE, "page-property-slug", TWO, at)
  const said = judged(
    landing(root, { [pathFor(TEXT, "held")]: propertied(root, TEXT, "held", THREE) })
  )

  expect(said.map((one) => one.path)).toEqual([at])
})

test("a page type the change neither carries nor is reached from is not judged", () => {
  const root = rooted()
  declaring(root, "held", { pageTypeSlug: NUMBER })
  typing(root, "over", TWO, null, [
    { pagePropertySlug: "text-property/held", required: true, many: false },
    { pagePropertySlug: "number-property/held", required: false, many: false },
  ])
  const said = judged(
    landing(root, {
      [pathFor(PAGE_TYPE, "one")]: typing(root, "one", ONE, null, [
        { pagePropertySlug: "text-property/held", required: true, many: false },
      ]),
    })
  )

  expect(said).toEqual([])
})

test("a record property keying each of its fields once is let through", () => {
  const root = rooted()
  declaring(root, "over", { pageTypeSlug: TEXT })
  const said = judged(
    landing(root, {
      [pathFor(RECORD, "taking")]: recording(root, "taking", ONE, [
        { pagePropertySlug: "held", required: true, many: false },
        { pagePropertySlug: "over", required: false, many: false },
      ]),
    })
  )

  expect(said).toEqual([])
})

test("two of a record property's fields at one key naming different properties are refused", () => {
  const root = rooted()
  declaring(root, "held", { pageTypeSlug: NUMBER })
  const at = pathFor(RECORD, "taking")
  const said = judged(
    landing(root, {
      [at]: recording(root, "taking", ONE, [
        { pagePropertySlug: "text-property/held", required: true, many: false },
        { pagePropertySlug: "number-property/held", required: false, many: false },
      ]),
    })
  )

  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(at)
  expect(said[0]?.reason).toContain("`text-property/held`")
  expect(said[0]?.reason).toContain("`number-property/held`")
  expect(said[0]?.reason).toContain("`taking`")
})

test("a record property is judged when the change carries a field it declares", () => {
  const root = rooted()
  declaring(root, "held", { pageTypeSlug: NUMBER })
  const at = pathFor(RECORD, "taking")
  recording(root, "taking", TWO, [
    { pagePropertySlug: "text-property/held", required: true, many: false },
    { pagePropertySlug: "number-property/held", required: false, many: false },
  ])
  pageFiled(root, TWO, at)
  edging(root, THREE, "page-property-slug", TWO, at)
  const said = judged(
    landing(root, { [pathFor(TEXT, "held")]: propertied(root, TEXT, "held", THREE) })
  )

  expect(said.map((one) => one.path)).toEqual([at])
})

test("a record property takes no declaration from the page type carrying it", () => {
  const root = rooted()
  declaring(root, "taking", { pageTypeSlug: RECORD })
  typing(root, "over", TWO, null, [
    { pagePropertySlug: "held", required: true, many: false },
    { pagePropertySlug: "taking", required: false, many: false },
  ])
  const said = judged(
    landing(root, {
      [pathFor(RECORD, "taking")]: recording(root, "taking", ONE, [
        { pagePropertySlug: "held", required: true, many: false },
      ]),
    })
  )

  expect(said).toEqual([])
})
