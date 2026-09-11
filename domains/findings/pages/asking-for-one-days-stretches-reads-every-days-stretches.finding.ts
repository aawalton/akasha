import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const askingForOneDaysStretchesReadsEveryDaysStretches = {
  id: "01a08c20-9217-719b-9e83-0022fe71d53e",
  type: "finding",
  slug: "asking-for-one-days-stretches-reads-every-days-stretches",
  domain: "domain/track-daily",
  claim:
    "`sessionsOfDay` narrows to one day after the read rather than inside it, so every call " +
    "reads the stretches of every day Alan has ever tracked. One call is 73 file reads and " +
    "251 KB parsed today, and it grows with each day he tracks. Two readouts need stretches, " +
    "`upkeep-capacity` and `attribute-charisma`, so any take that touches both pays it twice. " +
    "The five-minute reading timers pay it on every beat and the new readout watch pays it on " +
    "every take.",
  evidence:
    "`sessionsAnswered` in `alan/track/daily/day-stretches/day-stretches.module.code.ts` asks " +
    '`asking(root, { pageTypeSlug: DAY_PAGE_TYPE, keys: ["slug", "sessions"] })` with no ' +
    "`where`. It then flattens every day's `sessions` list into rows and only afterwards " +
    "filters them, so `sessionsOfDay(dailyId)` narrows on `daily-tracking` over rows already " +
    "read.\n\n" +
    "`asking` in `pages/service/page-asking/page-asking.module.code.ts` calls " +
    "`gatheredFor(root, query.pageTypeSlug, carried, ...)` with every carried property of the " +
    "page type rather than the keys the query names, and `page-asking` states that the values " +
    "a page keeps beside the page are read from the file the page names. `sessions` is such a " +
    "property, held in `day-<date>.day.sessions.jsonl`.\n\n" +
    "What is on this workstation: `alan/track/daily/days/pages` holds 252 day folders, of " +
    "which 73 carry a `.day.sessions.jsonl`, 251037 bytes together. The whole folder is 19 MB. " +
    "The `day` value index at `.git/data/index/value/day.jsonl` is 106559 bytes and is read " +
    "beside them.\n\n" +
    "Callers reaching this: `capacity-reading` and `attributes-reading` both call " +
    "`sessionsOfDay`; `safety-reading` and `cost-reading` call `openSession`, which asks the " +
    "same unnarrowed question. `capacity-reading-service`, `attributes-reading-service`, " +
    "`safety-reading-service` and `cost-reading-service` each run on a five-minute timer, and " +
    "`day-readout-watch-service` takes the same readings on a watch.\n\n" +
    "A `where` on `daily-tracking` handed to `asking` would not help on its own, because the " +
    "gather reads the entry files before the tests narrow. The read has to be scoped to the " +
    "day page before its beside-the-page files are opened.",
} as const satisfies Finding
