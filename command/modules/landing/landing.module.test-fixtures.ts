import { expect } from "bun:test"
import { appendFileSync, cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.types.ts"
import type { Judged, Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import { excludingIndex } from "akasha/check/test/fixture/repo-seeding/repo-seeding.test-fixture.code.ts"
import { everyFileUnder } from "akasha/check/test/fixture/walking/walking.test-fixture.code.ts"
import { said as saying } from "akasha/code/spawning/modules/running/running.module.code.ts"
import type { Stated } from "akasha/command/modules/change-preparing/change-preparing.module.code.ts"
import {
  NO_TEXT,
  rowsFrom,
} from "akasha/command/modules/change-preparing/change-preparing.module.code.ts"
import type {
  Committing,
  Landed,
  Refused,
} from "akasha/command/modules/landing/landing.module.code.ts"
import { landing } from "akasha/command/modules/landing/landing.module.code.ts"
import { baseOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { refreshedFrom } from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import { shapesAmong } from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import { everythingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { indexIn } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  bodyOf,
  butTheStamp,
  thePage,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { id as idPage } from "akasha/page/properties/id.text-property.ts"
import { slug as slugPage } from "akasha/page/properties/slug.text-property.ts"
import { textProperty } from "akasha/page/text-property/text-property.page-type.ts"

export const MODULE_AT = new URL("./landing.module.code.ts", import.meta.url).pathname

export const scratch = scratchWorld()

export const git = gitIn

const templates = new Map<string, string>()

function seededAt(root: string, named: Readonly<Record<string, string | Uint8Array>>): string {
  git(root, ["init", "--quiet"])
  appendFileSync(join(root, ".git", "config"), "[user]\n\temail = held@nowhere\n\tname = Held\n")
  excludingIndex(root)
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  mkdirSync(indexIn(root), { recursive: true })
  return root
}

function templateFor(named: Readonly<Record<string, string | Uint8Array>>): string {
  const key = JSON.stringify(named)
  const held = templates.get(key)
  if (held !== undefined) return held
  const at = seededAt(scratch.rootFor("akasha-landing-template-"), named)
  templates.set(key, at)
  return at
}

export function repoWith(named: Readonly<Record<string, string | Uint8Array>>): string {
  const root = scratch.rootFor("akasha-landing-")
  cpSync(templateFor(named), root, { recursive: true })
  return root
}

export const ADMITS: Judging = {
  named: ["admits"],
  checksFor: () => ["admits"],
  over: async () => [],
}

function judgingThat(name: string, over: (change: Change) => readonly Judged[]): Judging {
  return { named: [name], checksFor: () => [name], over: async (change) => over(change) }
}

export const PAGE = "akasha/a.domain.ts"

export type Held = { readonly path: string; readonly body: Uint8Array | null }

const FATAL = new TextDecoder("utf-8", { fatal: true })

function rowsOver(changes: readonly Held[]): Stated {
  const rows: FileChange[] = []
  for (const one of changes) {
    if (one.body === null) {
      rows.push({ kind: "remove", path: one.path })
      continue
    }
    try {
      rows.push({ kind: "add", path: one.path, content: FATAL.decode(one.body) })
    } catch {
      return { why: `${one.path} ${NO_TEXT}` }
    }
  }
  return { rows }
}

export function statedIn(root: string, changes: readonly Held[]): Stated {
  const said = rowsOver(changes)
  if ("why" in said) return said
  return rowsFrom(root, baseOf(root), said.rows)
}

export function rowsIn(root: string, changes: readonly Held[]): readonly FileChange[] {
  const said = statedIn(root, changes)
  if ("why" in said) throw new Error(said.why)
  return said.rows
}

export const REFUSES: Judging = {
  named: ["refuses"],
  checksFor: () => ["refuses"],
  over: async (change) => change.changed.map((path) => ({ path, reason: "refused for the test" })),
}

export const bytes = bytesOf

export function gitOver(root: string): readonly string[] {
  const said = saying(["ps", "-eo", "args="])
  return said.split("\n").filter((one) => one.includes("cat-file") && one.includes(root))
}

export const ID = "01a04e11-0000-7000-8000-000000000001"

export const A = `export const a = { id: "${ID}", pageTypeSlug: "domain", slug: "a" }\n`

const IMPORTED = "akasha/held.ts"

const IMPORTING = "akasha/holding.ts"

export async function edged(named: Readonly<Record<string, string | Uint8Array>>): Promise<string> {
  return await edgedOver(repoWith(named))
}

export async function edgedOver(root: string): Promise<string> {
  const said = await landing(
    root,
    rowsIn(root, [
      { path: IMPORTED, body: bytesOf("export const held = 1\n") },
      {
        path: IMPORTING,
        body: bytesOf('import { held } from "./held.ts"\n\nexport const holding = held\n'),
      },
    ]),
    "the index holds an import edge",
    ADMITS
  )
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  return root
}

export const besides = (...paths: readonly string[]): readonly string[] =>
  [IMPORTED, IMPORTING, ...paths].sort()

export const filesIn = (root: string): readonly string[] =>
  git(root, ["ls-files"]).trim().split("\n").sort()

export function pageRepo(): string {
  return repoWith({ [PAGE]: A })
}

let carriedAt: string | null = null

async function carriedOnce(): Promise<string> {
  if (carriedAt !== null) return carriedAt
  const root = repoWith({ "seed.txt": "held" })
  await landing(root, rowsIn(root, CARRIED), "held", ADMITS)
  carriedAt = root
  return root
}

export async function carriedRepo(): Promise<string> {
  const from = await carriedOnce()
  const root = scratch.rootFor("akasha-landing-")
  cpSync(from, root, { recursive: true })
  return root
}

export async function pageLanded(root: string): Promise<string> {
  await landing(root, rowsIn(root, [{ path: PAGE, body: bytesOf(A) }]), "held", ADMITS)
  return root
}

const HELD_OUT = "deep/held.uncommitted.json"

const KEPT_OUT = "kept.uncommitted.json"

const PROPOSED = "proposed"

const OBJECTS = ".git/objects"

const FANOUT = 2

export const IGNORED_OUT: readonly string[] = [".gitignore", "new.txt", "one.txt"]

const SPLIT: readonly Held[] = [
  { path: "new.txt", body: bytesOf(PROPOSED) },
  { path: HELD_OUT, body: bytesOf("unsaid") },
]

function ignoringRepo(): string {
  return repoWith({ ".gitignore": "*.uncommitted.*\n", "one.txt": "committed" })
}

export function objectsShut(root: string, body: string): undefined {
  git(root, ["repack", "-a", "-d", "--quiet"])
  const oid = git(root, ["hash-object", "--stdin"], { stdin: bytesOf(body) }).trim()
  writeFileSync(join(root, OBJECTS, oid.slice(0, FANOUT)), "")
}

export async function splitLanded(): Promise<{
  readonly held: string
  readonly wrote: readonly string[]
  readonly files: readonly string[]
}> {
  const root = ignoringRepo()
  const said = await landing(root, rowsIn(root, SPLIT), "held", ADMITS)
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  if (said.commit === null) throw new Error("the landing committed nothing")
  return {
    held: readFileSync(join(root, HELD_OUT), "utf8"),
    wrote: said.wrote,
    files: git(root, ["ls-tree", "-r", "--name-only", "HEAD"]).trim().split("\n").sort(),
  }
}

export async function splitKept(): Promise<string | null> {
  const root = ignoringRepo()
  writeFileSync(join(root, KEPT_OUT), "was")
  objectsShut(root, PROPOSED)
  try {
    await landing(
      root,
      rowsIn(root, [
        { path: "new.txt", body: bytesOf(PROPOSED) },
        { path: KEPT_OUT, body: bytesOf("now") },
      ]),
      "held",
      ADMITS
    )
  } catch {}
  const full = join(root, KEPT_OUT)
  return existsSync(full) ? readFileSync(full, "utf8") : null
}

export async function splitThrew(): Promise<{
  readonly why: string
  readonly left: readonly string[]
}> {
  const root = ignoringRepo()
  objectsShut(root, PROPOSED)
  let why = ""
  try {
    await landing(root, rowsIn(root, SPLIT), "held", ADMITS)
  } catch (thrown) {
    why = thrown instanceof Error ? thrown.message : String(thrown)
  }
  const might = [HELD_OUT, "new.txt", "deep"]
  return { why, left: might.filter((one) => existsSync(join(root, one))) }
}

function typed(
  said: string,
  slug: string,
  above: readonly string[],
  declares: readonly string[] = []
): string {
  const properties = declares.map((one) => ({
    pagePropertySlug: one,
    required: false,
    many: false,
  }))
  const value = {
    id: `01a04e11-0000-7000-8000-0000000000${said}`,
    pageTypeSlug: "page-type",
    slug,
    extends: above,
    properties,
  }
  return `export const held = ${JSON.stringify(value)}\n`
}

export function committedAgain(root: string, path: string, body: string): undefined {
  writeFileSync(join(root, path), body)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "second"])
}

export async function landedMoving(root: string, read: string): Promise<Landed | Refused> {
  const rows = rowsIn(root, [{ path: PAGE, body: bytes("moved") }])
  return await landing(root, rows, "m", ADMITS, null, read)
}

export const TYPE = typed("02", "domain", ["page-type/page"])

export const NUL = new Uint8Array([104, 0, 101, 108, 100, 0, 0, 10])

export const BROKEN = new Uint8Array([0xff, 0xfe, 0x41, 0x80, 0x42, 0xc3, 0x28])

export const pagesRepo = (): string =>
  repoWith({ "akasha/a.domain.ts": A, "akasha/domain.page-type.ts": TYPE })

export const filedFor = (id: string): readonly string[] => [
  `page/id/${id}.jsonl`,
  "page-type/domain/slug/a.jsonl",
]

const VOCABULARY: readonly (readonly [string, string])[] = [
  ["akasha/page.page-type.ts", typed("11", "page", [], ["id", "slug"])],
  ["akasha/page-type.page-type.ts", typed("12", "page-type", ["page-type/page"])],
  ["akasha/page-property.page-type.ts", typed("13", "page-property", ["page-type/page"])],
  ["akasha/domain.page-type.ts", TYPE],
]

export const LINE = `{"path":"akasha/a.domain.ts","id":"${ID}"}`

const IDENTITY_UNDER: readonly string[] = ["/page/", "/page-property/", "/page-type/"]

const identityAmong = (found: readonly string[]): readonly string[] =>
  found.filter((one) => IDENTITY_UNDER.some((at) => one.startsWith(at)))

const REAL: readonly Value[] = [textProperty, idPage, slugPage]

const REAL_AT: readonly { readonly path: string; readonly value: Value }[] = REAL.map((page) => {
  const [at, value] = thePage(page)
  return { path: join("akasha", at), value }
})

export const CARRIED: readonly Held[] = [
  ...VOCABULARY.map(([path, body]) => ({ path, body: bytesOf(body) })),
  ...REAL_AT.map((one) => ({ path: one.path, body: bytesOf(bodyOf(one.value)) })),
  ...[...shapesAmong(REAL_AT)].map(([path, whole]) => ({ path, body: bytesOf(whole) })),
]

const TEXT = new TextDecoder()

export const CARRIED_IN: readonly FileChange[] = CARRIED.map((one) => ({
  kind: "add",
  path: one.path,
  content: TEXT.decode(one.body ?? undefined),
}))

export const THROWN = "thrown for the test"

export function gitWatching(root: string): {
  readonly reading: Judging
  readonly throwing: Judging
} {
  const held = (change: Change): undefined => {
    expect(change.after("one.txt")).not.toBeNull()
    expect(gitOver(root).length).toBe(1)
  }
  return {
    reading: judgingThat("reading", (change) => {
      held(change)
      return []
    }),
    throwing: judgingThat("throwing", (change) => {
      held(change)
      throw new Error(THROWN)
    }),
  }
}

export function putBackThrows(root: string): Promise<Landed | Refused> {
  const b = A.replace('slug: "a"', 'slug: "b"').replace("const a =", "const b =")
  return landing(
    root,
    rowsIn(root, [
      { path: PAGE, body: bytesOf("written over") },
      { path: "akasha/b.domain.ts", body: bytesOf(b) },
    ]),
    "m",
    ADMITS
  )
}

export function landedAtHead(root: string): Promise<Landed | Refused> {
  return landing(
    root,
    rowsIn(root, [
      { path: PAGE, body: bytesOf(A) },
      { path: "akasha/b.txt", body: bytesOf("new") },
    ]),
    "m",
    ADMITS,
    null,
    baseOf(root)
  )
}

export async function rebuiltBeside(): Promise<{
  readonly filed: readonly string[]
  readonly built: readonly string[]
  readonly landed: readonly string[]
  readonly again: readonly string[]
}> {
  const root = await pageLanded(await carriedRepo())
  const rebuilt = scratch.rootFor("akasha-rebuilt-")
  refreshedFrom(join(root, "akasha"), rebuilt, root)
  return {
    filed: identityAmong(everythingFiled(root)),
    built: identityAmong(everyFileUnder(rebuilt)),
    landed: butTheStamp(everythingFiled(root)),
    again: butTheStamp(everyFileUnder(rebuilt)),
  }
}

export async function landedNoting(asks: boolean): Promise<{
  readonly done: readonly string[]
  readonly noting: Committing
  readonly commit: string | null
}> {
  const root = repoWith({ "one.txt": "committed" })
  const done: string[] = []
  const noting: Committing = { commit: null }
  const asked = asks ? rowsIn(root, [{ path: "new.txt", body: bytesOf(PROPOSED) }]) : []
  const said = await landing(root, asked, "held", ADMITS, null, null, [], null, null, done, noting)
  return { done, noting, commit: "refusals" in said ? null : said.commit }
}

export async function pathsSeen(root: string): Promise<readonly string[]> {
  const seen: string[] = []
  const watching = judgingThat("watching", (change) => {
    seen.push(...change.changed)
    return []
  })
  await landing(
    root,
    rowsIn(root, [
      { path: "b.txt", body: bytesOf("one") },
      { path: "a.txt", body: bytesOf("two") },
    ]),
    "held",
    watching
  )
  return seen
}
