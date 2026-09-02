import { existsSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import { besideAll } from "@akasha/pages-system/page-beside"
import { said as saying } from "@akasha/utils-run/running"
import type { Asked } from "../../asking/asking.module.code.ts"
import { BREAK_GLASS, DRY_RUN, landingAsked } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { answering } from "../../calling/calling.module.code.ts"
import { wouldClear } from "../../folder-clearing/folder-clearing.module.code.ts"
import type { FileEdit } from "../../landing/landing.module.code.ts"
import { dropReadings } from "../../reading/reading.module.code.ts"
import {
  FILE_PATH,
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  pathAt,
} from "../write/write.command.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const GIT_DIR = ".git"

const PARTED_BY = "/"

const VALUED = [FILE_PATH, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

export type Read =
  | { readonly named: readonly string[]; readonly dryRun: boolean }
  | { readonly refused: string }

export function namedIn(argv: readonly string[]): Read {
  const named: string[] = []
  let dryRun = false
  let at = 0
  while (at < argv.length) {
    const token = argv[at]
    if (token === undefined) break
    if (token === DRY_RUN) {
      dryRun = true
      at = at + 1
      continue
    }
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
          `and takes \`${MESSAGE}\`, \`${MESSAGE_FILE}\`, \`${BREAK_GLASS}\`, \`${DRY_RUN}\``,
      }
    }
    return {
      refused:
        `\`${token}\` stands on its own, and a removal names every path behind a flag — ` +
        `say \`${FILE_PATH} ${token}\``,
    }
  }
  return { named, dryRun }
}

export function trackedUnder(root: string, path: string): readonly string[] | null {
  try {
    const said = saying(["git", "-C", root, "ls-files", "-z", "--", path])
    return said.split("\0").filter((one) => one !== "")
  } catch {
    return null
  }
}

export function insideAkasha(path: string): boolean {
  return path.startsWith(INSIDE)
}

export function barredIn(root: string, path: string): string | null {
  if (path === GIT_DIR || path.startsWith(`${GIT_DIR}${PARTED_BY}`)) {
    return (
      `${path} is inside \`${GIT_DIR}/\`, which holds the repository itself rather than ` +
      "anything the repository says"
    )
  }
  if (path.includes(PARTED_BY)) return null
  const at = join(root, path)
  if (!existsSync(at) || !statSync(at).isDirectory()) return null
  return (
    `${path} is a folder at the top of the repository — name what is inside it, so no one call ` +
    "takes a whole tree away by a slip of the keyboard"
  )
}

type Opened = {
  readonly opened: readonly string[]
  readonly under: readonly string[]
  readonly gone: readonly string[]
  readonly outside: readonly string[]
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
  const seen = new Set<string>()
  for (const one of named) {
    const path = pathAt(root, one)
    if (path === null) {
      refusals.push(
        `\`${one}\` is no path inside the repository — a path is read against the repository ` +
          "root, and this takes nothing from outside the repository"
      )
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
    if (!insideAkasha(path)) outside.push(path)
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
    }
  }
  if (refusals.length > 0) return { refusals }
  return { opened, under, gone, outside }
}

function judgedByNothing(outside: readonly string[], dry: boolean): readonly string[] {
  if (outside.length === 0) return []
  return [
    `no check judges a path outside \`${INSIDE}\`, so what these carry ` +
      `${dry ? "would go" : "went"} unjudged — ${outside.join(", ")}`,
  ]
}

function alreadyGone(gone: readonly string[], dry: boolean): readonly string[] {
  return gone.map((one) =>
    dry
      ? `${one} is already gone, so nothing would be taken away for it`
      : `${one} was already gone, so nothing was taken away for it and any reading of it is forgotten`
  )
}

function wouldGo(
  root: string,
  paths: readonly string[],
  under: readonly string[],
  beside: readonly string[]
): readonly string[] {
  const report = paths.map((one) => `${one} would be taken away`)
  if (under.length > 0) {
    report.push(
      `these stand under a directory you named and would go with it — ${under.join(", ")}`
    )
  }
  if (beside.length > 0) {
    report.push(`these stand beside what you named and would go with it — ${beside.join(", ")}`)
  }
  const cleared = wouldClear(root, paths)
  if (cleared.length > 0) {
    report.push(
      `these would be left empty by the removal and would go, since git holds no empty directory — ${cleared.join(", ")}`
    )
  }
  return report
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
  const beside = besideAll(root, held.opened.filter(insideAkasha))
  const paths = [...held.opened, ...beside].sort()
  const gone = [...held.gone].sort()
  const already = alreadyGone(gone, read.dryRun)
  if (paths.length === 0) {
    if (!read.dryRun) dropReadings(root, gone)
    return answering(
      [
        ...already,
        read.dryRun
          ? `nothing would be taken away — ${DRY_RUN}`
          : "nothing stood to be taken away, so nothing was written and nothing was committed",
      ],
      [],
      0
    )
  }
  const changes: readonly FileEdit[] = paths.map((path) => ({ path, body: null }))
  const asked: Asked = {
    changes,
    message: stated.message ?? `remove ${paths.join(", ")}`,
    dryRun: read.dryRun,
    glass: glass.glass,
    unmoved: [],
    saying: (landed) => [
      ...landed.took.map((one) => `${one} taken away`),
      ...already,
      ...wentWith(held.under, beside, landed.cleared),
      ...judgedByNothing(held.outside, false),
    ],
  }
  const said = landingAsked({ ...given, root }, asked)
  if (said.code === 0 && !read.dryRun) dropReadings(root, [...paths, ...gone])
  if (said.code !== 0 || !read.dryRun) return said
  return answering(
    [
      ...wouldGo(root, paths, held.under, beside),
      ...already,
      ...judgedByNothing(held.outside, true),
      ...said.report,
    ],
    [],
    0
  )
}
