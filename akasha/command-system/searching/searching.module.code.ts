import { existsSync, statSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { repos } from "@akasha/pages-system/checkout-roots"
import type { Repo } from "@akasha/pages-system/markdown-document"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { canonicalize } from "@akasha/pages-system/repo-path"

export const REPOS_NAMED = repos()
  .map((one) => `\`${one}\``)
  .join(", ")

export const RG_DEFAULTS: readonly string[] = [
  "--color",
  "never",
  "--no-heading",
  "--with-filename",
  "--line-number",
  "--smart-case",
  "--max-columns",
  "200",
  "--max-columns-preview",
]

export const LINE_CEILING = 300

export const BYTE_CEILING = 60_000

const RG_VALUE_LONGS: ReadonlySet<string> = new Set([
  "--after-context",
  "--before-context",
  "--color",
  "--colors",
  "--context",
  "--context-separator",
  "--dfa-size-limit",
  "--encoding",
  "--engine",
  "--field-context-separator",
  "--field-match-separator",
  "--file",
  "--generate",
  "--glob",
  "--hostname-bin",
  "--hyperlink-format",
  "--iglob",
  "--ignore-file",
  "--max-columns",
  "--max-count",
  "--max-depth",
  "--max-filesize",
  "--path-separator",
  "--pre",
  "--pre-glob",
  "--regex-size-limit",
  "--regexp",
  "--replace",
  "--sort",
  "--sortr",
  "--threads",
  "--type",
  "--type-add",
  "--type-clear",
  "--type-not",
])

const RG_VALUE_SHORTS = "ABCEdefgjMmrTt"

const RG_PATTERN_LONGS: ReadonlySet<string> = new Set(["--file", "--regexp"])

const RG_PATTERN_SHORTS = "ef"

export type Parsed =
  | {
      readonly ok: true
      readonly repos: readonly Repo[]
      readonly paths: readonly string[]
      readonly rest: readonly string[]
    }
  | { readonly ok: false; readonly why: string }

export function isRepo(value: string): value is Repo {
  return repos().includes(value)
}

interface Carved {
  readonly paths: readonly string[]
  readonly rest: readonly string[]
}

function carve(argv: readonly string[]): Carved {
  const kept: number[] = []
  let flagsOver = false
  let patterned = false
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at] ?? ""
    if (!flagsOver && token === "--") {
      flagsOver = true
      continue
    }
    if (flagsOver || token === "-" || !token.startsWith("-")) {
      kept.push(at)
      continue
    }
    if (token.startsWith("--")) {
      const split = token.indexOf("=")
      const name = split === -1 ? token : token.slice(0, split)
      if (RG_PATTERN_LONGS.has(name)) patterned = true
      if (split === -1 && RG_VALUE_LONGS.has(name)) at += 1
      continue
    }
    for (let letter = 1; letter < token.length; letter += 1) {
      const one = token.charAt(letter)
      if (RG_PATTERN_SHORTS.includes(one)) patterned = true
      if (!RG_VALUE_SHORTS.includes(one)) continue
      if (letter === token.length - 1) at += 1
      break
    }
  }
  const taken = patterned ? kept : kept.slice(1)
  const dropped = new Set(taken)
  return {
    paths: taken.map((one) => argv[one] ?? ""),
    rest: argv.filter((_, at) => !dropped.has(at)),
  }
}

export function parse(argv: readonly string[]): Parsed {
  const named: Repo[] = []
  const forwarded: string[] = []
  let ours = true
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at] ?? ""
    if (ours && token === "--repo") {
      const value = argv[at + 1]
      if (value === undefined)
        return { ok: false, why: "`--repo` names one repository and nothing followed it" }
      if (!isRepo(value)) {
        return {
          ok: false,
          why: `\`--repo ${value}\` names no repository here; it takes ${REPOS_NAMED}`,
        }
      }
      if (!named.includes(value)) named.push(value)
      at += 1
      continue
    }
    if (token === "--") ours = false
    forwarded.push(token)
  }
  const { paths, rest } = carve(forwarded)
  if (named.length > 0 && paths.length > 0) {
    return {
      ok: false,
      why:
        `\`--repo\` says which repository to search and \`${paths[0] ?? ""}\` says where to search; ` +
        "give one or the other",
    }
  }
  return { ok: true, repos: named, paths, rest }
}

export interface Place {
  readonly name: string
  readonly from: string
  readonly at: string
}

export interface Reach {
  readonly searching: readonly Place[]
  readonly absent: readonly string[]
}

export function reach(named: readonly Repo[], roots: Roots): Reach {
  const wanted = named.length > 0 ? named : repos()
  const searching: Place[] = []
  const absent: string[] = []
  for (const repo of wanted) {
    const root = roots[repo]
    if (root !== undefined && existsSync(root)) searching.push({ name: repo, from: root, at: root })
    else absent.push(repo)
  }
  return { searching, absent }
}

export function pointed(paths: readonly string[]): Reach {
  const searching: Place[] = []
  const absent: string[] = []
  for (const one of paths) {
    const at = canonicalize(resolve(one))
    if (!existsSync(at)) {
      absent.push(one)
      continue
    }
    searching.push({ name: at, from: statSync(at).isDirectory() ? at : dirname(at), at })
  }
  return { searching, absent }
}

export interface Budget {
  lines: number
  bytes: number
  stopped: boolean
}

export function fresh(): Budget {
  return { lines: 0, bytes: 0, stopped: false }
}

export function admits(budget: Budget, line: string): boolean {
  if (budget.stopped) return false
  const bytes = new TextEncoder().encode(line).length + 1
  if (budget.lines + 1 > LINE_CEILING || budget.bytes + bytes > BYTE_CEILING) {
    budget.stopped = true
    return false
  }
  budget.lines += 1
  budget.bytes += bytes
  return true
}

export function listed(names: readonly string[]): string {
  return names.length === 0 ? "nothing" : names.join(", ")
}
