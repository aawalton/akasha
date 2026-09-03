import type { Finding } from "../finding.page-type.ts"

export const twoDispatchedLanesHoldingElevenThousandFilesHaveLandedNothingAtAll = {
  id: "01a06576-00b3-7980-8ee6-1da81d28a403",
  pageTypeSlug: "finding",
  slug: "two-dispatched-lanes-holding-eleven-thousand-files-have-landed-nothing-at-all",
  domainSlug: "domain/akasha-migration",
  claim:
    "Persona and library, and life tracking, together hold 11,258 files across 43 folders, and every one of those 43 is the size it was before the migration opened. Neither lane has landed a single file. Four more lanes have landed almost nothing. These are where a re-dispatch buys the most, and the count is the only thing that says so.",
  evidence:
    "Measured 2026-09-02 at 22:30 against the read-only backup, for the folders that still hold files, one lane for each dispatched assignment.\n\nNothing landed: persona and library 6,616 files, all 19 folders unchanged, among them `pages/persona-day` 2,079, `pages/book` 1,579 and `pages/great-course` 1,123. Life tracking 4,642 files, all 24 folders unchanged, among them `pages/location` 1,210, `pages/exercise` 884 and `pages/relationship` 697.\n\nAlmost nothing landed: game content 21,400 to 21,312, with 20 of its 23 folders unchanged holding 21,280, so `pages/skill` 8,972, `pages/class` 8,380 and `pages/spell` 3,597 are untouched. Story 19,080 to 19,081, with 7 of 8 folders unchanged and the eighth growing. Messaging and logs 654 to 584 with 9 of 10 folders unchanged. Editors and lua 395 to 370.\n\nWorking: infra and services 2,258 to 1,312, sites and readouts 842 to 607, tools 1,649 to 1,549, meta pages 3,312 to 3,208.\n\nNearly done: temper, whose remaining folders went 1,442 to 975 while some ninety of its `pages/temper-*` folders emptied outright. Monarch likewise, every `pages/monarch-*` folder now empty, though the views and rules half of that lane is untouched.\n\nThe two lanes that landed nothing are not the two largest, which is why a dispatch list read alone would not point here. Game content and story are larger and also barely moved, but each is one shape repeated many thousands of times, so one design decision unblocks each. Persona and library is 19 different shapes and life tracking is 24, which is the likelier reason both stalled.",
} as const satisfies Finding
