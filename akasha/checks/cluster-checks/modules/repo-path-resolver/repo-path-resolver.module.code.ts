export type RepoPathKind = "home-anchored" | "repo-rooted"

export const HOME_PREFIXES = ["~/repos/akasha/", "~/akasha/"] as const

export function homePrefixOf(literal: string): string | null {
  return HOME_PREFIXES.find((prefix) => literal.startsWith(prefix)) ?? null
}

export function repoTopLevelDirs(repoRelPaths: Iterable<string>): ReadonlySet<string> {
  const dirs = new Set<string>()
  for (const rel of repoRelPaths) {
    const slash = rel.indexOf("/")
    if (slash > 0) dirs.add(rel.slice(0, slash))
  }
  return dirs
}

export function classifyPath(
  literal: string,
  topLevelDirs: ReadonlySet<string>
): RepoPathKind | null {
  if (homePrefixOf(literal) !== null) return "home-anchored"
  const slash = literal.indexOf("/")
  if (slash <= 0) return null
  return topLevelDirs.has(literal.slice(0, slash)) ? "repo-rooted" : null
}

const REJECT_CHARS = ["*", "?", "{", "}", "$", "<", ">", "`"]

export function isAcceptableForCheck(literal: string): boolean {
  for (const ch of REJECT_CHARS) {
    if (literal.includes(ch)) return false
  }
  const lastSlash = literal.lastIndexOf("/")
  const basename = lastSlash === -1 ? literal : literal.slice(lastSlash + 1)
  if (basename.length === 0) return false
  if (!basename.includes(".")) return false
  return true
}

export function resolveRepoPath(args: {
  literal: string
  repoRoot: string
  topLevelDirs: ReadonlySet<string>
}): string | null {
  const { literal, repoRoot, topLevelDirs } = args
  const kind = classifyPath(literal, topLevelDirs)
  if (kind === null) return null
  if (kind === "home-anchored") {
    const prefix = homePrefixOf(literal)
    if (prefix !== null) return `${repoRoot}/${literal.slice(prefix.length)}`
  }
  return `${repoRoot}/${literal}`
}
