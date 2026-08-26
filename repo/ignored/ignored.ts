import { spawnSync } from "node:child_process"

const ASK_TIMEOUT_MS = 5_000

interface Ignored {
  readonly exact: ReadonlySet<string>
  readonly dirs: readonly string[]
}

const held = new Map<string, Ignored>()

function ignoredIn(root: string): Ignored {
  const found = held.get(root)
  if (found !== undefined) return found
  const ran = spawnSync(
    "git",
    ["-C", root, "ls-files", "--others", "--ignored", "--exclude-standard", "--directory"],
    { encoding: "utf8", timeout: ASK_TIMEOUT_MS }
  )
  const lines = ran.status === 0 ? (ran.stdout ?? "").split("\n").filter((one) => one !== "") : []
  const made: Ignored = {
    exact: new Set(lines.filter((one) => !one.endsWith("/"))),
    dirs: lines.filter((one) => one.endsWith("/")),
  }
  held.set(root, made)
  return made
}

export function notIgnored(root: string, paths: readonly string[]): readonly string[] {
  const { exact, dirs } = ignoredIn(root)
  if (exact.size === 0 && dirs.length === 0) return paths
  return paths.filter((at) => !exact.has(at) && !dirs.some((one) => at.startsWith(one)))
}
