import type { Finding } from "../finding.page-type.ts"

export const refusingAnUnrecordedWakeLeavesMostDaysWithNoDerivedActiveCalories = {
  id: "01a0612e-d9b2-7458-a457-c3e8e8985358",
  pageTypeSlug: "finding",
  slug: "refusing-an-unrecorded-wake-leaves-most-days-with-no-derived-active-calories",
  domainSlug: "domain/alan-harness",
  claim:
    "`getWakeDayWindow` refuses a day whose sleep was never recorded rather than reading that day as the ESO day, and 94 of Alan's 133 day pages refuse. Each keeps the `active-calories` already written on it instead of a figure derived from health samples, so the nightly recompute derives over 39 days rather than all of them. Whether the older days should be derivable is Alan's call, taken in his absence here as: leave them alone.",
  evidence:
    "Measured 2026-09-02 over the 133 `daily-tracking` pages in `akasha/alan/daily-tracking/daily-trackings`. 48 hold a session titled sleep ending inside their own ESO day. 39 hold that and so does the day after, which is what a whole window needs, a window closing at the next wake. The earliest day with a recorded wake is 2026-06-19, and `git log --all --diff-filter=A` over `*.daily-tracking.sessions.jsonl` finds no session file earlier anywhere in history, so the days before it recorded none rather than losing them in the move.\n\nWhat the markdown half did instead is `wakeInstantOn` in `tools/lib/wake-day.ts:81`, which answers `window.start` where no sleep block is found — the ESO day's own 06:00. Every day got a window that way and so a derived figure. `wake-day-window.module.ts` already declared the departure `A window refuses rather than reading as the ESO day's own`, so refusing is what akasha asked for and the fallback is what it left behind.\n\nThe refusal is carried rather than thrown. `active-calories` answers the stored reading for a refused day and names that day back as uncounted; `health-total-points.ts` says how many of the days it read went uncounted. No row is written a figure nothing measured, which is the whole reason for refusing.\n\nTwo ways would widen it, neither taken: record sleep for the older days, or let a caller ask for the ESO day outright and mark the figure as bounded by the day rather than by his waking. The second needs a name for a figure that is measured over a guessed span, which akasha does not have.",
} as const satisfies Finding
