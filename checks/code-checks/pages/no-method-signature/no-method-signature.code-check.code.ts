import { lineOf, parsedAs } from "@akasha/code-system/code-source"
import ts from "typescript"
import {
  judgingEach,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"

function foundIn(at: string, text: string): readonly string[] {
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

export const noMethodSignature = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
