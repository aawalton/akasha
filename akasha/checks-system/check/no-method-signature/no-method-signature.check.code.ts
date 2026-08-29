import ts from "typescript"
import type { Body } from "../../checking.module.code.ts"
import { bodyOf, overEachFile } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const TS = ".ts"

function foundIn(at: string, text: string): readonly string[] {
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const found: string[] = []
  const held = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) || ts.isTypeLiteralNode(node)) {
      for (const one of node.members) {
        if (!ts.isMethodSignature(one)) continue
        const line = source.getLineAndCharacterOfPosition(one.getStart(source)).line + 1
        const named = one.name.getText(source)
        found.push(
          `line ${line} writes \`${named}\` as a method signature, not a property holding a function type`
        )
      }
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

export function noMethodSignature(leaving: Leaving): readonly Judged[] {
  return overEachFile(leaving, reasonsIn)
}
