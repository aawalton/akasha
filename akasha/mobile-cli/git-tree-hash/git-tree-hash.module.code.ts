import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"

export const CODE_BUILD_INPUT_PATHS: readonly string[] = [
  "packages",
  "bun.lock",
  "package.json",
  "tsconfig.base.json",
  "bunfig.toml",
]

export interface TreeSource {
  readonly root: string
  readonly ref: string
  readonly paths: readonly string[]
}

export const ABSENT_OBJECT = "absent"

export function objectIdAt(repoRoot: string, ref: string, path: string): string {
  try {
    return execFileSync("git", ["-C", repoRoot, "rev-parse", `${ref}:${path}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
  } catch {
    return ABSENT_OBJECT
  }
}

export function computeBuildInputTreeHash(sources: readonly TreeSource[]): string {
  const named = sources.flatMap((source) =>
    source.paths.map((path) => `${path}=${objectIdAt(source.root, source.ref, path)}`)
  )
  return createHash("sha256").update(named.join("\n")).digest("hex")
}

export function resolveRepoRoot(cwd?: string): string {
  return execFileSync("git", ["-C", cwd ?? process.cwd(), "rev-parse", "--show-toplevel"], {
    encoding: "utf8",
  }).trim()
}

export function fetchOrigin(repoRoot: string): undefined {
  execFileSync("git", ["-C", repoRoot, "fetch", "origin"], { encoding: "utf8" })
  return undefined
}

export function resolveRef(repoRoot: string, ref: string): string {
  return execFileSync("git", ["-C", repoRoot, "rev-parse", ref], {
    encoding: "utf8",
  }).trim()
}

export function countCommitsBetween(repoRoot: string, fromSha: string, toRef: string): number {
  if (fromSha === "") {
    return 0
  }
  try {
    const out = execFileSync(
      "git",
      ["-C", repoRoot, "rev-list", "--count", `${fromSha}..${toRef}`],
      { encoding: "utf8" }
    ).trim()
    const count = Number.parseInt(out, 10)
    return Number.isNaN(count) ? 0 : count
  } catch {
    return 0
  }
}
