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

const BUILDS_THE_ANSWER: readonly string[] = [
  "commands/modules/answering/",
  "commands/modules/calling/",
  "commands/modules/refusing/",
]

const HANDED_A_CODE: ReadonlySet<string> = new Set(["answeredWith", "refused", "refusedBy"])

const REFUSALS_AT: ReadonlyMap<string, number> = new Map([
  ["answeredWith", 1],
  ["refusedBy", 0],
])

type Spelled = {
  readonly at: ts.Node
  readonly meant: number
}

function numberOf(node: ts.Expression | undefined): number | null {
  if (node === undefined || !ts.isNumericLiteral(node)) return null
  return Number(node.text)
}

function emptyList(node: ts.Expression | undefined): boolean {
  return node !== undefined && ts.isArrayLiteralExpression(node) && node.elements.length === 0
}

function spelledIn(held: ts.ObjectLiteralExpression): Spelled | null {
  let refuses = false
  let found: Spelled | null = null
  for (const one of held.properties) {
    const name = one.name
    if (name === undefined || !ts.isIdentifier(name)) continue
    if (name.text === "refusals") {
      refuses = !ts.isPropertyAssignment(one) || !emptyList(one.initializer)
    }
    if (name.text !== "code" || !ts.isPropertyAssignment(one)) continue
    const meant = numberOf(one.initializer)
    if (meant !== null) found = { at: one, meant }
  }
  return refuses ? found : null
}

function handedIn(held: ts.CallExpression): Spelled | null {
  const called = held.expression
  if (!ts.isIdentifier(called) || !HANDED_A_CODE.has(called.text)) return null
  const given = held.arguments
  const last = given[given.length - 1]
  const meant = numberOf(last)
  if (given.length < 2 || last === undefined || meant === null) return null
  const refuses = REFUSALS_AT.get(called.text)
  if (refuses === undefined) return { at: last, meant }
  if (given.length !== refuses + 2 || emptyList(given[refuses])) return null
  return { at: last, meant }
}

function refusedFor(standing: Given, spelled: Spelled, how: string): Refusal | null {
  const named = NAMED.get(spelled.meant)
  if (named === undefined) return null
  return {
    line: lineOf(standing.source, spelled.at),
    reason: `a refusal ${how} says nothing of what kind of thing went wrong — name it \`${named}\` and ${INSTEAD}`,
  }
}

export function noSecondExitCode(standing: Given): readonly Refusal[] {
  const found: Refusal[] = []
  const builds = BUILDS_THE_ANSWER.some((one) => standing.path.includes(one))
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
      const said =
        spelled === null
          ? null
          : refusedFor(standing, spelled, `spelling \`code: ${String(spelled.meant)}\``)
      if (said !== null) found.push(said)
    }
    if (!builds && ts.isCallExpression(node)) {
      const handed = handedIn(node)
      const said =
        handed === null
          ? null
          : refusedFor(standing, handed, `handed \`${String(handed.meant)}\` where its code goes`)
      if (said !== null) found.push(said)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
