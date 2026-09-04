import type { Finding } from "../finding.page-type.ts"

export const theWatcherDropsEveryEarlierRunsOperationsWhenItMergesThem = {
  id: "01a063c4-d269-7560-b66d-486a70656391",
  pageTypeSlug: "finding",
  slug: "the-watcher-drops-every-earlier-runs-operations-when-it-merges-them",
  domainSlug: "workspace-package/temper-watcher",
  claim:
    "The legacy watcher writes its run outcome as JSON text and reads that property back through a `z.object`, which refuses text. The read answers an empty list every time, so merging keeps only the newest run's operations and every earlier run's operations are dropped. The property never holds more than one run whatever it is asked to merge. The akasha twin reads the text back as JSON before merging.",
  evidence:
    '`temper/scripts/src/watcher-exe/report-run-outcome.ts:57` writes `lastRunOutcome: JSON.stringify(lastRunOutcome)`, so the property holds text. Line 51 hands `enrolment.lastRunOutcome` straight to `storedOperations`, which at lines 20-27 parses with `StoredOutcomeSchema`, declared at line 16 as `z.object({ operations: z.array(z.unknown()).optional() }).passthrough()`.\n\nRunning those two schemas verbatim under bun, with an outcome holding one operation named `import-sales`: `JSON.stringify` of the outcome is a string; `storedOperations` of that string answers `[]`; `storedOperations` of the same value unparsed answers `[{"name":"import-sales","state":"synced"}]`; and `StoredOutcomeSchema.safeParse` of the string reports `success` false. The reproduction refuses to report unless both branches differ, so an empty answer from a broken harness could not read as a finding.\n\nThe two defects are separate. Were the lookup at line 40 corrected, this one would still drop every earlier run.\n\nThe akasha twin `watcher-run-reporting` carries the invariant `Text already held under that property is read back as JSON before merging.`',
} as const satisfies Finding
