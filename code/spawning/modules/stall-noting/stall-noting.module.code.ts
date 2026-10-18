import { readdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import { textThere } from "akasha/file/system/modules/text-there/text-there.module.code.ts"

export const NOTING_AT = import.meta.path

const HELD_AT = "/var/tmp"

const NOTING_MS = 1000

const MOST_PROCESSES = 32

const MOST_DEPTH = 4

const MOST_THREADS = 256

const STACK_LINES = 8

const COMMAND_CHARS = 160

const PROCS = "cgroup.procs"

const ADDRESS = /^\[<[0-9a-f]+>\] /

export function stallPathFor(named: string): string {
  return join(HELD_AT, `akasha-stalled-${named}.txt`)
}

const readOf = textThere

function processesUnder(at: string, found: string[], depth: number): undefined {
  for (const one of (readOf(join(at, PROCS)) ?? "").split("\n")) if (one !== "") found.push(one)
  if (depth >= MOST_DEPTH) return
  try {
    for (const one of readdirSync(at, { withFileTypes: true })) {
      if (one.isDirectory()) processesUnder(join(at, one.name), found, depth + 1)
    }
  } catch {}
}

type Stated = { readonly name: string; readonly state: string }

function stateOf(read: string | null): Stated {
  const stat = read ?? ""
  const opens = stat.indexOf("(")
  const closes = stat.lastIndexOf(")")
  if (opens < 0 || closes < opens) return { name: "?", state: "?" }
  return { name: stat.slice(opens + 1, closes), state: stat.slice(closes + 2, closes + 3) }
}

function threadsOf(pid: string): string {
  const counted = new Map<string, number>()
  let tasks: string[] = []
  try {
    tasks = readdirSync(`/proc/${pid}/task`).slice(0, MOST_THREADS)
  } catch {
    return "?"
  }
  for (const one of tasks) {
    const { state } = stateOf(readOf(`/proc/${pid}/task/${one}/stat`))
    counted.set(state, (counted.get(state) ?? 0) + 1)
  }
  return [...counted].map(([state, many]) => `${state}×${String(many)}`).join(" ")
}

function stackOf(pid: string): string {
  return (readOf(`/proc/${pid}/stack`) ?? "")
    .trim()
    .split("\n")
    .filter((one) => one !== "")
    .slice(0, STACK_LINES)
    .map((one) => one.replace(ADDRESS, ""))
    .join(" < ")
}

function lineOf(pid: string): string {
  const { name, state } = stateOf(readOf(`/proc/${pid}/stat`))
  const wchan = (readOf(`/proc/${pid}/wchan`) ?? "").trim() || "-"
  const command = (readOf(`/proc/${pid}/cmdline`) ?? "").split("\0").join(" ").trim()
  const shown = (command || name).slice(0, COMMAND_CHARS)
  const said = `${pid} ${state} wchan=${wchan} threads ${threadsOf(pid)}: ${shown}`
  const stack = stackOf(pid)
  return stack === "" ? said : `${said}\n    stack: ${stack}`
}

export function stalledIn(at: string, until: number = Date.now() + NOTING_MS): string {
  const found: string[] = []
  processesUnder(at, found, 0)
  const lines: string[] = []
  for (const pid of found.slice(0, MOST_PROCESSES)) {
    if (Date.now() > until) break
    lines.push(lineOf(pid))
  }
  const left = found.length - lines.length
  if (left > 0) lines.push(`${String(left)} more processes were left unread`)
  return lines.join("\n")
}

export function stalledAt(path: string): string | undefined {
  const said = (readOf(path) ?? "").trim()
  try {
    rmSync(path, { force: true })
  } catch {}
  return said === "" ? undefined : said
}
