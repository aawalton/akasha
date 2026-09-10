import { parsedAs } from "@akasha/code/code-source"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import ts from "typescript"
import {
  bodyOf,
  everyFileOf,
  overEachFile,
  textIn,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const TSX_ENDING = ".tsx"

const CAP_MARK = "-content-available-width"

const CAP_RE = /--radix-([a-z][a-z-]*?)-content-available-width/

const COLLISION_PADDING = "collisionPadding"

const AVOID_COLLISIONS = "avoidCollisions"

const CLASS_NAME = "className"

const WIDTH_PREFIX = "max-w-"

const ARBITRARY_OPEN = "max-w-["

export type Source = {
  readonly path: string
  readonly text: string
}

export function tsxNamed(path: string): boolean {
  return path.endsWith(TSX_ENDING)
}

function stringish(node: ts.Node): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
}

function exportedNames(source: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>()
  for (const statement of source.statements) {
    if (ts.isExportDeclaration(statement)) {
      const clause = statement.exportClause
      if (clause !== undefined && ts.isNamedExports(clause)) {
        for (const element of clause.elements) names.add(element.name.text)
      }
      continue
    }
    const modifiers = ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined
    if (modifiers?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) !== true) continue
    if (ts.isFunctionDeclaration(statement) && statement.name !== undefined) {
      names.add(statement.name.text)
    }
  }
  return names
}

function cappedFamilyOf(fn: ts.FunctionDeclaration): string | null {
  let family: string | null = null
  let padded = false
  const visit = (node: ts.Node): undefined => {
    if (ts.isJsxAttribute(node) && ts.isIdentifier(node.name)) {
      if (node.name.text === COLLISION_PADDING) padded = true
    }
    if (family === null && stringish(node)) family = CAP_RE.exec(node.text)?.[1] ?? null
    ts.forEachChild(node, visit)
    return
  }
  ts.forEachChild(fn, visit)
  return padded ? family : null
}

export function tagsIn(sources: Iterable<Source>): ReadonlyMap<string, string> {
  const tags = new Map<string, string>()
  for (const { path, text } of sources) {
    const source = parsedAs(path, text)
    const exported = exportedNames(source)
    for (const statement of source.statements) {
      if (!ts.isFunctionDeclaration(statement)) continue
      const named = statement.name?.text
      if (named === undefined || !exported.has(named)) continue
      const family = cappedFamilyOf(statement)
      if (family === null) continue
      const already = tags.get(named)
      if (already !== undefined && already !== family) {
        throw new Error(
          `${named} caps by "${already}" in one file and by "${family}" in another, so a refusal could name neither`
        )
      }
      tags.set(named, family)
    }
  }
  return tags
}

function tagsOver(change: Change, shadow: Shadow): ReadonlyMap<string, string> {
  const sources: Source[] = []
  for (const path of everyFileOf(shadow.index)) {
    if (!tsxNamed(path)) continue
    const text = textIn(change, path)
    if (text === null || !text.includes(CAP_MARK)) continue
    sources.push({ path, text })
  }
  const tags = tagsIn(sources)
  if (tags.size === 0) {
    throw new Error(
      "no wrapper caps its width by a radix family's available width, so this check judges no tag and a clean answer would mean nothing"
    )
  }
  return tags
}

const TAGS = new WeakMap<Shadow, ReadonlyMap<string, string>>()

function tagsFor(change: Change, shadow: Shadow): ReadonlyMap<string, string> {
  const held = TAGS.get(shadow)
  if (held !== undefined) return held
  const made = tagsOver(change, shadow)
  TAGS.set(shadow, made)
  return made
}

function bareToken(token: string): string {
  const lastColon = token.lastIndexOf(":")
  const bare = lastColon === -1 ? token : token.slice(lastColon + 1)
  return bare.startsWith("!") ? bare.slice(1) : bare
}

