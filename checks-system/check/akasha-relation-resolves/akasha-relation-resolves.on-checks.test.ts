import { expect, test } from "bun:test"
import type { CheckFailure } from "../check-shape.ts"
import akashaRelationResolves from "./akasha-relation-resolves.check.code.attachment.ts"

const ROOT = "/akasha-relation-resolves-on-checks"

const UNDER = `${ROOT}/akasha`

const AT = "akasha/page/thing.domain.ts"

if (akashaRelationResolves.needs !== "tree") throw new Error("this check is handed a tree")

const runs = akashaRelationResolves.run

type Files = Readonly<Record<string, string>>

function stated(name: string, value: Record<string, unknown>): string {
  return `export const ${name} = ${JSON.stringify(value, null, 2)}\n`
}

function verdict(files: Files): readonly CheckFailure[] {
  const paths = Object.keys(files).map((one) => `${ROOT}/${one}`)
  const tree = {
    root: ROOT,
    at: (path: string): Buffer | null => {
      const body = files[path.slice(ROOT.length + 1)]
      return body === undefined ? null : Buffer.from(body)
    },
    paths: (): readonly string[] => paths,
    gone: (): readonly string[] => [],
    goneElsewhere: (): readonly string[] => [],
    repointedElsewhere: (): ReadonlyMap<string, string> => new Map(),
    dir: (): string => ROOT,
  }
  return runs({ root: ROOT, paths, tree, keep: (): string => ROOT }, { before: null })
}

const BASE: Files = {
  "akasha/type/page-property-type.page-type.ts": stated("pagePropertyType", {
    slug: "page-property-type",
    pageTypeSlug: "page-type",
  }),
  "akasha/type/domain.page-type.ts": stated("domain", {
    slug: "domain",
    pageTypeSlug: "page-type",
  }),
  "akasha/type/sub-domain.page-type.ts": stated("subDomain", {
    slug: "sub-domain",
    pageTypeSlug: "page-type",
    extendsSlug: "domain",
  }),
  "akasha/type/persona.page-type.ts": stated("persona", {
    slug: "persona",
    pageTypeSlug: "page-type",
  }),
  "akasha/property/domain-parent-slug.page-property-type.ts": stated("domainParentSlug", {
    slug: "domain-parent-slug",
    pageTypeSlug: "page-property-type",
    kind: "relation",
    targetPageTypeSlug: "domain",
  }),
  "akasha/property/domain-slug.page-property-type.ts": stated("domainSlug", {
    slug: "domain-slug",
    pageTypeSlug: "page-property-type",
    kind: "relation",
    targetPageTypeSlug: "domain",
  }),
  "akasha/property/sequence-slugs.page-property-type.ts": stated("sequenceSlugs", {
    slug: "sequence-slugs",
    pageTypeSlug: "page-property-type",
    kind: "list",
    entrySlug: "domain-slug",
  }),
  "akasha/page/global.domain.ts": stated("global", { slug: "global", pageTypeSlug: "domain" }),
}

function page(value: Record<string, unknown>, beside: Files = {}): Files {
  return {
    ...BASE,
    ...beside,
    [AT]: stated("thing", { slug: "thing", pageTypeSlug: "domain", ...value }),
  }
}

test("a relation naming one page of the type it targets passes", () => {
  expect(verdict(page({ domainParentSlug: "global" }))).toEqual([])
})

test("a relation naming a slug no page carries fails, and the reason names the property and the slug", () => {
  const said = verdict(page({ domainParentSlug: "nowhere" }))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toBe("`domainParentSlug` names `nowhere`, and no page carries that slug")
})

test("a relation naming a page of a type it does not admit fails, and the reason names both types", () => {
  const beside = {
    "akasha/page/aine.persona.ts": stated("aine", { slug: "aine", pageTypeSlug: "persona" }),
  }
  const said = verdict(page({ domainParentSlug: "aine" }, beside))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toBe("`domainParentSlug` may name a `domain`, and `aine` is a `persona`")
})

test("a relation naming a slug two admitted pages carry fails, and the reason names both page types", () => {
  const beside = {
    "akasha/page/twice.domain.ts": stated("twice", { slug: "twice", pageTypeSlug: "domain" }),
    "akasha/page/twice.sub-domain.ts": stated("twiceUnder", {
      slug: "twice",
      pageTypeSlug: "sub-domain",
    }),
  }
  const said = verdict(page({ domainParentSlug: "twice" }, beside))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toBe(
    "`domainParentSlug` names `twice`, and `domain` and `sub-domain` both carry it"
  )
})

test("a page of a type extending the target satisfies the relation", () => {
  const beside = {
    "akasha/page/under.sub-domain.ts": stated("under", {
      slug: "under",
      pageTypeSlug: "sub-domain",
    }),
  }
  expect(verdict(page({ domainParentSlug: "under" }, beside))).toEqual([])
})

test("the failure is pointed at the file inside the akasha folder, not the copy the check judged", () => {
  const said = verdict(page({ domainParentSlug: "nowhere" }))
  expect(said[0]?.path).toBe(`${UNDER}/page/thing.domain.ts`)
})

test("every slug a list property names is judged, and each one naming nothing is refused", () => {
  const said = verdict(page({ sequenceSlugs: ["global", "nowhere", "elsewhere"] }))
  expect(said).toHaveLength(2)
  expect(said[0]?.reason).toBe("`sequenceSlugs` names `nowhere`, and no page carries that slug")
  expect(said[1]?.reason).toBe("`sequenceSlugs` names `elsewhere`, and no page carries that slug")
})

test("a relation stated as null names nothing and is not judged", () => {
  expect(verdict(page({ domainParentSlug: null }))).toEqual([])
})

test("a property no page property type declares a target for is not judged", () => {
  expect(verdict(page({ championSlug: "nowhere" }))).toEqual([])
})

test("a page outside the akasha folder is not judged", () => {
  const files = {
    ...BASE,
    "checks-system/thing.domain.ts": stated("thing", {
      slug: "thing",
      pageTypeSlug: "domain",
      domainParentSlug: "nowhere",
    }),
  }
  expect(verdict(files)).toEqual([])
})

test("a required reading naming nothing refuses the whole corpus rather than one relation", () => {
  const said = verdict(page({ requiredReadingSlugs: ["nowhere"], domainParentSlug: "nowhere" }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(UNDER)
  expect(said[0]?.reason).toContain("`thing` names `nowhere` under `required-reading-slugs`")
  expect(said[0]?.reason).toContain("no page carries that slug")
})

test("a tree carrying no TypeScript is not judged", () => {
  expect(verdict({ "akasha/page/thing.md": "nothing stated here" })).toEqual([])
})
