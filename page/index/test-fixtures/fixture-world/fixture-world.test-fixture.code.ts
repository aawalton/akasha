import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { declaringUnder } from "akasha/check/test/fixture/declaring/declaring.test-fixture.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import { keptAt } from "akasha/file/disk/test-fixtures/kept-scratch/kept-scratch.test-fixture.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import { graphAttribute } from "akasha/graph/attribute/graph-attribute.page-type.ts"
import { known } from "akasha/graph/attribute/pages/known.graph-attribute.ts"
import { refreshedWhole } from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import { shapesAmong } from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  typeIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { id as idPage } from "akasha/page/properties/id.text-property.ts"
import { slug as slugPage } from "akasha/page/properties/slug.text-property.ts"
import {
  shapedIn,
  bodyOf as shapesBodyOf,
  shapesFiledAt,
  shapesIn,
} from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export type Held = Record<string, unknown>

export const idOf = (one: string): string => `01a04a4a-0000-7000-8000-00000000000${one}`

export function bodyOf(value: Held): string {
  return `export const it = ${JSON.stringify(value, null, 2)} as const\n`
}

export function pageOf(value: Held): string {
  return bodyOf(value).replace("export const it", `export const ${exportedAs(String(value.slug))}`)
}

export function carriedPage(slug: string, id: string): string {
  return pageOf({
    id,
    pageTypeSlug: "module",
    slug,
    definition: "a page a carried folder holds",
    code: "ts",
  })
}

export const scratch = scratchWorld()

const SHAPED = new Map<string, Map<string, Value>>()

const PAGE_TYPE = "page-type"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

function besideFor(held: ReadonlyMap<string, Value>, kind: string): string | null {
  for (const [path, one] of held) {
    if (typeIn(one) !== PAGE_TYPE || textAt(one, "slug") !== kind) continue
    return shapesFiledAt(path)
  }
  return null
}

function shapesMerged(tree: string, held: ReadonlyMap<string, Value>, value: Value): undefined {
  const shape = shapedIn(value)
  if (shape === null) return
  const beside = besideFor(held, shape.pageTypeSlug)
  if (beside === null) return
  const to = join(tree, beside)
  const was = textThere(to)
  if (was === null) return
  const kept = shapesIn(was).filter((one) => one.slug !== shape.slug)
  writeFileSync(to, shapesBodyOf([...kept, shape]))
}

function shapesPut(tree: string, at: string, body: string): undefined {
  if (!at.endsWith(".ts")) return
  const value = loadedFrom(body).value
  if (value === null) return
  const held = SHAPED.get(tree) ?? new Map<string, Value>()
  SHAPED.set(tree, held)
  held.set(at, value)
  const among = [...held].map(([path, one]) => ({ path, value: one }))
  for (const [beside, whole] of shapesAmong(among)) {
    const to = join(tree, beside)
    if (existsSync(to)) continue
    mkdirSync(dirname(to), { recursive: true })
    writeFileSync(to, whole)
  }
  shapesMerged(tree, held, value)
}

export function put(tree: string, at: string, body: string): string {
  const path = join(tree, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body)
  shapesPut(tree, at, body)
  return path
}

export function butTheStamp(found: readonly string[]): readonly string[] {
  const stamped = ["/stamp.jsonl "]
  return found.filter((one) => !stamped.some((at) => one.startsWith(at)))
}

export type Named = readonly [string, Held]

export function aType(
  id: string,
  slug: string,
  above: readonly string[],
  declares: readonly string[] = []
): Named {
  const properties = declares.map((one) => ({
    pagePropertySlug: one,
    required: false,
    many: false,
  }))
  return [
    `${slug}.page-type.ts`,
    { id, pageTypeSlug: "page-type", slug, extends: above, properties },
  ]
}

export function aProperty(id: string, slug: string, shape: string, rest: Held = {}): Named {
  return [`${slug}.${shape}.ts`, { id, pageTypeSlug: shape, slug, propertySlug: slug, ...rest }]
}

