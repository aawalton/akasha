import ts from "typescript"

export type AssertionForm =
  | "as-type"
  | "as-const"
  | "double-cast"
  | "angle-bracket"
  | "non-null"
  | "brand-constructor"

export interface AssertionFinding {
  readonly form: AssertionForm
  readonly file: string
  readonly line: number
  readonly column: number
  readonly snippet: string
}

const SNIPPET_MAX = 80

function isAsConstNode(node: ts.AsExpression): boolean {
  const t = node.type
  if (!ts.isTypeReferenceNode(t)) return false
  const name = t.typeName
  if (!ts.isIdentifier(name)) return false
  return name.text === "const"
}

function isAsUnknownNode(node: ts.AsExpression): boolean {
  return node.type.kind === ts.SyntaxKind.UnknownKeyword
}

function singleIdentifierName(t: ts.TypeNode): string | null {
  if (!ts.isTypeReferenceNode(t)) return null
  const name = t.typeName
  if (!ts.isIdentifier(name)) return null
  return name.text
}

const KEYWORD_NAME_BY_KIND: ReadonlyMap<ts.SyntaxKind, string> = new Map([
  [ts.SyntaxKind.StringKeyword, "string"],
  [ts.SyntaxKind.NumberKeyword, "number"],
  [ts.SyntaxKind.BooleanKeyword, "boolean"],
  [ts.SyntaxKind.SymbolKeyword, "symbol"],
  [ts.SyntaxKind.BigIntKeyword, "bigint"],
  [ts.SyntaxKind.ObjectKeyword, "object"],
  [ts.SyntaxKind.UnknownKeyword, "unknown"],
  [ts.SyntaxKind.AnyKeyword, "any"],
  [ts.SyntaxKind.NeverKeyword, "never"],
  [ts.SyntaxKind.VoidKeyword, "void"],
])

function keywordTypeName(t: ts.TypeNode): string | null {
  return KEYWORD_NAME_BY_KIND.get(t.kind) ?? null
}

function pascal(s: string): string {
  const [first] = s
  if (first === undefined) return s
  return first.toUpperCase() + s.slice(1)
}

function brandFunctionName(parent: ts.Node): string | null {
  if (ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent)) {
    return parent.name?.text ?? null
  }
  if (ts.isMethodDeclaration(parent)) {
    return ts.isIdentifier(parent.name) ? parent.name.text : null
  }
  if (ts.isArrowFunction(parent)) {
    const owner = parent.parent
    if (owner && ts.isVariableDeclaration(owner) && ts.isIdentifier(owner.name)) {
      return owner.name.text
    }
    return null
  }
  return null
}

function isBrandConstructorAs(node: ts.AsExpression): boolean {
  const asRefName = singleIdentifierName(node.type)
  const asKeywordName = asRefName === null ? keywordTypeName(node.type) : null
  if (asRefName === null && asKeywordName === null) return false

  let parent = node.parent
  let inReturn = false
  if (parent && ts.isReturnStatement(parent) && parent.expression === node) {
    inReturn = true
    const block = parent.parent
    if (!block || !ts.isBlock(block)) return false
    if (block.statements.length !== 1 || block.statements[0] !== parent) return false
    parent = block.parent
  }

  if (!parent) return false
  let returnType: ts.TypeNode | undefined
  if (ts.isArrowFunction(parent)) {
    if (!inReturn && parent.body !== node) return false
    returnType = parent.type
  } else if (ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent)) {
    if (!inReturn) return false
    returnType = parent.type
  } else if (ts.isMethodDeclaration(parent)) {
    if (!inReturn) return false
    returnType = parent.type
  } else {
    return false
  }
  if (!returnType) return false

  const fnName = brandFunctionName(parent)
  if (fnName === null) return false

  if (asRefName !== null) {
    if (singleIdentifierName(returnType) !== asRefName) return false
    return fnName === asRefName || fnName === `as${asRefName}`
  }

  if (asKeywordName === null) return false
  if (keywordTypeName(returnType) !== asKeywordName) return false
  return fnName === `as${pascal(asKeywordName)}`
}

function buildSnippet(node: ts.Node, sf: ts.SourceFile): string {
  const raw = node.getText(sf).replace(/\s+/g, " ").trim()
  if (raw.length <= SNIPPET_MAX) return raw
  return `${raw.slice(0, SNIPPET_MAX - 1)}…`
}

export function scanTypeAssertions(sf: ts.SourceFile): readonly AssertionFinding[] {
  const filePath = sf.fileName

  const out: AssertionFinding[] = []

  function emit(form: AssertionForm, node: ts.Node): undefined {
    const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
    out.push({
      form,
      file: filePath,
      line: line + 1,
      column: character + 1,
      snippet: buildSnippet(node, sf),
    })
  }

  function visit(node: ts.Node): undefined {
    if (ts.isAsExpression(node)) {
      if (isAsConstNode(node)) {
        emit("as-const", node)
        ts.forEachChild(node, visit)
        return
      }

      if (ts.isAsExpression(node.expression) && isAsUnknownNode(node.expression)) {
        emit("double-cast", node)
        visit(node.expression.expression)
        return
      }

      if (isBrandConstructorAs(node)) {
        emit("brand-constructor", node)
        ts.forEachChild(node, visit)
        return
      }

      emit("as-type", node)
      ts.forEachChild(node, visit)
      return
    }

    if (ts.isTypeAssertionExpression(node)) {
      emit("angle-bracket", node)
      ts.forEachChild(node, visit)
      return
    }

    if (ts.isNonNullExpression(node)) {
      emit("non-null", node)
      ts.forEachChild(node, visit)
      return
    }

    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)
  return out
}
