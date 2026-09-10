import type { Page } from "../../../../pages/page.page-type.types.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { Bodyweight } from "../../../../persons/people/properties/bodyweight.number-property.ts"
import type { ActiveCalories } from "./properties/active-calories.number-property.ts"
import type { ActivityCalories } from "./properties/activity-calories.computed-property.ts"
import type { BreathingPoints } from "./properties/breathing-points.number-property.ts"
import type { CardioPoints } from "./properties/cardio-points.number-property.ts"
import type { CompletedTasks } from "./properties/completed-tasks.page-property-entry.ts"
import type { CompletionSnapshot } from "./properties/completion-snapshot.number-property.ts"
import type { Date as DayDate } from "./properties/date.text-property.ts"
import type { FaithLevel } from "./properties/faith-level.computed-property.ts"
import type { FaithPoints } from "./properties/faith-points.number-property.ts"
import type { FaithStoplight } from "./properties/faith-stoplight.computed-property.ts"
import type { FunLevel } from "./properties/fun-level.computed-property.ts"
import type { FunPoints } from "./properties/fun-points.number-property.ts"
import type { FunStoplight } from "./properties/fun-stoplight.computed-property.ts"
import type { HealthLevel } from "./properties/health-level.computed-property.ts"
import type { HealthPoints } from "./properties/health-points.number-property.ts"
import type { HealthSamples } from "./properties/health-samples.page-property-entry.ts"
import type { HealthStoplight } from "./properties/health-stoplight.computed-property.ts"
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
import type { LearnLevel } from "./properties/learn-level.computed-property.ts"
import type { LearnPoints } from "./properties/learn-points.number-property.ts"
import type { LearnStoplight } from "./properties/learn-stoplight.computed-property.ts"
import type { Listens } from "./properties/listens.page-property-entry.ts"
import type { LoveLevel } from "./properties/love-level.computed-property.ts"
import type { LovePoints } from "./properties/love-points.number-property.ts"
import type { LoveStoplight } from "./properties/love-stoplight.computed-property.ts"
import type { LowestEmailInboxCount } from "./properties/lowest-email-inbox-count.number-property.ts"
import type { Meals } from "./properties/meals.text-property.ts"
import type { NutritionPoints } from "./properties/nutrition-points.number-property.ts"
import type { PersonaMessages } from "./properties/persona-messages.record-property.ts"
import type { ProjectHours } from "./properties/project-hours.computed-property.ts"
import type { SafetyLevel } from "./properties/safety-level.text-property.ts"
import type { Sessions } from "./properties/sessions.page-property-entry.ts"
import type { SleepHours } from "./properties/sleep-hours.computed-property.ts"
import type { SleepPoints } from "./properties/sleep-points.number-property.ts"
import type { SpendHours } from "./properties/spend-hours.computed-property.ts"
import type { Stoplights } from "./properties/stoplights.computed-property.ts"
import type { StrengthCalories } from "./properties/strength-calories.computed-property.ts"
import type { StrengthPoints } from "./properties/strength-points.number-property.ts"
import type { StrengthVolume } from "./properties/strength-volume.computed-property.ts"
import type { SurplusHours } from "./properties/surplus-hours.computed-property.ts"
import type { TaskPoints } from "./properties/task-points.number-property.ts"
import type { TotalLevel } from "./properties/total-level.computed-property.ts"
import type { Version } from "./properties/version.text-property.ts"
import type { WealthLevel } from "./properties/wealth-level.computed-property.ts"
import type { WealthPoints } from "./properties/wealth-points.number-property.ts"
import type { WealthStoplight } from "./properties/wealth-stoplight.computed-property.ts"
import type { WisdomWords } from "./properties/wisdom-words.number-property.ts"
import type { WordsReadPoints } from "./properties/words-read-points.number-property.ts"
import type { WordsReadSnapshot } from "./properties/words-read-snapshot.number-property.ts"

export type Day = Page & {
  title: Title
  date: DayDate
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
  activityCalories?: ActivityCalories
  strengthCalories?: StrengthCalories
  strengthVolume?: StrengthVolume
  faithLevel?: FaithLevel
  loveLevel?: LoveLevel
  healthLevel?: HealthLevel
  learnLevel?: LearnLevel
  funLevel?: FunLevel
  wealthLevel?: WealthLevel
  totalLevel?: TotalLevel
  faithStoplight?: FaithStoplight
  loveStoplight?: LoveStoplight
  healthStoplight?: HealthStoplight
  learnStoplight?: LearnStoplight
  funStoplight?: FunStoplight
  wealthStoplight?: WealthStoplight
  stoplights?: Stoplights
  projectHours?: ProjectHours
  sleepHours?: SleepHours
  spendHours?: SpendHours
  surplusHours?: SurplusHours
  healthSamples?: HealthSamples
  listens?: Listens
  lowestEmailInboxCount?: LowestEmailInboxCount
}
