import { type Dirent, readdirSync, readFileSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"
import ts from "typescript"
import { discoverRepoFiles } from "../../../../akasha/checks/cluster-checks/modules/repo-files/repo-files.module.code.ts"
import { collectExports, collectImports } from "./ts-import-graph-collect"
import { matchAny, roleFor } from "./ts-import-graph-globs"
import { parsePragmas } from "./ts-import-graph-pragmas"
import type {
  GraphConfig,
  ModuleGraph,
  ModuleNode,
  ParsedWorkspace,
  WorkspaceConfig,
} from "./ts-import-graph-types"

const SCAN_SKIP_DIRS = new Set(["node_modules", ".next", "dist", ".turbo", "__fixtures__"])

function scanFiles(dir: string, repoRoot: string, patterns: readonly string[]): readonly string[] {
  const files: string[] = []
  function walk(d: string): undefined {
    let entries: Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      if (SCAN_SKIP_DIRS.has(entry.name)) continue
      const full = resolve(d, entry.name)
      if (entry.isDirectory()) {
        walk(full)
        continue
      }
      const repoRel = relative(repoRoot, full)
      if (matchAny(patterns, repoRel)) files.push(full)
    }
  }
  walk(dir)
  return files
}

function parseWorkspaceConfig(ws: WorkspaceConfig): ParsedWorkspace | null {
  const configFile = ts.readConfigFile(ws.tsconfigPath, (p) => {
    try {
      return readFileSync(p, "utf-8")
    } catch {
      return undefined
    }
  })
  if (configFile.error) return null
  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, dirname(ws.tsconfigPath))
  if (parsed.options.moduleResolution === undefined) {
    parsed.options.moduleResolution = ts.ModuleResolutionKind.Bundler
  }
  const host = ts.createCompilerHost(parsed.options)
  const rawExcludesRaw: unknown = configFile.config?.exclude
  const rawExcludes: string[] = Array.isArray(rawExcludesRaw)
    ? rawExcludesRaw.filter((x): x is string => typeof x === "string")
    : []
  return {
    ws,
    host,
    options: parsed.options,
    fileNames: parsed.fileNames,
    tsconfigExcludes: rawExcludes,
  }
}

