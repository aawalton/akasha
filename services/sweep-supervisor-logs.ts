export const tool = {
  summary: "Delete the log directory of every supervisor whose seat is gone",
  repos: ["akasha"],
} as const

import { readdirSync, rmSync, statSync } from "node:fs"
import { supervisorsRootDir } from "@akasha/seat-system/supervisor-log-path"
import { akashaSeatsThatExist } from "../tools/lib/seat-akasha-beside.ts"

const HELP = `bun services/sweep-supervisor-logs.ts — delete the log directory of every departed supervisor

Every supervisor keeps a directory named for its agent, holding its \`oauth-proxy.sock\` and the
log files it falls back to when a log day page cannot be written. Nothing has ever taken one away,
so the directory holds one per agent that has ever run here. This is what takes them away.

A DIRECTORY IS KEPT FOR A REASON, NEVER FOR AN AGE ALONE. One is kept where a seat page that still
exists names its agent, or where a file in it was written inside the keep window. A supervisor whose
seat page has gone is a supervisor that has stopped, and that is the signal this sweeps on; the
window is what leaves a stopped seat's log readable for as long as somebody might open it.

THE WINDOW IS FOR READING, NOT FOR SAFETY. No code here reads a departed supervisor's directory,
so the window buys a person time to look, and nothing else. Shortening it strands no caller.

THESE FILES ARE IGNORED, NOT TRACKED. The directory sits inside the akasha repository and its
\`.gitignore\` names it, so nothing here is repository content and no removal reaches a commit. That
is why this takes them with a plain remove rather than through the gated one.

A DIRECTORY THAT CANNOT BE READ IS KEPT. Where its entries cannot be listed, nothing here can say
what is in it or when it was last written, so it is named as unread and left standing.

NOTHING IS REMOVED WITHOUT --remove. The sweep reports by default, because seeing the list first
costs one run and the removal cannot be undone.

Usage:
  bun ~/repos/akasha/services/sweep-supervisor-logs.ts [--remove] [--keep-days <n>]

  --remove          Take the directories away.
  --keep-days <n>   Keep a departed supervisor's directory this many days. Default ${String(7)}.
  --help            This.
`

const DEFAULT_KEEP_DAYS = 7

const DAY_MS = 86_400_000

export interface DirFacts {
  readonly name: string
  readonly newest: number
  readonly bytes: number
  readonly files: number
}

export type Verdict =
  | { readonly kind: "seat-exists" }
  | { readonly kind: "inside-window" }
  | { readonly kind: "departed" }

export interface KeepInput {
  readonly facts: DirFacts
  readonly seatAgentIds: ReadonlySet<string>
  readonly cutoff: number
}

export function decideDir(input: KeepInput): Verdict {
  const { facts, seatAgentIds, cutoff } = input
  if (seatAgentIds.has(facts.name)) return { kind: "seat-exists" }
  if (facts.newest >= cutoff) return { kind: "inside-window" }
  return { kind: "departed" }
}

// WHOSE SEAT STILL EXISTS, ASKED OF AKASHA. This opened every file in the old seat directory for
// the id its frontmatter states, and a supervisor's log directory is taken away when its id is
// absent from what this answers. So a store that has stopped being written reads here as every
// seat having departed at once, and the sweep would take the whole fleet's logs.
export function seatAgentIdsThatExist(): ReadonlySet<string> {
  return new Set(akashaSeatsThatExist().keys())
}

function factsOf(root: string, name: string): DirFacts | null {
  let entries: readonly string[]
  try {
    entries = readdirSync(`${root}/${name}`)
  } catch {
    return null
  }
  let newest = 0
  let bytes = 0
  let files = 0
  for (const inner of entries) {
    const stat = statSync(`${root}/${name}/${inner}`, { throwIfNoEntry: false })
    if (stat === undefined) continue
    files += 1
    bytes += stat.size
    if (stat.mtimeMs > newest) newest = stat.mtimeMs
  }
  return { name, newest, bytes, files }
}

function gigabytes(bytes: number): string {
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`
}

function keepDaysFrom(argv: readonly string[]): number | null {
  const at = argv.indexOf("--keep-days")
  if (at === -1) return DEFAULT_KEEP_DAYS
  const raw = argv[at + 1]
  if (raw === undefined) return null
  const days = Number(raw)
  return Number.isFinite(days) && days >= 0 ? days : null
}

function main(argv: readonly string[]): number {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const keepDays = keepDaysFrom(argv)
  if (keepDays === null) {
    process.stderr.write("--keep-days takes a count of days, zero or more\n")
    return 1
  }

  const root = supervisorsRootDir()
  let entries: readonly { name: string; isDirectory: () => boolean }[]
  try {
    entries = readdirSync(root, { withFileTypes: true })
  } catch {
    process.stderr.write(`nothing to sweep: ${root} could not be listed\n`)
    return 0
  }

  const seatAgentIds = seatAgentIdsThatExist()
  const cutoff = Date.now() - keepDays * DAY_MS

  const departed: DirFacts[] = []
  const unread: string[] = []
  const looseNames: string[] = []
  let kept = 0
  let keptBytes = 0

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      const stat = statSync(`${root}/${entry.name}`, { throwIfNoEntry: false })
      if (stat !== undefined && stat.mtimeMs < cutoff) looseNames.push(entry.name)
      continue
    }
    const facts = factsOf(root, entry.name)
    if (facts === null) {
      unread.push(entry.name)
      continue
    }
    if (decideDir({ facts, seatAgentIds, cutoff }).kind === "departed") {
      departed.push(facts)
      continue
    }
    kept += 1
    keptBytes += facts.bytes
  }

  for (const one of departed) process.stdout.write(`${one.name}\t${one.files}\t${one.bytes}\n`)
  for (const one of looseNames) process.stdout.write(`${one}\t1\t-\n`)
  for (const one of unread) {
    process.stderr.write(`unread: ${one} could not be listed, so its directory stands\n`)
  }

  const bytes = departed.reduce((sum, one) => sum + one.bytes, 0)
  const files = departed.reduce((sum, one) => sum + one.files, 0)

  if (!argv.includes("--remove")) {
    process.stderr.write(
      `swept ${entries.length} entr(ies) under ${root}: ${kept} kept holding ${gigabytes(keptBytes)}, ` +
        `${departed.length} departed holding ${files} file(s) and ${gigabytes(bytes)}, ` +
        `${looseNames.length} loose file(s) past the window, ${unread.length} unread` +
        " — nothing removed without --remove\n"
    )
    return unread.length === 0 ? 0 : 1
  }

  let taken = 0
  const held: string[] = []
  for (const one of [...departed.map((facts) => facts.name), ...looseNames]) {
    try {
      rmSync(`${root}/${one}`, { recursive: true, force: true })
      taken += 1
    } catch (err) {
      held.push(`${one}: ${(err as Error).message}`)
    }
  }
  process.stderr.write(
    `removed ${taken} of ${departed.length + looseNames.length} departed entr(ies), ` +
      `reclaiming ${gigabytes(bytes)}; ${kept} kept\n`
  )
  for (const one of held) process.stderr.write(`refused: ${one}\n`)
  return held.length === 0 && unread.length === 0 ? 0 : 1
}

if (import.meta.main) process.exit(main(process.argv.slice(2)))
