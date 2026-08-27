import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { emitCreateFunction, type TriggerMode } from "@shared/proc-compiler/emit"
import { deriveSignatureFromFunction } from "@shared/proc-compiler/signature"
import ts from "typescript"
import { lowerStatement } from "./compile-lower"

export type CompileOptions = {
  procName: string
  deployedName?: string
}

export type CompileResult = {
  sql: string
}

const TRIGGER_META: Readonly<Record<string, TriggerMode>> = {
  "set-updated-at": {
    securityDefiner: false,
    searchPath: [],
    grantPublic: true,
  },
}

export function compile(opts: CompileOptions): CompileResult {
  const deployedName = opts.deployedName ?? snakeCase(opts.procName)
  const sourcePath = resolveProcSourcePath(opts.procName)
  const content = readFileSync(sourcePath, "utf-8")
  const trigger = TRIGGER_META[opts.procName]
  if (trigger === undefined) {
    throw new Error(
      `compile: no TRIGGER_META entry for ${opts.procName} — add one alongside the TS source`
    )
  }
  return compileSource({ source: content, sourcePath, deployedName, trigger })
}

export type CompileSourceOptions = {
  source: string
  sourcePath: string
  deployedName: string
  trigger: TriggerMode
}

export function compileSource(opts: CompileSourceOptions): CompileResult {
  const sf = ts.createSourceFile(
    opts.sourcePath,
    opts.source,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TS
  )
  const procFn = findExportedFunction(sf)
  if (procFn === null) {
    throw new Error(`compile: no top-level exported function in ${opts.sourcePath}`)
  }
  const body = procFn.body
  if (body === undefined) {
    throw new Error("compile: function has no body")
  }
  const statements: string[] = []
  for (const stmt of body.statements) {
    statements.push(lowerStatement(stmt, sf))
  }
  const sig = deriveSignatureFromFunction(procFn, sf, { triggerMode: true })
  const sql = emitCreateFunction({ declares: [], statements }, opts.deployedName, sig, {
    trigger: opts.trigger,
  })
  return { sql }
}

function snakeCase(kebab: string): string {
  return kebab.replace(/-/g, "_")
}

function findExportedFunction(sf: ts.SourceFile): ts.FunctionDeclaration | null {
  for (const stmt of sf.statements) {
    if (!ts.isFunctionDeclaration(stmt)) continue
    const mods = ts.getModifiers(stmt) ?? []
    const isExport = mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    if (isExport) return stmt
  }
  return null
}

function resolveProcSourcePath(procName: string): string {
  const here = new URL(import.meta.url).pathname
  const compilerSrcDir = dirname(here)
  return resolve(compilerSrcDir, "..", "..", "proc", "src", `${procName}.ts`)
}
