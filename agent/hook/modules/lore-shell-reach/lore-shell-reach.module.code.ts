import { existsSync } from "node:fs"
import { homedir } from "node:os"
import { basename, dirname, join, resolve } from "node:path"
import {
  type GitCall,
  gitCallIn,
} from "akasha/agent/hook/modules/git-calls/git-calls.module.code.ts"
import {
  basenameOf,
  calledWords,
  segmentsOf,
  wordsOf,
} from "akasha/agent/hook/modules/shell-calls/shell-calls.module.code.ts"
import { GIT_AT } from "akasha/file/modules/git-place/git-place.module.code.ts"
import {
  type Globbed,
  globbed,
  globReach,
  reachesWithheld,
  withheldAt,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

const HOME = "~"

const HOME_OPENING = "~/"

const PIECES = /[:=]/

const REDIRECTED = /^\d*[<>]+&?/

const ALL_AFTER = "--"

const FLAG = "-"

const HERE = "."

const REV_PATH = /^[^:\s-][^:\s]*:./

const RECURSING_LETTERS = /^-[a-zA-Z]*[rR][a-zA-Z]*$/

const FIND = "find"

const FIND_OPENING = /^[-(!]/

const MOVES: readonly string[] = ["cd", "pushd"]

const RUNNERS: readonly string[] = ["xargs", "parallel", "sh", "bash", "zsh", "dash", "while"]

const READERS: readonly string[] = [
  "cat",
  "tac",
  "head",
  "tail",
  "less",
  "more",
  "most",
  "bat",
  "batcat",
  "view",
  "vi",
  "vim",
  "nvim",
  "nano",
  "emacs",
  "sed",
  "awk",
  "gawk",
  "mawk",
  "nawk",
  "jq",
  "yq",
  "strings",
  "od",
  "xxd",
  "hexdump",
  "hd",
  "base64",
  "base32",
  "cp",
  "rsync",
  "scp",
  "tar",
  "zip",
  "7z",
  "find",
  "xargs",
  "parallel",
  "diff",
  "cmp",
  "comm",
  "nl",
  "sort",
  "uniq",
  "paste",
  "fold",
  "fmt",
  "pr",
  "tr",
  "dd",
  "column",
  "iconv",
  "grep",
  "egrep",
  "fgrep",
  "zgrep",
  "rg",
  "ag",
  "ack",
]

type Searcher = {
  readonly valued: readonly string[]
  readonly recursing: readonly string[] | null
  readonly patterned: readonly string[]
}

const GREP: Searcher = {
  valued: ["-e", "-f", "-m", "-A", "-B", "-C", "-d", "-D", "--regexp", "--file", "--max-count"],
  recursing: ["-r", "-R", "--recursive", "--dereference-recursive"],
  patterned: ["-e", "-f", "--regexp", "--file"],
}

const RG: Searcher = {
  valued: [
    ...["-e", "-f", "-g", "-t", "-T", "-m", "-A", "-B", "-C", "-j", "-M", "-r", "-E"],
    ...["--glob", "--iglob", "--type", "--type-not", "--max-count", "--replace"],
    ...["--max-depth", "--regexp", "--file", "--encoding", "--threads"],
  ],
  recursing: null,
  patterned: ["-e", "-f", "--regexp", "--file"],
}

const AG: Searcher = {
  valued: ["-G", "-g", "-m", "-A", "-B", "-C", "--ignore", "--file-search-regex", "--depth"],
  recursing: null,
  patterned: [],
}

const SEARCHERS: ReadonlyMap<string, Searcher> = new Map<string, Searcher>([
  ["grep", GREP],
  ["egrep", GREP],
  ["fgrep", GREP],
  ["rg", RG],
  ["ag", AG],
  ["ack", AG],
])

const PATCHING: readonly string[] = [
  "-p",
  "-u",
  "--patch",
  "--patch-with-stat",
  "--patch-with-raw",
  "--cc",
]

const QUIET: readonly string[] = [
  "-s",
  "--no-patch",
  "--stat",
  "--name-only",
  "--name-status",
  "--shortstat",
  "--numstat",
  "--quiet",
]

const SIZING: readonly string[] = ["-t", "-s", "-e"]

const LOGGING: readonly string[] = ["log", "whatchanged"]

const DIFFING: readonly string[] = ["show", "diff", "difftool"]

const WHOLE: readonly string[] = ["archive", "format-patch", "grep"]

const BLOB_NAMING: readonly string[] = ["show", "cat-file"]

const CAT_FILE = "cat-file"

const STASH = "stash"

const SHOW = "show"

const GIT_GREP = "grep"

const MOVE_GIT = "-C"

type Lore = { readonly root: string; readonly withheld: readonly string[] }

function placeOf(piece: string, here: string): string {
  if (piece === HOME) return homedir()
  if (piece.startsWith(HOME_OPENING)) return join(homedir(), piece.slice(HOME_OPENING.length))
  return resolve(here, piece)
}

function piecesOf(word: string): readonly string[] {
  return word
    .split(PIECES)
    .map((one) => one.replace(REDIRECTED, ""))
    .filter((one) => one !== "" && !one.startsWith(FLAG))
}

function namedIn(command: string, withheld: readonly string[]): boolean {
  return withheld.some((one) => command.includes(basename(one)))
}

function globbedReach(at: string, lore: Lore): Globbed {
  try {
    return globReach(at, lore.root, lore.withheld)
  } catch {
    return null
  }
}

function pieceReaches(piece: string, here: string, reading: boolean, lore: Lore): boolean {
  const at = placeOf(piece, here)
  if (withheldAt(at, lore.withheld)) return true
  if (globbed(piece)) {
    const reach = globbedReach(at, lore)
    return reach === "file" || (reach === "folder" && reading)
  }
  return reading && reachesWithheld(at, lore.root, lore.withheld)
}

function positionalOf(words: readonly string[], valued: readonly string[]): readonly string[] {
  const found: string[] = []
  let skip = false
  for (const [at, one] of words.entries()) {
    if (skip) {
      skip = false
      continue
    }
    if (one === ALL_AFTER) return [...found, ...words.slice(at + 1)]
    if (valued.includes(one)) {
      skip = true
      continue
    }
    if (!one.startsWith(FLAG)) found.push(one)
  }
  return found
}

function recursing(searcher: Searcher, rest: readonly string[]): boolean {
  const named = searcher.recursing
  if (named === null) return true
  return rest.some((one) => named.includes(one) || RECURSING_LETTERS.test(one))
}

export function searchesHere(called: readonly string[]): boolean {
  const head = basenameOf(called[0] ?? "")
  const rest = called.slice(1)
  if (head === FIND) return rest.length === 0 || FIND_OPENING.test(rest[0] ?? "")
  const searcher = SEARCHERS.get(head)
  if (searcher === undefined || !recursing(searcher, rest)) return false
  const positional = positionalOf(rest, searcher.valued)
  const patterned = rest.some((one) => searcher.patterned.includes(one))
  return (patterned ? positional : positional.slice(1)).length === 0
}

export function printsBodies(call: GitCall): boolean {
  const rest = call.rest
  const patching = rest.some((one) => PATCHING.includes(one))
  if (LOGGING.includes(call.act)) return patching
  if (call.act === STASH) return rest[0] === SHOW && patching
  if (call.act === CAT_FILE) return !rest.some((one) => SIZING.includes(one))
  if (DIFFING.includes(call.act)) return patching || !rest.some((one) => QUIET.includes(one))
  return WHOLE.includes(call.act)
}

function movedBy(before: readonly string[], here: string): string {
  let at = here
  for (const [order, one] of before.entries()) {
    if (one === MOVE_GIT) at = placeOf(before[order + 1] ?? HERE, at)
  }
  return at
}

function topOf(at: string): string {
  let one = at
  while (!existsSync(join(one, GIT_AT))) {
    const up = dirname(one)
    if (up === one) return at
    one = up
  }
  return one
}

function specsOf(rest: readonly string[], at: string): readonly string[] {
  const after = rest.indexOf(ALL_AFTER)
  if (after >= 0) return rest.slice(after + 1).map((one) => placeOf(one, at))
  return rest
    .filter((one) => !one.startsWith(FLAG))
    .map((one) => placeOf(one, at))
    .filter((one) => existsSync(one))
}

function revPathsOnly(rest: readonly string[]): boolean {
  const named = rest.filter((one) => !one.startsWith(FLAG))
  return named.length > 0 && named.every((one) => REV_PATH.test(one))
}

function gitReaches(call: GitCall, here: string, lore: Lore): boolean {
  if (!printsBodies(call)) return false
  if (BLOB_NAMING.includes(call.act) && revPathsOnly(call.rest)) return false
  const at = movedBy(call.before, here)
  const specs = specsOf(call.rest, at)
  if (specs.length > 0) return specs.some((one) => reachesWithheld(one, lore.root, lore.withheld))
  return reachesWithheld(call.act === GIT_GREP ? at : topOf(at), lore.root, lore.withheld)
}

function headOf(segment: string): string {
  return basenameOf(calledWords(segment)[0] ?? "")
}

function segmentReaches(segment: string, here: string, fed: boolean, lore: Lore): boolean {
  const called = calledWords(segment)
  const reading = fed || READERS.includes(headOf(segment))
  const words = wordsOf(segment)
  if (words.some((word) => piecesOf(word).some((one) => pieceReaches(one, here, reading, lore)))) {
    return true
  }
  if (searchesHere(called) && reachesWithheld(here, lore.root, lore.withheld)) return true
  const call = gitCallIn(segment)
  return call !== null && gitReaches(call, here, lore)
}

export function shellReaches(
  command: string,
  from: string,
  root: string,
  withheld: readonly string[]
): boolean {
  if (withheld.length === 0 || command.trim() === "") return false
  if (namedIn(command, withheld)) return true
  const lore: Lore = { root, withheld }
  const segments = segmentsOf(command)
  const fed = segments.some((one) => RUNNERS.includes(headOf(one)))
  let here = from
  for (const segment of segments) {
    const called = calledWords(segment)
    if (MOVES.includes(headOf(segment))) {
      here = placeOf(called[1] ?? HOME, here)
      continue
    }
    if (segmentReaches(segment, here, fed, lore)) return true
  }
  return false
}
