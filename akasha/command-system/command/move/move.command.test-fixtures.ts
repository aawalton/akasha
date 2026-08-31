import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { warrantsStanding } from "../../../context-system/warranting/warranting.module.test-fixtures.ts"
import {
  namersOf,
  standingAt,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  importFiled,
  pathFiled,
  rebuiltIn,
  stampedIn,
} from "../../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { declaringUnder } from "../../../testing-system/declaring/declaring.module.code.ts"
import { gitIn } from "../../../testing-system/gitting/gitting.module.code.ts"
import {
  admitting,
  mintedId,
  minting,
} from "../../../testing-system/minting/minting.module.code.ts"
import { put } from "../../../testing-system/putting/putting.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import { blobIdOf, recordRead } from "../../reading/reading.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { move } from "./move.command.code.ts"

const TREE = "akasha"

export const HELD = "akasha/one/held.module.ts"

export const THREE = "akasha/three/held.module.ts"

export const DEEP = "akasha/one/deep/held.module.ts"

export const PAIR = ["--from", HELD, "--to", THREE]

export const PAGE = `export const held = {
  id: "01a04bed-1450-7000-8000-00000000aaaa",
  pageTypeSlug: "module",
  slug: "held",
  definition: "a page carried across a move",
}
`

export const CODE = `import ts from "typescript"
import { other } from "../two/other.module.code.ts"

export const held = { ts, other }
`

export const OTHER = `export const other = 1\n`

export const HOLDER = "akasha/one/held.module.code.ts"

export const TARGET = "akasha/two/other.module.code.ts"

export const ARRIVES = "akasha/four/other.module.code.ts"

export const DEEPER = "akasha/one/deep/held.module.code.ts"

export const NAMER = "akasha/five/namer.module.code.ts"

export const SPELLS = `export const at = "akasha/two/other.module.code.ts"\n`

export const AAAA = "01a04bed-1450-7000-8000-00000000aaaa"

export const RENAME = ["--from", HELD, "--to", "akasha/one/other.module.ts"]

export const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

export const UNSAID = "akasha/one/held.module.uncommitted.ts"

export const UNSAID_AT = "akasha/three/held.module.uncommitted.ts"

export const VALUES = `export const held = { title: "unsaid" }\n`

export const SECOND = "akasha/two/other.module.ts"

export const SECOND_AT = "akasha/four/other.module.ts"

export const SECOND_UNSAID = "akasha/two/other.module.uncommitted.ts"

export const SECOND_UNSAID_AT = "akasha/four/other.module.uncommitted.ts"

export const SECOND_PAGE = `export const other = {
  id: "01a04bed-1450-7000-8000-00000000eeee",
  pageTypeSlug: "module",
  slug: "other",
  definition: "a second page carried across a move",
}
`

export const BOTH = [...PAIR, "--from", SECOND, "--to", SECOND_AT]

export const NESTED = [
  "--from",
  HELD,
  "--to",
  `${SECOND_UNSAID_AT}/held.module.ts`,
  "--from",
  SECOND,
  "--to",
  SECOND_AT,
]

export const VOCABULARY: readonly string[] = Object.keys(declaringUnder(TREE))

export const scratch = scratchWorld()

export const git = gitIn

export function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-move-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries({ ...declaringUnder(TREE), ...named })) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  writeFileSync(join(root, ".git/info/exclude"), "akasha/*.check.ts\nakasha/*.check.code.ts\n")
  admitting(root)
  return root
}

export function rebuilt(root: string): string {
  rebuiltIn(root, TREE)
  admitting(root)
  return root
}

export function givenIn(root: string): Given {
  return { root, calledAs: "akasha move", from: root, writer: null, agentId: null }
}

export const head = baseOf

export function importing(root: string, target: string, importers: readonly string[]): undefined {
  importFiled(
    root,
    target,
    importers.map((path) => ({ path }))
  )
  stampedIn(root, { commit: head(root), tree: TREE, settled: [] })
}

export function claiming(root: string, path: string, ids: readonly string[]): undefined {
  pathFiled(
    root,
    path,
    ids.map((id) => ({ path, id }))
  )
}

export function bodyIn(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8")
}

export function why(said: Answer): string {
  return said.refusals.join("\n")
}

export function told(said: Answer): string {
  return said.report.join("\n")
}

export function codeWorld(named: Readonly<Record<string, string>> = {}): string {
  return repoWith({ [HOLDER]: CODE, [TARGET]: OTHER, ...named })
}

