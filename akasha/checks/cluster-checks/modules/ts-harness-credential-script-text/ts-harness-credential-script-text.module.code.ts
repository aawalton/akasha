import ts from "typescript"

export interface HarnessCredentialScriptTextFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly method: string
  readonly identifier: string
}

const SCRIPT_TEXT_SINKS: ReadonlySet<string> = new Set([
  "evaluate",
  "evaluateHandle",
  "waitForFunction",
])

const CREDENTIAL_RE = /password|passwd|pwd|secret|credential/i

function sinkMethodOf(node: ts.CallExpression): string | undefined {
  const expr = node.expression
  if (ts.isPropertyAccessExpression(expr) && SCRIPT_TEXT_SINKS.has(expr.name.text)) {
    return expr.name.text
  }
  return undefined
}

function firstCredentialIdentifier(node: ts.Node): string | undefined {
  let found: string | undefined
  function walk(n: ts.Node): undefined {
    if (found !== undefined) return
    if (ts.isIdentifier(n) && CREDENTIAL_RE.test(n.text)) {
      found = n.text
      return
    }
    ts.forEachChild(n, walk)
    return
  }
  walk(node)
  return found
}

export function scanHarnessCredentialScriptText(
  sf: ts.SourceFile
): readonly HarnessCredentialScriptTextFinding[] {
  const out: HarnessCredentialScriptTextFinding[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isCallExpression(node)) {
      const method = sinkMethodOf(node)
      const firstArg = node.arguments[0]
      if (
        method !== undefined &&
        firstArg !== undefined &&
        !ts.isArrowFunction(firstArg) &&
        !ts.isFunctionExpression(firstArg)
      ) {
        const identifier = firstCredentialIdentifier(firstArg)
        if (identifier !== undefined) {
          const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
          out.push({
            file: sf.fileName,
            line: line + 1,
            column: character + 1,
            method,
            identifier,
          })
        }
      }
    }
    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sf, visit)
  return out
}
