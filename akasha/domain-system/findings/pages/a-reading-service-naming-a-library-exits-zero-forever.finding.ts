import type { Finding } from "../finding.page-type.ts"

export const aReadingServiceNamingALibraryExitsZeroForever = {
  id: "01a06279-698d-71c8-b4d3-fb1777ec23a8",
  pageTypeSlug: "finding",
  slug: "a-reading-service-naming-a-library-exits-zero-forever",
  domainSlug: "domain/alan-harness",
  claim:
    "`readouts/activity-reading.ts` is a library, not a runnable reading: no `import.meta.main`, and it never reaches `keepReading`, so `bun` loads it and exits 0 having taken nothing. It sits at `readouts/<slug>-reading.ts`, the path the five other upkeep reading services follow. A unit named at it would report success forever, indistinguishable from one reading correctly.",
  evidence:
    "Measured 2026-09-02. `readouts/` holds `activity-reading.ts` from Aug 26 and `upkeep-activity-reading.ts` from Sep 2; only the second is runnable. The first was imported by `akasha/status-bar-access/session-reading/session-reading.module.code.ts` until 93581893f0 at 16:06 swapped that import for akasha's own `active-calories`; nothing imports it now, so deleting it would close this. The installed unit names the second, established by reading its ExecStart rather than by checking that the conventional path resolves. capacity, plants, safety, sleep and surplus each name `readouts/<slug>-reading.ts`.\n\nTwo instruments failed the same way while this was measured. Ripgrep answered no matches for `lastValue` under the readouts folder, because a reading is kept in a gitignored `.uncommitted.ts` file and ripgrep skips ignored files by default; all six held one. Taken at face value it would have agreed with a stale brief saying sleep had none. Separately `journalctl --since 'today 07:20'` answered nothing where `--since '2026-09-02 07:20:00'` answered eight lines over the same window.",
} as const satisfies Finding
