import type { Finding } from "../finding.page-type.ts"

export const theReadoutPageQueriesAreNoSuccessorToTheSevenReadingRunners = {
  id: "01a06861-cb4d-76c1-9e6b-89e46de0e9e6",
  pageTypeSlug: "finding",
  slug: "the-readout-page-queries-are-no-successor-to-the-seven-reading-runners",
  domainSlug: "domain/akasha-migration",
  claim:
    "A worker was dispatched holding the lead that akasha's readout page-queries prove `readouts/` already migrated, and that lead is false. The page-queries are queries, the readout pages are pages, and neither is the thing the seven `readouts/*-reading.ts` files hold, which is the runner that takes today's reading and keeps it. Acting on the lead would have destroyed seven live readings that seven workstation-service pages inside akasha invoke by name.",
  evidence:
    "Read 2026-09-03. The lead named eight page-queries — `readouts-all`, `readout-scales-all`, `inbox-readings-on-day`, `sleep-hours-on-day`, `safety-level-on-day`, `surplus-hours-on-day`, `session-capacity-on-day`, `food-entry-plants-since-waking` — and read the one-to-one spelling against `readouts/` as carriage.

THE PREMISE IS TRUE AND DOES NOT SUPPORT THE ASSERTION. akasha does carry a readout for each: `akasha/readout-system/readouts/pages/{upkeep-activity,upkeep-capacity,upkeep-plants,upkeep-safety,upkeep-sleep,upkeep-surplus,inboxes-email,inboxes-tasks}/`, each as page, `.readout.code.ts` and `.readout.test.ts`. But what stands in the code half is the query and the guard — `surplusIn`, `capacityIn`, `gramsIn`, `tasksIn`, `levelIn`, `sleepIn`, `activityIn`, `lowestIn` — and the outside files IMPORT exactly those by name from `@akasha/readout-system/*`. A file that imports a thing is not a duplicate of it.

WHAT THE OUTSIDE FILES HOLD THAT AKASHA DOES NOT. Each is a runner: it reads `AKASHA_ROOT`, settles today through `getEsoDayStr` or `wakeDayOf`, reaches Alan's tracking rows, calls the akasha guard, calls `keepReading` to keep the number beside the readout page, and exits 0, 1 or 2 under `import.meta.main`. No akasha file does that for these eight.

THEY ARE LIVE. Seven `workstation-service` pages inside akasha name them in `runs`, each at line 8: `akasha/alan/harness/{sleep,safety,inboxes,surplus,capacity,activity,plants}/reading-service/*.workstation-service.ts`, running `bun readouts/{sleep,safety,inbox,surplus,capacity,upkeep-activity,plants}-reading.ts`.

WHY THEY CANNOT FOLLOW YET. Ten imports land outside akasha, reaching `tools/lib/tracking/day-place.ts`, `tools/lib/page-query-client.ts` and `tools/lib/wake-day.ts`. This is already written down twice, at `the-seven-live-readings-cannot-enter-akasha-until-day-place-does` and `seven-reading-timers-wait-on-a-day-reader-the-funnel-audit-forbids`, and this finding adds only that the page-query spelling is not evidence against them.

THE SHAPE OF THE ERROR. A one-to-one match of slugs across two shapes read as carriage. The eight names line up because both halves are named for the same eight readouts, which is what you would expect whether or not the runner had moved. Not measured: I did not check whether the seven timers are enabled on the workstation right now.",
} as const satisfies Finding
