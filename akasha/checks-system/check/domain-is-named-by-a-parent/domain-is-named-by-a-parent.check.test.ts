import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  edging,
  identified,
  landing,
  NO_BYTES,
  pathFor,
  stands,
  typed,
} from "../../check-scratch/check-scratch.module.code.ts"
import { domainIsNamedByAParent, domainNamedIn } from "./domain-is-named-by-a-parent.check.code.ts"

const SCRATCH_AT = "/var/tmp"

const ONE = "01a04d5f-c731-7001-8000-000000000001"

const TWO = "01a04d5f-c731-7002-8000-000000000002"

const UP = "01a04d5f-c731-7003-8000-000000000003"

const UP_AT = "akasha/up.domain.ts"

const held: string[] = []

afterAll(() => {
  for (const one of held) rmSync(one, { recursive: true, force: true })
})

function rooted(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-parented-"))
  held.push(root)
  typed(root, "domain", "page")
  return root
}

function body(kind: string, slug: string, id: string, parts?: readonly string[]): Uint8Array {
  const said = parts === undefined ? "" : `, partSlugs: ${JSON.stringify(parts)}`
  return new TextEncoder().encode(
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(kind)}, ` +
      `slug: ${JSON.stringify(slug)}${said} }\n`
  )
}

test("a page the index says some page names among its parts is let through", () => {
  const root = rooted()
  stands(root, "domain", "held", ONE)
  edging(root, ONE, "part-slugs", TWO, UP_AT)
  identified(root, TWO, "akasha/up.domain.ts")
  const said = domainIsNamedByAParent(
    landing(root, { [pathFor("domain", "held")]: body("domain", "held", ONE) })
  )
  expect(said).toEqual([])
})

test("a page no page names is refused, and the refusal names the address", () => {
  const root = rooted()
  stands(root, "domain", "held", ONE)
  const said = domainIsNamedByAParent(
    landing(root, { [pathFor("domain", "held")]: body("domain", "held", ONE) })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`domain/held`")
})

test("a page and the parent naming it landing together is let through", () => {
  const root = rooted()
  stands(root, "domain", "under", ONE)
  stands(root, "domain", "over", TWO)
  edging(root, TWO, "part-slugs", UP, UP_AT)
  identified(root, UP, "akasha/up.domain.ts")
  const said = domainIsNamedByAParent(
    landing(root, {
      [pathFor("domain", "under")]: body("domain", "under", ONE),
      [pathFor("domain", "over")]: body("domain", "over", TWO, ["domain/under"]),
    })
  )
  expect(said).toEqual([])
})

test("a parent that stops naming a part leaves that part refused", () => {
  const root = rooted()
  stands(root, "domain", "under", ONE)
  stands(root, "domain", "over", TWO)
  edging(root, ONE, "part-slugs", TWO, UP_AT)
  edging(root, TWO, "part-slugs", UP, UP_AT)
  identified(root, UP, "akasha/up.domain.ts")
  const said = domainIsNamedByAParent(
    landing(root, {
      [pathFor("domain", "under")]: body("domain", "under", ONE),
      [pathFor("domain", "over")]: body("domain", "over", TWO),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("domain", "under"))
})

test("a parent dropping a part leaves that part refused, though it did not change", () => {
  const root = rooted()
  stands(root, "domain", "under", ONE)
  stands(root, "domain", "over", TWO)
  identified(root, ONE, pathFor("domain", "under"))
  edging(root, ONE, "part-slugs", TWO, UP_AT)
  edging(root, TWO, "part-slugs", UP, UP_AT)
  identified(root, UP, "akasha/up.domain.ts")
  const at = pathFor("domain", "over")
  const said = domainIsNamedByAParent(
    landing(
      root,
      { [at]: body("domain", "over", TWO) },
      { [at]: body("domain", "over", TWO, ["domain/under"]) }
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("domain", "under"))
})

test("a page the change takes away is passed over", () => {
  const root = rooted()
  stands(root, "domain", "held", ONE)
  expect(domainIsNamedByAParent(landing(root, { [pathFor("domain", "held")]: null }))).toEqual([])
})

test("akasha-system stands under nothing, so it alone is passed over", () => {
  const root = rooted()
  stands(root, "domain", "akasha-system", ONE)
  const at = pathFor("domain", "akasha-system")
  expect(
    domainIsNamedByAParent(landing(root, { [at]: body("domain", "akasha-system", ONE) }))
  ).toEqual([])
})

test("a page whose page type stands under domain is judged too", () => {
  const root = rooted()
  typed(root, "module", "domain")
  stands(root, "module", "held", ONE)
  const said = domainIsNamedByAParent(
    landing(root, { [pathFor("module", "held")]: body("module", "held", ONE) })
  )
  expect(said).toHaveLength(1)
})

test("a page whose page type stands outside domain is not judged", () => {
  const root = rooted()
  typed(root, "finding", "page")
  stands(root, "finding", "held", ONE)
  const said = domainIsNamedByAParent(
    landing(root, { [pathFor("finding", "held")]: body("finding", "held", ONE) })
  )
  expect(said).toEqual([])
})

test("a file that is no page's shape is passed over", () => {
  const root = rooted()
  expect(domainIsNamedByAParent(landing(root, { "akasha/notes.txt": NO_BYTES }))).toEqual([])
})

test("a file outside the akasha folder is not this check's business", () => {
  const root = rooted()
  const said = domainIsNamedByAParent(landing(root, { "pages/domain/held.domain.ts": NO_BYTES }))
  expect(said).toEqual([])
})

test("a page whose body carries no identity is thrown on rather than passed", () => {
  const root = rooted()
  stands(root, "domain", "held", ONE)
  const bare = new TextEncoder().encode('export const held = { slug: "held" }\n')
  expect(() =>
    domainIsNamedByAParent(landing(root, { [pathFor("domain", "held")]: bare }))
  ).toThrow("answers 0 pages")
})

test("the slug is the file's stem and the page type its suffix", () => {
  const root = rooted()
  expect(domainNamedIn(root, "akasha/a/b/index-relation.domain.ts")).toEqual({
    pageTypeSlug: "domain",
    slug: "index-relation",
  })
  expect(domainNamedIn(root, "akasha/held.module.code.ts")).toBeNull()
  expect(domainNamedIn(root, "held.domain.ts")).toBeNull()
})

test("a stem carrying a dot is bound whole to the slug", () => {
  expect(domainNamedIn(rooted(), "akasha/a.b.domain.ts")?.slug).toBe("a.b")
})
