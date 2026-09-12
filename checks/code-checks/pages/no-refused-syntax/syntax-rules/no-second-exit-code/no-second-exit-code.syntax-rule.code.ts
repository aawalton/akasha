import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

const MEANT: ReadonlyMap<string, number> = new Map([
  ["OK", 0],
  ["INPUT", 1],
  ["DATA", 2],
  ["OPERATIONAL", 3],
  ["UNCLASSIFIED", 70],
])

const INSTEAD = "import it from the command-answering module instead"

function numberOf(node: ts.Expression | undefined): number | null {
  if (node === undefined || !ts.isNumericLiteral(node)) return null
  return Number(node.text)
}

export function noSecondExitCode(standing: Given): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const named = node.name.text
      const meant = MEANT.get(named)
      if (meant !== undefined && numberOf(node.initializer) === meant) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `\`${named} = ${String(meant)}\` declares again an exit code the exit-code page declares — ${INSTEAD}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
