import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import ts from "typescript"

export interface ImportSiteSample {
  readonly filePath: string
  readonly names: readonly string[]
  readonly allTypeOnly: boolean
  readonly hasDefaultOrNamespace: boolean
}

const SOURCE_EXTENSIONS: readonly string[] = [".ts", ".tsx"]

const EXCLUDED_DIR_NAMES: ReadonlySet<string> = new Set([
  "node_modules",
  "dist",
  "build",
  "out",
  "generated",
  "coverage",
  ".next",
  ".turbo",
  "test",
  "tests",
  "__tests__",
  "__fixtures__",
  "k8s",
])

export function scanWorkspaceImportsOfSpecifier(
  workspaceDir: string,
  specifier: string
): readonly ImportSiteSample[] {
  const out: ImportSiteSample[] = []
  for (const filePath of collectSourceFiles(workspaceDir)) {
    for (const sample of collectFromFile(filePath, specifier)) {
      out.push(sample)
    }
  }
  return out
}

function collectSourceFiles(workspaceDir: string): readonly string[] {
  return walkDir(workspaceDir)
}

function walkDir(root: string): readonly string[] {
  const out: string[] = []
  let entries: readonly string[]
  try {
    entries = readdirSync(root)
  } catch {
    return out
  }
  for (const entry of entries) {
    const full = join(root, entry)
    let isDir = false
    let isFile = false
    try {
      const st = statSync(full)
      isDir = st.isDirectory()
      isFile = st.isFile()
    } catch {
      continue
    }
    if (isDir) {
      if (isExcludedDirName(entry)) continue
      if (isNestedWorkspace(full)) continue
      out.push(...walkDir(full))
      continue
    }
    if (isFile && isSourceFile(entry)) out.push(full)
  }
  return out
}

function isExcludedDirName(name: string): boolean {
  if (name.startsWith(".")) return true
  return EXCLUDED_DIR_NAMES.has(name)
}

function isNestedWorkspace(dirPath: string): boolean {
  return existsSync(join(dirPath, "package.json"))
}

function isSourceFile(name: string): boolean {
  if (!SOURCE_EXTENSIONS.some((ext) => name.endsWith(ext))) return false
  if (name.endsWith(".test.ts") || name.endsWith(".test.tsx")) return false
  if (name.endsWith(".spec.ts") || name.endsWith(".spec.tsx")) return false
  if (name.endsWith(".script.ts") || name.endsWith(".script.tsx")) return false
  if (name.endsWith(".d.ts")) return false
  return true
}

function collectFromFile(filePath: string, specifier: string): readonly ImportSiteSample[] {
  let text: string
  try {
    text = readFileSync(filePath, "utf-8")
  } catch {
    return []
  }
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  )
  const out: ImportSiteSample[] = []
  for (const stmt of sourceFile.statements) {
    if (ts.isImportDeclaration(stmt)) {
      const sample = sampleFromImportDeclaration(filePath, specifier, stmt)
      if (sample !== null) out.push(sample)
      continue
    }
    if (ts.isExportDeclaration(stmt)) {
      const sample = sampleFromExportDeclaration(filePath, specifier, stmt)
      if (sample !== null) out.push(sample)
    }
  }
  return out
}

function sampleFromImportDeclaration(
  filePath: string,
  specifier: string,
  decl: ts.ImportDeclaration
): ImportSiteSample | null {
  const mod = decl.moduleSpecifier
  if (!ts.isStringLiteral(mod) || mod.text !== specifier) return null
  const clause = decl.importClause
  if (clause === undefined) {
    return { filePath, names: [], allTypeOnly: false, hasDefaultOrNamespace: false }
  }
  const declarationIsTypeOnly = clause.isTypeOnly === true
  const hasDefault = clause.name !== undefined
  const bindings = clause.namedBindings
  const isNamespace = bindings !== undefined && ts.isNamespaceImport(bindings)
  const isNamedList = bindings !== undefined && ts.isNamedImports(bindings)
  if (hasDefault || isNamespace) {
    return {
      filePath,
      names: [],
      allTypeOnly: declarationIsTypeOnly,
      hasDefaultOrNamespace: !declarationIsTypeOnly,
    }
  }
  if (!isNamedList) {
    return { filePath, names: [], allTypeOnly: declarationIsTypeOnly, hasDefaultOrNamespace: false }
  }
  const names: string[] = []
  let allInlineTyped = true
  for (const element of bindings.elements) {
    names.push(element.name.text)
    if (!element.isTypeOnly) allInlineTyped = false
  }
  return {
    filePath,
    names,
    allTypeOnly: declarationIsTypeOnly || allInlineTyped,
    hasDefaultOrNamespace: false,
  }
}

function sampleFromExportDeclaration(
  filePath: string,
  specifier: string,
  decl: ts.ExportDeclaration
): ImportSiteSample | null {
  const mod = decl.moduleSpecifier
  if (mod === undefined || !ts.isStringLiteral(mod) || mod.text !== specifier) return null
  const declarationIsTypeOnly = decl.isTypeOnly === true
  const bindings = decl.exportClause
  if (bindings === undefined) {
    return {
      filePath,
      names: [],
      allTypeOnly: false,
      hasDefaultOrNamespace: true,
    }
  }
  if (ts.isNamespaceExport(bindings)) {
    return {
      filePath,
      names: [],
      allTypeOnly: declarationIsTypeOnly,
      hasDefaultOrNamespace: declarationIsTypeOnly === false,
    }
  }
  const names: string[] = []
  let allInlineTyped = true
  for (const element of bindings.elements) {
    names.push(element.name.text)
    if (!element.isTypeOnly) allInlineTyped = false
  }
  return {
    filePath,
    names,
    allTypeOnly: declarationIsTypeOnly || allInlineTyped,
    hasDefaultOrNamespace: false,
  }
}
