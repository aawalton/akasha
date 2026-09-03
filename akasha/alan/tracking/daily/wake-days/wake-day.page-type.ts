import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { ActiveCalories } from "./properties/active-calories.number-property.ts"
import type { BreathingPoints } from "./properties/breathing-points.number-property.ts"
import type { CardioPoints } from "./properties/cardio-points.number-property.ts"
import type { CompletedTasks } from "./properties/completed-tasks.page-property-entry.ts"
import type { CompletionSnapshot } from "./properties/completion-snapshot.number-property.ts"
import type { Date as TrackedDate } from "./properties/date.text-property.ts"
import type { FaithPoints } from "./properties/faith-points.number-property.ts"
import type { FunPoints } from "./properties/fun-points.number-property.ts"
import type { HealthPoints } from "./properties/health-points.number-property.ts"
import type { InboxCalendar } from "./properties/inbox-calendar.number-property.ts"
import type { InboxCalendarClearedToday } from "./properties/inbox-calendar-cleared-today.boolean-property.ts"
import type { InboxTasks } from "./properties/inbox-tasks.number-property.ts"
import type { InboxTasksClearedToday } from "./properties/inbox-tasks-cleared-today.boolean-property.ts"
import type { InboxTemperTasks } from "./properties/inbox-temper-tasks.number-property.ts"
import type { InboxTemperTasksClearedToday } from "./properties/inbox-temper-tasks-cleared-today.boolean-property.ts"
import type { InboxTexts } from "./properties/inbox-texts.number-property.ts"
import type { InboxTextsClearedToday } from "./properties/inbox-texts-cleared-today.boolean-property.ts"
import type { LastViewedAt } from "./properties/last-viewed-at.instant-property.ts"
import type { LearnPoints } from "./properties/learn-points.number-property.ts"
import type { LovePoints } from "./properties/love-points.number-property.ts"
import type { Meals } from "./properties/meals.text-property.ts"
import type { NutritionPoints } from "./properties/nutrition-points.number-property.ts"
import type { PersonaDays } from "./properties/persona-days.text-property.ts"
import type { SafetyLevel } from "./properties/safety-level.text-property.ts"
import type { Sessions } from "./properties/sessions.page-property-entry.ts"
import type { SleepPoints } from "./properties/sleep-points.number-property.ts"
import type { SpannedFromDayBoundary } from "./properties/spanned-from-day-boundary.boolean-property.ts"
import type { StrengthPoints } from "./properties/strength-points.number-property.ts"
import type { StrengthVolume } from "./properties/strength-volume.number-property.ts"
import type { TaskPoints } from "./properties/task-points.number-property.ts"
import type { Version } from "./properties/version.text-property.ts"
import type { WealthPoints } from "./properties/wealth-points.number-property.ts"
import type { WordsReadPoints } from "./properties/words-read-points.number-property.ts"
import type { WordsReadSnapshot } from "./properties/words-read-snapshot.number-property.ts"

export type WakeDay = Page & {
  title: Title
  date: TrackedDate
  version?: Version
  lastViewedAt?: LastViewedAt
  safetyLevel?: SafetyLevel
  personaDays?: PersonaDays
  meals?: Meals
  healthPoints?: HealthPoints
  taskPoints?: TaskPoints
  wealthPoints?: WealthPoints
  faithPoints?: FaithPoints
  lovePoints?: LovePoints
  sleepPoints?: SleepPoints
  funPoints?: FunPoints
  learnPoints?: LearnPoints
  strengthPoints?: StrengthPoints
  strengthVolume?: StrengthVolume
  cardioPoints?: CardioPoints
  nutritionPoints?: NutritionPoints
  breathingPoints?: BreathingPoints
  activeCalories?: ActiveCalories
  spannedFromDayBoundary?: SpannedFromDayBoundary
  completionSnapshot?: CompletionSnapshot
  wordsReadPoints?: WordsReadPoints
  wordsReadSnapshot?: WordsReadSnapshot
  inboxTasks?: InboxTasks
  inboxTasksClearedToday?: InboxTasksClearedToday
  inboxTemperTasks?: InboxTemperTasks
  inboxTemperTasksClearedToday?: InboxTemperTasksClearedToday
  inboxTexts?: InboxTexts
  inboxTextsClearedToday?: InboxTextsClearedToday
  inboxCalendar?: InboxCalendar
  inboxCalendarClearedToday?: InboxCalendarClearedToday
  sessions?: Sessions
  completedTasks?: CompletedTasks
}

