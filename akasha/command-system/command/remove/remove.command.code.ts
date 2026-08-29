import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, rmdirSync, statSync } from "node:fs"
import { dirname, isAbsolute, join, relative, resolve } from "node:path"
import { judgingIn } from "../../../checks-system/checking.module.code.ts"
import type { Answer, Given } from "../../calling.module.code.ts"
import type { Change } from "../../landing.module.code.ts"
import { baseOf, holding, landing, leavingOf } from "../../landing.module.code.ts"
import { DRY_RUN, MESSAGE, MESSAGE_FILE, messageIn } from "../write/write.command.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const TS = ".ts"

const PATCH = "patch"

const VALUED = [MESSAGE, MESSAGE_FILE]

const BESIDE = /^(code|test)\.[a-z0-9]+$/

const NO_CHECK =
  "no check judged this — a check is never handed a deletion, so this says what would be taken " +
  "away and nothing about what stands after"

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
    if (VALUED.includes(token)) {
      const value = argv[at + 1]
      if (value === undefined) return { refused: `${token} needs a value, and the line ends` }
      at = at + 2
      continue
    }
    if (token.startsWith("-")) {
      return {
        refused:
          `\`${token}\` is not a flag this takes — a removal names paths and ` +
          `\`${MESSAGE}\`, \`${MESSAGE_FILE}\`, \`${DRY_RUN}\``,
      }
    }
    named.push(token)
    at = at + 1
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

function dirOf(path: string): string {
  const at = path.lastIndexOf("/")
  return at === -1 ? "" : path.slice(0, at)
}

function nameOf(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1)
}

export function besideOf(root: string, path: string): readonly string[] {
  if (!path.endsWith(TS)) return []
  const stem = nameOf(path).slice(0, -TS.length)
  const dir = dirOf(path)
  const full = join(root, dir)
  if (!existsSync(full)) return []
  const found: string[] = []
  for (const name of readdirSync(full)) {
    if (!name.startsWith(`${stem}.`)) continue
    if (!BESIDE.test(name.slice(stem.length + 1))) continue
    found.push(dir === "" ? name : `${dir}/${name}`)
  }
  return found.sort()
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
    } catch {
      continue
    }
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

function reporting(
  root: string,
  paths: readonly string[],
  under: readonly string[],
  beside: readonly string[]
): Answer {
  const changed: readonly Change[] = paths.map((path) => ({ path, body: null }))
  const said = holding(root, () =>
    judgingIn(root, PATCH).over(leavingOf(root, { base: baseOf(root), changed }))
  )
  if (said.length > 0) {
    return answering(
      [],
      [
        ...said.map((one) => `${one.path} — ${one.reason}`),
        `nothing was written — ${DRY_RUN} writes nothing either way`,
      ],
      3
    )
  }
  const report = paths.map((one) => `${one} would be taken away`)
  if (under.length > 0) {
    report.push(`these stand under a directory you named and would go with it — ${under.join(", ")}`)
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
  report.push(NO_CHECK)
  report.push(`nothing was written — ${DRY_RUN}`)
  return answering(report, [], 0)
}

export function remove(argv: readonly string[], given: Given): Answer {
  const read = namedIn(argv)
  if ("refused" in read) return answering([], [read.refused], 1)
  if (read.named.length === 0) return answering([], ["name at least one path to remove"], 1)
  const asked = messageIn(argv, VALUED)
  if ("refusals" in asked) return answering([], asked.refusals, 1)
  const root = resolve(given.root)
  const held = openedIn(root, given, read.named)
  if ("refusals" in held) return answering([], held.refusals, 1)
  const beside = [...new Set(held.opened.flatMap((one) => besideOf(root, one)))].filter(
    (one) => !held.opened.includes(one)
  )
  const paths = [...held.opened, ...beside].sort()
  if (read.dryRun) return reporting(root, paths, held.under, beside)
  const changes: readonly Change[] = paths.map((path) => ({ path, body: null }))
  const message = asked.message ?? `remove ${paths.join(", ")}`
  const said = landing(root, changes, message, judgingIn(root, PATCH), given.writer)
  if ("refusals" in said) return answering([], said.refusals, 3)
  const report = said.took.map((one) => `${one} taken away`)
  if (held.under.length > 0) {
    report.push(`these stood under a directory you named and went with it — ${held.under.join(", ")}`)
  }
  if (beside.length > 0) {
    report.push(`these stood beside what you named and went with it — ${beside.join(", ")}`)
  }
  const pruned = pruneEmptied(root, paths)
  if (pruned.length > 0) {
    report.push(`emptied by the removal, and git holds no empty directory — ${pruned.join(", ")}`)
  }
  if (said.commit !== null) report.push(`committed as ${said.commit}`)
  return answering(report, [], 0)
}