export function sidecarWorld(): string {
  return repoWith({ [HELD]: PAGE, [HOLDER]: CODE, "akasha/one/held.module.test.ts": OTHER })
}

export function takenWorld(): string {
  return repoWith({ [HELD]: PAGE, [THREE]: OTHER })
}

export function besideWorld(): string {
  return repoWith({ [HELD]: PAGE, [HOLDER]: OTHER })
}

export function heldPage(): string {
  return repoWith({ [HELD]: PAGE })
}

export function heldIndexed(): string {
  return rebuilt(heldPage())
}

export function oneUnsaid(): string {
  const root = heldIndexed()
  put(root, UNSAID, VALUES)
  return root
}

export function twoUnsaid(): string {
  const root = rebuilt(repoWith({ [HELD]: PAGE, [SECOND]: SECOND_PAGE }))
  put(root, UNSAID, VALUES)
  put(root, SECOND_UNSAID, VALUES)
  return root
}

export function held(root: string, path: string, body: string): undefined {
  warrantsStanding(root, ["file-itself"])
  recordRead(root, AGENT, {
    path,
    oid: blobIdOf(new TextEncoder().encode(body)),
    seenAt: 1,
    mechanicalOid: null,
  })
}

export const THING = "akasha/one/held.thing.ts"

export const THING_AT = "akasha/one/renamed.thing.ts"

export const THING_TYPE = "akasha/thing.page-type.ts"

export const ALPHA = "akasha/six/alpha.thing.ts"

export const BETA = "akasha/six/beta.thing.ts"

export const SLUG_RENAME = ["--from", THING, "--to", THING_AT]

const CHECKS_AT = join(import.meta.dir, "../../../checks-system/check")

const idOf = (said: string): string => `01a04bed-1450-7000-8000-0000000000${said}`

function stated(value: Readonly<Record<string, unknown>>): string {
  return `export const it = ${JSON.stringify(value, null, 2)} as const\n`
}

function typed(said: string, slug: string, extendsSlug: string | null): readonly [string, string] {
  return [
    `${TREE}/${slug}.page-type.ts`,
    stated({ id: idOf(said), pageTypeSlug: "page-type", slug, extendsSlug }),
  ]
}

function thingPage(slug: string, said: string, names: string | null): string {
  const held = names === null ? "" : `\n  names: [${names}],`
  return `export const ${slug} = {\n  id: "${said}",\n  pageTypeSlug: "thing",\n  slug: "${slug}",${held}\n}\n`
}

export const THING_VOCABULARY: Readonly<Record<string, string>> = {
  ...Object.fromEntries([
    typed("01", "page", null),
    typed("02", "page-property", "page-type/page"),
    typed("03", "relation-property", "page-type/page-property"),
    typed("04", "thing", "page-type/page"),
  ]),
  [`${TREE}/names.relation-property.ts`]: stated({
    id: idOf("05"),
    pageTypeSlug: "relation-property",
    slug: "names",
    propertySlug: "names",
    targetPageTypeSlug: "page-type/thing",
  }),
}

export function judging(root: string, slug: string): undefined {
  const at = join(CHECKS_AT, slug, `${slug}.check.code.ts`)
  const said = `export { ${exportedAs(slug)} } from ${JSON.stringify(at)}\n`
  minting(root, slug, mintedId(slug), "a check the corpus already carries", said)
}

export const NAMERS: readonly string[] = [ALPHA, BETA]

export function slugStanding(root: string, slug: string): readonly string[] {
  return standingAt(root, "thing", slug).map((one) => one.path)
}

export function namersIn(root: string, id: string): readonly string[] {
  return [...new Set(namersOf(root, id).map((one) => one.path))].sort()
}

export function renamedText(root: string): string {
  return [THING_AT, ALPHA, BETA].map((one) => bodyIn(root, one)).join("\n")
}

export function renaming(names = '"thing/held"'): string {
  const root = repoWith({
    ...THING_VOCABULARY,
    [THING]: thingPage("held", AAAA, null),
    [ALPHA]: thingPage("alpha", idOf("11"), names),
    [BETA]: thingPage("beta", idOf("12"), '"held"'),
  })
  rebuiltIn(root, TREE)
  for (const slug of ["relation-resolves", "page-named-as-stated"]) judging(root, slug)
  admitting(root)
  return root
}

export function renamed(): { readonly root: string; readonly said: Answer } {
  const root = renaming()
  return { root, said: move(SLUG_RENAME, givenIn(root)) }
}
