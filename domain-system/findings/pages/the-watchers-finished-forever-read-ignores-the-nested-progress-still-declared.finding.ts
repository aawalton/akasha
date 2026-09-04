import type { Finding } from "../finding.page-type.ts"

export const theWatchersFinishedForeverReadIgnoresTheNestedProgressStillDeclared = {
  id: "01a063e9-a1db-7e53-addd-555c7a148ed1",
  pageTypeSlug: "finding",
  slug: "the-watchers-finished-forever-read-ignores-the-nested-progress-still-declared",
  domainSlug: "workspace-package/temper-watcher",
  claim:
    "`isCompleteForever` in the akasha watcher reads `progressCurrent` and `progressTotal` and never reads `progress`, while the writer it recreates read `progress.current` and `progress.total`. The `temper-task` page type declares all three, so this is a declared property going unread rather than a dropped one. A task whose counts sit under `progress` reads as unfinished where it read as finished before.",
  evidence:
    "The recovered predecessor test for this writer was run against the twin case by case. Three cases invert. A maxed cross-character rollup, a scalar `{current:16,total:16}`, and a maxed scribing-knowledge shape all answer `true` from `09f964f5c5^:temper/scripts/src/watcher/import-tasks.ts:176-190` and `false` from `watcher-import-tasks.module.code.ts:153-160`. The probe carried its own seed, asserting `true` where the twin gives `false`, and the seed was caught.\n\nA fourth case agrees at `false`, and that agreement is false. The twin answers `false` because `progressCurrent` is absent, not because it honoured the guard the legacy applied.\n\n`temper-task.page-type.ts` declares `progress` at line 12 and lists it at line 38, beside `progress-total` and `progress-current` at lines 39 and 40. So `progress` is a live property of the type that this reader passes over.\n\nThis is not the loss already recorded in `the-task-page-type-dropped-two-fields-behaviour-rested-on`. That finding is about `activeEntryKey` having no representation on the akasha `progress` entry, which is a question about what a task is. This one is narrower and mechanical: two counts that are represented, and are not read.\n\nWhat is open is which shape a task's counts are meant to live in. Where the flat pair is the answer, the nested `progress` entry wants deleting from the page type rather than leaving for a later reader to find. Where both are meant, this reader wants to read both.",
} as const satisfies Finding
