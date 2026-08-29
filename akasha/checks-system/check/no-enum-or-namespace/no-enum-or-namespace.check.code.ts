import ts from "typescript"
import type { Body } from "../../checking.module.code.ts"
import { bodyOf, overEachFile } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const TS = ".ts"

const AUGMENTED = "global"

function foundIn(at: string, text: string): readonly string[] {
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const found: string[] = []
  const lineOf = (node: ts.Node): number =>
    source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
  const held = (node: ts.Node): void => {
    if (ts.isEnumDeclaration(node)) {
      found.push(`line ${lineOf(node)} declares \`enum ${node.name.text}\``)
    }
    if (
      ts.isModuleDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text !== AUGMENTED
    ) {
      found.push(`line ${lineOf(node)} declares \`namespace ${node.name.text}\``)
    }
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

export function reasonsIn(given: Body): readonly string[] {
  if (!given.path.endsWith(TS)) return []
  const text = bodyOf(given)
  if (text === null) return []
  return foundIn(given.path, text)
}

export function noEnumOrNamespace(leaving: Leaving): readonly Judged[] {
  return overEachFile(leaving, reasonsIn)
}
