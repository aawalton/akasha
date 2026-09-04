/**
 * The shape one of Alan's tracked days takes as an akasha page.
 *
 * This file is the whole decision, stated as data so the converter can be read against it and so a
 * key nobody thought about refuses instead of vanishing. Nothing here reads a file.
 *
 * The day itself becomes one page. Its frontmatter keys become page properties, kebab in the
 * markdown and camel on the page, because an akasha page is a TypeScript object literal and every
 * page under `akasha/` spells its keys camel.
 *
 * The two jsonl sidecars become `page-property-entry` properties. That page type is landed
 * (`pages-system/page-property-entries/page-property-entry.page-type.ts`) and its read path
 * is landed (`pages-system/pages/entries/page-entries.module.code.ts`). A page states
 * such a property as the extension of the file beside it — `sessions: "jsonl"` — and `besideAt` in
 * `page-file-name.module.code.ts` builds that file's name as the page's path with the extension
 * dropped, then the property slug, then what the file holds. For a page at
 * `day-2026-03-05.daily-tracking.ts` that is `day-2026-03-05.daily-tracking.sessions.jsonl`, which
 * is the sidecar's name today with `day-` put on the front.
 *
 * THE ROWS ARE RE-KEYED, NOT MERELY RENAMED.
 *
 * A row beside an akasha page spells its keys camel, the same as the page above it. `akasha write`
 * judges each row against the fields its entry property declares, and a property is reached by its
 * slug and read by that slug written in camel — `property-slug.text-property.ts:29`. So
 * `sessions.page-property-entry.ts` declaring `start-time` means a row beside a day page carries
 * `startTime`, and `akasha write` refuses all 161 row files when they carry `start-time`. Measured
 * 2026-09-01: one day and its sessions were refused on `start-time` kebab and answered 34 checks
 * held camel.
 *
 * A row beside a markdown day keeps the kebab keys the 780 of them already carry. Nothing rewrites
 * those; the whole split is which kind of page the row sits beside. `camelisedRow` in
 * `tools/lib/tracking/akasha-day.ts` makes the same turn for every row Alan's tracking writes after
 * the move, and `kebabisedRow` in `@akasha/pages-system/akasha-page-values` turns it back for whatever reads
 * one, so the query engine sees a single spelling out of both halves.
 *
 * WHAT A DAY PAGE IMPORTS IS NOT DECLARED HERE.
 *
 * A day page states `import type { DailyTracking } from ...`, and what fills that gap depends on the
 * folder the page is in, which is akasha's to answer rather than this file's. `placing.ts` asks
 * `pathFor` and `importedFrom` — the two calls `composedFor` makes for every page the pages system
 * service writes — so the migrated days and the days written after them agree by construction. A
 * constant here would be a second answer, right only at the one depth whoever wrote it had in mind,
 * and a type-only import is erased before the file runs, so a wrong one loads fine and only ever
 * fails a typecheck nobody ran.
 */

/**
 * The page type a day is in MARKDOWN, declared at `pages/page-type/daily-tracking.page-type.md`.
 *
 * This is the name the source corpus states and the name the converter reads a day back out of. It
 * is NOT the name a day answers to once it stands in akasha — see `AKASHA_DAY_PAGE_TYPE` below.
 */
export const DAY_PAGE_TYPE = "daily-tracking"

/**
 * The page type a day is in AKASHA, declared at
 * `alan/tracking/daily/wake-days/wake-day.page-type.ts`, which states `slug: "wake-day"` and
 * `pluralSlug: "wake-days"`.
 *
 * The two names are kept apart because the akasha pages system service answers for the pages
 * standing in akasha and for no others, so its index holds `wake-day` and has never held
 * `daily-tracking`. A day page composed or looked up under the markdown name is refused with `no
 * page type the index holds`, which is what `tools/lib/tracking/akasha-day.ts` did to every write
 * the tracking funnel made for a migrated day.
 *
 * A day standing in akasha carries this on the page — `pageTypeSlug: "wake-day"` on all 133 of them
 * — and in the file's own name, which ends `.wake-day.ts`.
 */
export const AKASHA_DAY_PAGE_TYPE = "wake-day"

export const SESSIONS_SLUG = "sessions"

export const COMPLETED_TASKS_SLUG = "completed-tasks"

export const ENTRY_EXTENSION = "jsonl"

/**
 * The type a day page satisfies, which is the name `daily-tracking.page-type.ts` exports.
 *
 * Only the name is here. Where that file is, and so what a day page imports it from, is asked of
 * akasha by `placing.ts` for the reasons above.
 */
export const DECLARING_TYPE = "DailyTracking"

