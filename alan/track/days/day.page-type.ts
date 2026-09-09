import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Bodyweight } from "../../../persons/people/properties/bodyweight.number-property.ts"
import type { ActiveCalories } from "./properties/active-calories.number-property.ts"
import type { BreathingPoints } from "./properties/breathing-points.number-property.ts"
import type { CardioPoints } from "./properties/cardio-points.number-property.ts"
import type { CompletedTasks } from "./properties/completed-tasks.page-property-entry.ts"
import type { CompletionSnapshot } from "./properties/completion-snapshot.number-property.ts"
import type { Date as TrackedDate } from "./properties/date.text-property.ts"
import type { FaithPoints } from "./properties/faith-points.number-property.ts"
import type { FunPoints } from "./properties/fun-points.number-property.ts"
import type { HealthPoints } from "./properties/health-points.number-property.ts"
import type { HealthSamples } from "./properties/health-samples.page-property-entry.ts"
import type { InboxCalendar } from "./properties/inbox-calendar.number-property.ts"
import type { InboxCalendarClearedToday } from "./properties/inbox-calendar-cleared-today.boolean-property.ts"
import type { InboxTasks } from "./properties/inbox-tasks.number-property.ts"
import type { InboxTasksClearedToday } from "./properties/inbox-tasks-cleared-today.boolean-property.ts"
import type { InboxTemperTasks } from "./properties/inbox-temper-tasks.number-property.ts"
import type { InboxTemperTasksClearedToday } from "./properties/inbox-temper-tasks-cleared-today.boolean-property.ts"
import type { InboxTexts } from "./properties/inbox-texts.number-property.ts"
import type { InboxTextsClearedToday } from "./properties/inbox-texts-cleared-today.boolean-property.ts"
import type { IntelligenceTopics } from "./properties/intelligence-topics.number-property.ts"
import type { LastViewedAt } from "./properties/last-viewed-at.instant-property.ts"
import type { LearnPoints } from "./properties/learn-points.number-property.ts"
import type { Listens } from "./properties/listens.page-property-entry.ts"
import type { LovePoints } from "./properties/love-points.number-property.ts"
import type { Meals } from "./properties/meals.text-property.ts"
import type { NutritionPoints } from "./properties/nutrition-points.number-property.ts"
import type { PersonaMessages } from "./properties/persona-messages.record-property.ts"
import type { SafetyLevel } from "./properties/safety-level.text-property.ts"
import type { Sessions } from "./properties/sessions.page-property-entry.ts"
import type { SleepPoints } from "./properties/sleep-points.number-property.ts"
import type { StrengthPoints } from "./properties/strength-points.number-property.ts"
import type { StrengthVolume } from "./properties/strength-volume.computed-property.ts"
import type { TaskPoints } from "./properties/task-points.number-property.ts"
import type { Version } from "./properties/version.text-property.ts"
import type { WealthPoints } from "./properties/wealth-points.number-property.ts"
import type { WisdomWords } from "./properties/wisdom-words.number-property.ts"
import type { WordsReadPoints } from "./properties/words-read-points.number-property.ts"
import type { WordsReadSnapshot } from "./properties/words-read-snapshot.number-property.ts"

export type Day = Page & {
  title: Title
  date: TrackedDate
  version?: Version
  lastViewedAt?: LastViewedAt
  safetyLevel?: SafetyLevel
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
  bodyweight?: Bodyweight
  wisdomWords?: WisdomWords
  intelligenceTopics?: IntelligenceTopics
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
  personaMessages?: PersonaMessages
  healthSamples?: HealthSamples
  listens?: Listens
}

