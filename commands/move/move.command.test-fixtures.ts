import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { warrantsSeeded } from "@akasha/context/warranting/testing"
import { said as gitIn } from "@akasha/git/git-running"
import { listedAt, namersOf } from "@akasha/indexes"
import {
  importFiled,
  indexTakenFrom,
  pathFiled,
  rebuiltIn,
  stampedIn,
} from "@akasha/indexes/testing"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { declaringUnder } from "@akasha/testing-system/declaring"
import { admitting, mintedId, minting } from "@akasha/testing-system/minting"
import { put } from "@akasha/testing-system/putting"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { baseOf } from "../../command-system/landing/landing.module.code.ts"
import { blobIdOf, recordRead } from "../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { move } from "./move.command.code.ts"

const TREE = "akasha"

export const HELD = "akasha/one/held.module.ts"

export const THREE = "akasha/three/held.module.ts"

export const DEEP = "akasha/one/deep/held.module.ts"

export const PAIR = ["--from", HELD, "--to", THREE]

const NOWHERE = "nowhere.module.ts"

export const MISSING = ["--from", `akasha/one/${NOWHERE}`, "--to", `akasha/three/${NOWHERE}`]

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
  writeFileSync(
    join(root, ".git/info/exclude"),
    "akasha/*.code-check.ts\nakasha/*.code-check.code.ts\n*.uncommitted.ts\n"
  )
  rebuiltIn(root, TREE)
  for (const path of Object.keys(named)) importFiled(root, path, [])
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
  pathFiled(root, target, [{ path: target, id: mintedId(target) }])
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

export function codeUnindexed(): string {
  const root = codeWorld()
  indexTakenFrom(root)
  return root
}

export const SIDE = "akasha/one/held.module.test.ts"

export const SIDE_AT = "akasha/one/deep/held.module.test.ts"

