import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"
import { listWorkspaceDirs } from "../workspace-dirs/workspace-dirs.module.code.ts"

const WORKSPACE_MANIFEST_SCHEMA = z
  .object({
    name: z.string().optional(),
    bin: z.union([z.string(), z.record(z.string(), z.string())]).optional(),
  })
  .passthrough()

export function binNamesFromManifest(
  pkg: Pick<z.infer<typeof WORKSPACE_MANIFEST_SCHEMA>, "name" | "bin">
): readonly string[] {
  const bin = pkg.bin
  if (bin === undefined) return []
  if (typeof bin === "string") {
    const unscoped = pkg.name?.split("/").pop() ?? ""
    return unscoped.length > 0 ? [unscoped] : []
  }
  return Object.keys(bin)
}

export function findMissingBins(
  expected: readonly string[],
  present: ReadonlySet<string>
): readonly string[] {
  return [...new Set(expected)].filter((name) => !present.has(name)).sort()
}

export function expectedWorkspaceBinNames(repoRoot: string): readonly string[] {
  const expected: string[] = []
  for (const dir of listWorkspaceDirs(repoRoot)) {
    const manifestPath = join(repoRoot, dir, "package.json")
    if (!existsSync(manifestPath)) continue
    const manifest = WORKSPACE_MANIFEST_SCHEMA.parse(
      JSON.parse(readFileSync(manifestPath, "utf-8"))
    )
    expected.push(...binNamesFromManifest(manifest))
  }
  return expected
}
