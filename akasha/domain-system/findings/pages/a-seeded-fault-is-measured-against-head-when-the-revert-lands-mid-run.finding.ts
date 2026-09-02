import type { Finding } from "../finding.page-type.ts"

export const aSeededFaultIsMeasuredAgainstHeadWhenTheRevertLandsMidRun = {
  id: "01a063de-e50a-7000-877d-c0f8baa297a4",
  pageTypeSlug: "finding",
  slug: "a-seeded-fault-is-measured-against-head-when-the-revert-lands-mid-run",
  domainSlug: "workspace-package/testing-system",
  claim:
    "A seeded fault in `akasha/` is put back by the next agent's Bash call, and that revert can land while the test judging the seed is still running. The run then judges HEAD while the report names the seed, so a fault that would be caught reads as a fault nothing catches. One seed here reported 0 failing tests, then 2 failing on each of two guarded re-runs.",
  evidence:
    "Seeding a fault and watching a test go red is how this initiative proves a test is not inert, so a seeded-fault count that lies is worse than no count.\n\n`restore-akasha-when-dirty` runs after any Bash call by any agent in this worktree and puts the whole `akasha/` folder back to HEAD. The finding `a-dirty-akasha-folder-is-reverted-whole-by-whichever-agent-runs-next` holds why narrowing that revert is not available. A test run is a Bash call of some length, and other agents make their own throughout, so the revert lands between the seed and the verdict rather than after the verdict. Another session counted 17 reverts of one gateway module between 20:30 and 20:40 on 2026-09-02, which puts the gap between reverts under a minute while several agents are working.\n\nMeasured on the gateway port: a harness seeding seven faults into `oauth-effects.module.code.ts` reported the first seed as 0 failing. A re-run guarded on dirtiness reported 2 failing, twice over. The file had gone clean mid-run, so the earlier run judged the landed body while the report named the seed.\n\nThe guard that answers: read `git status` for the file immediately before the run and immediately after, and where the file went clean between them, answer no verdict rather than a number. Some seeds took three to five tries to reach a run that held. Every seeded-fault count taken in this worktree without that guard is worth nothing, including counts already reported.",
} as const satisfies Finding