export function sidecarWorld(): string {
  return repoWith({ [HELD]: PAGE, [HOLDER]: CODE, [SIDE]: OTHER })
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

export function heldUnindexed(): string {
  const root = heldPage()
  indexTakenFrom(root)
  return root
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
  warrantsSeeded(root, ["file-itself"])
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

export const THING_BESIDE = ["akasha/one/held.thing.code.ts", "akasha/one/renamed.thing.code.ts"]

export const ALPHA = "akasha/six/alpha.thing.ts"

export const BETA = "akasha/six/beta.thing.ts"

export const GAMMA = "akasha/held/gamma.thing.ts"

export const SLUG_RENAME = ["--from", THING, "--to", THING_AT]

export const FOLDER = "akasha/one"

export const FOLDER_AT = "akasha/far/one"

export const FOLDER_PAIR = ["--from", FOLDER, "--to", FOLDER_AT]

export const HELD_AT = "akasha/far/one/held.module.ts"

export const HOLDER_AT = "akasha/far/one/held.module.code.ts"

export const NESTED_HELD = "akasha/one/under/nested.module.code.ts"

export const NESTED_AT = "akasha/far/one/under/nested.module.code.ts"

export const LOOSE = "akasha/one/loose.module.ts"

export const UNSAID_UNDER = "akasha/far/one/held.module.uncommitted.ts"

export const LOCK = "tools/lock.json"

export const BINARY = "tools/held.bin"

export const BINARY_BODY = `${FOLDER}\u0000held\n`

export const REPOINTED = `2 files naming what moved would be repointed — ${NAMER}, ${HOLDER}`

export const LOCKED = `{
  "akasha/one": 1,
  "akasha/one-other": 2,
  "akasha/one/held.module.ts": 3,
  "@akasha/one": "workspace:akasha/one"
}
`

export const RELOCKED = `{
  "akasha/far/one": 1,
  "akasha/one-other": 2,
  "akasha/far/one/held.module.ts": 3,
  "@akasha/one": "workspace:akasha/far/one"
}
`

export function outsideWorld(): string {
  return rebuilt(
    repoWith({
      [HELD]: PAGE,
      [HOLDER]: CODE,
      [TARGET]: OTHER,
      [LOCK]: LOCKED,
      [BINARY]: BINARY_BODY,
    })
  )
}

export async function outsideMoved(): Promise<{ readonly root: string; readonly said: Answer }> {
  const root = outsideWorld()
  return { root, said: await move(FOLDER_PAIR, givenIn(root)) }
}

export const REACHER = "tools/lib/reach.ts"

export const REACHES = `import { held } from "../../akasha/one/held.module.ts"
import { other } from "../../akasha/one-other/held.module.ts"

export const said = { held, other }
`

export const REACHED = `import { held } from "../../akasha/far/one/held.module.ts"
import { other } from "../../akasha/one-other/held.module.ts"

export const said = { held, other }
`

export function reachWorld(): string {
  return rebuilt(repoWith({ [HELD]: PAGE, [HOLDER]: CODE, [TARGET]: OTHER, [REACHER]: REACHES }))
}

export async function reachMoved(): Promise<{ readonly root: string; readonly said: Answer }> {
  const root = reachWorld()
  return { root, said: await move(FOLDER_PAIR, givenIn(root)) }
}

export const SPELLER = "akasha/one/speller.module.code.ts"

export const SPELLER_AT = "akasha/far/one/speller.module.code.ts"

export const SPELT = `export const runs = "bun akasha/one/held.module.ts"
export const under = "what akasha/one/deep holds"
`

export const RESPELT = `export const runs = "bun akasha/far/one/held.module.ts"
export const under = "what akasha/far/one/deep holds"
`

export async function carriedMoved(): Promise<{ readonly root: string; readonly said: Answer }> {
  const held = { [HELD]: PAGE, [HOLDER]: CODE, [TARGET]: OTHER, [SPELLER]: SPELT }
  const root = rebuilt(repoWith(held))
  return { root, said: await move(FOLDER_PAIR, givenIn(root)) }
}

export function folderWorld(): string {
  return rebuilt(repoWith({ [HELD]: PAGE, [HOLDER]: CODE, [NESTED_HELD]: OTHER, [TARGET]: OTHER }))
}

export function folderUnsaid(): string {
  const root = folderWorld()
  put(root, UNSAID, VALUES)
  return root
}

export function bareDir(root: string, path: string): undefined {
  mkdirSync(join(root, path), { recursive: true })
}

const CHECKS_AT = join(import.meta.dir, "../../checks/code-checks/pages")

const idOf = (said: string): string => `01a04bed-1450-7000-8000-0000000000${said}`

function stated(value: Readonly<Record<string, unknown>>): string {
  return `export const it = ${JSON.stringify(value, null, 2)} as const\n`
}

function typed(
  said: string,
  slug: string,
  extendsSlug: string | null,
  declares: readonly string[] = []
): readonly [string, string] {
  const properties = declares.map((one) => ({
    pagePropertySlug: one,
    required: false,
    many: false,
  }))
  return [
    `${TREE}/${slug}.page-type.ts`,
    stated({ id: idOf(said), pageTypeSlug: "page-type", slug, extendsSlug, properties }),
  ]
}

function thingPage(slug: string, said: string, names: string | null): string {
  const held = names === null ? "" : `\n  names: [${names}],`
  return `export const ${slug} = {\n  id: "${said}",\n  pageTypeSlug: "thing",\n  slug: "${slug}",${held}\n}\n`
}

export const THING_VOCABULARY: Readonly<Record<string, string>> = {
  ...Object.fromEntries([
    typed("01", "page", null, ["id", "slug"]),
    typed("02", "page-property", "page-type/page"),
    typed("03", "relation-property", "page-type/page-property"),
    typed("04", "thing", "page-type/page", ["names"]),
    typed("06", "page-type", "page-type/page"),
    typed("10", "domain", "page-type/page"),
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
  const at = join(CHECKS_AT, slug, `${slug}.code-check.code.ts`)
  const said = `export { ${exportedAs(slug)} } from ${JSON.stringify(at)}\n`
  minting(root, slug, mintedId(slug), "a check the pages already carry", said)
}

export const NAMERS: readonly string[] = [ALPHA, BETA]

export function filedAt(root: string, slug: string): readonly string[] {
  return listedAt(root, "thing", slug).map((one) => one.path)
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
    [THING_BESIDE[0] ?? ""]: "export const held = 1\n",
    [ALPHA]: thingPage("alpha", idOf("11"), names),
    [BETA]: thingPage("beta", idOf("12"), '"held"'),
    [GAMMA]: thingPage("gamma", idOf("13"), '"thing/alpha"'),
  })
  rebuiltIn(root, TREE)
  for (const slug of ["relation-resolves", "page-named-as-stated"]) judging(root, slug)
  admitting(root)
  return root
}

export const SAYING = [...PAIR, "--message", "held moves"]

export const GLASSED = [...SAYING, "--break-the-glass", "  the check is wrong  "]

export const CARRY = ["--from", TARGET, "--to", ARRIVES]

export function spellingWorld(): string {
  const root = codeWorld({ [NAMER]: SPELLS })
  claiming(root, NAMER, [AAAA])
  importing(root, TARGET, [HOLDER])
  return root
}

const MANIFEST = "akasha/one/package.json"

const MANIFEST_AT = "akasha/far/one/package.json"

const MANIFEST_BODY = `{\n  "name": "@akasha/one"\n}\n`

const LINK = "node_modules/@akasha/one"

const SEEN = "seen.txt"

const WATCHES = "watches"

function watching(root: string): undefined {
  const code = `import { lstatSync, writeFileSync } from "node:fs"

export function ${WATCHES}() {
  let said = "gone"
  try {
    said = lstatSync(${JSON.stringify(join(root, LINK))}).isSymbolicLink() ? "linked" : "taken"
  } catch {
    said = "gone"
  }
  writeFileSync(${JSON.stringify(join(root, SEEN))}, said)
  return []
}
`
  minting(root, WATCHES, mintedId(WATCHES), "a check saying what the package link was", code)
}

function seenIn(root: string): string {
  return readFileSync(join(root, SEEN), "utf8")
}

export async function linkWatched(): Promise<readonly [string, string]> {
  const root = rebuilt(repoWith({ [HELD]: PAGE, [MANIFEST]: MANIFEST_BODY }))
  watching(root)
  const pair = ["--from", MANIFEST, "--to", MANIFEST_AT]
  await move([...pair, "--dry-run"], givenIn(root))
  const dry = seenIn(root)
  await move(pair, givenIn(root))
  return [dry, seenIn(root)]
}

export async function renamed(): Promise<{ readonly root: string; readonly said: Answer }> {
  const root = renaming()
  return { root, said: await move(SLUG_RENAME, givenIn(root)) }
}
