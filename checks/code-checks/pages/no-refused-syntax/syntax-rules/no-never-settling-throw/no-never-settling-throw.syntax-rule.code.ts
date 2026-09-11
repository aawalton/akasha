import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf } from "akasha/code-system/code-source/code-source.module.code.ts"
import ts from "typescript"

type Executor = ts.ArrowFunction | ts.FunctionExpression

const REMEDY =
  "suspends the subtree for good; throw the promise the resource is already loading on, " +
  "or take `resolve` and call it when the value arrives"

function isPromiseConstruction(node: ts.NewExpression): boolean {
  const callee = node.expression
  if (ts.isIdentifier(callee)) return callee.text === "Promise"
  return ts.isPropertyAccessExpression(callee) && callee.name.text === "Promise"
}

function parameterNames(fn: Executor): readonly string[] {
  const names: string[] = []
  for (const one of fn.parameters) {
    if (ts.isIdentifier(one.name)) names.push(one.name.text)
  }
  return names
}

function canNeverSettle(fn: Executor): boolean {
  if (fn.parameters.length === 0) return true
  const names = parameterNames(fn)
  if (names.length !== fn.parameters.length) return false

  let reached = false
  const visit = (node: ts.Node): undefined => {
    if (reached) return
    if (ts.isIdentifier(node) && names.includes(node.text)) {
      reached = true
      return
    }
    ts.forEachChild(node, visit)
    return
  }
  visit(fn.body)
  return !reached
}

function renderExecutor(fn: Executor, source: ts.SourceFile): string {
  const params = fn.parameters.map((one) => one.getText(source)).join(", ")
  return ts.isArrowFunction(fn) ? `(${params}) => …` : `function (${params}) {…}`
}

function executorOf(node: ts.Node): Executor | undefined {
  if (!ts.isThrowStatement(node)) return undefined
  const thrown = node.expression
  if (!ts.isNewExpression(thrown)) return undefined
  if (!isPromiseConstruction(thrown)) return undefined
  const first = thrown.arguments?.[0]
  if (first === undefined) return undefined
  if (!ts.isArrowFunction(first) && !ts.isFunctionExpression(first)) return undefined
  return first
}

export function noNeverSettlingThrow(standing: Given): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    const executor = executorOf(node)
    if (executor !== undefined && canNeverSettle(executor)) {
      const drawn = renderExecutor(executor, standing.source)
      found.push({
        line: lineOf(standing.source, node),
        reason: `throw new Promise(${drawn}) can never settle — ${REMEDY}`,
      })
    }
    ts.forEachChild(node, visit)
    return
  }
  ts.forEachChild(standing.source, visit)
  return found
}
