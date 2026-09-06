import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { warrantsSeeded } from "@akasha/context/warranting/testing"
import { said as gitIn } from "@akasha/git/git-running"
import {
  importFiled,
  indexTakenFrom,
  listedFiled,
  pathFiled,
  rebuiltIn,
} from "@akasha/indexes/testing"
import { declaringUnder } from "@akasha/testing-system/declaring"
import { admitting, mintedId, minting } from "@akasha/testing-system/minting"
import { put } from "@akasha/testing-system/putting"
import { changeChecked } from "../../../changes/kinds/checked/change-checked.change-kind.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import { blobIdOf, recordRead } from "../../reading/reading.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { move } from "./move.command.code.ts"

const TREE = "akasha"

type Moved = { readonly root: string; readonly said: Answer }

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
    "akasha/*.code-check.ts\nakasha/*.code-check.code.ts\n*.uncommitted.ts\n*.uncommitted.jsonl\n"
  )
  return rebuilt(root)
}

const IMPORTS_NONE = "akasha/one/imports-none.module.ts"

export function moduleTyped(root: string): undefined {
  const at = `${TREE}/module.page-type.ts`
  const id = "01a04bed-1450-7000-8000-0000000000ff"
  listedFiled(root, "page-type", "module", [{ path: at, id }])
}

export function rebuilt(root: string): string {
  rebuiltIn(root, TREE)
  moduleTyped(root)
  importFiled(root, IMPORTS_NONE, [])
  admitting(root)
  return root
}

export function givenIn(root: string): Given {
  const changeKind = changeChecked
  return { root, calledAs: "akasha move", from: root, writer: null, agentId: null, changeKind }
}

export const head = baseOf

export function importing(root: string, target: string, importers: readonly string[]): undefined {
  importFiled(
    root,
    target,
    importers.map((path) => ({ path }))
  )
  pathFiled(root, target, [{ path: target, id: mintedId(target) }])
}

export function claiming(root: string, path: string, ids: readonly string[]): undefined {
  moduleTyped(root)
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
    carriedOid: null,
  })
}

export const FOLDER = "akasha/one"

export const FOLDER_AT = "akasha/far/one"

export const FOLDER_PAIR = ["--from", FOLDER, "--to", FOLDER_AT]

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

async function movedIn(root: string, argv: readonly string[]): Promise<Moved> {
  return { root, said: await move(argv, givenIn(root)) }
}

export function outsideMoved(): Promise<Moved> {
  return movedIn(outsideWorld(), FOLDER_PAIR)
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

export function reachMoved(): Promise<Moved> {
  return movedIn(reachWorld(), FOLDER_PAIR)
}

export const SPELLER = "akasha/one/speller.module.code.ts"

export const SPELLER_AT = "akasha/far/one/speller.module.code.ts"

export const SPELT = `export const runs = "bun akasha/one/held.module.ts"
export const under = "what akasha/one/deep holds"
`

export const RESPELT = `export const runs = "bun akasha/far/one/held.module.ts"
export const under = "what akasha/far/one/deep holds"
`

export function carriedMoved(): Promise<Moved> {
  const held = { [HELD]: PAGE, [HOLDER]: CODE, [TARGET]: OTHER, [SPELLER]: SPELT }
  return movedIn(rebuilt(repoWith(held)), FOLDER_PAIR)
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

export function sidecarMoved(): Promise<Moved> {
  return movedIn(rebuilt(sidecarWorld()), ["--from", HELD, "--to", DEEP])
}

export function deeperMoved(): Promise<Moved> {
  return movedIn(codeWorld(), ["--from", HOLDER, "--to", DEEPER])
}

export function readingMoved(argv: readonly string[] = []): Promise<Moved> {
  const root = codeWorld()
  held(root, HOLDER, CODE)
  return movedIn(root, ["--from", HOLDER, "--to", DEEPER, ...argv])
}

export function sameActMoved(): Promise<Moved> {
  const root = codeWorld()
  importing(root, TARGET, [HOLDER])
  return movedIn(root, ["--from", TARGET, "--to", ARRIVES, "--from", HOLDER, "--to", DEEPER])
}

export function sidecarDryMoved(): Promise<Moved> {
  return movedIn(sidecarWorld(), ["--from", HELD, "--to", DEEP, "--dry-run"])
}
