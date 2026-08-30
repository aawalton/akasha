import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import {
  declaring,
  edging,
  identified,
  identifying,
  landing,
  NO_BYTES,
  pathFor,
  put,
  stands,
  typed,
} from "../../check-scratch/check-scratch.module.code.ts"
import { domainIsNamedByAParent, domainNamedIn } from "./domain-is-named-by-a-parent.check.code.ts"

const ONE = "01a04d5f-c731-7001-8000-000000000001"

const TWO = "01a04d5f-c731-7002-8000-000000000002"

const UP = "01a04d5f-c731-7003-8000-000000000003"

const NEW = "01a04d5f-c731-7004-8000-000000000004"

const UP_AT = "akasha/up.domain.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-parented-")
  typed(root, "domain", "page")
  identifying(root)
  declaring(root, "part-slugs", { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" })
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
  edging(root, ONE, "part-slugs", TWO, pathFor("domain", "over"))
  edging(root, TWO, "part-slugs", UP, UP_AT)
  identified(root, UP, "akasha/up.domain.ts")
  const at = pathFor("domain", "over")
  const said = domainIsNamedByAParent(
    landing(
      root,
      {
        [pathFor("domain", "under")]: body("domain", "under", ONE),
        [at]: body("domain", "over", TWO),
      },
      { [at]: put(root, at, body("domain", "over", TWO, ["domain/under"])) }
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("domain", "under"))
})

test("a parent dropping a part leaves that part refused, though it did not change", () => {
  const root = rooted()
  stands(root, "domain", "under", ONE)
  stands(root, "domain", "over", TWO)
  identified(root, ONE, pathFor("domain", "under"))
  edging(root, ONE, "part-slugs", TWO, pathFor("domain", "over"))
  edging(root, TWO, "part-slugs", UP, UP_AT)
  identified(root, UP, "akasha/up.domain.ts")
  const at = pathFor("domain", "over")
  const said = domainIsNamedByAParent(
    landing(
      root,
      { [at]: body("domain", "over", TWO) },
      { [at]: put(root, at, body("domain", "over", TWO, ["domain/under"])) }
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("domain", "under"))
})

test("a parent the change takes away leaves the part it named refused", () => {
  const root = rooted()
  stands(root, "domain", "under", ONE)
  stands(root, "domain", "over", TWO)
  identified(root, ONE, pathFor("domain", "under"))
  identified(root, TWO, pathFor("domain", "over"))
  edging(root, ONE, "part-slugs", TWO, pathFor("domain", "over"))
  const at = pathFor("domain", "over")
  const said = domainIsNamedByAParent(
    landing(
      root,
      { [at]: null },
      { [at]: put(root, at, body("domain", "over", TWO, ["domain/under"])) }
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

test("a page of a page type the change itself adds is judged too", () => {
  const root = rooted()
  const said = domainIsNamedByAParent(
    landing(root, {
      "akasha/module.page-type.ts": new TextEncoder().encode(
        `export const held = { id: ${JSON.stringify(NEW)}, pageTypeSlug: "page-type", ` +
          `slug: "module", extendsSlug: "page-type/domain" }\n`
      ),
      [pathFor("module", "held")]: body("module", "held", ONE),
    })
  )
  expect(said.map((one) => one.path)).toEqual([pathFor("module", "held")])
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

test("a page arriving with no identity is passed over rather than thrown on", () => {
  const root = rooted()
  const bare = new TextEncoder().encode('export const held = { slug: "held" }\n')
  expect(domainIsNamedByAParent(landing(root, { [pathFor("domain", "held")]: bare }))).toEqual([])
})

test("a page giving up its identity is passed over rather than thrown on", () => {
  const root = rooted()
  stands(root, "domain", "held", ONE)
  identified(root, ONE, pathFor("domain", "held"))
  const at = pathFor("domain", "held")
  const bare = new TextEncoder().encode('export const held = { slug: "held" }\n')
  const said = domainIsNamedByAParent(
    landing(root, { [at]: bare }, { [at]: put(root, at, body("domain", "held", ONE)) })
  )
  expect(said).toEqual([])
})

test("a page whose body will not load is passed over rather than thrown on", () => {
  const root = rooted()
  stands(root, "domain", "held", ONE)
  identified(root, ONE, pathFor("domain", "held"))
  const at = pathFor("domain", "held")
  const broken = new TextEncoder().encode("export const held = { this is not a body\n")
  const said = domainIsNamedByAParent(
    landing(root, { [at]: broken }, { [at]: put(root, at, body("domain", "held", ONE)) })
  )
  expect(said).toEqual([])
})

test("a page whose file stem disagrees with the slug it states is judged, not skipped", () => {
  const root = rooted()
  const at = pathFor("domain", "held")
  const said = domainIsNamedByAParent(landing(root, { [at]: body("domain", "other", ONE) }))
  expect(said.map((filed) => filed.path)).toEqual([at])
})

test("two pages carrying one slug are each judged, not skipped", () => {
  const root = rooted()
  const one = pathFor("domain", "held")
  const two = pathFor("domain", "other")
  const said = domainIsNamedByAParent(
    landing(root, { [one]: body("domain", "held", ONE), [two]: body("domain", "held", TWO) })
  )
  expect(said.map((filed) => filed.path).sort()).toEqual([one, two].sort())
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
