import type { Finding } from "../finding.page-type.ts"

export const anAuditCannotFinishBeforeTheTreeItJudgedIsGone = {
  id: "01a062cd-7242-7780-86ba-1e193ec95ab9",
  pageTypeSlug: "finding",
  slug: "an-audit-cannot-finish-before-the-tree-it-judged-is-gone",
  domainSlug: "domain/akasha-check",
  claim:
    "An audit reads every file the index names and holds nothing still while it runs. Under a swarm `typecheck` has two failure modes that both produce zero bytes: the kernel takes it for its 9.6 GB, or a concurrent write rebuilds the index it is reading. A killed run and a clean run are told apart only by an exit code, and no run names one tree.",
  evidence:
    "The command states its own design: it runs over every file the akasha folder holds, `--check` narrows which checks run and never which files they see, and it holds nothing still while it runs. There is no path scope and no snapshot.\n\nMeasured 2026-09-02 while twenty seats worked one shared worktree. Running all 41 checks as separate invocations, 40 completed. `typecheck` took five attempts: two killed by SIGTERM at 129s and 185s with zero output; one completed at `07d371fb9a` in 2m56s with 7 refusals; two threw. Instrumented, the run that completed peaked at 9,580,376 KB resident. That is the mechanism behind the kills rather than a hang. An earlier full audit of mine was killed at the thirty-minute mark, and I wrongly read the same cause into a `typecheck` kill that was really the memory.\n\nThe throwing mode is worse than the kill. `typecheck` reads the index for about three minutes, and a concurrent `akasha write` rebuilding it mid-read makes the check throw having judged nothing. Observed four times, each naming a different missing folder inside what `index-reading` answers with, and each folder standing again afterwards.\n\nNo run names one tree. 75 commits landed between the start and end of the 41-check sweep, three of them to `page-matches-its-type` itself. 625 landed in one earlier hour, and the tree went from 25,722 judged files to 28,685 tracked under `akasha/`.\n\nThe durable cost is that exit 143 with an empty output file reads, to anyone reporting from notes rather than from the exit code, exactly like nothing was refused. It was nearly published as a clean audit twice.",
} as const satisfies Finding
