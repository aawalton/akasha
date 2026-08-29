import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import { indexImport } from "../../../pages-system/indexes/index/index-import/index-import.index.ts"
import { indexPath } from "../../../pages-system/indexes/index/index-path/index-path.index.ts"
import { indexRelation } from "../../../pages-system/indexes/index/index-relation/index-relation.index.ts"
import {
  everyPath,
  importersOf,
  indexAt,
  standingByPath,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { besideOf } from "../../../pages-system/page/page-beside/page-beside.module.code.ts"
import type { Asked } from "../../asking/asking.module.code.ts"
import {
  BREAK_GLASS,
  counted,
  DRY_RUN,
  landingAsked,
  textOf,
} from "../../asking/asking.module.code.ts"
import type { Answer, Given, Surface } from "../../calling/calling.module.code.ts"
import { answering } from "../../calling/calling.module.code.ts"
import type { Change } from "../../landing.module.code.ts"
import { baseOf, bodyAt } from "../../landing.module.code.ts"
import {
  COMMITTING,
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  pathInside,
} from "../write/write.command.code.ts"
import { repointed } from "./move-repointing/move-repointing.module.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const TS = ".ts"

const FROM = "--from"

const TO = "--to"

const VALUED = [FROM, TO, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE = [DRY_RUN]

export const surface: Surface = {
  taking: [
    { said: `${FROM} <path>`, takes: "the path a body stands at now" },
    { said: `${TO} <path>`, takes: "the path it arrives at, called the same name" },
    ...COMMITTING,
  ],
  notes: [
    `${FROM} and ${TO} repeat in pairs, so several bodies move in one commit.`,
    "a page states its own slug, so a move carries a body and never renames it.",
    "the files standing beside what you name go with it.",
    "the files naming what moves are repointed in the same commit.",
    "a path is read against the repository root, wherever the call was made.",
  ],
}

const BY_PATH = "path"

export const PATHS_AT = indexAt(indexPath.indexName)

export const IMPORTS_AT = indexAt(indexImport.indexName, BY_PATH)

const NO_PATHS =
  `\`${PATHS_AT}\` is not there, so what names it could not be answered — an index that is ` +
  "missing is not an index naming no page"

const NO_IMPORTS =
  `\`${IMPORTS_AT}\` is not there, so what names the moved files could not be answered and ` +
  "none were repointed — an index that is missing is not an index naming no importer"

const OUTSIDE_INDEX =
  `the index carries \`${INSIDE}\` alone, so a file outside it importing what moved stands ` +
  "unrepointed and was not looked for"

export type Pair = {
  readonly from: string
  readonly to: string
}

export type Read =
  | { readonly pairs: readonly Pair[]; readonly dryRun: boolean }
  | { readonly refused: string }

export function pairsIn(argv: readonly string[]): Read {
  const pairs: Pair[] = []
  let pending: string | null = null
  let dryRun = false
  let at = 0
  while (at < argv.length) {
    const token = argv[at]
    if (token === undefined) break
    if (BARE.includes(token)) {
      dryRun = true
      at = at + 1
      continue
    }
    if (!VALUED.includes(token)) {
      return {
        refused: `\`${token}\` is not a flag this takes — a move names its sides as \`${FROM} <path> ${TO} <path>\``,
      }
    }
    const value = argv[at + 1]
    const carries = token === MESSAGE || token === MESSAGE_FILE || token === BREAK_GLASS
    if (value === undefined || (value.startsWith("-") && !carries)) {
      return { refused: `${token} needs a value, and the line ends or names another flag` }
    }
    at = at + 2
    if (carries) continue
    if (token === FROM) {
      if (pending !== null) {
        return { refused: `${FROM} ${pending} has no ${TO} — each pair names both sides` }
      }
      pending = value
      continue
    }
    if (pending === null) {
      return { refused: `${TO} ${value} has no ${FROM} — each pair names both sides` }
    }
    pairs.push({ from: pending, to: value })
    pending = null
  }
  if (pending !== null) {
    return { refused: `${FROM} ${pending} has no ${TO} — each pair names both sides` }
  }
  return { pairs, dryRun }
}

export type Naming = { readonly names: readonly string[] } | { readonly unread: string }

export function namingOf(root: string, path: string): Naming {
  if (!existsSync(join(root, PATHS_AT))) return { unread: NO_PATHS }
  const standing = standingByPath(root, path)
  if (standing.length > 1) {
    return {
      unread:
        `the index answers ${standing.length} pages to the path \`${path}\`, so what names it ` +
        "could not be answered",
    }
  }
  const held = standing[0]
  if (held === undefined) return { names: [] }
  const dir = join(root, indexAt(indexRelation.indexName, "page", "id", held.id))
  if (!existsSync(dir)) return { names: [] }
  const found = new Set<string>()
  for (const property of readdirSync(dir)) {
    const at = join(dir, property)
    if (!statSync(at).isDirectory()) continue
    for (const name of readdirSync(at)) {
      for (const line of readFileSync(join(at, name), "utf8").split("\n")) {
        if (line === "") continue
        const said = JSON.parse(line) as { readonly path?: unknown }
        if (typeof said.path === "string") found.add(`${said.path} (${property})`)
      }
    }
  }
  return { names: [...found].sort() }
}

export type Reading = { readonly importers: readonly string[] } | { readonly unread: string }

export function importingOf(root: string, moved: ReadonlyMap<string, string>): Reading {
  if (!existsSync(join(root, IMPORTS_AT))) return { unread: NO_IMPORTS }
  const found = new Set<string>()
  for (const from of moved.keys()) {
    let said: readonly string[]
    try {
      said = importersOf(root, from)
    } catch (cause) {
      const why = cause instanceof Error ? cause.message : String(cause)
      return { unread: `${why}, so none were repointed` }
    }
    for (const one of said) {
      if (moved.has(one)) continue
      found.add(one)
    }
  }
  return { importers: [...found].sort() }
}

function spellingOf(
  root: string,
  stood: string,
  moved: ReadonlyMap<string, string>,
  known: ReadonlySet<string>
): readonly string[] {
  const names = [...new Set([...moved.keys()].map((one) => basename(one)))]
  const found: string[] = []
  for (const path of everyPath(root)) {
    if (!path.endsWith(TS) || moved.has(path) || known.has(path)) continue
    const held = bodyAt(root, stood, path)
    if (held === null) continue
    const text = textOf(held)
    if (text === null) continue
    if (names.some((name) => text.includes(name))) found.push(path)
  }
  return found
}

type Sided = {
  readonly from: string
  readonly to: string
  readonly named: boolean
}

type Reached = {
  readonly repointed: readonly string[]
  readonly unread: string | null
  readonly reaching: boolean
}

function sidedIn(
  root: string,
  pairs: readonly Pair[]
): { readonly sides: readonly Sided[] } | { readonly refusals: readonly string[] } {
  const refusals: string[] = []
  const sides: Sided[] = []
  const seen = new Set<string>()
  const taken = new Set<string>()
  for (const one of pairs) {
    const from = pathInside(root, one.from)
    const to = pathInside(root, one.to)
    if (from === null || to === null) {
      const outside = from === null ? one.from : one.to
      refusals.push(
        `\`${outside}\` is not under \`${INSIDE}\` — a path is read against the repository root, ` +
          "and this carries nothing in or out of that folder"
      )
      continue
    }
    if (from === to) {
      refusals.push(
        `${from} is named as both sides of a pair, so this pair asks for no move at all`
      )
      continue
    }
    if (!existsSync(join(root, from))) {
      refusals.push(`${from} is not there, so there is no body to carry`)
      continue
    }
    if (!statSync(join(root, from)).isFile()) {
      refusals.push(`${from} is not a file — a move carries bodies, and a directory holds none`)
      continue
    }
    if (existsSync(join(root, to))) {
      refusals.push(`${to} already stands, and a move writes over nothing`)
      continue
    }
    if (basename(from) !== basename(to)) {
      const naming = namingOf(root, from)
      const among =
        "unread" in naming
          ? naming.unread
          : naming.names.length === 0
            ? "the index shows no page naming it"
            : `these name it — ${naming.names.join(", ")}`
      refusals.push(
        `${from} would arrive called \`${basename(to)}\` — a move carries a body as it stands, and a ` +
          `page states its own slug and is named by that slug, so renaming is not a move (${among})`
      )
      continue
    }
    if (seen.has(from)) {
      refusals.push(`${from} is named as the source of more than one pair`)
      continue
    }
    if (taken.has(to)) {
      refusals.push(`${to} is named as the destination of more than one pair`)
      continue
    }
    seen.add(from)
    taken.add(to)
    sides.push({ from, to, named: true })
    for (const held of besideOf(root, from)) {
      if (seen.has(held)) continue
      seen.add(held)
      const there = join(dirname(to), basename(held))
      if (existsSync(join(root, there))) {
        refusals.push(`${there} already stands, and the sidecar ${held} goes with what you named`)
        continue
      }
      taken.add(there)
      sides.push({ from: held, to: there, named: false })
    }
  }
  if (refusals.length > 0) return { refusals }
  return { sides }
}

function carrying(sides: readonly Sided[], reached: Reached, dry: boolean): readonly string[] {
  const report = sides
    .filter((one) => one.named)
    .map((one) => `${one.from} ${dry ? "would move to" : "moved to"} ${one.to}`)
  const beside = sides.filter((one) => !one.named)
  if (beside.length > 0) {
    const said = beside.map((one) => `${one.from} to ${one.to}`).join(", ")
    report.push(
      dry
        ? `these stand beside what you named and would go with it — ${said}`
        : `these stood beside what you named and went with it — ${said}`
    )
  }
  if (reached.unread !== null) report.push(reached.unread)
  else if (reached.repointed.length === 0) {
    report.push("no file naming what moved needed repointing")
  } else {
    report.push(
      `${counted(reached.repointed.length, "file")} naming what moved ` +
        `${dry ? "would be" : "was"} repointed — ${reached.repointed.join(", ")}`
    )
  }
  if (reached.reaching) report.push(OUTSIDE_INDEX)
  return report
}

export function move(argv: readonly string[], given: Given): Answer {
  const read = pairsIn(argv)
  if ("refused" in read) return answering([], [read.refused], 1)
  if (read.pairs.length === 0) {
    return answering([], [`name at least one pair to move, as \`${FROM} <path> ${TO} <path>\``], 1)
  }
  const glass = glassIn(argv, VALUED)
  if ("refusals" in glass) return answering([], glass.refusals, 1)
  const said = messageIn(argv, VALUED)
  if ("refusals" in said) return answering([], said.refusals, 1)
  const root = resolve(given.root)
  const stood = baseOf(root)
  const sided = sidedIn(root, read.pairs)
  if ("refusals" in sided) return answering([], sided.refusals, 1)
  const moved = new Map<string, string>(sided.sides.map((one) => [one.from, one.to]))
  const changes: Change[] = []
  for (const one of sided.sides) {
    const bytes = bodyAt(root, stood, one.from)
    if (bytes === null) {
      return answering(
        [],
        [`${one.from} stands in no commit at \`${stood}\`, so what it holds cannot be moved`],
        2
      )
    }
    if (!one.from.endsWith(TS)) {
      changes.push({ path: one.to, body: bytes })
      changes.push({ path: one.from, body: null })
      continue
    }
    const text = textOf(bytes)
    if (text === null) {
      return answering(
        [],
        [
          `${one.from} is named \`${TS}\` and its bytes are not utf-8, so its specifiers cannot be read`,
        ],
        2
      )
    }
    changes.push({
      path: one.to,
      body: new TextEncoder().encode(repointed(one.from, one.to, text, moved)),
    })
    changes.push({ path: one.from, body: null })
  }
  const reading = importingOf(root, moved)
  const repointing: string[] = []
  if ("importers" in reading) {
    const naming = new Set<string>(reading.importers)
    for (const path of spellingOf(root, stood, moved, naming)) naming.add(path)
    for (const path of [...naming].sort()) {
      if (!path.endsWith(TS)) continue
      const held = bodyAt(root, stood, path)
      if (held === null) continue
      const text = textOf(held)
      if (text === null) {
        return answering(
          [],
          [
            `${path} names what moved and its bytes are not utf-8, so what it says cannot be repointed`,
          ],
          2
        )
      }
      const next = repointed(path, path, text, moved)
      if (next === text) continue
      repointing.push(path)
      changes.push({ path, body: new TextEncoder().encode(next) })
    }
  }
  const reached: Reached = {
    repointed: repointing,
    unread: "unread" in reading ? reading.unread : null,
    reaching: [...moved.keys()].some((one) => one.endsWith(TS)),
  }
  const message =
    said.message ?? `move ${sided.sides.map((one) => `${one.from} to ${one.to}`).join(", ")}`
  const asked: Asked = {
    changes,
    message,
    dryRun: read.dryRun,
    glass: glass.glass,
    unmoved: [],
    read: stood,
    saying: () => carrying(sided.sides, reached, false),
  }
  const landed = landingAsked({ ...given, root }, asked)
  if (landed.code !== 0 || !read.dryRun) return landed
  return answering([...carrying(sided.sides, reached, true), ...landed.report], [], 0)
}
