import { told } from "akasha/git/running/git-running.module.code.ts"

export const AT_HEAD = "HEAD"

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
