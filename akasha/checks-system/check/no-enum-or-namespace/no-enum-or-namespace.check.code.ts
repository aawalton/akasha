import ts from "typescript"
import { lineOf, parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { judgingEachFile, overEachText } from "../../checking/checking.module.code.ts"

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

export const noEnumOrNamespace = judgingEachFile(reasonsIn)
