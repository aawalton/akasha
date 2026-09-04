import type { Finding } from "../finding.page-type.ts"

export const aNulSeparatorCouldNotCrossIntoAkashaAndBecameASpace = {
  id: "01a0674b-cf9d-78b1-8f41-147327151684",
  pageTypeSlug: "finding",
  slug: "a-nul-separator-could-not-cross-into-akasha-and-became-a-space",
  domainSlug: "domain/temper",
  claim:
    "The old completed-day landing joined a task and a title with a NUL byte to make the key deciding whether a completion was already filed. Akasha holds the absence invariant that no file in it carries a NUL byte, so the counterpart inside joins them with a space instead. A space can collide where a NUL could not, so two unlike completions can now read as one.",
  evidence:
    "Measured 2026-09-03 while ablating `temper/scripts/src/watcher/completed-day-landing.ts`. That file held exactly one NUL byte, at byte 4835 of 9533, on line 120, in the joining of task and title. It was no working-tree damage: the same single NUL is in the backup at `/var/home/walton/repos/akasha-backup-2026-09-02` dated 2026-09-01, and in the git HEAD blob. Git treated the file as binary, and the ablation commit 8e86d772c1 records it as `Bin 9533 -> 0 bytes` while the other twelve files show line counts.\n\nThe counterpart at `akasha/temper/temper-watcher/watcher-completed-day-landing/watcher-completed-day-landing.module.code.ts:97` joins the two with a single space. `akasha/akasha.domain.ts:91` holds the absence invariant `No file in akasha carries a NUL byte`, so the byte could not have been carried across as it was.\n\nThe key is used at line 106, where a completion already filed at the same instant under the same names counts as landed. With a space, a task named `a b` and no title makes the same key as a task named `a` with the title `b`. The id check on line 105 runs first and catches the ordinary repeat, so this reaches only completions carrying unlike ids, and no such collision was looked for across the 119 `temper-completed-day` pages.",
} as const satisfies Finding
