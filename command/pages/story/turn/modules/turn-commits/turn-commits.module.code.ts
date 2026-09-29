import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as gitSaid } from "akasha/git/modules/running/git-running.module.code.ts"

const RECORD = "\x1e"

const FIELD = "\x1f"

const BREAK = "\n"

export type Commit = {
  readonly commit: string
  readonly subject: string
  readonly paths: readonly string[]
}

export function commitsIn(said: string): readonly Commit[] {
  return said
    .split(RECORD)
    .filter((one) => one.trim() !== "")
    .map((one) => {
      const [head = "", ...paths] = one.split(BREAK)
      const cut = head.indexOf(FIELD)
      return {
        commit: head.slice(0, cut),
        subject: head.slice(cut + 1),
        paths: paths.filter((path) => path !== ""),
      }
    })
}

export function commitsLogged(
  root: string,
  range: string,
  within: readonly string[]
): readonly Commit[] {
  const format = `--format=${RECORD}%H${FIELD}%s`
  return commitsIn(
    gitSaid(root, ["log", "--no-renames", "--name-only", format, range, "--", ...within])
  )
}

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