export const wakeDay = {
  id: "01a05fd8-c30f-72ee-80d9-eb1c179b8359",
  pageTypeSlug: "page-type",
  slug: "wake-day",
  definition: "what was measured about one of Alan's days",
  pluralSlug: "wake-days",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/anchored-from-completion",
    "boolean-property/inbox-calendar-cleared-today",
    "boolean-property/inbox-tasks-cleared-today",
    "boolean-property/inbox-temper-tasks-cleared-today",
    "boolean-property/inbox-texts-cleared-today",
    "boolean-property/spanned-from-day-boundary",
    "instant-property/asserted-at",
    "instant-property/last-viewed-at",
    "number-property/active-calories",
    "number-property/breathing-points",
    "number-property/breathing-sets",
    "number-property/capacity-rate",
    "number-property/cardio-points",
    "number-property/completion-snapshot",
    "number-property/faith-points",
    "number-property/fun-points",
    "number-property/health-points",
    "number-property/inbox-calendar",
    "number-property/inbox-tasks",
    "number-property/inbox-temper-tasks",
    "number-property/inbox-texts",
    "number-property/learn-points",
    "number-property/love-points",
    "number-property/nutrition-points",
    "number-property/seq",
    "number-property/sleep-points",
    "number-property/strength-points",
    "number-property/strength-volume",
    "number-property/task-points",
    "number-property/wealth-points",
    "number-property/words-read-points",
    "number-property/words-read-snapshot",
    "page-property-entry/completed-tasks",
    "page-property-entry/sessions",
    "text-property/daily-tracking",
    "text-property/date",
    "text-property/difficulty-level",
    "text-property/end-time",
    "text-property/meals",
    "text-property/owner",
    "text-property/persona-days",
    "text-property/recurrence",
    "text-property/relationships",
    "text-property/safety-level",
    "text-property/start-time",
    "text-property/to-do-slug",
    "text-property/version",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "date", required: true, many: false },
    { pagePropertySlug: "version", required: false, many: false },
    { pagePropertySlug: "last-viewed-at", required: false, many: false },
    { pagePropertySlug: "safety-level", required: false, many: false },
    { pagePropertySlug: "persona-days", required: false, many: true, max: null },
    { pagePropertySlug: "meals", required: false, many: true, max: null },
    { pagePropertySlug: "health-points", required: false, many: false },
    { pagePropertySlug: "task-points", required: false, many: false },
    { pagePropertySlug: "wealth-points", required: false, many: false },
    { pagePropertySlug: "faith-points", required: false, many: false },
    { pagePropertySlug: "love-points", required: false, many: false },
    { pagePropertySlug: "sleep-points", required: false, many: false },
    { pagePropertySlug: "fun-points", required: false, many: false },
    { pagePropertySlug: "learn-points", required: false, many: false },
    { pagePropertySlug: "strength-points", required: false, many: false },
    { pagePropertySlug: "strength-volume", required: false, many: false },
    { pagePropertySlug: "cardio-points", required: false, many: false },
    { pagePropertySlug: "nutrition-points", required: false, many: false },
    { pagePropertySlug: "breathing-points", required: false, many: false },
    { pagePropertySlug: "active-calories", required: false, many: false },
    { pagePropertySlug: "spanned-from-day-boundary", required: false, many: false },
    { pagePropertySlug: "completion-snapshot", required: false, many: false },
    { pagePropertySlug: "words-read-points", required: false, many: false },
    { pagePropertySlug: "words-read-snapshot", required: false, many: false },
    { pagePropertySlug: "inbox-tasks", required: false, many: false },
    { pagePropertySlug: "inbox-tasks-cleared-today", required: false, many: false },
    { pagePropertySlug: "inbox-temper-tasks", required: false, many: false },
    { pagePropertySlug: "inbox-temper-tasks-cleared-today", required: false, many: false },
    { pagePropertySlug: "inbox-texts", required: false, many: false },
    { pagePropertySlug: "inbox-texts-cleared-today", required: false, many: false },
    { pagePropertySlug: "inbox-calendar", required: false, many: false },
    { pagePropertySlug: "inbox-calendar-cleared-today", required: false, many: false },
    { pagePropertySlug: "sessions", required: false, many: false },
    { pagePropertySlug: "completed-tasks", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One day is one page.",
    },
    {
      invariantKind: "departure",
      statement: "Everything measured about a day is on that day's page.",
    },
    {
      invariantKind: "departure",
      statement: "A day is slugged `wake-day-` before the day it is of.",
    },
    {
      invariantKind: "departure",
      statement: "No day is slugged by its date alone.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch of time and a finished to-do round are entries beside the day.",
    },
    {
      invariantKind: "departure",
      statement: "Every day Alan tracked is a page of this type.",
    },

    {
      invariantKind: "departure",
      statement:
        "The wake day sits inside the ESO day, and only says where inside it the boundary falls.",
    },
    {
      invariantKind: "departure",
      statement:
        "A boundary is worked out from the sleep sessions when it is read, and stored nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "The wake day is derived in one place, and a second derivation is a second answer.",
    },
    {
      invariantKind: "departure",
      statement: "A day whose waking cannot be found starts where its ESO day starts.",
    },
  ],
} as const satisfies PageType