export function thePage(value: Held): Named {
  const said = String(value.pageTypeSlug ?? value.type)
  return [`${String(value.slug)}.${slugIn(said) ?? said}.ts`, value]
}

export const IDENTIFIERS: readonly Named[] = [
  aType("0", "page", [], ["id", "slug"]),
  aType("12", "page-type", ["page"]),
  aType("5", "page-property", ["page"]),
  aType("9", "text-property", ["page-property"]),
  aType("10", "relation-property", ["page-property"]),
  aType("1", "domain", ["page"]),
  aType("2", "module", ["domain"], ["code", "test"]),
  thePage(idPage),
  thePage(slugPage),
]

export const VOCABULARY: readonly Named[] = [
  ...IDENTIFIERS,
  aType("11", "file-property", ["page-property"]),
  aProperty("3", "part-slugs", "relation-property", { targetPageType: "domain" }),
  aProperty("4", "domain-slug", "relation-property", { targetPageType: "domain" }),
  aProperty("6", "code", "file-property"),
  aProperty("7", "test", "file-property"),
]

const TREE = "akasha"

export const HELD_PAGE = `${TREE}/one/held.module.ts`

export const HELD_CODE = `${TREE}/one/held.module.code.ts`

export const NAMER_PAGE = `${TREE}/two/namer.module.ts`

export const NAMER_CODE = `${TREE}/two/namer.module.code.ts`

export const HELD_EXPORT = "kept"

export const HELD_SLUG = "held"

const HELD_BODY = `export const ${HELD_EXPORT} = 1\n`

const NAMER_BODY = `import { ${HELD_EXPORT} } from "../one/held.module.code.ts"

export const named = ${HELD_EXPORT} + 1
`

const CHANGE_TYPE = "change-mechanical"

const CHANGE_CODE_AT = "change"

type Reached = { readonly slug: string; readonly type: string; readonly at: string }

const CHANGE_SLUGS: readonly Reached[] = [
  { slug: "remove-file", type: "change-mechanical-file", at: "mechanical/file/remove" },
  { slug: "remove-file-code", type: "change-mechanical", at: "mechanical/file/remove" },
  { slug: "remove-file-page", type: "change-mechanical-file", at: "mechanical/file/remove" },
  { slug: "remove-page-type", type: "change-mechanical-folder", at: "mechanical/folder/remove" },
  {
    slug: "remove-property-value",
    type: "change-mechanical-file-content",
    at: "mechanical/file-content/remove",
  },
  { slug: "remove-page", type: "change-agent", at: "agent/file" },
]

const changeId = (one: string): string => `01a04a4a-0001-7000-8000-00000000000${one}`

const REPO_VOCABULARY: readonly Named[] = [
  aType(changeId("0"), CHANGE_TYPE, [MODULE_AT]),
  aType(changeId("a"), "change-mechanical-file", [`page-type/${CHANGE_TYPE}`]),
  aType(changeId("b"), "change-mechanical-folder", [`page-type/${CHANGE_TYPE}`]),
  aType(changeId("c"), "change-mechanical-file-content", [`page-type/${CHANGE_TYPE}`]),
  aType(changeId("d"), "change-agent", [`page-type/${CHANGE_TYPE}`]),
  aType(idOf("1"), "page", [], ["id", "slug"]),
  aType(idOf("2"), "page-type", [DOMAIN_AT]),
  aType(idOf("3"), "page-property", [PAGE_AT]),
  aType(idOf("4"), "file-property", [PAGE_PROPERTY_AT]),
  aType(idOf("5"), "domain", [PAGE_AT]),
  aType(idOf("6"), "module", [DOMAIN_AT], ["code", "test", "note", "part-slugs"]),
  aProperty(idOf("7"), "code", "file-property"),
  aProperty("01a04a4a-0002-7000-8000-000000000007", "test", "file-property"),
  aType(idOf("a"), "relation-property", [PAGE_PROPERTY_AT]),
  aProperty("01a04a4a-0002-7000-8000-000000000005", "extends-type", "relation-property", {
    propertySlug: "extends",
    targetPageType: "page-type",
  }),
  aProperty(idOf("b"), "note", "relation-property", { targetPageType: "module" }),
  aProperty(idOf("c"), "part-slugs", "relation-property", { targetPageType: "domain" }),
]

