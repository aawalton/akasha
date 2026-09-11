import { said, told } from "akasha/git/running/git-running.module.code.ts"

export const AT_HEAD = "HEAD"

export const SHOWN_PATHS = 3

export function commitAt(root: string, ref: string | null): string | null {
  const found = told(root, ["rev-parse", "--verify", `${ref ?? AT_HEAD}^{commit}`])
  return found === null ? null : found.trim()
}

export function saidOfNoCommit(ref: string): string {
  return `\`${ref}\` names no commit this checkout holds, so there is nothing to put up from it`
}

export function pathsIn(text: string): readonly string[] {
  return text
    .split("\n")
    .map((one) => one.trim())
    .filter((one) => one !== "")
}

export function driftedFrom(root: string, commit: string): readonly string[] {
  return pathsIn(said(root, ["diff", "--name-only", commit]))
}

export function saidOfDrift(slug: string, commit: string, drifted: readonly string[]): string {
  const shown = drifted.slice(0, SHOWN_PATHS).join(", ")
  const more = drifted.length > SHOWN_PATHS ? `, and ${drifted.length - SHOWN_PATHS} more` : ""
  const many = drifted.length === 1 ? "file" : "files"
  return `\`${slug}\` would be put up at ${commit}, and the worktree holds ${drifted.length} tracked ${many} differing from that commit (${shown}${more}), so what would be put up is not what you are looking at. Commit what you are looking at, or name the commit to put up.`
}
