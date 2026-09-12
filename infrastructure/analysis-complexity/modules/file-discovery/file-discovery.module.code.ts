import { resolve } from "node:path"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const SCAN_SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  ".turbo",
  "__fixtures__",
  "_generated",
])

export function resolveRepoRoot(cwd: string): string | undefined {
  try {
    const done = ran(["git", "-C", cwd, "rev-parse", "--show-toplevel"])
    if (done.code !== 0) return undefined
    const trimmed = done.out.trim()
    return trimmed.length > 0 ? trimmed : undefined
  } catch {
    return undefined
  }
}

export function listWorkspaceTypeScriptFiles(repoRoot: string): readonly string[] {
  let raw: string
  try {
    const done = ran([
      "git",
      "-C",
      repoRoot,
      "ls-files",
      "--cached",
      "--others",
      "--exclude-standard",
      "-z",
      "--",
      "*.ts",
      "*.tsx",
    ])
    if (done.code !== 0) return []
    raw = done.out
  } catch {
    return []
  }
  const out: string[] = []
  for (const rel of raw.split("\0")) {
    if (rel.length === 0) continue
    if (rel.endsWith(".d.ts")) continue
    if (rel.endsWith(".generated.ts") || rel.endsWith(".generated.tsx")) continue
    const segs = rel.split("/")
    let skip = false
    for (const s of segs) {
      if (SCAN_SKIP_DIRS.has(s)) {
        skip = true
        break
      }
    }
    if (skip) continue
    out.push(resolve(repoRoot, rel))
  }
  return out
}
