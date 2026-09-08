import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { z } from "zod"
import type { PackageJson, WorkspaceInfo } from "../workspace-deps/workspace-deps.module.code.ts"

const stringRecord = z.record(z.string(), z.string())
const PackageJsonSchema = z
  .object({
    name: z.string().optional(),
    dependencies: stringRecord.optional(),
    devDependencies: stringRecord.optional(),
    peerDependencies: stringRecord.optional(),
    optionalDependencies: stringRecord.optional(),
    bin: z.union([z.string(), stringRecord]).optional(),
    scripts: stringRecord.optional(),
    workspaces: z.array(z.string()).optional(),
    patchedDependencies: stringRecord.optional(),
  })
  .passthrough() satisfies z.ZodType<PackageJson>

export function loadWorkspaces(repoRoot: string): readonly WorkspaceInfo[] {
  const workspaces: WorkspaceInfo[] = []
  for (const wsPath of listWorkspaceDirs(repoRoot)) {
    const pkgPath = resolve(repoRoot, wsPath, "package.json")
    if (!existsSync(pkgPath)) continue
    let pkg: PackageJson
    try {
      pkg = PackageJsonSchema.parse(JSON.parse(readFileSync(pkgPath, "utf-8")))
    } catch {
      continue
    }
    workspaces.push({ root: wsPath, name: pkg.name ?? wsPath, packageJsonPath: pkgPath, pkg })
  }
  return workspaces
}
