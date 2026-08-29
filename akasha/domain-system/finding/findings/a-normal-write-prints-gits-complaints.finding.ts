import type { Finding } from "../finding.page-type.ts"

export const aNormalWritePrintsGitsComplaints = {
  id: "01a04d9d-bc96-7279-8ed1-c92b39271651",
  pageTypeSlug: "finding",
  slug: "a-normal-write-prints-gits-complaints",
  domainSlug: "domain/command-system",
  claim:
    "Every call that asks for a body git does not have prints git's own error to the terminal, so an ordinary write is noisy about files that are simply new.",
  evidence:
    "`bodyAt` calls `execFileSync` with no `stdio`, and `execFileSync` leaves the child's stderr on the parent's unless it is told otherwise. So a miss is silent where it matters — the `catch` answers null — and loud where it does not. The miss is the ordinary case: any path in the change that did not stand at base, and any file in the worktree that is not committed. `bun test akasha/` prints `fatal: path 'akasha/nowhere.ts' does not exist in '<sha>'` in the middle of the dots, out of a test whose whole point is that the reader answers null. A dry run of a one-file change printed `fatal: path 'akasha/checks-system/check/relation-resolves/relation-resolves.check.code.ts' exists on disk, but not in '<sha>'`, another agent's uncommitted work leaking into an unrelated caller's output. The lines go to stderr, so a caller reading the answer is not misled, but a person is: they read as failures on a call that succeeded, and they arrive interleaved with the report. Recorded rather than fixed because dropping the stream is one argument and the question underneath is whether git's complaint should be kept and reported instead — a body missing because the file is new and a body missing because the object store is broken are the same silence today.",
} as const satisfies Finding
