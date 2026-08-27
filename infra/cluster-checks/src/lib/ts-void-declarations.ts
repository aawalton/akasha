import ts from "typescript"

export type VoidDeclarationKind = "function" | "method" | "expression" | "arrow" | "getter"

export interface VoidDeclarationFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly kind: VoidDeclarationKind
  readonly start: number
  readonly end: number
}

type VoidableDecl =
  | ts.FunctionDeclaration
  | ts.MethodDeclaration
  | ts.FunctionExpression
  | ts.ArrowFunction
  | ts.GetAccessorDeclaration

function voidKeywordIn(typeNode: ts.TypeNode): ts.Node | null {
  if (typeNode.kind === ts.SyntaxKind.VoidKeyword) return typeNode
  if (ts.isParenthesizedTypeNode(typeNode)) return voidKeywordIn(typeNode.type)
  if (ts.isUnionTypeNode(typeNode)) {
    for (const member of typeNode.types) {
      const found = voidKeywordIn(member)
      if (found !== null) return found
    }
  }
  return null
}

function emit(
  node: VoidableDecl,
  kind: VoidDeclarationKind,
  sf: ts.SourceFile,
  filePath: string
): VoidDeclarationFinding | null {
  const typeNode = node.type
  if (node.body === undefined) return null
  if (typeNode === undefined) return null
  const voidNode = voidKeywordIn(typeNode)
  if (voidNode === null) return null
  const { line, character } = ts.getLineAndCharacterOfPosition(sf, voidNode.getStart(sf))
  return {
    file: filePath,
    line: line + 1,
    column: character + 1,
    kind,
    start: voidNode.getStart(sf),
    end: voidNode.getEnd(),
  }
}

export function scanVoidDeclarations(sf: ts.SourceFile): readonly VoidDeclarationFinding[] {
  const filePath = sf.fileName

  const out: VoidDeclarationFinding[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isFunctionTypeNode(node)) return

    let finding: VoidDeclarationFinding | null = null
    if (ts.isFunctionDeclaration(node)) finding = emit(node, "function", sf, filePath)
    else if (ts.isMethodDeclaration(node)) finding = emit(node, "method", sf, filePath)
    else if (ts.isFunctionExpression(node)) finding = emit(node, "expression", sf, filePath)
    else if (ts.isArrowFunction(node)) finding = emit(node, "arrow", sf, filePath)
    else if (ts.isGetAccessorDeclaration(node)) finding = emit(node, "getter", sf, filePath)
    if (finding !== null) out.push(finding)

    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sf, visit)
  return out
}

export function applyFixes(source: string, findings: readonly VoidDeclarationFinding[]): string {
  const sorted = [...findings].sort((a, b) => b.start - a.start)
  let result = source
  for (const f of sorted) {
    result = result.slice(0, f.start) + "undefined" + result.slice(f.end)
  }
  return result
}
