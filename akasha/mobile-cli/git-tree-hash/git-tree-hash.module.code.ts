import { createHash } from "node:crypto"
import { said } from "@akasha/git/git-running"

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
    return said(repoRoot, ["rev-parse", `${ref}:${path}`]).trim()
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
  return said(cwd ?? process.cwd(), ["rev-parse", "--show-toplevel"]).trim()
}

export function fetchOrigin(repoRoot: string): undefined {
  said(repoRoot, ["fetch", "origin"])
  return undefined
}

export function resolveRef(repoRoot: string, ref: string): string {
  return said(repoRoot, ["rev-parse", ref]).trim()
}

export function commitAt(repoRoot: string, ref: string): string | null {
  try {
    const found = said(repoRoot, ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`]).trim()
    return found === "" ? null : found
  } catch {
    return null
  }
}

export function originReaches(repoRoot: string, commit: string): boolean {
  try {
    const holder = said(repoRoot, [
      "for-each-ref",
      "--count=1",
      "--contains",
      commit,
      "refs/remotes/origin",
    ]).trim()
    return holder !== ""
  } catch {
    return false
  }
}

export function countCommitsBetween(repoRoot: string, fromSha: string, toRef: string): number {
  if (fromSha === "") {
    return 0
  }
  try {
    const out = said(repoRoot, ["rev-list", "--count", `${fromSha}..${toRef}`]).trim()
    const count = Number.parseInt(out, 10)
    return Number.isNaN(count) ? 0 : count
  } catch {
    return 0
  }
}
