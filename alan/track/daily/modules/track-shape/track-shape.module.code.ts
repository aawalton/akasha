export const AKASHA_DAY_PAGE_TYPE = "day"

export const SESSIONS_SLUG = "sessions"

export const COMPLETED_TASKS_SLUG = "completed-tasks"

export const ENTRY_EXTENSION = "jsonl"

export const DECLARING_TYPE = "DailyTracking"

export type Turn = "as-it-stands" | "identity" | "day-slug" | "page-type"

export type DayField = {
  readonly key: string
  readonly name: string
  readonly turn: Turn
  readonly onEveryDay: boolean
}

const carried = (key: string, name: string, onEveryDay = false): DayField => ({
  key,
  name,
  turn: "as-it-stands",
  onEveryDay,
})

const DAY_FIELDS: readonly DayField[] = [
  { key: "id", name: "id", turn: "identity", onEveryDay: true },
  { key: "page-type-slug", name: "type", turn: "page-type", onEveryDay: true },
  { key: "slug", name: "slug", turn: "day-slug", onEveryDay: false },
  carried("title", "title", true),
  carried("date", "date", true),
  carried("version", "version"),
  carried("last-viewed-at", "lastViewedAt"),
  carried("safety-level", "safetyLevel"),
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

export const DAY_REFERENCE_KEY = "daily-tracking"

export const PROPERTY_PAGES_NEEDED: readonly string[] = [
  ...DAY_FIELDS.filter((f) => f.key !== "id" && f.key !== "page-type-slug" && f.key !== "slug").map(
    (f) => f.key
  ),
  SESSIONS_SLUG,
  COMPLETED_TASKS_SLUG,
]
