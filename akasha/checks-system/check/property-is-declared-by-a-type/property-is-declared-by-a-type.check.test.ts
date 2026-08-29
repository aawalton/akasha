import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  declaring,
  edging,
  identified,
  identifying,
  landing,
  NO_BYTES,
  pathFor,
  stands,
  typed,
} from "../../check-scratch/check-scratch.module.code.ts"
import {
  propertyIsDeclaredByAType,
  propertyNamedIn,
} from "./property-is-declared-by-a-type.check.code.ts"

const SCRATCH_AT = "/var/tmp"

const ONE = "01a04ef8-1a07-7001-8000-000000000001"

const TWO = "01a04ef8-1a07-7002-8000-000000000002"

const RECORD = "01a04ef8-1a07-7003-8000-000000000003"

const NEW = "01a04ef8-1a07-7004-8000-000000000004"

const UP_AT = "akasha/up.page-type.ts"

const held: string[] = []

afterAll(() => {
  for (const one of held) rmSync(one, { recursive: true, force: true })
})

function body(kind: string, slug: string, id: string, declares?: readonly string[]): Uint8Array {
  const said =
    declares === undefined
      ? ""
      : `, properties: ${JSON.stringify(declares.map((one) => ({ pagePropertySlug: one })))}`
  return new TextEncoder().encode(
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(kind)}, ` +
      `slug: ${JSON.stringify(slug)}${said} }\n`
  )
}

function put(root: string, path: string, bytes: Uint8Array): Uint8Array {
  writeFileSync(join(root, path), bytes)
  return bytes
}

function rooted(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-declared-"))
  held.push(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, "relation-property", "page-property")
  typed(root, "record-property", "page-property")
  typed(root, "page-type", "domain")
  identifying(root)
  declaring(root, "properties", { pageTypeSlug: "record-property" })
  declaring(root, "page-property-slug", {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "page-property",
  })
  stands(root, "record-property", "properties", RECORD)
  put(
    root,
    pathFor("record-property", "properties"),
    body("record-property", "properties", RECORD, ["page-property-slug"])
  )
  return root
}

test("a property the index says some page type declares is let through", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  edging(root, ONE, "page-property-slug", TWO, UP_AT)
  identified(root, TWO, UP_AT)
  const said = propertyIsDeclaredByAType(
    landing(root, {
      [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
    })
  )
  expect(said).toEqual([])
})

test("a property no page type declares is refused, and the refusal names the address", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  const said = propertyIsDeclaredByAType(
    landing(root, {
      [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`relation-property/held`")
})

test("a property and the page type declaring it landing together is let through", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  stands(root, "page-type", "over", TWO)
  const said = propertyIsDeclaredByAType(
    landing(root, {
      [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
      [pathFor("page-type", "over")]: body("page-type", "over", TWO, ["held"]),
    })
  )
  expect(said).toEqual([])
})

test("a page type that stops declaring a property leaves that property refused", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  stands(root, "page-type", "over", TWO)
  edging(root, ONE, "page-property-slug", TWO, pathFor("page-type", "over"))
  const at = pathFor("page-type", "over")
  const said = propertyIsDeclaredByAType(
    landing(
      root,
      {
        [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
        [at]: body("page-type", "over", TWO),
      },
      { [at]: put(root, at, body("page-type", "over", TWO, ["held"])) }
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("relation-property", "held"))
})

test("a page type dropping a property leaves it refused, though the property did not change", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  stands(root, "page-type", "over", TWO)
  identified(root, ONE, pathFor("relation-property", "held"))
  edging(root, ONE, "page-property-slug", TWO, pathFor("page-type", "over"))
  const at = pathFor("page-type", "over")
  const said = propertyIsDeclaredByAType(
    landing(
      root,
      { [at]: body("page-type", "over", TWO) },
      { [at]: put(root, at, body("page-type", "over", TWO, ["held"])) }
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("relation-property", "held"))
})

test("a page type the change takes away leaves the property it declared refused", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  identified(root, ONE, pathFor("relation-property", "held"))
  stands(root, "page-type", "over", TWO)
  identified(root, TWO, pathFor("page-type", "over"))
  edging(root, ONE, "page-property-slug", TWO, pathFor("page-type", "over"))
  const at = pathFor("page-type", "over")
  const said = propertyIsDeclaredByAType(
    landing(root, { [at]: null }, { [at]: put(root, at, body("page-type", "over", TWO, ["held"])) })
  )
  expect(said.map((one) => one.path)).toEqual([pathFor("relation-property", "held")])
})

test("a record property declaring a field declares it as a page type would", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  stands(root, "record-property", "over", TWO)
  const said = propertyIsDeclaredByAType(
    landing(root, {
      [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
      [pathFor("record-property", "over")]: body("record-property", "over", TWO, ["held"]),
    })
  )
  expect(said.map((one) => one.path)).not.toContain(pathFor("relation-property", "held"))
})

test("a property of a page type the change itself adds is judged too", () => {
  const root = rooted()
  const said = propertyIsDeclaredByAType(
    landing(root, {
      "akasha/measure-property.page-type.ts": new TextEncoder().encode(
        `export const held = { id: ${JSON.stringify(NEW)}, pageTypeSlug: "page-type", ` +
          `slug: "measure-property", extendsSlug: "page-type/page-property" }\n`
      ),
      [pathFor("measure-property", "held")]: body("measure-property", "held", ONE),
    })
  )
  expect(said.map((one) => one.path)).toEqual([pathFor("measure-property", "held")])
})

test("a property the change takes away is passed over", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  const at = pathFor("relation-property", "held")
  expect(propertyIsDeclaredByAType(landing(root, { [at]: null }))).toEqual([])
})

test("a page whose page type stands outside page-property is not judged", () => {
  const root = rooted()
  stands(root, "domain", "held", ONE)
  const said = propertyIsDeclaredByAType(
    landing(root, { [pathFor("domain", "held")]: body("domain", "held", ONE) })
  )
  expect(said).toEqual([])
})

test("a file outside the akasha folder is not this check's business", () => {
  const root = rooted()
  const said = propertyIsDeclaredByAType(
    landing(root, { "pages/property/held.relation-property.ts": NO_BYTES })
  )
  expect(said).toEqual([])
})

test("a property arriving with no identity is passed over rather than thrown on", () => {
  const root = rooted()
  const bare = new TextEncoder().encode('export const held = { slug: "held" }\n')
  expect(
    propertyIsDeclaredByAType(landing(root, { [pathFor("relation-property", "held")]: bare }))
  ).toEqual([])
})

test("a property giving up its identity is passed over rather than thrown on", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  identified(root, ONE, pathFor("relation-property", "held"))
  const at = pathFor("relation-property", "held")
  const bare = new TextEncoder().encode('export const held = { slug: "held" }\n')
  const said = propertyIsDeclaredByAType(
    landing(root, { [at]: bare }, { [at]: put(root, at, body("relation-property", "held", ONE)) })
  )
  expect(said).toEqual([])
})

test("a property whose body will not load is passed over rather than thrown on", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  identified(root, ONE, pathFor("relation-property", "held"))
  const at = pathFor("relation-property", "held")
  const broken = new TextEncoder().encode("export const held = { this is not a body\n")
  const said = propertyIsDeclaredByAType(
    landing(root, { [at]: broken }, { [at]: put(root, at, body("relation-property", "held", ONE)) })
  )
  expect(said).toEqual([])
})

test("the slug is the file's stem and the page type its suffix", () => {
  const root = rooted()
  expect(propertyNamedIn(root, "akasha/a/b/name-format-slug.relation-property.ts")).toEqual({
    pageTypeSlug: "relation-property",
    slug: "name-format-slug",
  })
  expect(propertyNamedIn(root, "akasha/held.module.code.ts")).toBeNull()
  expect(propertyNamedIn(root, "held.relation-property.ts")).toBeNull()
})
