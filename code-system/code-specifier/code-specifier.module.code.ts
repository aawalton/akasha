import { dirname, join, relative } from "node:path"
import ts from "typescript"
import { skimmedAs } from "../code-source/code-source.module.code.ts"

const RELATIVE = /^\.\.?\//

const CLIMBS = /^\.\.(\/|$)/

const STAR = "*"

const PARTED_BY = "/"

export type Naming = ReadonlyMap<string, string>

export const NAMING_NONE: Naming = new Map()

export type Placed = {
  readonly start: number
  readonly end: number
  readonly text: string
}

type Taking = (node: ts.Node, took: (said: ts.Node | undefined) => undefined) => undefined

function reading(path: string, text: string, takes: Taking): readonly Placed[] {
  const source = skimmedAs(path, text)
  const found: Placed[] = []
  const took = (node: ts.Node | undefined): undefined => {
    if (node === undefined || !ts.isStringLiteral(node)) return
    found.push({ start: node.getStart(source), end: node.getEnd(), text: node.text })
  }
  const walk = (node: ts.Node): undefined => {
    takes(node, took)
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return [...found].sort((one, two) => one.start - two.start)
}

export function placedIn(path: string, text: string): readonly Placed[] {
  return reading(path, text, (node, took) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) took(node.moduleSpecifier)
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === "require"))
    ) {
      took(node.arguments[0])
    }
    if (ts.isExternalModuleReference(node)) took(node.expression)
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument))
      took(node.argument.literal)
  })
}

export function spelledIn(path: string, text: string): readonly Placed[] {
  return reading(path, text, (node, took) => took(node))
}

export function specifiersIn(path: string, text: string): readonly string[] {
  return placedIn(path, text).map((one) => one.text)
}

function starredIn(specifier: string, naming: Naming): string | null {
  let at = specifier.indexOf(PARTED_BY)
  while (at !== -1) {
    const said = naming.get(`${specifier.slice(0, at + 1)}${STAR}`)
    if (said?.endsWith(STAR) === true) {
      return `${said.slice(0, -STAR.length)}${specifier.slice(at + 1)}`
    }
    at = specifier.indexOf(PARTED_BY, at + 1)
  }
  return null
}

export function landingOf(
  path: string,
  specifier: string,
  naming: Naming = NAMING_NONE
): string | null {
  if (RELATIVE.test(specifier)) return join(dirname(path), specifier)
  const said = naming.get(specifier)
  if (said !== undefined) return said
  return starredIn(specifier, naming)
}

export function specifierFor(dir: string, target: string): string {
  const said = relative(dir, target)
  return CLIMBS.test(said) ? said : `./${said}`
}
