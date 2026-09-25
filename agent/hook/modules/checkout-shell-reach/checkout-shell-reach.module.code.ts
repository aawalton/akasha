import { existsSync, statSync } from "node:fs"
import { dirname, resolve } from "node:path"
import {
  type GitCall,
  gitCallIn,
} from "akasha/agent/hook/modules/git-calls/git-calls.module.code.ts"
import {
  MOVES,
  movedBy,
  piecesOf,
  placeOf,
  positionalOf,
  printsBodies,
  READERS,
  recursing,
  SEARCHERS,
  type Searcher,
  topOf,
} from "akasha/agent/hook/modules/lore-shell-reach/lore-shell-reach.module.code.ts"
import { insideOf, settled } from "akasha/agent/hook/modules/settling/settling.module.code.ts"
import {
  basenameOf,
  calledWords,
  segmentsOf,
} from "akasha/agent/hook/modules/shell-calls/shell-calls.module.code.ts"
import { z } from "zod"

export type Shown = {
  readonly how: "read" | "search"
  readonly by: string
  readonly at: string
}

type Exempt = (at: string) => boolean

type Where = { readonly here: string; readonly root: string; readonly exempt: Exempt }

const READ = "read"

const SEARCH = "search"

const HOME = "~"

const HANDING_ON: readonly string[] = ["cp", "rsync", "scp", "tar", "zip", "7z", "cmp"]

const FEEDING: readonly string[] = ["xargs", "parallel"]

const LISTING: readonly string[] = ["find", "ls", "fd"]

const SHOWING: readonly string[] = READERS.filter(
  (one) =>
    !HANDING_ON.includes(one) &&
    !FEEDING.includes(one) &&
    !LISTING.includes(one) &&
    !SEARCHERS.has(one)
)

