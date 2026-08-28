import { spawnSync } from "node:child_process"

const ASK_TIMEOUT_MS = 5_000

interface Ignored {
  readonly exact: ReadonlySet<string>
  readonly dirs: readonly string[]
}

const held = new Map<string, Ignored>()

/** Whether `root` stands in a git checkout, asked only where the question below it failed. */
function underGit(root: string): boolean {
  const ran = spawnSync("git", ["-C", root, "rev-parse", "--git-dir"], {
    encoding: "utf8",
    timeout: ASK_TIMEOUT_MS,
  })
  return ran.status === 0
}

/**
 * What `root` ignores, or null where git could not say.
 *
 * AN EMPTY ANSWER IS "THIS ROOT IGNORES NOTHING", AND A FAILED CALL IS NO ANSWER AT ALL. Read
 * alike, an `ls-files` that could not read the index became a repository ignoring nothing, and
 * `notIgnored` below then handed back every path it was given — which is how a file under
 * `node_modules` enters the page corpus its consumer builds.
 *
 * A ROOT IN NO GIT CHECKOUT IGNORES NOTHING, AND THAT IS AN ANSWER. `ls-files` exits 128 there, and
 * 128 again in a repository whose index it cannot read, so the two are told apart by asking
 * `rev-parse --git-dir`: where that fails as well there are no ignore rules to read, and where it
 * answers, git stood ready and this call still failed. It runs only on that failure, so a root git
 * can answer for costs the one call it always did.
 *
 * A NON-ANSWER IS NEVER CACHED. The map holds for the life of the process, so one transient failure
 * written into it would go on answering every later question about this root.
 */
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

/** Why a caller stopped where git could not say what a root ignores, worded once for all of them. */
export function ignoresUnanswered(root: string): string {
  return (
    `git could not establish what ${root} ignores, so nothing can say which paths under it are ` +
    "excluded — the checkout is there and the call failed. Run it again."
  )
}

/**
 * Those of `paths` this root does not ignore, or null where git could not say what it ignores.
 *
 * NULL IS NEITHER THE EMPTY LIST NOR THE WHOLE ONE. A caller reading it as either states something
 * about these paths that no call supported, so every caller refuses on it instead.
 */
export function notIgnored(root: string, paths: readonly string[]): readonly string[] | null {
  const found = ignoredIn(root)
  if (found === null) return null
  const { exact, dirs } = found
  if (exact.size === 0 && dirs.length === 0) return paths
  return paths.filter((at) => !exact.has(at) && !dirs.some((one) => at.startsWith(one)))
}
