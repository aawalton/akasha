import type { Finding } from "../finding.page-type.ts"

export const aSwallowedIndexFailureMakesTheSubagentSweepReportSuccess = {
  id: "01a08313-ab0e-78d7-96cd-54d751578c17",
  pageTypeSlug: "finding",
  slug: "a-swallowed-index-failure-makes-the-subagent-sweep-report-success",
  domainSlug: "workspace-package/seat-system",
  claim:
    "An index that cannot be read makes the subagent sweep take nothing and answer that it went.",
  evidence:
    "`subagent-presence.module.code.ts` wraps `everyOfType` in a catch answering an empty list, so a reading that failed is told apart from a seat holding no subagent by nothing. `tookUnder` answers `WENT` the moment that list is empty, so the sweep reports success having taken nothing. Akasha's `Trust The Index` rule says never to check the index is there, and a catch around the read is that check written another way. The catch also takes the place of fixture work: a test on a bare root would otherwise throw, which is the signal rather than the fault. Landed in `33aa4db698`. `subagent-census` took the other road in `692fa80b4f`, filing its pages into the index in its fixtures and keeping no catch.",
} as const satisfies Finding
