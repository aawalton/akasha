import type { Finding } from "../finding.page-type.ts"

export const akashaSaysADaysSpanTwiceAndTheTwoDoNotAgree = {
  id: "01a06433-8ace-70cd-84a6-569f23e88da4",
  pageTypeSlug: "finding",
  slug: "akasha-says-a-days-span-twice-and-the-two-do-not-agree",
  domainSlug: "workspace-package/health-samples-day",
  claim:
    "akasha says a day's span twice and the two do not agree. `WakeWindow` counts milliseconds since the epoch; `DayWindow` in `health-samples-day` counts ISO text, so swapping one for the other is a false declaration rather than a rename. The millisecond shape was copied into `status-bar-access` to free it from the markdown tree. Reconciling the two onto one is unclaimed.",
  evidence:
    "Measured 2026-09-02, taking `status-bar-access` off the markdown tree.\n\n`readouts/session-readings.ts:197-200` declares `WakeWindow` as `{ from: number; to: number }`, milliseconds since the epoch. That shape was copied into `akasha/status-bar-access/session-reading/session-reading.module.code.ts` at `77e3bd281b`, which took away the last name that package read from `readouts/`.\n\n`akasha/health-samples-day/wake-day-window/wake-day-window.module.code.ts:9-12` declares `DayWindow` as `{ from: string; to: string }`, ISO text. Searching every `*.code.ts` under `akasha/` for a day window counted in milliseconds answers this new one alone.\n\nWhy neither can be swapped for the other: `tools/lib/daily-tracking/active-calories.ts:10` hands `cardioReading` the result of `wakeWindow(pages, dayStr)`, whose body at `readouts/session-readings.ts:202-204` returns a number. Declaring ISO text there would be false at that call site.\n\nWhat lets it drift unseen: `cardioReading` converts with `new Date(span.from).toISOString()`, and `new Date` takes milliseconds and ISO text alike. The two differ only in their types, so no run and no test reports the mismatch.\n\nThe call, taken by the coordinating seat: duplicate rather than reconcile, because reconciling touches `health-samples-day` and every caller of `getWakeDayWindow`, which is design work that should not ride inside a migration cleanup. Recorded so a duplication nobody wrote down does not become a divergence nobody can date.",
} as const satisfies Finding
