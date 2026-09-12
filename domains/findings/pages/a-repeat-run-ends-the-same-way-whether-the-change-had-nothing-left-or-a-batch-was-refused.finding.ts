import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aRepeatRunEndsTheSameWayWhetherTheChangeHadNothingLeftOrABatchWasRefused = {
  id: "01a0961e-eeca-73e8-a979-d0db0198aa76",
  type: "finding",
  slug: "a-repeat-run-ends-the-same-way-whether-the-change-had-nothing-left-or-a-batch-was-refused",
  domain: "domain/change",
  claim:
    "A repeat run ends when a batch lands no commit, and a batch lands no commit both when the change has nothing left to act on and when a check refused that batch, so a run stopped part way through its work answers as a run that finished its work.",
  evidence:
    "`repeating` in `commands/pages/change/repeat/change-repeat.command.code.ts:152` loops until `committedIn` answers null, then answers `told` whenever any batch landed at all, whatever ended the run. A change agent has one way to end a batch without a commit, `refusing`, and `nest-modules` uses it for `every module's folder sits under a modules folder already`, which means done, while a check refusal reaches the same line and means blocked. The report names what the last batch said, so the reason is on the page; the exit status is success either way, so a caller reading the status alone cannot tell a sweep across 6673 folders that finished from one that stopped at the third batch. Nothing re-asks, because the next act is to confirm it succeeded and it will.",
} as const satisfies Finding
