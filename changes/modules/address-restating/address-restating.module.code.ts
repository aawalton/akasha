import { splicing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Splice,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

const TYPED = /\.tsx?$/

const PARTED_BY = "/"

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
