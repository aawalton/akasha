import { relative } from "node:path"
import { rgPath } from "@vscode/ripgrep"
import { leftAt } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { indexNamed } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { ran } from "akasha/utils/run/modules/running/running.module.code.ts"

const BYTES = new TextEncoder()

const LINED = "\n"

const ENDED = "\0"

const FOUND_NOTHING = 1

const GLOBBED = "--glob"

const UNIGNORED = "--no-ignore"

const PENDING = ".uncommitted."

const TAKEN: readonly string[] = ["--null", "--no-config", "--hidden"]

const SEARCHED: readonly string[] = [
  "--files-with-matches",
  ...TAKEN,
  "--fixed-strings",
  "--file",
  "-",
]

const LISTED: readonly string[] = ["--files", ...TAKEN]

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
  return found.map((one) => relative(root, one))
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

function bothWays(run: (said: readonly string[]) => readonly string[]): readonly string[] {
  const found = new Set(run([]))
  for (const path of run([UNIGNORED])) {
    if (path.includes(PENDING)) found.add(path)
  }
  return [...found]
}

export function pathsSearched(
  root: string,
  asked: readonly string[],
  kinds: readonly string[]
): readonly string[] {
  if (asked.length === 0) return []
  const fed = BYTES.encode(`${asked.join(LINED)}${LINED}`)
  return bothWays((said) => ranWith(root, [...SEARCHED, ...said], kinds, fed))
}

export function pathsListed(root: string): readonly string[] {
  return bothWays((said) => ranWith(root, [...LISTED, ...said], EVERY_KIND, null)).toSorted()
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
