import { resolve } from "node:path"
import { loadWorkspaces } from "../../../../../tools/lib/check-workflow/test-step-loader.ts"
import { walkPackageTree } from "../walk-package-tree/walk-package-tree.module.code.ts"

const SKIP_DIR_NAMES: readonly string[] = ["node_modules", "dist", ".next"]

export interface ComponentSources {
  readonly jsxFiles: readonly string[]
  readonly headStyleFiles: readonly string[]
}

export function isBareTs(name: string): boolean {
  return name.endsWith(".ts") && !name.endsWith(".tsx")
}

export function isExcludedSource(name: string): boolean {
  if (name.endsWith(".test.ts") || name.endsWith(".test.tsx")) return true
  return name.endsWith(".generated.ts") || name.endsWith(".generated.tsx")
}

export function discoverComponentSources(
  rootDir: string,
  includeFixtures: boolean
): ComponentSources {
  const skipDirNames: ReadonlySet<string> = includeFixtures
    ? new Set(SKIP_DIR_NAMES)
    : new Set([...SKIP_DIR_NAMES, "__fixtures__"])

  let workspaces: readonly { readonly root: string }[]
  try {
    workspaces = loadWorkspaces(rootDir)
  } catch {
    workspaces = []
  }
  const roots = workspaces.length === 0 ? ["."] : workspaces.map((w) => w.root)
  const otherRootsOf = (self: string): ReadonlySet<string> =>
    workspaces.length === 0 ? new Set() : new Set(roots.filter((r) => r !== self))

  const jsxFiles: string[] = []
  const headStyleFiles: string[] = []
  for (const root of roots) {
    const jsxHere: string[] = []
    const bareTsHere: string[] = []
    walkPackageTree({
      packageRoot: resolve(rootDir, root),
      repoRoot: rootDir,
      otherWorkspaceRoots: otherRootsOf(root),
      skipDirNames,
      onFile: (file) => {
        if (isExcludedSource(file.name)) return undefined
        if (file.name.endsWith(".tsx")) jsxHere.push(file.absPath)
        else if (isBareTs(file.name)) bareTsHere.push(file.absPath)
        return undefined
      },
    })
    if (jsxHere.length === 0) continue
    for (const abs of jsxHere) jsxFiles.push(abs)
    for (const abs of bareTsHere) headStyleFiles.push(abs)
  }

  jsxFiles.sort()
  headStyleFiles.sort()
  return { jsxFiles, headStyleFiles }
}
