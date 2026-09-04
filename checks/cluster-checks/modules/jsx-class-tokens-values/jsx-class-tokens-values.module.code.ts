import ts from "typescript"

const CLASSNAME_HELPERS = new Set(["cn", "clsx", "cva", "cx", "twMerge", "classNames"])

type HelperBindings = ReadonlyMap<string, readonly string[]>

export function collectHelperBindings(sf: ts.SourceFile): HelperBindings {
  const map = new Map<string, readonly string[]>()
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue
      if (decl.initializer === undefined) continue
      const init = decl.initializer
      if (!ts.isCallExpression(init)) continue
      const callee = getCalleeName(init)
      if (callee === null || !CLASSNAME_HELPERS.has(callee)) continue
      const tokens: string[] = []
      const noopRecord = (_name: string): undefined => undefined
      for (const arg of init.arguments) tokens.push(...extractFromValue(arg, map, noopRecord))
      map.set(decl.name.text, tokens)
    }
  }
  return map
}

interface ExtractedClassName {
  readonly tokens: readonly string[]
  readonly callExpressionNames: readonly string[]
}

export function extractTokensFromElement(
  element: ts.JsxElement | ts.JsxSelfClosingElement,
  helperBindings: HelperBindings
): ExtractedClassName | null {
  const opening = ts.isJsxElement(element) ? element.openingElement : element
  for (const attr of opening.attributes.properties) {
    if (!ts.isJsxAttribute(attr)) continue
    if (!ts.isIdentifier(attr.name)) continue
    if (attr.name.text !== "className") continue
    if (attr.initializer === undefined) return { tokens: [], callExpressionNames: [] }
    const callNames: string[] = []
    const recordCall = (name: string): undefined => {
      callNames.push(name)
    }
    const tokens = extractFromValue(attr.initializer, helperBindings, recordCall)
    return { tokens, callExpressionNames: callNames }
  }
  return null
}

function extractFromValue(
  node: ts.Node,
  helperBindings: HelperBindings,
  recordCall: (name: string) => void
): readonly string[] {
  const out: string[] = []
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    out.push(...splitTokens(node.text))
    return out
  }
  if (ts.isJsxExpression(node)) {
    if (node.expression !== undefined)
      out.push(...extractFromValue(node.expression, helperBindings, recordCall))
    return out
  }
  if (ts.isTemplateExpression(node)) {
    out.push(...splitTokens(node.head.text))
    for (const span of node.templateSpans) {
      extractFromValue(span.expression, helperBindings, recordCall)
      out.push(...splitTokens(span.literal.text))
    }
    return out
  }
  if (ts.isCallExpression(node)) {
    const calleeName = getCalleeName(node)
    if (calleeName !== null && CLASSNAME_HELPERS.has(calleeName)) {
      for (const arg of node.arguments)
        out.push(...extractFromValue(arg, helperBindings, recordCall))
      return out
    }
    if (calleeName !== null) {
      recordCall(calleeName)
      const bound = helperBindings.get(calleeName)
      if (bound !== undefined) {
        for (const tok of bound) out.push(tok)
      }
    }
    return out
  }
  if (ts.isConditionalExpression(node)) {
    out.push(...extractFromValue(node.whenTrue, helperBindings, recordCall))
    out.push(...extractFromValue(node.whenFalse, helperBindings, recordCall))
    return out
  }
  if (ts.isBinaryExpression(node)) {
    const kind = node.operatorToken.kind
    if (
      kind === ts.SyntaxKind.AmpersandAmpersandToken ||
      kind === ts.SyntaxKind.BarBarToken ||
      kind === ts.SyntaxKind.QuestionQuestionToken
    ) {
      out.push(...extractFromValue(node.right, helperBindings, recordCall))
      if (ts.isStringLiteral(node.left) || ts.isNoSubstitutionTemplateLiteral(node.left)) {
        out.push(...extractFromValue(node.left, helperBindings, recordCall))
      } else if (kind !== ts.SyntaxKind.AmpersandAmpersandToken) {
        out.push(...extractFromValue(node.left, helperBindings, recordCall))
      }
    }
    return out
  }
  if (ts.isObjectLiteralExpression(node)) {
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        if (ts.isStringLiteral(prop.name) || ts.isNoSubstitutionTemplateLiteral(prop.name)) {
          out.push(...splitTokens(prop.name.text))
        } else if (ts.isIdentifier(prop.name)) {
          out.push(...splitTokens(prop.name.text))
        }
        out.push(...extractFromValue(prop.initializer, helperBindings, recordCall))
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        out.push(...splitTokens(prop.name.text))
      }
    }
    return out
  }
  if (ts.isArrayLiteralExpression(node)) {
    for (const el of node.elements) out.push(...extractFromValue(el, helperBindings, recordCall))
    return out
  }
  if (ts.isParenthesizedExpression(node)) {
    out.push(...extractFromValue(node.expression, helperBindings, recordCall))
    return out
  }
  if (ts.isIdentifier(node)) {
    const bound = helperBindings.get(node.text)
    if (bound !== undefined) {
      for (const tok of bound) out.push(tok)
    }
    return out
  }
  return out
}

function getCalleeName(node: ts.CallExpression): string | null {
  const expr = node.expression
  if (ts.isIdentifier(expr)) return expr.text
  if (ts.isPropertyAccessExpression(expr) && ts.isIdentifier(expr.name)) return expr.name.text
  return null
}

function splitTokens(text: string): readonly string[] {
  const tokens: string[] = []
  for (const tok of text.split(/\s+/)) {
    if (tok.length > 0) tokens.push(tok)
  }
  return tokens
}
