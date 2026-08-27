import ts from "typescript"

export interface ClassFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly name: string | null
  readonly extendsName: string | null
  readonly isExpression: boolean
  readonly hasErrorBoundaryMethod: boolean
}

const ERROR_BOUNDARY_MEMBER_NAMES = new Set(["getDerivedStateFromError", "componentDidCatch"])

function hasErrorBoundaryMethodOf(node: ts.ClassLikeDeclaration): boolean {
  for (const member of node.members) {
    const name = member.name
    if (!name) continue
    if (!ts.isIdentifier(name)) continue
    if (ERROR_BOUNDARY_MEMBER_NAMES.has(name.text)) return true
  }
  return false
}

function extendsNameOf(node: ts.ClassLikeDeclaration): string | null {
  const heritage = node.heritageClauses
  if (!heritage) return null
  for (const clause of heritage) {
    if (clause.token !== ts.SyntaxKind.ExtendsKeyword) continue
    const first = clause.types[0]
    if (!first) return null
    const trimmed = first.expression.getText().trim()
    return trimmed !== "" ? trimmed : null
  }
  return null
}

export function scanClassDeclarations(sf: ts.SourceFile): readonly ClassFinding[] {
  const filePath = sf.fileName

  const out: ClassFinding[] = []

  function emit(node: ts.ClassLikeDeclaration, isExpression: boolean): undefined {
    const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
    out.push({
      file: filePath,
      line: line + 1,
      column: character + 1,
      name: node.name?.text ?? null,
      extendsName: extendsNameOf(node),
      isExpression,
      hasErrorBoundaryMethod: hasErrorBoundaryMethodOf(node),
    })
  }

  function visit(node: ts.Node): undefined {
    if (ts.isClassDeclaration(node)) {
      emit(node, false)
    } else if (ts.isClassExpression(node)) {
      emit(node, true)
    }
    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)
  return out
}
