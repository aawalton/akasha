import ts from "typescript"
import { judgingEachFile, overEachText } from "../../checking/checking.module.code.ts"

function foundIn(at: string, text: string): readonly string[] {
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const found: string[] = []
  const held = (node: ts.Node): undefined => {
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

export const reasonsIn = overEachText(foundIn)

export const noMethodSignature = judgingEachFile(reasonsIn)
