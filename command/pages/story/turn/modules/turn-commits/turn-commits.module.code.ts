import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as gitSaid } from "akasha/git/modules/running/git-running.module.code.ts"

export function addedLogged(root: string, path: string): string | null {
  const said = gitSaid(root, [
    "log",
    "--no-renames",
    "--diff-filter=A",
    "--format=%H",
    "-1",
    "HEAD",
    "--",
    path,
  ])
  const commit = said.trim()
  return commit === "" ? null : commit
}

export function bodyCommitted(root: string, commit: string, path: string): string | null {
  const body = bodyAt(root, commit, path)
  return body === null ? null : Buffer.from(body).toString("utf8")
}
