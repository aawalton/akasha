import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { id as idPage } from "@akasha/pages/page/id"
import { slug as slugPage } from "@akasha/pages/page/slug"
import { exportedAs } from "@akasha/pages/page-export-name"
import { declaringUnder } from "akasha/testing-system/declaring/declaring.module.code.ts"
import {
  keptAt,
  scratchWorld,
} from "../../../commands/modules/scratching/scratching.module.code.ts"
import { said as git } from "../../../git/running/git-running.module.code.ts"
import { rebuiltWhole } from "../indexing/indexing.module.code.ts"

export type Held = Record<string, unknown>

export const idOf = (one: string): string => `01a04a4a-0000-7000-8000-00000000000${one}`

export function bodyOf(value: Held): string {
  return `export const it = ${JSON.stringify(value, null, 2)} as const\n`
}

export function pageOf(value: Held): string {
  return bodyOf(value).replace("export const it", `export const ${exportedAs(String(value.slug))}`)
}

export const scratch = scratchWorld()

export function put(tree: string, at: string, body: string): string {
  const path = join(tree, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body)
  return path
}

export const butTheStamp = (found: readonly string[]): readonly string[] =>
  found.filter((one) => !one.startsWith("/stamp.jsonl "))

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
  return [`${String(value.slug)}.${String(value.pageTypeSlug)}.ts`, value]
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

const CHANGE_CODE_AT = "../../../changes"

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
  aType(changeId("0"), CHANGE_TYPE, ["page-type/module"]),
  aType(changeId("a"), "change-mechanical-file", [`page-type/${CHANGE_TYPE}`]),
  aType(changeId("b"), "change-mechanical-folder", [`page-type/${CHANGE_TYPE}`]),
  aType(changeId("c"), "change-mechanical-file-content", [`page-type/${CHANGE_TYPE}`]),
  aType(changeId("d"), "change-agent", [`page-type/${CHANGE_TYPE}`]),
  aType(idOf("1"), "page", [], ["id", "slug"]),
  aType(idOf("2"), "page-type", ["page-type/domain"]),
  aType(idOf("3"), "page-property", ["page-type/page"]),
  aType(idOf("4"), "file-property", ["page-type/page-property"]),
  aType(idOf("5"), "domain", ["page-type/page"]),
  aType(idOf("6"), "module", ["page-type/domain"], ["code", "test", "note", "part-slugs"]),
  aProperty(idOf("7"), "code", "file-property"),
  aProperty("01a04a4a-0002-7000-8000-000000000007", "test", "file-property"),
  aType(idOf("a"), "relation-property", ["page-type/page-property"]),
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
  const at = join(import.meta.dir, CHANGE_CODE_AT, reached.at, reached.slug, named)
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

const BUILT: Record<string, string> = {}

export function indexedRepo(named: Readonly<Record<string, string>> = {}): string {
  const key = JSON.stringify(Object.entries(named).sort())
  let held = BUILT[key]
  if (held === undefined) {
    held = keptAt("akasha-indexed-")
    git(held, ["init", "--quiet"])
    git(held, ["config", "user.email", "held@nowhere"])
    git(held, ["config", "user.name", "Held"])
    for (const [at, body] of Object.entries({ ...declaringUnder(TREE), ...REPO, ...named })) {
      put(held, at, body)
    }
    git(held, ["add", "-A"])
    git(held, ["commit", "--quiet", "-m", "first"])
    rebuiltWhole(held, join(held, TREE), true)
    rebuiltWhole(held, join(held, TREE), true)
    BUILT[key] = held
  }
  const root = scratch.rootFor("akasha-indexed-")
  cpSync(held, root, { recursive: true })
  return root
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
