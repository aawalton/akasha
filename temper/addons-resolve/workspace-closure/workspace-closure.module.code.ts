import { existsSync, readFileSync } from "node:fs"
import { join, relative, sep } from "node:path"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { z } from "zod"

const WORKSPACE_PROTOCOL_PREFIX = "workspace:"

export function repoRelOf(repoRoot: string, dir: string): string {
  return relative(repoRoot, dir).split(sep).join("/")
}

const packageJsonSchema = z
  .object({
    name: z.string().optional(),
    dependencies: z.record(z.string(), z.string()).optional(),
    devDependencies: z.record(z.string(), z.string()).optional(),
    peerDependencies: z.record(z.string(), z.string()).optional(),
  })
  .passthrough()

type ParsedManifest = z.infer<typeof packageJsonSchema>

export function readManifest(dir: string): ParsedManifest | null {
  const path = join(dir, "package.json")
  if (!existsSync(path)) return null
  try {
    const raw: unknown = JSON.parse(readFileSync(path, "utf-8"))
    const parsed = packageJsonSchema.safeParse(raw)
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function loadWorkspaceCatalog(repoRoot: string): ReadonlyMap<string, string> {
  let dirs: readonly string[]
  try {
    dirs = listWorkspaceDirs(repoRoot)
  } catch {
    return new Map()
  }
  const catalog = new Map<string, string>()
  for (const rel of dirs) {
    const dir = join(repoRoot, rel)
    const manifest = readManifest(dir)
    if (manifest?.name === undefined) continue
    catalog.set(manifest.name, repoRelOf(repoRoot, dir))
  }
  return catalog
}

export function computeWorkspaceClosure(
  seedRepoRelDir: string,
  repoRoot: string,
  catalog: ReadonlyMap<string, string>
): readonly string[] {
  const seen = new Set<string>()
  const queue: string[] = [seedRepoRelDir]
  while (queue.length > 0) {
    const dir = queue.pop()
    if (dir === undefined) break
    if (seen.has(dir)) continue
    seen.add(dir)
    const manifest = readManifest(join(repoRoot, dir))
    if (manifest === null) continue
    const reached = {
      ...(manifest.dependencies ?? {}),
      ...(manifest.devDependencies ?? {}),
      ...(manifest.peerDependencies ?? {}),
    }
    for (const [name, version] of Object.entries(reached)) {
      if (!version.startsWith(WORKSPACE_PROTOCOL_PREFIX)) continue
      const depDir = catalog.get(name)
      if (depDir === undefined) continue
      if (!seen.has(depDir)) queue.push(depDir)
    }
  }
  return [...seen].sort()
}

export function computeClosureForPackage(packageName: string, repoRoot: string): readonly string[] {
  const catalog = loadWorkspaceCatalog(repoRoot)
  const seedRepoRelDir = catalog.get(packageName)
  if (seedRepoRelDir === undefined) {
    throw new Error(`${packageName} is no workspace package under ${repoRoot}`)
  }
  return computeWorkspaceClosure(seedRepoRelDir, repoRoot, catalog)
}
