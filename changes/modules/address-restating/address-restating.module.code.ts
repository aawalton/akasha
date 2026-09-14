import { relative } from "node:path"
import { rgPath } from "@vscode/ripgrep"
import {
  pathsIn,
  refusing,
  splicing,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Said,
  Splice,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { pathsThere, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { indexNamed } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { ran } from "akasha/utils/run/modules/running/running.module.code.ts"
import ts from "typescript"

const TYPED = /\.tsx?$/

const PARTED_BY = "/"

const BYTES = new TextEncoder()

const LINED = "\n"

const ENDED = "\0"

const FOUND_NOTHING = 1

const SEARCHED: readonly string[] = [
  "--files-with-matches",
  "--null",
  "--no-config",
  "--no-ignore",
  "--hidden",
  "--fixed-strings",
  "--file",
  "-",
  "--glob",
  "*.ts",
  "--glob",
  "*.tsx",
  "--glob",
  "!**/.git/",
  "--glob",
  "!**/node_modules/",
  "--glob",
  `!**/${indexNamed()}/`,
]

const ADDRESS =
  /^[a-z][a-z0-9]*(-[a-z0-9]+)*\/[a-z][a-z0-9]*(-[a-z0-9]+)*(\/[a-z][a-z0-9]*(-[a-z0-9]+)*)?$/

const NO_ADDRESS =
  "is no address, an address being a page type and a slug parted by `/`, with the scope between them where a page type scopes its slug"

function spellingsOver(
  path: string,
  text: string,
  moved: ReadonlyMap<string, string>
): readonly Splice[] {
  const source = parsedAs(path, text)
  const found: Splice[] = []
  const walk = (node: ts.Node): undefined => {
    const now = ts.isStringLiteral(node) ? moved.get(node.text) : undefined
    if (now !== undefined) {
      found.push({ from: node.getStart(source), to: node.getEnd(), put: JSON.stringify(now) })
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export function openingsIn(moved: ReadonlyMap<string, string>): readonly string[] {
  const found = new Set<string>()
  for (const was of moved.keys()) found.add(was.slice(0, was.indexOf(PARTED_BY) + 1))
  return [...found]
}

function spelledIn(text: string, openings: readonly string[]): boolean {
  for (const one of openings) {
    if (text.includes(one)) return true
  }
  return false
}

export function restatedOver(
  paths: readonly string[],
  textOf: (path: string) => string | null,
  moved: ReadonlyMap<string, string>
): readonly FileChange[] {
  const openings = openingsIn(moved)
  const edits: FileChange[] = []
  for (const path of paths) {
    if (!TYPED.test(path)) continue
    const text = textOf(path)
    if (text === null || !spelledIn(text, openings)) continue
    const spots = spellingsOver(path, text, moved)
    if (spots.length === 0) continue
    edits.push(...splicing(path, text, spots))
  }
  return edits
}

function searchedIn(root: string, asked: readonly string[]): readonly string[] {
  const done = ran([rgPath, ...SEARCHED, root], {
    stdin: BYTES.encode(`${asked.join(LINED)}${LINED}`),
  })
  const found = done.out.split(ENDED).filter((one) => one !== "")
  if (found.length === 0 && done.code !== 0 && done.code !== FOUND_NOTHING) {
    throw new Error(`the tree at \`${root}\` could not be searched — ${done.err.trim()}`)
  }
  return found.map((one) => relative(root, one))
}

export function pathsSpelling(world: World, moved: ReadonlyMap<string, string>): readonly string[] {
  if (moved.size === 0) return []
  const held = new Set(pathsThere(world))
  const found = new Set<string>()
  for (const path of searchedIn(world.root, [...moved.keys()])) {
    if (held.has(path)) found.add(path)
  }
  for (const path of pathsIn(world.over)) {
    if (held.has(path)) found.add(path)
  }
  return [...found].sort()
}

function refusalIn(moved: ReadonlyMap<string, string>): string | null {
  if (moved.size === 0) return "no address was handed in, so no address is restated"
  for (const [was, now] of moved) {
    if (!ADDRESS.test(was)) return `\`${was}\` ${NO_ADDRESS}`
    if (!ADDRESS.test(now)) return `\`${now}\` ${NO_ADDRESS}`
    if (was === now) return `\`${now}\` is the address that page already carries`
  }
  return null
}

export function restatedIn(world: World, moved: ReadonlyMap<string, string>): Said {
  const why = refusalIn(moved)
  if (why !== null) return refusing(why)
  let paths: readonly string[]
  try {
    paths = pathsSpelling(world, moved)
  } catch (cause) {
    const held = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${held}, so no address was restated`)
  }
  return stating(restatedOver(paths, world.textOf, moved))
}
