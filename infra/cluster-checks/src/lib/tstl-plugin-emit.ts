import { isObjectRecord } from "@shared/utils-narrow/is-object-record"
import ts from "typescript"
import type { TstlTsconfig } from "./tstl-source-paths"

export const TSTL_PLUGIN_TRANSPILE_OPTIONS: ts.CompilerOptions = {
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES2020,
  esModuleInterop: true,
}

export function transpileTstlPlugin(sourceText: string, fileName: string): string {
  return ts.transpileModule(sourceText, {
    compilerOptions: TSTL_PLUGIN_TRANSPILE_OPTIONS,
    fileName,
  }).outputText
}

export interface TstlPluginDeclaration {
  readonly config: string
  readonly specifier: string
}

export interface TstlPluginDerivation {
  readonly basenames: readonly string[]
  readonly unresolved: readonly TstlPluginDeclaration[]
}

export function readTstlPluginDeclarations(
  configs: readonly TstlTsconfig[]
): readonly TstlPluginDeclaration[] {
  const declarations: TstlPluginDeclaration[] = []
  for (const { rel, text } of configs) {
    const config: unknown = ts.parseConfigFileTextToJson(rel, text).config
    if (!isObjectRecord(config)) continue
    const tstl: unknown = config.tstl
    if (!isObjectRecord(tstl)) continue
    const plugins: unknown = tstl.luaPlugins
    if (!Array.isArray(plugins)) continue
    for (const entry of plugins) {
      if (!isObjectRecord(entry)) continue
      const name: unknown = entry.name
      if (typeof name !== "string" || name === "") continue
      declarations.push({ config: rel, specifier: name })
    }
  }
  return declarations
}

function normalizeRepoRelative(path: string): string | null {
  const parts: string[] = []
  for (const segment of path.split("/")) {
    if (segment === "" || segment === ".") continue
    if (segment === "..") {
      if (parts.length === 0) return null
      parts.pop()
      continue
    }
    parts.push(segment)
  }
  return parts.length === 0 ? null : parts.join("/")
}

export function resolveTstlPluginSpecifier(
  declaration: TstlPluginDeclaration,
  workspaceRootsByName: ReadonlyMap<string, string>
): string | null {
  const { config, specifier } = declaration
  if (specifier.startsWith("/") || specifier.includes("${") || specifier.includes("<")) return null
  if (specifier.startsWith(".")) {
    const slash = config.lastIndexOf("/")
    const dir = slash < 0 ? "" : config.slice(0, slash)
    return normalizeRepoRelative(`${dir}/${specifier}`)
  }
  const segments = specifier.split("/")
  const scoped = specifier.startsWith("@")
  const packageName = scoped ? segments.slice(0, 2).join("/") : segments[0]
  const subpath = segments.slice(scoped ? 2 : 1).join("/")
  if (packageName === undefined || subpath === "") return null
  const root = workspaceRootsByName.get(packageName)
  if (root === undefined) return null
  return normalizeRepoRelative(`${root}/${subpath}`)
}

export function deriveTstlPluginEmits(
  configs: readonly TstlTsconfig[],
  workspaceRootsByName: ReadonlyMap<string, string>
): TstlPluginDerivation {
  const basenames = new Set<string>()
  const unresolved: TstlPluginDeclaration[] = []
  for (const declaration of readTstlPluginDeclarations(configs)) {
    const resolved = resolveTstlPluginSpecifier(declaration, workspaceRootsByName)
    if (resolved === null || !resolved.endsWith(".js")) {
      unresolved.push(declaration)
      continue
    }
    basenames.add(resolved.slice(0, resolved.length - ".js".length))
  }
  return { basenames: [...basenames].sort(), unresolved }
}

export interface TstlPluginEmit {
  readonly basename: string
  readonly tsSource: string
  readonly committedJs: string
}

export interface TstlPluginDrift {
  readonly basename: string
  readonly freshJs: string
}

export function findStaleTstlPlugins(
  plugins: readonly TstlPluginEmit[]
): readonly TstlPluginDrift[] {
  const stale: TstlPluginDrift[] = []
  for (const p of plugins) {
    const freshJs = transpileTstlPlugin(p.tsSource, `${p.basename}.ts`)
    if (freshJs !== p.committedJs) stale.push({ basename: p.basename, freshJs })
  }
  return stale
}
