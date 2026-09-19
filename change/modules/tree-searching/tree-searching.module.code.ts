import { rgPath } from "@vscode/ripgrep"
import { type Answer, leftAt } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { uncommittedSpelled } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const BYTES = new TextEncoder()

const LINED = "\n"

const ENDED = "\0"

const APART_BY = "/"

const FOUND_NOTHING = 1

const GLOBBED = "--glob"

const UNIGNORED = "--no-ignore"

const SPELLED = "uncommitted"

const NAMED_UNCOMMITTED: readonly string[] = [
  GLOBBED,
  `**/*.${SPELLED}.*`,
  GLOBBED,
  `**/*.${SPELLED}.*/**`,
]

const TAKEN: readonly string[] = ["--null", "--no-config", "--hidden"]

const SEARCHED: readonly string[] = [
  "--files-with-matches",
  ...TAKEN,
  "--fixed-strings",
  "--file",
  "-",
]

const LISTED: readonly string[] = ["--files", ...TAKEN]

const THREADED = "--threads"

function threading(threads: number | null): readonly string[] {
  return threads === null ? [] : [THREADED, String(threads)]
}

const APART: readonly string[] = [".git", "node_modules", indexNamed()]

export const TYPED_KINDS: readonly string[] = ["*.ts", "*.tsx"]

export const EVERY_KIND: readonly string[] = []

function globsFor(kinds: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const one of kinds) said.push(GLOBBED, one)
  for (const one of APART) said.push(GLOBBED, `!**/${one}/`)
  return said
}

export function foundIn(out: string, code: number, err: string, root: string): readonly string[] {
  const found = out.split(ENDED).filter((one) => one !== "")
  if (found.length === 0 && code !== 0 && code !== FOUND_NOTHING) {
    throw new Error(`the tree at \`${root}\` could not be searched — ${err.trim()}`)
  }
  const cut = root.endsWith(APART_BY) ? root.length : root.length + APART_BY.length
  return found.map((one) => one.slice(cut))
}

function ranWith(
  root: string,
  taking: readonly string[],
  kinds: readonly string[],
  fed: Uint8Array | null
): readonly string[] {
  const asked = fed === null ? {} : { stdin: fed }
  const done = ran([rgPath, ...taking, ...globsFor(kinds), root], asked)
  return foundIn(done.out, done.code, done.err, root)
}

function bothWays(
  run: (said: readonly string[]) => readonly string[],
  narrowed: readonly string[] = []
): readonly string[] {
  const found = new Set(run([]))
  for (const path of run([UNIGNORED, ...narrowed])) {
    if (uncommittedSpelled(path)) found.add(path)
  }
  return [...found]
}

export function pathsSearched(
  root: string,
  asked: readonly string[],
  kinds: readonly string[],
  threads: number | null = null
): readonly string[] {
  if (asked.length === 0) return []
  const fed = BYTES.encode(`${asked.join(LINED)}${LINED}`)
  const held = [...SEARCHED, ...threading(threads)]
  return bothWays((said) => ranWith(root, [...held, ...said], kinds, fed))
}

export function pathsListed(root: string, threads: number | null = null): readonly string[] {
  const held = [...LISTED, ...threading(threads)]
  return bothWays(
    (said) => ranWith(root, [...held, ...said], EVERY_KIND, null),
    NAMED_UNCOMMITTED
  ).toSorted()
}

const TYPED = "--type-add"

const OF_KIND = "collected"

function typing(kinds: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const one of kinds) said.push(TYPED, `${OF_KIND}:${one}`)
  for (const one of APART) said.push(GLOBBED, `!**/${one}/`)
  return [...said, "-t", OF_KIND]
}

function ranTyped(
  root: string,
  taking: readonly string[],
  kinds: readonly string[]
): readonly string[] {
  const done = ran([rgPath, ...taking, ...typing(kinds), root])
  return foundIn(done.out, done.code, done.err, root)
}

export function pathsTyped(
  root: string,
  kinds: readonly string[],
  threads: number | null = null
): readonly string[] {
  if (kinds.length === 0) return []
  const held = [...LISTED, ...threading(threads)]
  return bothWays((said) => ranTyped(root, [...held, ...said], kinds)).toSorted()
}

function overlaid(over: Answer, found: readonly string[]): readonly string[] {
  const held = new Set(found)
  for (const one of over.edits) {
    if (one.kind === "move") {
      held.delete(one.pathFrom)
      held.add(one.pathTo)
      continue
    }
    if (one.kind === "remove") held.delete(one.path)
    else held.add(leftAt(one))
  }
  return [...held].sort()
}

export function pathsNaming(
  world: World,
  asked: readonly string[],
  kinds: readonly string[]
): readonly string[] {
  if (asked.length === 0) return []
  return overlaid(world.over, pathsSearched(world.root, asked, kinds))
}
