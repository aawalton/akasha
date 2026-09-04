import { said as gitSaid } from "@akasha/git/git-running"

const PARTED_BY = "\0"

const LISTED: readonly string[] = ["ls-files", "-z", "--cached", "--others", "--exclude-standard"]

export interface Counts {
  readonly repo: number
}

function pathsIn(root: string): readonly string[] {
  const said = gitSaid(root, LISTED)
  return [...new Set(said.split(PARTED_BY).filter((one) => one !== ""))]
}

export function countsIn(root: string): Counts {
  return { repo: pathsIn(root).length }
}

export function linesOf(counts: Counts): readonly string[] {
  return [`repo ${String(counts.repo)}`]
}
