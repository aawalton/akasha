import ts from "typescript"

import {
  collectEnclosingComponents,
  collectRootElements,
} from "../jsx-class-tokens-roots/jsx-class-tokens-roots.module.code.ts"
import {
  collectHelperBindings,
  extractTokensFromElement,
} from "../jsx-class-tokens-values/jsx-class-tokens-values.module.code.ts"

export interface ClassUsage {
  readonly filename: string
  readonly line: number
  readonly column: number
  readonly isRootElement: boolean
  readonly tagName: string | null
  readonly jsxTagName: string | null
  readonly tokens: readonly string[]
  readonly callExpressionNames: readonly string[]
  readonly dataSlot: string | null
  readonly enclosingComponent: string | null
}

export function extractJsxClassUsagesFrom(sf: ts.SourceFile): readonly ClassUsage[] {
  const filename = sf.fileName
  const rootElements = collectRootElements(sf)
  const enclosingByElement = collectEnclosingComponents(sf)
  const helperBindings = collectHelperBindings(sf)
  const usages: ClassUsage[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const extracted = extractTokensFromElement(node, helperBindings)
      if (extracted !== null) {
        const start = node.getStart(sf)
        const { line, character } = ts.getLineAndCharacterOfPosition(sf, start)
        usages.push({
          filename,
          line: line + 1,
          column: character + 1,
          isRootElement: rootElements.has(node),
          tagName: extractIntrinsicTagName(node),
          jsxTagName: extractJsxTagName(node),
          tokens: extracted.tokens,
          callExpressionNames: extracted.callExpressionNames,
          dataSlot: extractStaticDataSlot(node),
          enclosingComponent: enclosingByElement.get(node) ?? null,
        })
      }
    }
    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)
  return usages
}

export function extractJsxClassUsages(source: string, filename: string): readonly ClassUsage[] {
  return extractJsxClassUsagesFrom(
    ts.createSourceFile(filename, source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX)
  )
}

function extractStaticDataSlot(element: ts.JsxElement | ts.JsxSelfClosingElement): string | null {
  const opening = ts.isJsxElement(element) ? element.openingElement : element
  for (const attr of opening.attributes.properties) {
    if (!ts.isJsxAttribute(attr)) continue
    if (!ts.isIdentifier(attr.name)) continue
    if (attr.name.text !== "data-slot") continue
    const init = attr.initializer
    if (init === undefined) return null
    if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) return init.text
    if (ts.isJsxExpression(init) && init.expression !== undefined) {
      const expr = init.expression
      if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text
    }
    return null
  }
  return null
}

function extractIntrinsicTagName(element: ts.JsxElement | ts.JsxSelfClosingElement): string | null {
  const opening = ts.isJsxElement(element) ? element.openingElement : element
  const tag = opening.tagName
  if (!ts.isIdentifier(tag)) return null
  const text = tag.text
  if (text.length === 0) return null
  const c = text.charCodeAt(0)
  if (c >= 65 && c <= 90) return null
  return text
}

function extractJsxTagName(element: ts.JsxElement | ts.JsxSelfClosingElement): string | null {
  const opening = ts.isJsxElement(element) ? element.openingElement : element
  const tag = opening.tagName
  if (!ts.isIdentifier(tag)) return null
  const text = tag.text
  if (text.length === 0) return null
  return text
}
