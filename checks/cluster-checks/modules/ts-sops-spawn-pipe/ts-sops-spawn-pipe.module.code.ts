import ts from "typescript"

export interface SopsSpawnPipeFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly callee: string
}

const SOPS_MARKERS: ReadonlySet<string> = new Set(["sops", "--filename-override"])

function calleeNameOf(node: ts.CallExpression): string | undefined {
  const expr = node.expression
  if (ts.isIdentifier(expr)) return expr.text
  if (ts.isPropertyAccessExpression(expr)) {
    if (ts.isIdentifier(expr.expression)) {
      return `${expr.expression.text}.${expr.name.text}`
    }
    return expr.name.text
  }
  return undefined
}

function collectStringLiterals(node: ts.Node): readonly string[] {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return [node.text]
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.flatMap((el) => collectStringLiterals(el))
  }
  return []
}

export function scanSopsSpawnPipe(sf: ts.SourceFile): readonly SopsSpawnPipeFinding[] {
  const filePath = sf.fileName
  const out: SopsSpawnPipeFinding[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isCallExpression(node)) {
      const callee = calleeNameOf(node)
      if (callee !== undefined) {
        const literals = node.arguments.flatMap((arg) => collectStringLiterals(arg))
        const hasDevStdin = literals.includes("/dev/stdin")
        const hasSopsMarker = literals.some((s) => SOPS_MARKERS.has(s))
        if (hasDevStdin && hasSopsMarker) {
          const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
          out.push({
            file: filePath,
            line: line + 1,
            column: character + 1,
            callee,
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
