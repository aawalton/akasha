import { existsSync, statSync } from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import type { Standing } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  everyPath,
  importersOf,
  standingByPathAnswered,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { besideOf } from "../../../pages-system/page/page-beside/page-beside.module.code.ts"
import { uncommittedNamed } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Asked } from "../../asking/asking.module.code.ts"
import {
  BREAK_GLASS,
  counted,
  DRY_RUN,
  landingAsked,
  textOf,
} from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { answering } from "../../calling/calling.module.code.ts"
import { bodyAt } from "../../commit-reading/commit-reading.module.code.ts"
import type { FileCarry, FileEdit } from "../../landing/landing.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import type { Carry } from "../../reading/reading.module.code.ts"
import { blobIdOf, carryReadings } from "../../reading/reading.module.code.ts"
import {
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  pathInside,
} from "../write/write.command.code.ts"
import type { Renaming } from "./move-renaming/move-renaming.module.code.ts"
import {
  addressingOver,
  besideRenamed,
  renamingFor,
  respelled,
  restated,
} from "./move-renaming/move-renaming.module.code.ts"
import { repointed } from "./move-repointing/move-repointing.module.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const TS = ".ts"

const FROM = "--from"

const TO = "--to"

const VALUED = [FROM, TO, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE = [DRY_RUN]

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

export type Naming = { readonly held: Standing | null } | { readonly unread: string }

export function namingOf(root: string, path: string): Naming {
  let standing: readonly Standing[]
  try {
    standing = standingByPathAnswered(root, path)
  } catch (cause) {
    return { unread: cause instanceof Error ? cause.message : String(cause) }
  }
  if (standing.length > 1) {
    return {
      unread:
        `the index answers ${standing.length} pages to the path \`${path}\`, so what names it ` +
        "could not be answered",
    }
  }
  return { held: standing[0] ?? null }
}

const NOTHING_SAID: ReadonlyMap<string, string> = new Map()

export type Reading = { readonly importers: readonly string[] } | { readonly unread: string }

export function importingOf(root: string, moved: ReadonlyMap<string, string>): Reading {
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
  readonly committed: boolean
  readonly renaming: Renaming | null
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
    let renaming: Renaming | null = null
    if (basename(from) !== basename(to)) {
      const naming = namingOf(root, from)
      if ("unread" in naming) {
        refusals.push(naming.unread)
        continue
      }
      if (naming.held === null || naming.held.path !== from) {
        refusals.push(
          `${from} is no page's own file, and the one name a move changes is a page's own slug`
        )
        continue
      }
      const asked = renamingFor(from, to, naming.held.id)
      if ("refused" in asked) {
        refusals.push(asked.refused)
        continue
      }
      renaming = asked.renaming
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
    sides.push({ from, to, named: true, committed: true, renaming })
    for (const held of besideOf(root, from)) {
      if (seen.has(held)) continue
      seen.add(held)
      const name = basename(held)
      const there = join(dirname(to), renaming === null ? name : besideRenamed(name, renaming))
      if (existsSync(join(root, there))) {
        refusals.push(`${there} already stands, and the sidecar ${held} goes with what you named`)
        continue
      }
      taken.add(there)
      sides.push({
        from: held,
        to: there,
        named: false,
        committed: !uncommittedNamed(held),
        renaming: null,
      })
    }
  }
  if (refusals.length > 0) return { refusals }
  return { sides }
}

function carrying(sides: readonly Sided[], reached: Reached, dry: boolean): readonly string[] {
  const report = sides
    .filter((one) => one.named)
    .map((one) => {
      const said = `${one.from} ${dry ? "would move to" : "moved to"} ${one.to}`
      if (one.renaming === null) return said
      const now = one.renaming.now
      return `${said}, ${dry ? "renaming" : "renamed"} from the slug \`${one.renaming.was}\` to \`${now}\``
    })
  const beside = sides.filter((one) => !one.named)
  if (beside.length > 0) {
    const said = beside.map((one) => `${one.from} to ${one.to}`).join(", ")
    report.push(
      dry
        ? `these stand beside what you named and would go with it — ${said}`
        : `these stood beside what you named and went with it — ${said}`
    )
  }
  if (reached.repointed.length === 0) {
    report.push("no file naming what moved needed repointing")
  } else {
    report.push(
      `${counted(reached.repointed.length, "file")} naming what moved ` +
        `${dry ? "would be" : "was"} repointed — ${reached.repointed.join(", ")}`
    )
  }
  if (reached.unread !== null) report.push(reached.unread)
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
  const bodyText = (path: string): string | null => {
    const bytes = bodyAt(root, stood, path)
    return bytes === null ? null : textOf(bytes)
  }
  const renamings = sided.sides.flatMap((one) => (one.renaming === null ? [] : [one.renaming]))
  const addressing = addressingOver(root, renamings, bodyText)
  const changes: FileEdit[] = []
  const carries: Carry[] = []
  const uncommitted: FileCarry[] = []
  for (const one of sided.sides) {
    if (!one.committed) {
      uncommitted.push({ from: one.from, to: one.to })
      continue
    }
    const bytes = bodyAt(root, stood, one.from)
    if (bytes === null) {
      return answering(
        [],
        [`${one.from} stands in no commit at \`${stood}\`, so what it holds cannot be moved`],
        2
      )
    }
    carries.push({ was: one.from, now: one.to, from: blobIdOf(bytes) })
    if (!one.from.endsWith(TS)) {
      changes.push({ path: one.to, body: bytes, carried: true })
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
    const said = repointed(one.from, one.to, text, moved)
    let next = respelled(one.to, said, addressing.get(one.from) ?? NOTHING_SAID)
    const renaming = one.renaming
    if (renaming !== null) {
      const now = restated(one.to, next, renaming.now)
      if (now === null) {
        return answering(
          [],
          [`${one.from} states no slug, so \`${renaming.now}\` would rename nothing`],
          2
        )
      }
      next = now
    }
    changes.push({ path: one.to, body: new TextEncoder().encode(next), carried: true })
    changes.push({ path: one.from, body: null })
  }
  const reading = importingOf(root, moved)
  const naming = new Set<string>("importers" in reading ? reading.importers : [])
  for (const path of addressing.keys()) naming.add(path)
  if ("importers" in reading) {
    for (const path of spellingOf(root, stood, moved, naming)) naming.add(path)
  }
  const repointing: string[] = []
  for (const path of [...naming].sort()) {
    if (!path.endsWith(TS) || moved.has(path)) continue
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
    const said = repointed(path, path, text, moved)
    const next = respelled(path, said, addressing.get(path) ?? NOTHING_SAID)
    if (next === text) continue
    repointing.push(path)
    carries.push({ was: path, now: path, from: blobIdOf(held) })
    changes.push({ path, body: new TextEncoder().encode(next), carried: true })
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
    carries: uncommitted,
    saying: () => carrying(sided.sides, reached, false),
  }
  const landed = landingAsked({ ...given, root }, asked)
  if (landed.code === 0 && !read.dryRun) carryReadings(root, carries)
  if (landed.code !== 0 || !read.dryRun) return landed
  return answering([...carrying(sided.sides, reached, true), ...landed.report], [], 0)
}
