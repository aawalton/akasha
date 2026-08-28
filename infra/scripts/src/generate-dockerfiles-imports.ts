import { existsSync, readFileSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { asRecord } from "../../../shared/utils-narrow/src/as-record.ts"
import { Glob } from "bun"
import { readJson } from "./generate-dockerfiles-deps.ts"
import { ROOT } from "./generate-dockerfiles-registry.ts"

const SOURCE_GLOB = new Glob("**/*.{ts,tsx,mts,js,jsx,mjs}")
const SOURCE_EXTENSIONS = [".ts", ".tsx", ".mts", ".js", ".jsx", ".mjs"] as const
const RESOLVE_SUFFIXES = [
  "",
  ".ts",
  ".tsx",
  ".mts",
  ".js",
  ".jsx",
  ".mjs",
  "/index.ts",
  "/index.tsx",
  "/index.js",
] as const
const EXPORT_CONDITIONS = ["bun", "import", "module", "default", "require"] as const

function isTestOrDeclaration(relPath: string): boolean {
  return relPath.endsWith(".d.ts") || /\.test\.tsx?$/.test(relPath)
}

function isSourceFile(path: string): boolean {
  return SOURCE_EXTENSIONS.some((ext) => path.endsWith(ext)) && !path.endsWith(".d.ts")
}

function entryRootDir(appDir: string): string {
  const srcDir = join(appDir, "src")
  return existsSync(join(ROOT, srcDir)) ? srcDir : appDir
}

export function listEntryRoots(appDir: string): readonly string[] {
  const rootDir = entryRootDir(appDir)
  const absRoot = join(ROOT, rootDir)
  if (!existsSync(absRoot)) return []

  const roots: string[] = []
  for (const match of SOURCE_GLOB.scanSync({ cwd: absRoot, dot: false })) {
    if (match.includes("node_modules/")) continue
    if (isTestOrDeclaration(match)) continue
    roots.push(join(absRoot, match))
  }
  return roots.sort()
}

function resolveFilePath(base: string): string | null {
  for (const suffix of RESOLVE_SUFFIXES) {
    const candidate = base + suffix
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }
  if (base.endsWith(".js")) {
    const swapped = `${base.slice(0, -3)}.ts`
    if (existsSync(swapped)) return swapped
  }
  return null
}

function splitBareSpecifier(specifier: string): { name: string; subpath: string } {
  const parts = specifier.split("/")
  if (specifier.startsWith("@")) {
    return { name: parts.slice(0, 2).join("/"), subpath: parts.slice(2).join("/") }
  }
  return { name: parts[0] ?? specifier, subpath: parts.slice(1).join("/") }
}

function conditionTarget(entry: unknown): string | null {
  if (typeof entry === "string") return entry
  const record = asRecord(entry)
  if (record === undefined) return null
  for (const condition of EXPORT_CONDITIONS) {
    const value = record[condition]
    if (typeof value === "string") return value
  }
  return null
}

function packageEntryFile(pkgDir: string, subpath: string): string | null {
  const pkgJsonPath = join(ROOT, pkgDir, "package.json")
  if (!existsSync(pkgJsonPath)) return null
  const pkg = readJson(pkgJsonPath)
  const key = subpath === "" ? "." : `./${subpath}`

  const exportsField = asRecord(pkg.exports)
  if (exportsField !== undefined) {
    const target = conditionTarget(exportsField[key])
    if (target != null) return resolveFilePath(join(ROOT, pkgDir, target))
  }
  if (key === "." && typeof pkg.main === "string") {
    return resolveFilePath(join(ROOT, pkgDir, pkg.main))
  }
  if (key !== ".") {
    return (
      resolveFilePath(join(ROOT, pkgDir, subpath)) ??
      resolveFilePath(join(ROOT, pkgDir, "src", subpath))
    )
  }
  return null
}

const transpilers = new Map<string, Bun.Transpiler>()

function transpilerFor(file: string): Bun.Transpiler {
  const loader = file.endsWith(".tsx")
    ? "tsx"
    : file.endsWith(".jsx")
      ? "jsx"
      : file.endsWith(".js") || file.endsWith(".mjs")
        ? "js"
        : "ts"
  let transpiler = transpilers.get(loader)
  if (transpiler == null) {
    transpiler = new Bun.Transpiler({ loader })
    transpilers.set(loader, transpiler)
  }
  return transpiler
}

export function collectExecutedDeps(
  appDir: string,
  nameMap: Map<string, string>
): readonly string[] {
  const dirToName = new Map<string, string>()
  for (const [name, dir] of nameMap) dirToName.set(dir, name)

  const reached = new Set<string>()
  const visited = new Set<string>()
  const queue = [...listEntryRoots(appDir)]

  while (queue.length > 0) {
    const file = queue.pop()
    if (file === undefined) break
    if (visited.has(file)) continue
    visited.add(file)

    let source: string
    try {
      source = readFileSync(file, "utf-8")
    } catch {
      continue
    }

    let specifiers: readonly { readonly path: string }[]
    try {
      specifiers = transpilerFor(file).scanImports(source)
    } catch (cause) {
      throw new Error(`Cannot scan imports of ${file}`, { cause })
    }

    for (const { path: specifier } of specifiers) {
      if (specifier.startsWith("node:") || specifier === "bun" || specifier.startsWith("bun:")) {
        continue
      }
      if (specifier.startsWith(".")) {
        const target = resolveFilePath(resolve(dirname(file), specifier))
        if (target != null && isSourceFile(target)) queue.push(target)
        continue
      }

      const { name, subpath } = splitBareSpecifier(specifier)
      const pkgDir = nameMap.get(name)
      if (pkgDir == null) continue

      reached.add(name)
      const target = packageEntryFile(pkgDir, subpath)
      if (target == null) {
        throw new Error(
          `${file} imports "${specifier}", a workspace package, but nothing in ${pkgDir} answers that specifier. ` +
            `The image would carry the package and still fail to resolve it.`
        )
      }
      if (isSourceFile(target)) queue.push(target)
    }
  }

  reached.delete(dirToName.get(appDir) ?? "")
  return [...reached].sort((a, b) => a.localeCompare(b))
}
