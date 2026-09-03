import { readFileSync } from "node:fs"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { reachOver, reachSaid, takeableIn } from "../../reach/migration-reach.module.code.ts"

const INPUT = 1

const UNREACHED = 2

const INSIDE = "akasha/"

const PATHS_FROM = "--paths-from"

const TOLD = "--told"

const TAKEABLE = "--takeable"

const TAB = "\t"

export type Asked = {
  readonly paths: readonly string[]
  readonly told: ReadonlyMap<string, string>
  readonly takeable: boolean
}

function linesOf(at: string): readonly string[] {
  return readFileSync(at, "utf8")
    .split("\n")
    .map((one) => one.trim())
    .filter((one) => one !== "")
}

export function askedOf(argv: readonly string[]): Asked | string {
  const paths: string[] = []
  const told = new Map<string, string>()
  let takeable = false
  let at = 0
  while (at < argv.length) {
    const one = argv[at] ?? ""
    at += 1
    if (one === TAKEABLE) {
      takeable = true
      continue
    }
    if (one !== PATHS_FROM && one !== TOLD) {
      if (one.startsWith("-")) return `\`${one}\` is nothing \`akasha migration-reach\` takes`
      paths.push(one)
      continue
    }
    const named = argv[at]
    at += 1
    if (named === undefined) return `\`${one}\` names no file to read`
    let lines: readonly string[]
    try {
      lines = linesOf(named)
    } catch {
      return `${named} would not read, and \`${one}\` is read from a file`
    }
    if (one === PATHS_FROM) {
      paths.push(...lines)
      continue
    }
    for (const line of lines) {
      const mark = line.indexOf(TAB)
      if (mark === -1) return `\`${line}\` names no akasha path after a tab`
      told.set(line.slice(0, mark), line.slice(mark + 1))
    }
  }
  return { paths, told, takeable }
}

export function migrationReach(argv: readonly string[], given: Given): Answer {
  const asked = askedOf(argv)
  if (typeof asked === "string") return refused(asked, INPUT)
  const inside = asked.paths.filter((one) => one.startsWith(INSIDE))
  if (inside.length > 0) {
    return refused(`${inside.join(", ")} is under akasha already, so nothing reaches it`, INPUT)
  }
  if (asked.paths.length === 0) return refused("no path was named to judge", INPUT)
  const reaches = reachOver(given.root, asked.paths, asked.told)
  const unreached = reaches.filter((one) => !one.reached)
  const report = asked.takeable ? [...takeableIn(reaches)] : [...reachSaid(reaches)]
  return { report, refusals: [], code: unreached.length === 0 ? 0 : UNREACHED }
}
