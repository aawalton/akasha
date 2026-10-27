import { homedir } from "node:os"
import {
  judgingCommandHook,
  ranAsJudged,
  SCOPE_FLAG,
  toldOf,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { judgingCalls } from "akasha/agent/hook/modules/chain-refusal/chain-refusal.module.code.ts"
import {
  basenameOf,
  calledWords,
  READ_AS_BASH,
  RUNS_ANOTHER,
  SPACE_IN_A_WORD,
  segmentsOf,
} from "akasha/agent/hook/modules/shell-calls/shell-calls.module.code.ts"

const HOOK = "block-disk-crawl"

const HOME = homedir()

const ROOTS: ReadonlySet<string> = new Set(["/", "/var", "/var/home", "/home", HOME])

const HOME_SPELLED: readonly string[] = ["~", "$HOME", "${HOME}"]

const VALUED: ReadonlySet<string> = new Set([
  "-e",
  "-f",
  "-g",
  "-t",
  "-T",
  "-m",
  "-A",
  "-B",
  "-C",
  "-j",
  "-M",
  "-E",
  "-d",
  "--glob",
  "--iglob",
  "--type",
  "--type-not",
  "--regexp",
  "--file",
  "--max-count",
  "--context",
  "--before-context",
  "--after-context",
  "--max-depth",
  "--exclude",
  "--extension",
])

const PATTERNED: ReadonlySet<string> = new Set(["-e", "-f", "--regexp", "--file"])

const FIND_LEADING: readonly string[] = ["-H", "-L", "-P"]

const REFUSED = [
  "A recursive search over the whole disk or the whole home folder reads every file under it.",
  "On Alan's live game a world builder's `find / -path '*gifted-reborn/turns*'` hung its seat",
  "for minutes until it was killed. The file it wanted sat at a path the pages already name.",
  "",
  "WHAT ANSWERS INSTEAD, fastest first:",
  "  the page the index points at — a page's path is its type's folder and its slug, so read",
  "    that page with `akasha read --file-path <path>`",
  "  `akasha search --pattern <pattern> --within <folder>` for lines in this repository",
  "  the Glob tool for paths by name, and the Grep tool for lines, each over a named folder",
  "  `find`, `rg` or `fd` rooted at the folder that holds what you want, as `find /var/tmp/x`",
]

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a recursive search rooted at a root of the disk or of a home folder:`,
  `  ${[...ROOTS].join("   ")}   and \`~\`, \`$HOME\`, \`\${HOME}\` for the home folder`,
  "A trailing slash is the same root. Any narrower folder is let through.",
  "",
  "READ AS SUCH A SEARCH:",
  "  `find` with such a root before its expression",
  "  `rg`, `fd` and `du` with such a root among the paths they are handed",
  "  `grep` carrying `-r`, `-R` or `--recursive`, and `ls` carrying `-R`, with such a root",
  "  `locate`, wherever it is called, since it answers for the whole disk",
  "The pattern `rg`, `fd` and `grep` take first is not read as a path unless `-e` or `-f` names it.",
  "",
  "WHERE THE RULE COMES FROM: a world builder seat on Alan's live game ran",
  "`find / -path '*gifted-reborn/turns*'` and hung for minutes until it was killed.",
  "",
  "A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER:",
  `  ${RUNS_ANOTHER.join(" ")}`,
  "",
  "A refusal answers the whole call. One refused search in a chain refuses every command in it.",
  "",
  ...READ_AS_BASH,
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a root named through a variable the line never sets, read as that variable's name",
  "  a search another program builds — `xargs find`, a script file",
  "  a search naming no path, which is rooted at the folder the shell is in",
  "  anything not sent as a tool call, which no hook is given at all",
  "",
  "The absence of a form from this list is NOT a finding that it is safe. It is unexamined.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this sits.`,
]

function rootOf(word: string): string {
  const plain = word.replaceAll(SPACE_IN_A_WORD, " ")
  for (const one of HOME_SPELLED) {
    if (plain === one || plain.startsWith(`${one}/`)) return `${HOME}${plain.slice(one.length)}`
  }
  return plain
}

export function crawlsFrom(word: string): boolean {
  const held = rootOf(word)
  const trimmed = held.length > 1 ? held.replace(/\/+$/, "") : held
  return ROOTS.has(trimmed === "" ? "/" : trimmed)
}

function findRoots(rest: readonly string[]): readonly string[] {
  const found: string[] = []
  for (const one of rest) {
    if (one.startsWith("-") || one === "(" || one === "!") {
      if (found.length > 0 || !FIND_LEADING.includes(one)) break
      continue
    }
    found.push(one)
  }
  return found
}

function pathsAfterPattern(rest: readonly string[]): readonly string[] {
  const positional: string[] = []
  let patterned = false
  for (let at = 0; at < rest.length; at += 1) {
    const one = rest[at] ?? ""
    if (one === "--") {
      positional.push(...rest.slice(at + 1))
      break
    }
    if (one.startsWith("-")) {
      const flag = one.includes("=") ? one.slice(0, one.indexOf("=")) : one
      if (PATTERNED.has(flag)) patterned = true
      if (VALUED.has(one)) at += 1
      continue
    }
    positional.push(one)
  }
  return patterned ? positional : positional.slice(1)
}

function plainPaths(rest: readonly string[]): readonly string[] {
  return rest.filter((one) => !one.startsWith("-"))
}

function flagged(rest: readonly string[], short: string, long: string): boolean {
  return rest.some(
    (one) => one === long || (one.startsWith("-") && !one.startsWith("--") && one.includes(short))
  )
}

export function crawls(words: readonly string[]): boolean {
  const head = words[0]
  if (head === undefined) return false
  const rest = words.slice(1)
  switch (basenameOf(head)) {
    case "locate":
    case "plocate":
    case "mlocate":
      return true
    case "find":
      return findRoots(rest).some(crawlsFrom)
    case "rg":
    case "fd":
    case "fdfind":
      return pathsAfterPattern(rest).some(crawlsFrom)
    case "grep":
    case "egrep":
    case "fgrep":
      if (!flagged(rest, "r", "--recursive") && !flagged(rest, "R", "--dereference-recursive")) {
        return false
      }
      return pathsAfterPattern(rest).some(crawlsFrom)
    case "du":
      return plainPaths(rest).some(crawlsFrom)
    case "ls":
      return flagged(rest, "R", "--recursive") && plainPaths(rest).some(crawlsFrom)
    default:
      return false
  }
}

export function refusalFor(segment: string): string | null {
  return crawls(calledWords(segment)) ? toldOf(HOOK, REFUSED) : null
}

export const refusalIn = judgingCalls(segmentsOf, refusalFor)

export const judgedFor = judgingCommandHook(HOOK, import.meta.path, refusalIn)

async function ran(): Promise<number> {
  return await ranAsJudged(HOOK, SCOPE, judgedFor)
}

if (import.meta.main) process.exit(await ran())
