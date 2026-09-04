import { existsSync, readFileSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import { parsedAs } from "@akasha/code-system/code-source"
import { namersOf, readingIn } from "@akasha/indexes"
import { knownIn, namesIn, namingsIn, reaches, type Shaped } from "@akasha/indexes/reaching"
import { besideAll } from "@akasha/pages-system/page-beside"
import { textAt, type Value, valueAt } from "@akasha/pages-system/page-value"
import { said as saying } from "@akasha/utils-run/running"
import ts from "typescript"
import type { Asked } from "../../asking/asking.module.code.ts"
import { BREAK_GLASS, landingAsked } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { answering } from "../../calling/calling.module.code.ts"
import { checkReaches, judgedByNothing } from "../../judged-saying/judged-saying.module.code.ts"
import type { FileEdit } from "../../landing/landing.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import { dropReadings } from "../../reading/reading.module.code.ts"
import {
  barredIn,
  FILE_PATH,
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  offRepo,
  pathAt,
} from "../write/write.command.code.ts"
import { manifestingFor, manifestingSaid } from "./manifesting/remove-manifesting.module.code.ts"
import { leftNaming, leftNamingSaid } from "./naming/remove-naming.module.code.ts"
import type { Span } from "./workspacing/remove-workspacing.module.code.ts"
import {
  listEntrySpan,
  workspacingFor,
  workspacingSaid,
} from "./workspacing/remove-workspacing.module.code.ts"

const VALUED = [FILE_PATH, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const ID = "id"

export type Read = { readonly named: readonly string[] } | { readonly refused: string }

export function namedIn(argv: readonly string[]): Read {
  const named: string[] = []
  let at = 0
  while (at < argv.length) {
    const token = argv[at]
    if (token === undefined) break
    if (token === FILE_PATH) {
      const value = argv[at + 1]
      if (value === undefined) return { refused: `${FILE_PATH} takes a path, and none follows it` }
      if (value.startsWith("-")) {
        return { refused: `${FILE_PATH} takes a path, and \`${value}\` names another flag` }
      }
      named.push(value)
      at = at + 2
      continue
    }
    if (VALUED.includes(token)) {
      const value = argv[at + 1]
      if (value === undefined) return { refused: `${token} needs a value, and the line ends` }
      at = at + 2
      continue
    }
    if (token.startsWith("-")) {
      return {
        refused:
          `\`${token}\` is not a flag this takes — a removal names its paths as \`${FILE_PATH} <path>\` ` +
          `and takes \`${MESSAGE}\`, \`${MESSAGE_FILE}\`, \`${BREAK_GLASS}\``,
      }
    }
    return {
      refused:
        `\`${token}\` stands on its own, and a removal names every path behind a flag — ` +
        `say \`${FILE_PATH} ${token}\``,
    }
  }
  return { named }
}

export function trackedUnder(root: string, path: string): readonly string[] | null {
  try {
    const said = saying(["git", "-C", root, "ls-files", "-z", "--", path])
    return said.split("\0").filter((one) => one !== "")
  } catch {
    return null
  }
}

type Opened = {
  readonly opened: readonly string[]
  readonly under: readonly string[]
  readonly gone: readonly string[]
  readonly outside: readonly string[]
  readonly outsideUnder: readonly string[]
}

function openedIn(
  root: string,
  named: readonly string[]
): Opened | { readonly refusals: readonly string[] } {
  const refusals: string[] = []
  const opened: string[] = []
  const under: string[] = []
  const gone: string[] = []
  const outside: string[] = []
  const outsideUnder: string[] = []
  const seen = new Set<string>()
  for (const one of named) {
    const path = pathAt(root, one)
    if (path === null) {
      refusals.push(offRepo(one))
      continue
    }
    const barred = barredIn(root, path)
    if (barred !== null) {
      refusals.push(barred)
      continue
    }
    if (seen.has(path)) {
      refusals.push(`${path} is named more than once`)
      continue
    }
    seen.add(path)
    const at = join(root, path)
    if (!existsSync(at)) {
      gone.push(path)
      continue
    }
    if (!checkReaches(path)) outside.push(path)
    if (statSync(at).isFile()) {
      opened.push(path)
      continue
    }
    const held = trackedUnder(root, path)
    if (held === null) {
      refusals.push(
        `git could not establish which files it holds under ${path}, so this removal stopped ` +
          "before anything was judged and nothing was written"
      )
      continue
    }
    if (held.length === 0) {
      refusals.push(
        `${path} is a directory git holds no file under — a removal takes what the repository ` +
          "holds, so this would take nothing"
      )
      continue
    }
    for (const file of held) {
      if (seen.has(file)) continue
      seen.add(file)
      opened.push(file)
      under.push(file)
      if (!checkReaches(file)) outsideUnder.push(file)
    }
  }
  if (refusals.length > 0) return { refusals }
  return { opened, under, gone, outside, outsideUnder }
}

export type Naming = {
  readonly propertySlug: string
  readonly address: string
  readonly listed: boolean
}

export function namingFor(value: Value, known: Shaped, id: string): readonly Naming[] {
  const found: Naming[] = []
  for (const one of namingsIn(value, known)) {
    if (one.own) continue
    const wanted = known.targetOf(one.propertySlug)
    if (wanted === null) continue
    const listed = Array.isArray(one.held)
    for (const named of namesIn(one.held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached || reached.id !== id) continue
      found.push({ propertySlug: one.propertySlug, address: named, listed })
    }
  }
  return found
}

export type Unnamed = { readonly body: string; readonly left: readonly string[] }

export function unnamed(path: string, text: string, dropping: ReadonlySet<string>): Unnamed {
  const source = parsedAs(path, text)
  const spans: Span[] = []
  const left: string[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isStringLiteral(node) && dropping.has(node.text)) {
      const held: ts.Node | undefined = node.parent
      if (held !== undefined && ts.isArrayLiteralExpression(held)) {
        spans.push(listEntrySpan(text, node))
      } else {
        left.push(node.text)
      }
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  let body = text
  for (const one of [...spans].sort((first, next) => next.start - first.start)) {
    body = `${body.slice(0, one.start)}${body.slice(one.end)}`
  }
  return { body, left }
}

export type Unnaming = {
  readonly edits: readonly FileEdit[]
  readonly closed: readonly string[]
  readonly left: readonly string[]
}

export const NOTHING_UNNAMED: Unnaming = { edits: [], closed: [], left: [] }

export function unnamingOver(root: string, going: readonly string[]): Unnaming {
  const leaving = new Set(going)
  const ids = new Map<string, string>()
  for (const one of going) {
    const value = valueAt(one, root)
    const id = value === null ? null : textAt(value, ID)
    if (id !== null) ids.set(id, one)
  }
  if (ids.size === 0) return NOTHING_UNNAMED
  const known = knownIn(readingIn(root), (path) => valueAt(path, root))
  const dropping = new Map<string, Set<string>>()
  const closed: string[] = []
  const left: string[] = []
  for (const [id, from] of ids) {
    for (const path of new Set(namersOf(root, id).map((one) => one.path))) {
      if (leaving.has(path)) continue
      const value = valueAt(path, root)
      if (value === null) continue
      for (const one of namingFor(value, known, id)) {
        if (!one.listed) {
          left.push(
            `${path} names ${from} at \`${one.propertySlug}\`, which holds one name rather than ` +
              "a list, so this removal left that name where it was"
          )
          continue
        }
        dropping.set(path, (dropping.get(path) ?? new Set<string>()).add(one.address))
      }
    }
  }
  const edits: FileEdit[] = []
  for (const [path, addresses] of dropping) {
    const text = readFileSync(join(root, path), "utf8")
    const said = unnamed(path, text, addresses)
    for (const one of said.left) {
      left.push(
        `${path} names \`${one}\` somewhere other than a list, so this removal left that name ` +
          "where it was"
      )
    }
    if (said.body === text) continue
    edits.push({ path, body: new TextEncoder().encode(said.body) })
    closed.push(
      `${path} no longer names ${[...addresses]
        .sort()
        .map((one) => `\`${one}\``)
        .join(", ")}`
    )
  }
  return { edits, closed, left }
}

export function unnamingFor(root: string, going: readonly string[]): Unnaming {
  try {
    return unnamingOver(root, going)
  } catch (why) {
    return {
      edits: [],
      closed: [],
      left: [
        "what named these could not be read from the index, so nothing was unnamed and the " +
          `removal went ahead alone — ${why instanceof Error ? why.message : String(why)}`,
      ],
    }
  }
}

function alreadyGone(gone: readonly string[]): readonly string[] {
  return gone.map(
    (one) =>
      `${one} was already gone, so nothing was taken away for it and any reading of it is forgotten`
  )
}

function wentWith(
  under: readonly string[],
  beside: readonly string[],
  cleared: readonly string[]
): readonly string[] {
  const report: string[] = []
  if (under.length > 0) {
    report.push(`these stood under a directory you named and went with it — ${under.join(", ")}`)
  }
  if (beside.length > 0) {
    report.push(`these stood beside what you named and went with it — ${beside.join(", ")}`)
  }
  if (cleared.length > 0) {
    report.push(
      `these were left empty by the removal and went, since git holds no empty directory — ${cleared.join(", ")}`
    )
  }
  return report
}

export function remove(argv: readonly string[], given: Given): Answer {
  const read = namedIn(argv)
  if ("refused" in read) return answering([], [read.refused], 1)
  if (read.named.length === 0) {
    return answering([], [`name at least one path to remove, as \`${FILE_PATH} <path>\``], 1)
  }
  const glass = glassIn(argv, VALUED)
  if ("refusals" in glass) return answering([], glass.refusals, 1)
  const stated = messageIn(argv, VALUED)
  if ("refusals" in stated) return answering([], stated.refusals, 1)
  const root = resolve(given.root)
  const held = openedIn(root, read.named)
  if ("refusals" in held) return answering([], held.refusals, 1)
  const beside = besideAll(root, held.opened.filter(checkReaches))
  const paths = [...held.opened, ...beside].sort()
  const gone = [...held.gone].sort()
  const already = alreadyGone(gone)
  const base = baseOf(root)
  const naming = leftNaming(
    root,
    base,
    held.outside,
    held.outsideUnder,
    new Set([...paths, ...gone])
  )
  if ("refusal" in naming) return answering([], [naming.refusal], 1)
  if (paths.length === 0) {
    dropReadings(root, gone)
    return answering(
      [
        ...already,
        "nothing stood to be taken away, so nothing was written and nothing was committed",
      ],
      [],
      0
    )
  }
  const mend = unnamingFor(root, paths)
  const spread = workspacingFor(root, base, new Set(paths))
  const ways = manifestingFor(root, base, new Set(paths))
  const changes: readonly FileEdit[] = [
    ...paths.map((path) => ({ path, body: null })),
    ...mend.edits,
    ...spread.edits,
    ...ways.edits,
  ]
  const asked: Asked = {
    changes,
    message: stated.message ?? `remove ${paths.join(", ")}`,
    dryRun: false,
    glass: glass.glass,
    unmoved: [...spread.unmoved, ...ways.unmoved],
    saying: (landed) => [
      ...landed.took.map((one) => `${one} taken away`),
      ...already,
      ...wentWith(held.under, beside, landed.cleared),
      ...judgedByNothing(held.outside, false),
      ...leftNamingSaid(held.outside, naming),
      ...mend.closed,
      ...mend.left,
      ...workspacingSaid(spread),
      ...manifestingSaid(ways),
    ],
  }
  const said = landingAsked({ ...given, root }, asked)
  if (said.code === 0) dropReadings(root, [...paths, ...gone])
  return said
}
