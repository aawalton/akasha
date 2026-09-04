import { lineOf, parsedAs } from "@akasha/code-system/code-source"
import ts from "typescript"
import {
  judgingEach,
  overEachText,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const AUGMENTED = "global"

function foundIn(at: string, text: string): readonly string[] {
  const source = parsedAs(at, text)
  const found: string[] = []
  const held = (node: ts.Node): undefined => {
    if (ts.isEnumDeclaration(node)) {
      found.push(`line ${lineOf(source, node)} declares \`enum ${node.name.text}\``)
    }
    if (
      ts.isModuleDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text !== AUGMENTED
    ) {
      found.push(`line ${lineOf(source, node)} declares \`namespace ${node.name.text}\``)
    }
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

export const reasonsIn = overEachText(foundIn)

export const noEnumOrNamespace = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
