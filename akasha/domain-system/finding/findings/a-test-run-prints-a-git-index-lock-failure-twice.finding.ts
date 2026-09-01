import type { Finding } from "../finding.page-type.ts"

export const aTestRunPrintsAGitIndexLockFailureTwice = {
  id: "01a05fd4-2c3a-7e57-8f21-4b90c6d3ae15",
  pageTypeSlug: "finding",
  slug: "a-test-run-prints-a-git-index-lock-failure-twice",
  domainSlug: "workspace-package/command-system",
  claim:
    "An akasha test run prints `fatal: Unable to create '/var/tmp/akasha-committing-XXXXXX/.git/index.lock': File exists` twice and passes anyway. It is noise today and a candidate flaky failure under load, and the mechanism is not confirmed.",
  evidence:
    "Seen on three full runs on 31 Aug, two of mine and one taken independently by the coordinator, each printing the line exactly twice in succession, at the same point in the run, with the suite still at 0 fail. The scratch directory carries a fresh random suffix every time, `akasha-committing-tF1L6t`, `akasha-committing-J3IXPk` and `akasha-committing-NaJuiP`, which argues against two tests sharing one worktree and points instead at two git invocations overlapping inside a single test's own worktree, or at a lock left behind and read as live. Not confirmed: the test that prints it was not found and the failure was not reproduced in isolation. The finding `landing-concurrency-needs-a-read-set` already records that git serializes commits by failing rather than by waiting, six concurrent path-limited commits leaving five dead on `index.lock`, so the same failure mode is known elsewhere in the system. A second line in the same runs, `fatal: cannot change to '/var/tmp/no-such-root-stands-here'`, is deliberate, a test proving a missing root refuses, and is not this.",
} as const satisfies Finding
