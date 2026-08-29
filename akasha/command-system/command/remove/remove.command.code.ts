import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, rmdirSync, statSync } from "node:fs"
import { dirname, isAbsolute, join, relative, resolve } from "node:path"
import { besideOf } from "../../../pages-system/page/page-beside.module.code.ts"
import type { Answer, Given, Surface } from "../../calling.module.code.ts"
import type { Change } from "../../landing.module.code.ts"
import type { Asked } from "../write/write.command.code.ts"
import {
  BREAK_GLASS,
  COMMITTING,
  DRY_RUN,
  FILE_PATH,
  glassIn,
  landingAsked,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
} from "../write/write.command.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const VALUED = [FILE_PATH, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

export const surface: Surface = {
  taking: [
    { said: `${FILE_PATH} <path>`, takes: "a path under `akasha/` to take away" },
    ...COMMITTING,
  ],
  notes: [
    `${FILE_PATH} repeats, so several paths go in one commit.`,
    "a directory named takes away every file git holds under it.",
    "the `code` and `test` files standing beside what you name go with it.",
  ],
}

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

export function underAkasha(root: string, from: string, named: string): string | null {
  const full = isAbsolute(named) ? named : resolve(from, named)
  const path = relative(root, full)
  if (path === "" || path.startsWith("..") || isAbsolute(path)) return null
  if (path !== AKASHA && !path.startsWith(INSIDE)) return null
  return path
}

export function trackedUnder(root: string, path: string): readonly string[] | null {
  try {
    const said = execFileSync("git", ["-C", root, "ls-files", "-z", "--", path], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    })
    return said.split("\0").filter((one) => one !== "")
  } catch {
    return null
  }
}

export function emptiedBy(gone: readonly string[]): readonly string[] {
  const dirs = new Set<string>()
  for (const path of gone) {
    let dir = dirname(path)
    while (dir.startsWith(INSIDE)) {
      dirs.add(dir)
      dir = dirname(dir)
    }
  }
  return [...dirs].sort((one, two) => two.split("/").length - one.split("/").length)
}

export function wouldEmpty(root: string, gone: readonly string[]): readonly string[] {
  const taken = new Set(gone)
  const emptied = new Set<string>()
  const pruned: string[] = []
  for (const dir of emptiedBy(gone)) {
    const at = join(root, dir)
    try {
      if (!existsSync(at)) continue
      const left = readdirSync(at).filter((name) => {
        const path = dir === "" ? name : `${dir}/${name}`
        return !taken.has(path) && !emptied.has(path)
      })
      if (left.length > 0) continue
    } catch {
      continue
    }
    emptied.add(dir)
    pruned.push(dir)
  }
  return pruned
}

export function pruneEmptied(root: string, gone: readonly string[]): readonly string[] {
  const pruned: string[] = []
  for (const dir of emptiedBy(gone)) {
    const at = join(root, dir)
    try {
      if (!existsSync(at) || readdirSync(at).length > 0) continue
      rmdirSync(at)
      pruned.push(dir)
    } catch {}
  }
  return pruned
}

type Opened = {
  readonly opened: readonly string[]
  readonly under: readonly string[]
}

function openedIn(
  root: string,
  given: Given,
  named: readonly string[]
): Opened | { readonly refusals: readonly string[] } {
  const refusals: string[] = []
  const opened: string[] = []
  const under: string[] = []
  const seen = new Set<string>()
  for (const one of named) {
    const path = underAkasha(root, given.from, one)
    if (path === null) {
      refusals.push(
        `\`${one}\` stands outside the \`${AKASHA}\` folder, and this takes nothing from outside it`
      )
      continue
    }
    if (seen.has(path)) {
      refusals.push(`${path} is named more than once`)
      continue
    }
    seen.add(path)
    const at = join(root, path)
    if (!existsSync(at)) {
      refusals.push(`${path} is not there, so there is nothing to take away`)
      continue
    }
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
  return { opened, under }
}

function answering(report: readonly string[], refusals: readonly string[], code: number): Answer {
  return { report, refusals, code }
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
  const pruned = wouldEmpty(root, paths)
  if (pruned.length > 0) {
    report.push(
      `these would be left empty by the removal, and git holds no empty directory — ${pruned.join(", ")}`
    )
  }
  return report
}

function wentWith(
  root: string,
  paths: readonly string[],
  under: readonly string[],
  beside: readonly string[]
): readonly string[] {
  const report: string[] = []
  if (under.length > 0) {
    report.push(`these stood under a directory you named and went with it — ${under.join(", ")}`)
  }
  if (beside.length > 0) {
    report.push(`these stood beside what you named and went with it — ${beside.join(", ")}`)
  }
  const pruned = pruneEmptied(root, paths)
  if (pruned.length > 0) {
    report.push(`emptied by the removal, and git holds no empty directory — ${pruned.join(", ")}`)
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
  const held = openedIn(root, given, read.named)
  if ("refusals" in held) return answering([], held.refusals, 1)
  const beside = [...new Set(held.opened.flatMap((one) => besideOf(root, one)))].filter(
    (one) => !held.opened.includes(one)
  )
  const paths = [...held.opened, ...beside].sort()
  const changes: readonly Change[] = paths.map((path) => ({ path, body: null }))
  const asked: Asked = {
    changes,
    message: stated.message ?? `remove ${paths.join(", ")}`,
    dryRun: read.dryRun,
    glass: glass.glass,
    unmoved: [],
    saying: (landed) => [
      ...landed.took.map((one) => `${one} taken away`),
      ...wentWith(root, paths, held.under, beside),
    ],
  }
  const said = landingAsked({ ...given, root }, asked)
  if (said.code !== 0 || !read.dryRun) return said
  return answering([...wouldGo(root, paths, held.under, beside), ...said.report], [], 0)
}
