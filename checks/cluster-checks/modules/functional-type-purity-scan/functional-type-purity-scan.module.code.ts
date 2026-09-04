import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import ts from "typescript"
import { listFileImports } from "../ts-import-graph-list-imports/ts-import-graph-list-imports.module.code.ts"

const NODE_BUILTIN_BARE_NAMES: ReadonlySet<string> = new Set([
  "fs",
  "fs/promises",
  "http",
  "https",
  "child_process",
  "net",
  "dns",
  "os",
  "path",
  "crypto",
  "stream",
  "url",
  "zlib",
  "tls",
])

const BUN_IO_METHODS: ReadonlySet<string> = new Set([
  "serve",
  "spawn",
  "spawnSync",
  "file",
  "write",
  "connect",
])

const PROCESS_EFFECT_METHODS: ReadonlySet<string> = new Set(["kill"])

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

interface PurityScanResult {
  readonly passes: boolean
}

export function passesPurityScan(workspaceDir: string): boolean {
  const result = runPurityScan(workspaceDir)
  return result.passes
}

function runPurityScan(workspaceDir: string): PurityScanResult {
  const sourceFiles = collectSourceFiles(workspaceDir)
  for (const filePath of sourceFiles) {
    if (!fileIsPure(filePath)) return { passes: false }
  }
  return { passes: true }
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

function handsOutGlobalFetch(node: ts.Identifier): boolean {
  const parent = node.parent
  if (parent === undefined) return false
  if (ts.isParameter(parent) && parent.initializer === node) return true
  if (ts.isVariableDeclaration(parent) && parent.initializer === node) return true
  if (ts.isPropertyAssignment(parent) && parent.initializer === node) return true
  if (ts.isCallExpression(parent) && parent.arguments.includes(node)) return true
  return false
}

function fileIsPure(filePath: string): boolean {
  let text: string
  try {
    text = readFileSync(filePath, "utf-8")
  } catch {
    return true
  }
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  )

  for (const specifier of listFileImports(sourceFile)) {
    if (specifier.startsWith("node:")) return false
    if (NODE_BUILTIN_BARE_NAMES.has(specifier)) return false
  }

  let pure = true
  function visit(node: ts.Node): undefined {
    if (!pure) return
    if (ts.isCallExpression(node)) {
      if (
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === "Bun" &&
        BUN_IO_METHODS.has(node.expression.name.text)
      ) {
        pure = false
        return
      }
      if (
        ts.isPropertyAccessExpression(node.expression) &&
        ts.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === "process" &&
        PROCESS_EFFECT_METHODS.has(node.expression.name.text)
      ) {
        pure = false
        return
      }
      if (ts.isIdentifier(node.expression) && node.expression.text === "fetch") {
        pure = false
        return
      }
    }
    if (ts.isIdentifier(node) && node.text === "fetch" && handsOutGlobalFetch(node)) {
      pure = false
      return
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return pure
}
