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

const NAMED: ReadonlyMap<number, string> = new Map(
  [...MEANT].map(([named, meant]): readonly [number, string] => [meant, named])
)

const INSTEAD = "import it from the command-answering module instead"

const BUILDS_THE_REFUSAL = "commands/modules/refusing/"

type Spelled = {
  readonly at: ts.Node
  readonly meant: number
}

function numberOf(node: ts.Expression | undefined): number | null {
  if (node === undefined || !ts.isNumericLiteral(node)) return null
  return Number(node.text)
}

function spelledIn(held: ts.ObjectLiteralExpression): Spelled | null {
  let refuses = false
  let found: Spelled | null = null
  for (const one of held.properties) {
    const name = one.name
    if (name === undefined || !ts.isIdentifier(name)) continue
    if (name.text === "refusals") refuses = true
    if (name.text !== "code" || !ts.isPropertyAssignment(one)) continue
    const meant = numberOf(one.initializer)
    if (meant !== null) found = { at: one, meant }
  }
  return refuses ? found : null
}

export function noSecondExitCode(standing: Given): readonly Refusal[] {
  const found: Refusal[] = []
  const builds = standing.path.includes(BUILDS_THE_REFUSAL)
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
    if (!builds && ts.isObjectLiteralExpression(node)) {
      const spelled = spelledIn(node)
      const named = spelled === null ? undefined : NAMED.get(spelled.meant)
      if (spelled !== null && named !== undefined) {
        found.push({
          line: lineOf(standing.source, spelled.at),
          reason: `a refusal spelling \`code: ${String(spelled.meant)}\` says nothing of what kind of thing went wrong — name it \`${named}\` and ${INSTEAD}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