export function buildModuleGraph(config: GraphConfig): ModuleGraph {
  const warnings: string[] = []
  const graph: ModuleGraph = {
    modules: new Map(),
    entries: new Set(),
    warnings,
  }

  let repoRelPaths: readonly string[]
  try {
    repoRelPaths = discoverRepoFiles(config.repoRoot, {
      includeFixtures: true,
      includeGenerated: true,
    })
  } catch (err) {
    warnings.push(
      `git file enumeration unavailable at ${config.repoRoot} (${err instanceof Error ? err.message : String(err)}); ` +
        `analyzing every filesystem match without the gitignore filter`
    )
    repoRelPaths = []
  }
  const gitAllowed: Set<string> | null =
    repoRelPaths.length > 0
      ? new Set(repoRelPaths.map((rel) => resolve(config.repoRoot, rel)))
      : null

  const adapterPatterns = config.adapters
    .filter((a) => a.role === "entry" || a.role === "transit")
    .map((a) => a.pattern)

  const parsed: ParsedWorkspace[] = []
  for (const ws of config.workspaces) {
    const cfg = parseWorkspaceConfig(ws)
    if (!cfg) {
      warnings.push(`tsconfig read error: ${ws.tsconfigPath}`)
      continue
    }
    parsed.push(cfg)
  }

  for (const { ws, options, fileNames, tsconfigExcludes } of parsed) {
    const absRoot = resolve(config.repoRoot, ws.root !== "" ? ws.root : ".")
    const projectGlobs = ws.project
    const entryGlobs = ws.entries
    const ignoreGlobs = ws.ignore
    const wildcardEntryGlobs = entryGlobs.filter((g) => g.endsWith("!"))

    const seen = new Set<string>()
    for (const abs of fileNames) {
      if (!abs.startsWith(absRoot + "/") && abs !== absRoot) continue
      if (abs.includes("/node_modules/")) continue
      seen.add(abs)
    }

    if (adapterPatterns.length > 0) {
      for (const abs of scanFiles(absRoot, config.repoRoot, adapterPatterns)) {
        seen.add(abs)
      }
    }

    if (entryGlobs.length > 0) {
      for (const abs of scanFiles(absRoot, absRoot, entryGlobs)) {
        seen.add(abs)
      }
    }

    const seenBeforeProjectScan = new Set(seen)

    if (projectGlobs.length > 0) {
      for (const abs of scanFiles(absRoot, absRoot, projectGlobs)) {
        if (tsconfigExcludes.length > 0) {
          const wsRel = relative(absRoot, abs)
          if (matchAny(tsconfigExcludes, wsRel)) continue
        }
        seen.add(abs)
      }
    }

    for (const abs of seen) {
      if (graph.modules.has(abs)) continue
      if (gitAllowed && !gitAllowed.has(abs)) continue
      const wsRel = relative(absRoot, abs)
      if (!matchAny(projectGlobs, wsRel)) continue
      const isIgnored = ignoreGlobs.length > 0 && matchAny(ignoreGlobs, wsRel)
      const isInGeneratedDir = wsRel.startsWith("generated/") || wsRel.includes("/generated/")
      let text: string
      try {
        text = readFileSync(abs, "utf-8")
      } catch {
        continue
      }
      const sf = ts.createSourceFile(abs, text, options.target ?? ts.ScriptTarget.ESNext, true)
      const repoRel = relative(config.repoRoot, abs)
      const exports = collectExports(sf)
      const imports = collectImports(sf)
      const pragmas = parsePragmas(text)
      if (isIgnored && !pragmas.file) {
        pragmas.file = { reason: "workspace ignore glob", line: 0 }
      }
      if (isInGeneratedDir && !pragmas.file) {
        pragmas.file = { reason: "auto: generated/ folder", line: 0 }
      }
      let role = roleFor(repoRel, config.adapters)
      if (
        role === "source" &&
        wildcardEntryGlobs.length > 0 &&
        matchAny(wildcardEntryGlobs, wsRel)
      ) {
        role = "entry"
      }
      const isConsumerOnly = !seenBeforeProjectScan.has(abs) || !ws.audited
      const node: ModuleNode = {
        filePath: abs,
        relPath: repoRel,
        workspaceRoot: ws.root,
        role,
        exports: exports.exports,
        imports,
        pragmas,
        consumerOnly: isConsumerOnly || undefined,
      }
      graph.modules.set(abs, node)
      if (matchAny(entryGlobs, wsRel) && role !== "ignore") {
        graph.entries.add(abs)
      }
      if (role === "entry") graph.entries.add(abs)
    }
  }

  const hostByWs = new Map<string, { host: ts.CompilerHost; options: ts.CompilerOptions }>()
  for (const { ws, host, options } of parsed) {
    hostByWs.set(ws.root, { host, options })
  }

  for (const node of graph.modules.values()) {
    const pair = hostByWs.get(node.workspaceRoot)
    if (!pair) continue
    for (const imp of node.imports) {
      if (imp.resolvedPath !== null) continue
      if (imp.specifier.startsWith("[dynamic-import-suffix]")) {
        const suffix = imp.specifier.slice("[dynamic-import-suffix]".length)
        const normalizedSuffix = suffix.startsWith("/") ? suffix.slice(1) : suffix
        for (const candidate of graph.modules.keys()) {
          const candidateRel = relative(config.repoRoot, candidate)
          if (candidateRel === normalizedSuffix || candidateRel.endsWith("/" + normalizedSuffix)) {
            imp.resolvedPath = candidate
            break
          }
        }
        continue
      }
      const res = ts.resolveModuleName(imp.specifier, node.filePath, pair.options, pair.host)
      const target = res.resolvedModule?.resolvedFileName
      if (target != null && !target.includes("/node_modules/") && graph.modules.has(target)) {
        imp.resolvedPath = target
      } else if (target != null) {
        imp.resolvedPath = null
      }
    }
  }

  return graph
}
