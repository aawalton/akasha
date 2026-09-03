import ts from "typescript"
import { z } from "zod"
import {
  classifyPath,
  isAcceptableForCheck,
} from "../repo-path-resolver/repo-path-resolver.module.code.ts"

const TOKEN_MATCH_SCHEMA = z.array(z.string()).min(1)

export interface PathLiteral {
  literal: string
  line: number
}

function scriptKindFor(filePath: string): ts.ScriptKind {
  if (filePath.endsWith(".tsx")) return ts.ScriptKind.TSX
  if (filePath.endsWith(".ts")) return ts.ScriptKind.TS
  if (filePath.endsWith(".jsx")) return ts.ScriptKind.JSX
  if (filePath.endsWith(".js")) return ts.ScriptKind.JS
  if (filePath.endsWith(".mjs")) return ts.ScriptKind.JS
  if (filePath.endsWith(".cjs")) return ts.ScriptKind.JS
  return ts.ScriptKind.TS
}

const REPO_ROOT_SUBSTITUTIONS: ReadonlySet<string> = new Set([
  "ci.workspace",
  "repoRoot",
  "REPO_ROOT",
  "repoDir",
  "worktreeDir",
  "workspace",
  "WORKSPACE",
  "root",
  "ROOT",
])

const PATH_TOKEN_RE = /^[A-Za-z0-9/._\-+@:~]+/

export function hasGeneratedSegment(candidate: string): boolean {
  for (const segment of candidate.split("/")) {
    if (segment === "generated") return true
  }
  return false
}

function expressionText(node: ts.Expression, sf: ts.SourceFile): string {
  return sf.text.slice(node.getStart(sf), node.getEnd()).trim()
}

function collectFromTemplateSpans(
  node: ts.TemplateExpression,
  sf: ts.SourceFile,
  topLevelDirs: ReadonlySet<string>
): readonly PathLiteral[] {
  const out: PathLiteral[] = []
  for (const span of node.templateSpans) {
    const text = span.literal.text
    if (!text.startsWith("/")) continue
    if (!REPO_ROOT_SUBSTITUTIONS.has(expressionText(span.expression, sf))) continue
    const afterSlash = text.slice(1)
    const tokenMatch = TOKEN_MATCH_SCHEMA.safeParse(afterSlash.match(PATH_TOKEN_RE))
    if (!tokenMatch.success) continue
    const candidate = tokenMatch.data[0]
    if (candidate === undefined) continue
    if (classifyPath(candidate, topLevelDirs) === null) continue
    if (!isAcceptableForCheck(candidate)) continue
    if (hasGeneratedSegment(candidate)) continue
    const line = ts.getLineAndCharacterOfPosition(sf, span.literal.getStart(sf)).line + 1
    out.push({ literal: candidate, line })
  }
  return out
}

function isCitationRecord(node: ts.Node): boolean {
  if (!ts.isPropertyAssignment(node)) return false
  const name = node.name
  const named = ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null
  if (named !== "citation") return false
  return (
    ts.isStringLiteral(node.initializer) || ts.isNoSubstitutionTemplateLiteral(node.initializer)
  )
}

export function extractTsPathLiterals(
  source: string,
  filePath: string,
  topLevelDirs: ReadonlySet<string>
): readonly PathLiteral[] {
  const sf = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    false,
    scriptKindFor(filePath)
  )

  const out: PathLiteral[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isTemplateExpression(node)) {
      out.push(...collectFromTemplateSpans(node, sf, topLevelDirs))
      ts.forEachChild(node, visit)
      return
    }

    if (isCitationRecord(node)) return

    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const literal = node.text
      if (classifyPath(literal, topLevelDirs) !== null && isAcceptableForCheck(literal)) {
        const line = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf)).line + 1
        out.push({ literal, line })
      }
      return
    }

    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)
  return out
}

const SHELL_LUA_PATH_RE = /(["'])(~\/code\/[^"'\n]+|[^"'\n/]+\/[^"'\n]+)\1/g

export function extractShellLuaPathLiterals(
  source: string,
  topLevelDirs: ReadonlySet<string>
): readonly PathLiteral[] {
  const out: PathLiteral[] = []
  const lines = source.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line === undefined) continue
    for (const match of line.matchAll(SHELL_LUA_PATH_RE)) {
      const literal = match[2]
      if (literal === undefined) continue
      if (classifyPath(literal, topLevelDirs) !== null && isAcceptableForCheck(literal)) {
        out.push({ literal, line: i + 1 })
      }
    }
  }
  return out
}
