import { git } from "../git-capping/git-capping.module.code.ts"

export const TRANSPORT = "origin"

export function servedTip(codeRoot: string, branch: string): string | null {
  const got = git(codeRoot, ["ls-remote", TRANSPORT, `refs/heads/${branch}`])
  if (got.code !== 0) return null
  const commit = got.stdout.split(/\s+/)[0]
  return commit === undefined || commit === "" ? null : commit
}

export function standsLocally(codeRoot: string, commit: string): boolean {
  return git(codeRoot, ["cat-file", "-e", `${commit}^{commit}`]).code === 0
}
