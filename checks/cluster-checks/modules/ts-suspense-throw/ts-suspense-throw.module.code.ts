import ts from "typescript"

export interface SuspenseThrowFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly executor: string
}

function isPromiseConstruction(node: ts.NewExpression): boolean {
  const callee = node.expression
  if (ts.isIdentifier(callee)) return callee.text === "Promise"
  return ts.isPropertyAccessExpression(callee) && callee.name.text === "Promise"
}

function parameterNames(fn: ts.ArrowFunction | ts.FunctionExpression): readonly string[] {
  const names: string[] = []
  for (const p of fn.parameters) {
    if (ts.isIdentifier(p.name)) names.push(p.name.text)
  }
  return names
}

function canNeverSettle(fn: ts.ArrowFunction | ts.FunctionExpression): boolean {
  if (fn.parameters.length === 0) return true
  const names = parameterNames(fn)
  if (names.length !== fn.parameters.length) return false

  let referencesAParam = false
  const visit = (node: ts.Node): undefined => {
    if (referencesAParam) return
    if (ts.isIdentifier(node) && names.includes(node.text)) {
      referencesAParam = true
      return
    }
    ts.forEachChild(node, visit)
    return
  }
  visit(fn.body)
  return !referencesAParam
}

function renderExecutor(fn: ts.ArrowFunction | ts.FunctionExpression): string {
  const params = fn.parameters.map((p) => p.getText()).join(", ")
  return ts.isArrowFunction(fn) ? `(${params}) => …` : `function (${params}) {…}`
}

export function scanSuspenseThrows(sf: ts.SourceFile): readonly SuspenseThrowFinding[] {
  const out: SuspenseThrowFinding[] = []

  const visit = (node: ts.Node): undefined => {
    if (ts.isThrowStatement(node) && node.expression !== undefined) {
      const thrown = node.expression
      if (ts.isNewExpression(thrown) && isPromiseConstruction(thrown)) {
        const executor = thrown.arguments?.[0]
        if (
          executor !== undefined &&
          (ts.isArrowFunction(executor) || ts.isFunctionExpression(executor)) &&
          canNeverSettle(executor)
        ) {
          const pos = sf.getLineAndCharacterOfPosition(node.getStart(sf))
          out.push({
            file: sf.fileName,
            line: pos.line + 1,
            column: pos.character + 1,
            executor: renderExecutor(executor),
          })
        }
      }
    }
    ts.forEachChild(node, visit)
    return
  }

  visit(sf)
  return out
}
