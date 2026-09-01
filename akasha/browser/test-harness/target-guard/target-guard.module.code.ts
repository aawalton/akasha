export function isLocalhostTarget(url: string): boolean {
  let host: string
  try {
    host = new URL(url).hostname
  } catch {
    return false
  }
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host === "[::1]" ||
    host.endsWith(".localhost")
  )
}

export interface WorktreeGitFacts {
  readonly available: boolean
  readonly branch: string | null
  readonly unlandedCommitCount: number
}

export interface TargetGuardInput {
  readonly targetUrl: string
  readonly git: WorktreeGitFacts
}

export interface TargetGuardDecision {
  readonly warned: boolean
  readonly lines: readonly string[]
}

const TARGET_PREFIX = "[browser target]"
const WARN_PREFIX = "[browser target] WARNING:"

export function decideTargetGuard(input: TargetGuardInput): TargetGuardDecision {
  const { targetUrl, git } = input
  const local = isLocalhostTarget(targetUrl)
  const targetLine = `${TARGET_PREFIX} tests run against ${targetUrl}${
    local ? " (dev server)" : " (DEPLOYED)"
  }`

  const branchUnlanded = git.available && git.unlandedCommitCount > 0
  if (local || !branchUnlanded) {
    return { warned: false, lines: [targetLine] }
  }

  const branchLabel = git.branch !== null ? `'${git.branch}' ` : ""
  const commitWord = git.unlandedCommitCount === 1 ? "commit" : "commits"
  return {
    warned: true,
    lines: [
      targetLine,
      `${WARN_PREFIX} this worktree ${branchLabel}has ${git.unlandedCommitCount} ${commitWord} not on origin/main — ` +
        `the DEPLOYED bundle at ${targetUrl} does NOT include them, so this branch's changes are NOT under test. ` +
        `Point BROWSER_TEST_URL at a dev server (e.g. http://localhost:3048) to test the branch, or deploy first.`,
    ],
  }
}