const GLOB = /[*?[]/

const WRITTEN = /^\d*&?>/

const FLAG = "-"

const LONG = "--"

const PATHS_ONLY_WORDS: readonly string[] = [
  "--files",
  "--files-with-matches",
  "--files-without-match",
  "--count",
  "--count-matches",
  "--quiet",
  "--name-only",
]

const PATHS_ONLY_LETTERS: ReadonlyMap<string, RegExp> = new Map([
  ["rg", /^-[a-zA-Z]*[lcq]/],
  ["git", /^-[a-zA-Z]*[lLcq]/],
])

const GREP_PATHS_ONLY = /^-[a-zA-Z]*[lLcq]/

const FEEDING_VALUED: readonly string[] = ["-I", "-n", "-P", "-d", "-L", "-s", "-E", "-a"]

const CURRENT: readonly string[] = ["", "HEAD", "@"]

const REV_PATH = /^([^:\s]*):(.+)$/

const REV_PATH_SAID = z.tuple([z.string(), z.string(), z.string()])

const BLOB_SHOWING: readonly string[] = ["show", "cat-file"]

const BLAMING: readonly string[] = ["blame", "annotate"]

const DIFF = "diff"

const GIT_GREP = "grep"

const NO_INDEX = "--no-index"

const RANGE = ".."

const FIND_OPENING = /^[-(!]/

function reaches(where: Where, at: string): boolean {
  const top = settled(where.root)
  const found = settled(at)
  return (insideOf(top, found) && !where.exempt(found)) || insideOf(found, top)
}

function fileIn(where: Where, piece: string): string | null {
  if (GLOB.test(piece)) {
    const cut = piece.slice(0, piece.search(GLOB))
    const folder = settled(placeOf(cut.endsWith("/") ? cut : dirname(cut), where.here))
    return insideOf(settled(where.root), folder) && !where.exempt(folder) ? folder : null
  }
  const at = placeOf(piece, where.here)
  if (!existsSync(at)) return null
  const found = settled(at)
  if (!statSync(found).isFile()) return null
  return insideOf(settled(where.root), found) && !where.exempt(found) ? found : null
}

function searchedIn(where: Where, piece: string): string | null {
  if (GLOB.test(piece)) return fileIn(where, piece)
  const at = placeOf(piece, where.here)
  return existsSync(at) && reaches(where, at) ? settled(at) : null
}

function firstIn(
  words: readonly string[],
  finding: (piece: string) => string | null
): string | null {
  for (const word of words) {
    if (WRITTEN.test(word)) continue
    for (const piece of piecesOf(word)) {
      const found = finding(piece)
      if (found !== null) return found
    }
  }
  return null
}

function pathsOnly(head: string, rest: readonly string[]): boolean {
  const letters = PATHS_ONLY_LETTERS.get(head) ?? GREP_PATHS_ONLY
  return rest.some(
    (one) => PATHS_ONLY_WORDS.includes(one) || (!one.startsWith(LONG) && letters.test(one))
  )
}

function searchedPaths(searcher: Searcher, rest: readonly string[]): readonly string[] {
  const positional = positionalOf(rest, searcher.valued)
  const patterned = rest.some((one) => searcher.patterned.includes(one))
  return patterned ? positional : positional.slice(1)
}

function searchShows(where: Where, head: string, rest: readonly string[]): Shown | null {
  const searcher = SEARCHERS.get(head)
  if (searcher === undefined || pathsOnly(head, rest)) return null
  const paths = searchedPaths(searcher, rest)
  if (paths.length === 0) {
    if (!recursing(searcher, rest) || !reaches(where, where.here)) return null
    return { how: SEARCH, by: head, at: settled(where.here) }
  }
  const at = firstIn(paths, (piece) => searchedIn(where, piece))
  return at === null ? null : { how: SEARCH, by: head, at }
}

function blobShows(where: Where, call: GitCall, at: string): string | null {
  for (const one of call.rest) {
    const said = REV_PATH_SAID.safeParse(REV_PATH.exec(one))
    if (!said.success) continue
    const [, rev, path] = said.data
    if (!CURRENT.includes(rev)) continue
    const from = path.startsWith(".") ? at : topOf(at)
    const found = settled(resolve(from, path))
    if (insideOf(settled(where.root), found) && !where.exempt(found)) return found
  }
  return null
}

function diffShows(where: Where, call: GitCall, at: string): string | null {
  if (!printsBodies(call)) return null
  const moved = { ...where, here: at }
  if (call.rest.includes(NO_INDEX)) return firstIn(call.rest, (piece) => fileIn(moved, piece))
  const after = call.rest.indexOf(LONG)
  const before = (after < 0 ? call.rest : call.rest.slice(0, after)).filter(
    (one) => !one.startsWith(FLAG)
  )
  const revs = before.filter((one) => !existsSync(placeOf(one, at)))
  if (revs.length >= 2 || revs.some((one) => one.includes(RANGE))) return null
  const specs = [...before.filter((one) => !revs.includes(one))]
  if (after >= 0) specs.push(...call.rest.slice(after + 1))
  if (specs.length > 0) return firstIn(specs, (piece) => searchedIn(moved, piece))
  return settled(topOf(at))
}

function gitShows(where: Where, call: GitCall): Shown | null {
  const at = movedBy(call.before, where.here)
  if (!insideOf(settled(where.root), settled(at))) return null
  const by = `git ${call.act}`
  if (BLOB_SHOWING.includes(call.act)) {
    const found = blobShows(where, call, at)
    return found === null ? null : { how: READ, by, at: found }
  }
  if (BLAMING.includes(call.act)) {
    const found = firstIn(call.rest, (piece) => fileIn({ ...where, here: at }, piece))
    return found === null ? null : { how: READ, by, at: found }
  }
  if (call.act === DIFF) {
    const found = diffShows(where, call, at)
    return found === null ? null : { how: READ, by, at: found }
  }
  if (call.act === GIT_GREP && !pathsOnly("git", call.rest)) {
    return { how: SEARCH, by, at: settled(at) }
  }
  return null
}

function innerOf(rest: readonly string[]): readonly string[] {
  let skip = false
  for (const [at, one] of rest.entries()) {
    if (skip) {
      skip = false
      continue
    }
    if (FEEDING_VALUED.includes(one)) {
      skip = true
      continue
    }
    if (!one.startsWith(FLAG)) return rest.slice(at)
  }
  return []
}

function feedsAReader(called: readonly string[]): boolean {
  if (!FEEDING.includes(basenameOf(called[0] ?? ""))) return false
  const inner = innerOf(called.slice(1))
  const head = basenameOf(inner[0] ?? "")
  if (SHOWING.includes(head)) return true
  return SEARCHERS.has(head) && !pathsOnly(head, inner.slice(1))
}

function listsHere(where: Where, called: readonly string[]): boolean {
  const head = basenameOf(called[0] ?? "")
  const rest = called.slice(1)
  if (FEEDING.includes(head)) return false
  if (firstIn(rest, (piece) => searchedIn(where, piece)) !== null) return true
  const searcher = SEARCHERS.get(head)
  const bare =
    (searcher !== undefined && searchedPaths(searcher, rest).length === 0) ||
    (head === LISTING[0] && (rest.length === 0 || FIND_OPENING.test(rest[0] ?? ""))) ||
    (LISTING.includes(head) && rest.every((one) => one.startsWith(FLAG)))
  return bare && reaches(where, where.here)
}

function segmentShows(where: Where, segment: string): Shown | null {
  const called = calledWords(segment)
  const head = basenameOf(called[0] ?? "")
  const rest = called.slice(1)
  if (SEARCHERS.has(head)) return searchShows(where, head, rest)
  const call = gitCallIn(segment)
  if (call !== null) return gitShows(where, call)
  if (!SHOWING.includes(head)) return null
  const at = firstIn(rest, (piece) => fileIn(where, piece))
  return at === null ? null : { how: READ, by: head, at }
}

function fedShows(where: Where, segment: string, feeder: string | null): Shown | null {
  if (feeder === null) return null
  const call = gitCallIn(segment)
  const listing =
    call === null
      ? listsHere(where, calledWords(segment))
      : insideOf(settled(where.root), settled(movedBy(call.before, where.here)))
  return listing ? { how: READ, by: feeder, at: settled(where.root) } : null
}

export function shellShows(
  command: string,
  from: string,
  root: string,
  exempt: Exempt
): Shown | null {
  if (command.trim() === "") return null
  const segments = segmentsOf(command)
  const feeding = segments.find((one) => feedsAReader(calledWords(one)))
  const feeder = feeding === undefined ? null : basenameOf(calledWords(feeding)[0] ?? "")
  let where: Where = { here: from, root, exempt }
  for (const segment of segments) {
    const called = calledWords(segment)
    if (MOVES.includes(basenameOf(called[0] ?? ""))) {
      where = { ...where, here: placeOf(called[1] ?? HOME, where.here) }
      continue
    }
    const shown = segmentShows(where, segment) ?? fedShows(where, segment, feeder)
    if (shown !== null) return shown
  }
  return null
}
