import { existsSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import { bodiesAt } from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { Glob } from "bun"

const SOURCE_GLOB = new Glob("**/*.{ts,tsx,mts,js,jsx,mjs}")
const SOURCE_EXTENSIONS = [".ts", ".tsx", ".mts", ".js", ".jsx", ".mjs"] as const

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
    roots.push(join(rootDir, match))
  }
  return roots.sort()
}

function heldAt(path: string): boolean {
  return statSync(join(ROOT, path), { throwIfNoEntry: false })?.isFile() === true
}

function foldedDirs(files: readonly string[], appDir: string): readonly string[] {
  const held = new Set<string>()
  for (const file of files) {
    if (file.startsWith(`${appDir}/`)) continue
    const at = dirname(file)
    if (at === ".") continue
    held.add(at)
  }
  const every = [...held]
  return every
    .filter((one) => !every.some((two) => two !== one && one.startsWith(`${two}/`)))
    .sort((a, b) => a.localeCompare(b))
}

export function collectExecutedDeps(appDir: string): readonly string[] {
  const reached = closureOf(imports, listEntryRoots(appDir), {
    index: shadowAt(ROOT).index,
    bodyAt: bodiesAt(ROOT),
    through: (one) => isSourceFile(one) && heldAt(one),
  })
  return foldedDirs(reached, appDir)
}