export function widthReason(token: string, family: string): string | null {
  const bare = bareToken(token)
  if (!bare.startsWith(WIDTH_PREFIX)) return null
  const capped = `var(--radix-${family}-content-available-width)`
  const remedy =
    "drop the token and take the wrapper's cap, or write " +
    `max-w-[calc(min(<your width>,${capped}))] to keep a width of your own under it`
  if (bare === "max-w-none") {
    return `\`max-w-none\` undoes the viewport cap the wrapper sets — ${remedy}`
  }
  if (bare.startsWith(ARBITRARY_OPEN) && bare.endsWith("]")) {
    const inner = bare.slice(ARBITRARY_OPEN.length, -1)
    if (inner === capped || inner.startsWith("calc(")) return null
    return `\`max-w-[${inner}]\` overrides the viewport cap — ${remedy}`
  }
  return `\`${bare}\` replaces the viewport cap, tailwind-merge reading every max-w-* as one group — ${remedy}`
}

function tokensIn(node: ts.Node): readonly string[] {
  const found: string[] = []
  const visit = (one: ts.Node): undefined => {
    if (stringish(one)) {
      for (const token of one.text.split(/\s+/)) {
        if (token.length > 0) found.push(token)
      }
    }
    ts.forEachChild(one, visit)
    return
  }
  visit(node)
  return found
}

function openingOf(node: ts.Node): ts.JsxOpeningLikeElement | null {
  if (ts.isJsxElement(node)) return node.openingElement
  if (ts.isJsxSelfClosingElement(node)) return node
  return null
}

function saidOf(source: ts.SourceFile, attr: ts.JsxAttribute, said: string): string {
  const at = source.getLineAndCharacterOfPosition(attr.getStart(source)).line + 1
  return `line ${at}: ${said}`
}

function overAttribute(
  source: ts.SourceFile,
  named: string,
  family: string,
  attr: ts.JsxAttribute,
  found: string[]
): undefined {
  if (!ts.isIdentifier(attr.name)) return
  const init = attr.initializer
  if (init === undefined) return
  const attrName = attr.name.text
  if (attrName === CLASS_NAME) {
    for (const token of tokensIn(init)) {
      const said = widthReason(token, family)
      if (said !== null) found.push(saidOf(source, attr, `<${named}> ${said}`))
    }
    return
  }
  if (!ts.isJsxExpression(init)) return
  const expr = init.expression
  if (expr === undefined) return
  if (attrName === AVOID_COLLISIONS && expr.kind === ts.SyntaxKind.FalseKeyword) {
    found.push(
      saidOf(
        source,
        attr,
        `<${named} avoidCollisions={false}> turns off the flip and shift keeping the panel on screen`
      )
    )
    return
  }
  if (attrName === COLLISION_PADDING && ts.isNumericLiteral(expr) && expr.text === "0") {
    found.push(
      saidOf(
        source,
        attr,
        `<${named} collisionPadding={0}> closes the margin between the panel and the viewport edge`
      )
    )
  }
  return
}

export function reasonsIn(
  tags: ReadonlyMap<string, string>,
  path: string,
  text: string
): readonly string[] {
  const source = parsedAs(path, text)
  const found: string[] = []
  const visit = (node: ts.Node): undefined => {
    const opening = openingOf(node)
    if (opening !== null && ts.isIdentifier(opening.tagName)) {
      const named = opening.tagName.text
      const family = tags.get(named)
      if (family !== undefined) {
        for (const attr of opening.attributes.properties) {
          if (ts.isJsxAttribute(attr)) overAttribute(source, named, family, attr, found)
        }
      }
    }
    ts.forEachChild(node, visit)
    return
  }
  ts.forEachChild(source, visit)
  return found
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const tags = tagsFor(change, shadow)
  return overEachFile(change, (given) =>
    tsxNamed(given.path) ? reasonsIn(tags, given.path, bodyOf(given)) : []
  )
}
