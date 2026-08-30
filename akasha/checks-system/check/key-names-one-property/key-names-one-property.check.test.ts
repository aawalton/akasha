import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { shadowFor } from "../../../pages-system/shadow/shadow.module.code.ts"
import { bytesOf } from "../../../testing-system/bodying/bodying.module.code.ts"
import {
  declaring,
  edging,
  identified,
  identifying,
  landing,
  pathFor,
  put,
  stands,
  typed,
} from "../../check-scratch/check-scratch.module.code.ts"
import type { Change, Judged } from "../../judging/judging.module.code.ts"
import { keyNamesOneProperty } from "./key-names-one-property.check.code.ts"

const PAGE_TYPE = "page-type"

const TEXT = "text-property"

const NUMBER = "number-property"

const ONE = "01a054d3-0000-7001-8000-000000000001"

const TWO = "01a054d3-0000-7002-8000-000000000002"

const THREE = "01a054d3-0000-7003-8000-000000000003"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-keyed-")
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, TEXT, "page-property")
  typed(root, NUMBER, "page-property")
  typed(root, PAGE_TYPE, "domain")
  identifying(root)
  declaring(root, "properties", { pageTypeSlug: "record-property" })
  declaring(root, "held", { pageTypeSlug: TEXT })
  return root
}

function typing(
  root: string,
  slug: string,
  id: string,
  above: string | null,
  declared: readonly Record<string, unknown>[]
): Uint8Array {
  const said = above === null ? "null" : JSON.stringify(`${PAGE_TYPE}/${above}`)
  stands(root, PAGE_TYPE, slug, id)
  return put(
    root,
    pathFor(PAGE_TYPE, slug),
    bytesOf(
      `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: "page-type", ` +
        `slug: ${JSON.stringify(slug)}, extendsSlug: ${said}, ` +
        `properties: ${JSON.stringify(declared)} }\n`
    )
  )
}

function propertied(root: string, kind: string, slug: string, id: string): Uint8Array {
  stands(root, kind, slug, id)
  return put(
    root,
    pathFor(kind, slug),
    bytesOf(
      `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(kind)}, ` +
        `slug: ${JSON.stringify(slug)}, propertySlug: ${JSON.stringify(slug)} }\n`
    )
  )
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return keyNamesOneProperty(change, cast.shadow)
}

function restating(
  root: string,
  above: Record<string, unknown>,
  below: Record<string, unknown>
): readonly Judged[] {
  typing(root, "over", TWO, null, [{ pagePropertySlug: "held", ...above }])
  return judged(
    landing(root, {
      [pathFor(PAGE_TYPE, "under")]: typing(root, "under", ONE, "over", [
        { pagePropertySlug: "held", ...below },
      ]),
    })
  )
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
  const said = restating(root, { required: false, many: false }, { required: true, many: false })

  expect(said).toEqual([])
})

test("a restatement loosening a required property is refused", () => {
  const root = rooted()
  const said = restating(root, { required: true, many: false }, { required: false, many: false })

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`required` falls")
  expect(said[0]?.reason).toContain("`under`")
  expect(said[0]?.reason).toContain("`over`")
})

test("a restatement turning a property from one to many is refused", () => {
  const root = rooted()
  const said = restating(root, { required: true, many: false }, { required: true, many: true })

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`many` turns from `false` to `true`")
})

test("a restatement raising a max is refused", () => {
  const root = rooted()
  const said = restating(
    root,
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
  identified(root, TWO, at)
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