/** How a markdown value becomes a page value. */
export type Turn =
  /** Carried across untouched. */
  | "as-it-stands"
  /** The page's own identity: kept when it is already a uuid v7, minted afresh when it is not. */
  | "identity"
  /** `2026-03-05` becomes `day-2026-03-05`, and is minted from the date on the five days with none. */
  | "day-slug"
  /** Must name the page type this converter writes. */
  | "page-type"

export type DayField = {
  /** The key the markdown frontmatter carries. */
  readonly key: string
  /** The key the page carries. */
  readonly name: string
  readonly turn: Turn
  /** Whether every one of the 133 days carries it. */
  readonly onEveryDay: boolean
}

const carried = (key: string, name: string, onEveryDay = false): DayField => ({
  key,
  name,
  turn: "as-it-stands",
  onEveryDay,
})

/**
 * Every frontmatter key the 133 markdown days carry, in the order the rendered page states them.
 *
 * Measured over `pages/daily-tracking/*.daily-tracking.md` on 2026-09-01: 33 keys, of which four
 * are on all 133 days and `slug` is on 128. A key off this list is refused by name rather than
 * dropped, which is the only reason the dry run can say the corpus converts clean.
 */
export const DAY_FIELDS: readonly DayField[] = [
  { key: "id", name: "id", turn: "identity", onEveryDay: true },
  { key: "page-type-slug", name: "pageTypeSlug", turn: "page-type", onEveryDay: true },
  { key: "slug", name: "slug", turn: "day-slug", onEveryDay: false },
  carried("title", "title", true),
  carried("date", "date", true),
  carried("version", "version"),
  carried("last-viewed-at", "lastViewedAt"),
  /**
   * Text, not a number.
   *
   * It is carried across as the text it is for two reasons. A session row
   * carries a key of this same name and rows move across untouched, so a number here would make one
   * property two types on one day. And `version` beside it is text that reads as a number and is
   * ruined by becoming one — all 102 day values and all 617 row values, measured 2026-09-01 — so
   * the rule that numeric-looking text stays text is worth holding to everywhere rather than in the
   * one place it is known to bite.
   */
  carried("safety-level", "safetyLevel"),
  carried("persona-days", "personaDays"),
  carried("meals", "meals"),
  carried("health-points", "healthPoints"),
  carried("task-points", "taskPoints"),
  carried("wealth-points", "wealthPoints"),
  carried("faith-points", "faithPoints"),
  carried("love-points", "lovePoints"),
  carried("sleep-points", "sleepPoints"),
  carried("fun-points", "funPoints"),
  carried("learn-points", "learnPoints"),
  carried("strength-points", "strengthPoints"),
  carried("strength-volume", "strengthVolume"),
  carried("cardio-points", "cardioPoints"),
  carried("nutrition-points", "nutritionPoints"),
  carried("breathing-points", "breathingPoints"),
  carried("active-calories", "activeCalories"),
  carried("completion-snapshot", "completionSnapshot"),
  carried("words-read-points", "wordsReadPoints"),
  carried("words-read-snapshot", "wordsReadSnapshot"),
  carried("inbox-tasks", "inboxTasks"),
  carried("inbox-tasks-cleared-today", "inboxTasksClearedToday"),
  carried("inbox-temper-tasks", "inboxTemperTasks"),
  carried("inbox-temper-tasks-cleared-today", "inboxTemperTasksClearedToday"),
  carried("inbox-texts", "inboxTexts"),
  carried("inbox-texts-cleared-today", "inboxTextsClearedToday"),
  carried("inbox-calendar", "inboxCalendar"),
  carried("inbox-calendar-cleared-today", "inboxCalendarClearedToday"),
]

export const DAY_FIELD_BY_KEY: ReadonlyMap<string, DayField> = new Map(
  DAY_FIELDS.map((field) => [field.key, field])
)

/**
 * The key a session row carries naming the day it belongs to.
 *
 * Every one of the 780 rows carries it and every one of them names its own day's page identity,
 * measured 2026-09-01. So a day whose identity is re-minted has to have its rows re-pointed, and
 * that is the only edit any row takes.
 */
export const DAY_REFERENCE_KEY = "daily-tracking"

/**
 * Which property page each key needs before a day can land.
 *
 * The dry run holds this list against what the page type declares, and every one of them is
 * declared as of 2026-09-01. It is kept because the day's keys and the type's properties are two
 * lists that may drift apart again, and the dry run is where that drift is meant to be seen.
 */
export const PROPERTY_PAGES_NEEDED: readonly string[] = [
  ...DAY_FIELDS.filter((f) => f.key !== "id" && f.key !== "page-type-slug" && f.key !== "slug").map(
    (f) => f.key
  ),
  SESSIONS_SLUG,
  COMPLETED_TASKS_SLUG,
]
