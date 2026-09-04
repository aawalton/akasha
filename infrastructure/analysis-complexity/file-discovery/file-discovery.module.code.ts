import { execFileSync } from "node:child_process"
import { resolve } from "node:path"

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
    const out = execFileSync("git", ["-C", cwd, "rev-parse", "--show-toplevel"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    })
    const trimmed = out.trim()
    return trimmed.length > 0 ? trimmed : undefined
  } catch {
    return undefined
  }
}

export function listWorkspaceTypeScriptFiles(repoRoot: string): readonly string[] {
  let raw: string
  try {
    raw = execFileSync(
      "git",
      [
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
      ],
      {
        encoding: "utf-8",
        maxBuffer: 256 * 1024 * 1024,
        stdio: ["ignore", "pipe", "ignore"],
      }
    )
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
