import { execFileSync } from "node:child_process"
import { CHECK_EXEMPT_DIRS } from "../repo-scope/repo-scope.module.code.ts"

const GIT_OUTPUT_CEILING = 256 * 1024 * 1024

function stderrDetail(err: unknown): string {
  if (typeof err !== "object" || err === null || !("stderr" in err)) return ""
  const { stderr } = err
  if (stderr === null || stderr === undefined) return ""
  const text = String(stderr).trim()
  return text === "" ? "" : `: ${text}`
}

function runGitLsFiles(root: string): readonly string[] {
  let out: string
  try {
    out = execFileSync(
      "git",
      ["-C", root, "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
      {
        encoding: "utf-8",
        maxBuffer: GIT_OUTPUT_CEILING,
        stdio: ["ignore", "pipe", "pipe"],
      }
    )
  } catch (err) {
    throw new Error(`git ls-files failed in ${root}${stderrDetail(err)}`)
  }
  const paths: string[] = []
  for (const rel of out.split("\0")) {
    if (rel === "") continue
    paths.push(rel)
  }
  paths.sort()
  return paths
}

export interface RepoFilesOptions {
  readonly includeFixtures?: boolean
  readonly includeGenerated?: boolean
}

export function discoverRepoFiles(root: string, options?: RepoFilesOptions): readonly string[] {
  const includeFixtures = options?.includeFixtures ?? false
  const includeGenerated = options?.includeGenerated ?? false
  const raw = runGitLsFiles(root)
  if (includeFixtures && includeGenerated) return raw
  const isExempt = (rel: string): boolean => {
    for (const segment of rel.split("/")) {
      if (!CHECK_EXEMPT_DIRS.has(segment)) continue
      if (segment === "__fixtures__" && !includeFixtures) return true
      if (segment === "generated" && !includeGenerated) return true
    }
    return false
  }
  return raw.filter((rel) => !isExempt(rel))
}
