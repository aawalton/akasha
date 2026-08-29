import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path"
import { placedIn } from "../../../code-system/code-specifier.module.code.ts"
import { indexIn, standingByPath } from "../../../pages-system/index/index-reading.module.code.ts"
import { besideOf } from "../../../pages-system/page/page-beside.module.code.ts"
import type { Answer, Given, Surface } from "../../calling.module.code.ts"
import type { Change } from "../../landing.module.code.ts"
import type { Asked } from "../write/write.command.code.ts"
import {
  BREAK_GLASS,
  COMMITTING,
  DRY_RUN,
  glassIn,
  landingAsked,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
} from "../write/write.command.code.ts"

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
    "the `code` and `test` files standing beside what you name go with it.",
  ],
}

const RELATIVE = /^\.\.?\//

export const PATHS_AT = ".git/data/index/identity/page/path"

const NO_PATHS =
  `\`${PATHS_AT}\` is not there, so what names it could not be answered — an index that is ` +
  "missing is not an index naming no page"

const NOT_ESTABLISHED =
  "nothing was repointed in the files that import what moved — the index carries no edge from a " +
  "file to the files importing it, so this move did not establish them"

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

export function underAkasha(root: string, from: string, named: string): string | null {
  const full = isAbsolute(named) ? named : resolve(from, named)
  const path = relative(root, full)
  if (path === "" || path.startsWith("..") || isAbsolute(path)) return null
  if (path !== AKASHA && !path.startsWith(INSIDE)) return null
  return path
}

export type Naming = { readonly names: readonly string[] } | { readonly unread: string }

export function namingOf(root: string, path: string): Naming {
  const index = indexIn(root)
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
  const dir = join(index, "relation", "page", "id", held.id)
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

function landedAt(path: string, specifier: string): string | null {
  if (!RELATIVE.test(specifier)) return null
  return join(dirname(path), specifier)
}

function specifierFor(dir: string, target: string): string {
  const said = relative(dir, target)
  return said.startsWith(".") ? said : `./${said}`
}

export function repointed(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): string {
  const dir = dirname(now)
  let out = ""
  let at = 0
  for (const one of placedIn(now, text)) {
    const landed = landedAt(was, one.text)
    if (landed === null) continue
    const next = specifierFor(dir, moved.get(landed) ?? landed)
    if (next === one.text) continue
    out = `${out}${text.slice(at, one.start)}${JSON.stringify(next)}`
    at = one.end
  }
  return `${out}${text.slice(at)}`
}

function answering(report: readonly string[], refusals: readonly string[], code: number): Answer {
  return { report, refusals, code }
}

type Sided = {
  readonly from: string
  readonly to: string
  readonly named: boolean
}

function sidedIn(
  root: string,
  given: Given,
  pairs: readonly Pair[]
): { readonly sides: readonly Sided[] } | { readonly refusals: readonly string[] } {
  const refusals: string[] = []
  const sides: Sided[] = []
  const seen = new Set<string>()
  const taken = new Set<string>()
  for (const one of pairs) {
    const from = underAkasha(root, given.from, one.from)
    const to = underAkasha(root, given.from, one.to)
    if (from === null || to === null) {
      const outside = from === null ? one.from : one.to
      refusals.push(
        `\`${outside}\` stands outside the \`${AKASHA}\` folder, and this carries nothing in or out of it`
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

function carrying(sides: readonly Sided[], dry: boolean): readonly string[] {
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
  report.push(NOT_ESTABLISHED)
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
  const sided = sidedIn(root, given, read.pairs)
  if ("refusals" in sided) return answering([], sided.refusals, 1)
  const moved = new Map<string, string>(sided.sides.map((one) => [one.from, one.to]))
  const changes: Change[] = []
  for (const one of sided.sides) {
    const bytes = readFileSync(join(root, one.from))
    if (!one.from.endsWith(TS)) {
      changes.push({ path: one.to, body: bytes })
      changes.push({ path: one.from, body: null })
      continue
    }
    let text: string
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(bytes)
    } catch {
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
  const message =
    said.message ?? `move ${sided.sides.map((one) => `${one.from} to ${one.to}`).join(", ")}`
  const asked: Asked = {
    changes,
    message,
    dryRun: read.dryRun,
    glass: glass.glass,
    unmoved: [],
    saying: () => carrying(sided.sides, false),
  }
  const landed = landingAsked({ ...given, root }, asked)
  if (landed.code !== 0 || !read.dryRun) return landed
  return answering([...carrying(sided.sides, true), ...landed.report], [], 0)
}