export const day = {
  id: "01a05fd8-c30f-72ee-80d9-eb1c179b8359",
  pageTypeSlug: "page-type",
  slug: "day",
  definition: "what was measured about one of Alan's days",
  pluralSlug: "days",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "boolean-property/anchored-from-completion",
    "boolean-property/inbox-calendar-cleared-today",
    "boolean-property/inbox-tasks-cleared-today",
    "boolean-property/inbox-temper-tasks-cleared-today",
    "boolean-property/inbox-texts-cleared-today",
    "computed-property/activity-calories",
    "computed-property/faith-level",
    "computed-property/faith-stoplight",
    "computed-property/fun-level",
    "computed-property/fun-stoplight",
    "computed-property/health-level",
    "computed-property/health-stoplight",
    "computed-property/learn-level",
    "computed-property/learn-stoplight",
    "computed-property/love-level",
    "computed-property/love-stoplight",
    "computed-property/project-hours",
    "computed-property/sleep-hours",
    "computed-property/spend-hours",
    "computed-property/stoplights",
    "computed-property/strength-calories",
    "computed-property/strength-volume",
    "computed-property/surplus-hours",
    "computed-property/total-level",
    "computed-property/wealth-level",
    "computed-property/wealth-stoplight",
    "computed-property-module/hours-between",
    "instant-property/last-viewed-at",
    "number-property/active-calories",
    "number-property/breathing-points",
    "number-property/cardio-points",
    "number-property/completion-snapshot",
    "number-property/faith-points",
    "number-property/fun-points",
    "number-property/health-points",
    "number-property/inbox-calendar",
    "number-property/inbox-tasks",
    "number-property/inbox-temper-tasks",
    "number-property/inbox-texts",
    "number-property/intelligence-topics",
    "number-property/learn-points",
    "number-property/love-points",
    "number-property/messages-sent",
    "number-property/nutrition-points",
    "number-property/seq",
    "number-property/sleep-points",
    "number-property/strength-points",
    "number-property/task-points",
    "number-property/wealth-points",
    "number-property/wisdom-words",
    "number-property/words-read-points",
    "number-property/words-read-snapshot",
    "page-property-entry/completed-tasks",
    "page-property-entry/sessions",
    "record-property/persona-messages",
    "relation-property/messaged-persona",
    "text-property/date",
    "text-property/meals",
    "text-property/recurrence",
    "text-property/safety-level",
    "text-property/to-do-slug",
    "text-property/version",
    "page-property-entry/health-samples",
    "page-property-entry/listens",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "text-property/date", required: true, many: false },
    { pagePropertySlug: "text-property/version", required: false, many: false },
    { pagePropertySlug: "instant-property/last-viewed-at", required: false, many: false },
    { pagePropertySlug: "text-property/safety-level", required: false, many: false },
    { pagePropertySlug: "text-property/meals", required: false, many: true, maxCount: null },
    { pagePropertySlug: "number-property/health-points", required: false, many: false },
    { pagePropertySlug: "number-property/task-points", required: false, many: false },
    { pagePropertySlug: "number-property/wealth-points", required: false, many: false },
    { pagePropertySlug: "number-property/faith-points", required: false, many: false },
    { pagePropertySlug: "number-property/love-points", required: false, many: false },
    { pagePropertySlug: "number-property/sleep-points", required: false, many: false },
    { pagePropertySlug: "number-property/fun-points", required: false, many: false },
    { pagePropertySlug: "number-property/learn-points", required: false, many: false },
    { pagePropertySlug: "number-property/strength-points", required: false, many: false },
    { pagePropertySlug: "number-property/cardio-points", required: false, many: false },
    { pagePropertySlug: "number-property/nutrition-points", required: false, many: false },
    { pagePropertySlug: "number-property/breathing-points", required: false, many: false },
    { pagePropertySlug: "number-property/active-calories", required: false, many: false },
    { pagePropertySlug: "number-property/bodyweight", required: false, many: false },
    { pagePropertySlug: "number-property/wisdom-words", required: false, many: false },
    { pagePropertySlug: "number-property/intelligence-topics", required: false, many: false },
    { pagePropertySlug: "number-property/completion-snapshot", required: false, many: false },
    { pagePropertySlug: "number-property/words-read-points", required: false, many: false },
    { pagePropertySlug: "number-property/words-read-snapshot", required: false, many: false },
    { pagePropertySlug: "number-property/inbox-tasks", required: false, many: false },
    {
      pagePropertySlug: "boolean-property/inbox-tasks-cleared-today",
      required: false,
      many: false,
    },
    { pagePropertySlug: "number-property/inbox-temper-tasks", required: false, many: false },
    {
      pagePropertySlug: "boolean-property/inbox-temper-tasks-cleared-today",
      required: false,
      many: false,
    },
    { pagePropertySlug: "number-property/inbox-texts", required: false, many: false },
    {
      pagePropertySlug: "boolean-property/inbox-texts-cleared-today",
      required: false,
      many: false,
    },
    { pagePropertySlug: "number-property/inbox-calendar", required: false, many: false },
    {
      pagePropertySlug: "boolean-property/inbox-calendar-cleared-today",
      required: false,
      many: false,
    },
    { pagePropertySlug: "page-property-entry/sessions", required: false, many: false },
    { pagePropertySlug: "page-property-entry/completed-tasks", required: false, many: false },
    {
      pagePropertySlug: "record-property/persona-messages",
      required: false,
      many: true,
      maxCount: null,
      uncommitted: true,
    },
    { pagePropertySlug: "computed-property/activity-calories", required: false, many: false },
    { pagePropertySlug: "computed-property/strength-calories", required: false, many: false },
    { pagePropertySlug: "computed-property/strength-volume", required: false, many: false },
    { pagePropertySlug: "computed-property/faith-level", required: false, many: false },
    { pagePropertySlug: "computed-property/love-level", required: false, many: false },
    { pagePropertySlug: "computed-property/health-level", required: false, many: false },
    { pagePropertySlug: "computed-property/learn-level", required: false, many: false },
    { pagePropertySlug: "computed-property/fun-level", required: false, many: false },
    { pagePropertySlug: "computed-property/wealth-level", required: false, many: false },
    { pagePropertySlug: "computed-property/total-level", required: false, many: false },
    { pagePropertySlug: "computed-property/faith-stoplight", required: false, many: false },
    { pagePropertySlug: "computed-property/love-stoplight", required: false, many: false },
    { pagePropertySlug: "computed-property/health-stoplight", required: false, many: false },
    { pagePropertySlug: "computed-property/learn-stoplight", required: false, many: false },
    { pagePropertySlug: "computed-property/fun-stoplight", required: false, many: false },
    { pagePropertySlug: "computed-property/wealth-stoplight", required: false, many: false },
    { pagePropertySlug: "computed-property/stoplights", required: false, many: false },
    { pagePropertySlug: "computed-property/project-hours", required: false, many: false },
    { pagePropertySlug: "computed-property/sleep-hours", required: false, many: false },
    { pagePropertySlug: "computed-property/spend-hours", required: false, many: false },
    { pagePropertySlug: "computed-property/surplus-hours", required: false, many: false },
    { pagePropertySlug: "page-property-entry/health-samples", required: false, many: false },
    { pagePropertySlug: "page-property-entry/listens", required: false, many: false },
  ],
  worked: "ts",
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
      statement: "A day is slugged `day-` before the day that day is of.",
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
      statement: "How many messages Alan wrote each persona that day is counted on the day.",
    },
    {
      invariantKind: "departure",
      statement: "That count alone stays outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "Every day Alan tracked is a page of this type.",
    },
    {
      invariantKind: "departure",
      statement: "A day states no strength volume of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A day's strength volume is worked out from the sets naming that day.",
    },
    {
      invariantKind: "departure",
      statement: "A boundary is stored nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "The day is derived in one place.",
    },
  ],
} as const satisfies PageType
