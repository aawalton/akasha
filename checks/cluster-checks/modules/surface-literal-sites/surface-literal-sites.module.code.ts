import ts from "typescript"
import { isHardcodedSurfaceLiteral } from "../jsx-surface-tokens/jsx-surface-tokens.module.code.ts"

const TEST_FILE = /\.(test|spec)\.tsx?$/

export function isTestFilePath(relPath: string): boolean {
  return TEST_FILE.test(relPath)
}

const SURFACE_TOKEN_TEXT = "bg-surface-"

const SURFACE_HELPER = "surfaceClass"

export interface SurfaceLiteralSite {
  readonly line: number
  readonly token: string
}

export function mayHoldSurfaceLiteral(source: string): boolean {
  return source.includes(SURFACE_TOKEN_TEXT)
}

function scriptKindOf(filename: string): ts.ScriptKind {
  return filename.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
}

function parse(source: string, filename: string): ts.SourceFile {
  return ts.createSourceFile(filename, source, ts.ScriptTarget.ESNext, true, scriptKindOf(filename))
}

export function findSurfaceLiteralSites(
  source: string,
  filename: string
): readonly SurfaceLiteralSite[] {
  if (!mayHoldSurfaceLiteral(source)) return []
  const sf = parse(source, filename)
  const sites: SurfaceLiteralSite[] = []

  const record = (node: ts.Node, text: string): undefined => {
    for (const token of text.split(/\s+/)) {
      if (token.length === 0 || !isHardcodedSurfaceLiteral(token)) continue
      const { line } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
      sites.push({ line: line + 1, token })
    }
  }

  const visit = (node: ts.Node): undefined => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      record(node, node.text)
    } else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      record(node, node.text)
    }
    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)
  return sites
}

export function declaresSurfaceHelper(source: string, filename: string): boolean {
  if (!source.includes(SURFACE_HELPER)) return false
  return parse(source, filename).statements.some((stmt) => {
    if (!isExported(stmt)) return false
    if (ts.isFunctionDeclaration(stmt)) return stmt.name?.text === SURFACE_HELPER
    if (!ts.isVariableStatement(stmt)) return false
    return stmt.declarationList.declarations.some(
      (decl) => ts.isIdentifier(decl.name) && decl.name.text === SURFACE_HELPER
    )
  })
}

function isExported(stmt: ts.Statement): boolean {
  if (!ts.canHaveModifiers(stmt)) return false
  return ts.getModifiers(stmt)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) === true
}