const changePage = (reached: Reached, one: number): Held => ({
  id: changeId(String(one + 1)),
  pageTypeSlug: reached.type,
  slug: reached.slug,
  definition: "a mechanical change an indexed repository carries",
  code: "ts",
})

const changeCode = (reached: Reached): string => {
  const named = `${reached.slug}.${reached.type}.code.ts`
  const at = join(rootOf(import.meta.dir), CHANGE_CODE_AT, reached.at, reached.slug, named)
  return `export { runChange } from "${at}"\n`
}

function changesHeld(): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const [one, reached] of CHANGE_SLUGS.entries()) {
    const named = `${reached.slug}.${reached.type}`
    found[`${TREE}/changes/${named}.ts`] = pageOf(changePage(reached, one))
    found[`${TREE}/changes/${named}.code.ts`] = changeCode(reached)
  }
  return found
}

const modulePage = (slug: string, id: string): Held => ({
  id,
  pageTypeSlug: "module",
  slug,
  definition: "a page an indexed repository carries",
  code: "ts",
})

const REPO: Readonly<Record<string, string>> = {
  ...Object.fromEntries(REPO_VOCABULARY.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])),
  ...changesHeld(),
  [HELD_PAGE]: pageOf(modulePage("held", idOf("8"))),
  [NAMER_PAGE]: pageOf({
    ...modulePage("namer", idOf("9")),
    note: HELD_SLUG,
    partSlugs: [`module/${HELD_SLUG}`],
  }),
  [HELD_CODE]: HELD_BODY,
  [NAMER_CODE]: NAMER_BODY,
}

const graphId = (one: string): string => `01a04a4a-0006-7000-8000-00000000000${one}`

const GRAPHED: Readonly<Record<string, string>> = Object.fromEntries(
  [
    aType(graphId("1"), graphAttribute.slug, [PAGE_AT]),
    aType(graphId("2"), "graph-edge", [PAGE_AT], ["attributes"]),
    aProperty(graphId("3"), "attributes", "relation-property", {
      targetPageType: graphAttribute.slug,
    }),
    thePage({
      id: graphId("4"),
      pageTypeSlug: graphAttribute.slug,
      slug: known.slug,
      definition: "how an edge between two files was found",
    }),
    thePage({
      id: graphId("5"),
      pageTypeSlug: "graph-edge",
      slug: "import-edge",
      definition: "one file naming another in its own body",
      attributes: [`${graphAttribute.slug}/${known.slug}`],
    }),
  ].map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])
)

const BUILT: Record<string, string> = {}

export function indexedRepo(named: Readonly<Record<string, string>> = {}): string {
  const key = JSON.stringify(Object.entries(named).sort())
  let held = BUILT[key]
  if (held === undefined) {
    held = keptAt("akasha-indexed-")
    git(held, ["init", "--quiet"])
    git(held, ["config", "user.email", "held@nowhere"])
    git(held, ["config", "user.name", "Held"])
    git(held, ["config", "gc.auto", "0"])
    for (const [at, body] of Object.entries({ ...declaringUnder(TREE), ...REPO, ...named })) {
      put(held, at, body)
    }
    git(held, ["add", "-A"])
    git(held, ["commit", "--quiet", "-m", "first"])
    refreshedWhole(held, join(held, TREE), true)
    refreshedWhole(held, join(held, TREE), true)
    BUILT[key] = held
  }
  const root = scratch.rootFor("akasha-indexed-")
  cpSync(held, root, { recursive: true })
  return root
}

export function graphedRepo(named: Readonly<Record<string, string>> = {}): string {
  return indexedRepo({ ...GRAPHED, ...named })
}

export function textIn(root: string): (path: string) => string | null {
  return (path) => {
    try {
      return readFileSync(join(root, path), "utf8")
    } catch {
      return null
    }
  }
}
