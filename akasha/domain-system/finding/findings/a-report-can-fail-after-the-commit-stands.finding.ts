import type { Finding } from "../finding.page-type.ts"

export const aReportCanFailAfterTheCommitStands = {
  id: "01a04d9d-bc96-7bc7-89eb-e97945a15746",
  pageTypeSlug: "finding",
  slug: "a-report-can-fail-after-the-commit-stands",
  domainSlug: "domain/command-system",
  claim:
    "Everything a command does after its commit has landed is unguarded, so a call that fully succeeded can exit 70 and read to its caller as an unclassified failure.",
  evidence:
    "`landing` writes, commits and returns, and only then does `landingAsked` call `reportOf`, which calls the command's own `saying`. Nothing between the commit and the answer is guarded. A throw there is caught nowhere nearer than `answering` in `cli.module.code.ts`, which turns any escape into UNCLASSIFIED, 70. Reproduced on a copy of the folder by making `wroteAndTook` throw: HEAD moved from c4feb3d to df3f1a4, the file stands in that commit, and the call printed `akasha: a report that could not be built` and exited 70. The hold is released by then, so a caller that retries on 70 — which is what an unclassified failure invites — runs the whole change again against a repository that already carries it, and for a write that is a second commit of the same bytes rather than a refusal. The same window is open inside `landing` itself, `committed` calling `git rev-parse HEAD` after `git commit` has already returned. Recorded rather than fixed because the answer is not a wider try/catch: a command that has committed has succeeded, and what is wanted is an exit code that says so even when the words fail, which is a ruling about what a command owes its caller past the point of no return.",
} as const satisfies Finding
