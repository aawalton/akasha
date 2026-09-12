import { overEachText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { lineOf, parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import ts from "typescript"

const DECLARED = ".d.ts"

export function foundIn(at: string, text: string): readonly string[] {
  if (at.endsWith(DECLARED)) return []
  const source = parsedAs(at, text)
  const found: string[] = []
  const held = (node: ts.Node): undefined => {
    if (ts.isInterfaceDeclaration(node) || ts.isTypeLiteralNode(node)) {
      for (const one of node.members) {
        if (!ts.isMethodSignature(one)) continue
        const line = lineOf(source, one)
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
