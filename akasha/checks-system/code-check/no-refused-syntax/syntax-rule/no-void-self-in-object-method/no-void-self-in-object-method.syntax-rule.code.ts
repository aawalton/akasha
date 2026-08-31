import ts from "typescript"
import { lineOf } from "../../../../../code-system/code-source/code-source.module.code.ts"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const SHIFTED = "so the call hands it the object anyway and every argument after that shifts by one"

function selfDroppedBy(node: ts.MethodDeclaration): boolean {
  const first = node.parameters[0]
  if (first === undefined || !ts.isIdentifier(first.name)) return false
  if (ts.identifierToKeywordKind(first.name) !== ts.SyntaxKind.ThisKeyword) return false
  return first.type?.kind === ts.SyntaxKind.VoidKeyword
}

export function noVoidSelfInObjectMethod(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isObjectLiteralExpression(node)) {
      for (const member of node.properties) {
        if (!ts.isMethodDeclaration(member) || !selfDroppedBy(member)) continue
        found.push({
          line: lineOf(standing.source, member),
          reason: `\`${member.name.getText(standing.source)}\` declares \`this: void\`, ${SHIFTED}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
