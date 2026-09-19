import {
  type FileChange,
  refusing,
  type Said,
  type Splice,
  splicing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  pathsNaming,
  TYPED_KINDS,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

const TYPED = /\.tsx?$/

const PARTED_BY = "/"

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

export function pathsSpelling(world: World, moved: ReadonlyMap<string, string>): readonly string[] {
  return pathsNaming(world, [...moved.keys()], TYPED_KINDS)
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
