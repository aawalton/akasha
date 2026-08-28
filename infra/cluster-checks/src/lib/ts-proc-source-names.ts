import { readFileSync } from "node:fs"
import { basename } from "node:path"
import { requireMatchPositional } from "@shared/utils-narrow/require-match-positional"
import ts from "typescript"
import { z } from "zod"

export interface ProcSource {
  readonly name: string
  readonly file: string
  readonly shape: "imperative" | "sql-template" | "reference"
}

const COMPILER_PARAM_NAMES: ReadonlySet<string> = new Set(["ctx", "args"])

const FRAGMENT_RETURN_TYPE = "SqlTemplate"

const SUPPORT_BASENAMES: ReadonlySet<string> = new Set([
  "index.ts",
  "ctx.ts",
  "_apply_json_patch_op.equiv-cases.ts",
  "pages-for-view-args.ts",
  "pages-for-view-fast-path.ts",
  "pages-for-view-lateral-path.ts",
  "pages-for-view-relation-sort.ts",
  "pages-for-view-stored-clauses.ts",
  "trigger-pipeline-materialize-workflows.ts",
])

const PROC_SRC_PATH_RE = /^(?:[^/]+\/)*[^/]+-proc\/src\/([^/]+)$/
const PROC_SRC_DIR_PATH_RE = /^(?:[^/]+\/)*[^/]+-proc\/src\/([^/]+)\/index\.ts$/
const PROC_SRC_BASENAME_TUPLE = z.tuple([z.string()])

export function procSourceBasename(rel: string): string | null {
  if (PROC_SRC_PATH_RE.test(rel)) {
    const [base] = requireMatchPositional(PROC_SRC_PATH_RE, PROC_SRC_BASENAME_TUPLE, rel)
    return base
  }
  if (PROC_SRC_DIR_PATH_RE.test(rel)) {
    const [dir] = requireMatchPositional(PROC_SRC_DIR_PATH_RE, PROC_SRC_BASENAME_TUPLE, rel)
    return `${dir}.ts`
  }
  return null
}

export function isProcSourceCandidate(rel: string): boolean {
  if (!rel.endsWith(".ts")) return false
  if (rel.endsWith(".test.ts")) return false
  if (rel.endsWith(".d.ts")) return false
  const base = procSourceBasename(rel)
  if (base === null) return false
  if (SUPPORT_BASENAMES.has(base)) return false
  return true
}

export function parseProcSource(rel: string, source: string): ProcSource | null {
  const sf = ts.createSourceFile(rel, source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS)

  for (const stmt of sf.statements) {
    if (!ts.isExportAssignment(stmt)) continue
    if (stmt.isExportEquals === true) continue
    const expr = stmt.expression
    if (!ts.isCallExpression(expr)) continue
    if (!ts.isIdentifier(expr.expression)) continue
    if (expr.expression.text !== "defineProc") continue
    const arg = expr.arguments[0]
    if (arg === undefined || !ts.isObjectLiteralExpression(arg)) continue
    for (const prop of arg.properties) {
      if (!ts.isPropertyAssignment(prop)) continue
      if (!ts.isIdentifier(prop.name)) continue
      if (prop.name.text !== "name") continue
      const init = prop.initializer
      if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) {
        return { name: init.text, file: rel, shape: "sql-template" }
      }
    }
  }

  for (const stmt of sf.statements) {
    if (!ts.isFunctionDeclaration(stmt)) continue
    const mods = ts.getModifiers(stmt) ?? []
    if (!mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue
    if (stmt.type?.getText(sf) === FRAGMENT_RETURN_TYPE) return null
    const stem = (procSourceBasename(rel) ?? basename(rel)).replace(/\.ts$/, "")
    const params = stmt.parameters.map((p) => p.name.getText(sf))
    const compilable = params.every((one) => COMPILER_PARAM_NAMES.has(one))
    return {
      name: stem.replace(/-/g, "_"),
      file: rel,
      shape: compilable ? "imperative" : "reference",
    }
  }

  return null
}

export function collectProcSources(
  files: readonly string[],
  readFile: (rel: string) => string = (rel) => readFileSync(rel, "utf-8")
): readonly ProcSource[] {
  const out: ProcSource[] = []
  for (const rel of files) {
    if (!isProcSourceCandidate(rel)) continue
    const source = readFile(rel)
    const ps = parseProcSource(rel, source)
    if (ps !== null) out.push(ps)
  }
  return out
}
