import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { z } from "zod"
import {
  groupTestFilesByType,
  type TestType,
} from "../test-step-paths/test-step-paths.module.code.ts"
import {
  computeTransitiveClosure,
  type PackageJson,
  type WorkspaceInfo,
} from "../workspace-deps/workspace-deps.module.code.ts"

const TEST_FILE_GLOB = "**/*.{unit,property,component}.test.{ts,tsx}"

const FIXTURE_PATH_RE = /(^|\/)__fixtures__\//

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

export function loadTestFiles(repoRoot: string): readonly string[] {
  const glob = new Bun.Glob(TEST_FILE_GLOB)
  const files = [...glob.scanSync({ cwd: repoRoot, absolute: false })]
  return files.filter((f) => !FIXTURE_PATH_RE.test(f)).sort()
}

export function loadAllTestFiles(repoRoot: string): readonly string[] {
  const glob = new Bun.Glob("**/*.test.{ts,tsx}")
  const files = [...glob.scanSync({ cwd: repoRoot, absolute: false })]
  return files.filter((f) => !FIXTURE_PATH_RE.test(f)).sort()
}

export function loadTestStepInputs(repoRoot: string): {
  workspaces: readonly WorkspaceInfo[]
  testFiles: readonly string[]
  testsByType: Record<TestType, readonly string[]>
  closure: Map<string, Set<string>>
  rootToName: Map<string, string>
} {
  const workspaces = loadWorkspaces(repoRoot)
  const testFiles = loadTestFiles(repoRoot)
  const testsByType = groupTestFilesByType(testFiles)
  const closure = computeTransitiveClosure(workspaces)
  const rootToName = new Map<string, string>()
  for (const ws of workspaces) {
    if (ws.name !== "") rootToName.set(ws.root, ws.name)
  }
  return { workspaces, testFiles, testsByType, closure, rootToName }
}
