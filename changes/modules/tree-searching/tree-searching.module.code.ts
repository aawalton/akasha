import { relative } from "node:path"
import { rgPath } from "@vscode/ripgrep"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import { pathsThere, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { indexNamed } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { ran } from "akasha/utils/run/modules/running/running.module.code.ts"

const BYTES = new TextEncoder()

const LINED = "\n"

const ENDED = "\0"

const FOUND_NOTHING = 1

const GLOBBED = "--glob"

const SEARCHED: readonly string[] = [
  "--files-with-matches",
  "--null",
  "--no-config",
  "--no-ignore",
  "--hidden",
  "--fixed-strings",
  "--file",
  "-",
]

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

export function pathsSearched(
  root: string,
  asked: readonly string[],
  kinds: readonly string[]
): readonly string[] {
  if (asked.length === 0) return []
  const done = ran([rgPath, ...SEARCHED, ...globsFor(kinds), root], {
    stdin: BYTES.encode(`${asked.join(LINED)}${LINED}`),
  })
  return foundIn(done.out, done.code, done.err, root)
}

export function pathsNaming(
  world: World,
  asked: readonly string[],
  kinds: readonly string[]
): readonly string[] {
  if (asked.length === 0) return []
  const held = new Set(pathsThere(world))
  const found = new Set<string>()
  for (const path of pathsSearched(world.root, asked, kinds)) {
    if (held.has(path)) found.add(path)
  }
  for (const path of pathsIn(world.over)) {
    if (held.has(path)) found.add(path)
  }
  return [...found].sort()
}
