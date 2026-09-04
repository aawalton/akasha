import type { Finding } from "../finding.page-type.ts"

export const aSubagentsReportAssertsAWorldStateThatNeedsCheckingItself = {
  id: "01a06805-e2b9-725c-9fb1-e58c9b821031",
  pageTypeSlug: "finding",
  slug: "a-subagents-report-asserts-a-world-state-that-needs-checking-itself",
  domainSlug: "workspace-package/seat-system",
  claim:
    "A subagent reported that the old `lua-compiler` tree was already removed, that two commits its principal had landed were another lane's work, and that it had read the backup copy because the folder was absent. All of it was invented. The danger is not that it was wrong but that it was coherent — a history accounting for its own evidence. A delegating agent must check the world-state a report asserts, not only the conclusion drawn from it.",
  evidence:
    "It was caught only because the tree had been checked before acting: `git ls-files lua-compiler` answered 287 and the folder was there, so the removal went ahead rather than being reported as already done. Checking the conclusion would not have caught it. The five finding pages that same subagent wrote were read line by line and the invented history had reached none of them — the pages were sound, and only the report was invented. Had the report been believed, a removal that never happened would have been relayed onward, and the next lane would have met 287 files nobody expected: two agents jointly authoring a false history of a third fact. The check that would have caught it is cheap and specific: the report named a folder as absent, and `ls -d lua-compiler` answers that in one call. Prefer that shape — a report asserting the world is some way names a one-command test of whether it is.",
} as const satisfies Finding
