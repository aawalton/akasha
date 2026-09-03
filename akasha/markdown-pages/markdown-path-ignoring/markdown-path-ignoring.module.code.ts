import { spawnSync } from "node:child_process"

const ASK_TIMEOUT_MS = 5_000

interface Ignored {
  readonly exact: ReadonlySet<string>
  readonly dirs: readonly string[]
}

const held = new Map<string, Ignored>()

function underGit(root: string): boolean {
  const ran = spawnSync("git", ["-C", root, "rev-parse", "--git-dir"], {
    encoding: "utf8",
    timeout: ASK_TIMEOUT_MS,
  })
  return ran.status === 0
}

function ignoredIn(root: string): Ignored | null {
  const found = held.get(root)
  if (found !== undefined) return found
  const ran = spawnSync(
    "git",
    ["-C", root, "ls-files", "--others", "--ignored", "--exclude-standard", "--directory"],
    { encoding: "utf8", timeout: ASK_TIMEOUT_MS }
  )
  if (ran.status !== 0 && underGit(root)) return null
  const lines = ran.status === 0 ? (ran.stdout ?? "").split("\n").filter((one) => one !== "") : []
  const made: Ignored = {
    exact: new Set(lines.filter((one) => !one.endsWith("/"))),
    dirs: lines.filter((one) => one.endsWith("/")),
  }
  held.set(root, made)
  return made
}

export function ignoresUnanswered(root: string): string {
  return (
    `git could not establish what ${root} ignores, so nothing can say which paths under it are ` +
    "excluded — the checkout is there and the call failed. Run it again."
  )
}

export function notIgnored(root: string, paths: readonly string[]): readonly string[] | null {
  const found = ignoredIn(root)
  if (found === null) return null
  const { exact, dirs } = found
  if (exact.size === 0 && dirs.length === 0) return paths
  return paths.filter((at) => !exact.has(at) && !dirs.some((one) => at.startsWith(one)))
}
