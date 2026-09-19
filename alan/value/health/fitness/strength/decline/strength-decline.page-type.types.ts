import type { DeclineDate } from "akasha/alan/value/health/fitness/strength/decline/properties/decline-date.calendar-date-property.types.ts"
import type { Exercise } from "akasha/alan/value/health/fitness/strength/log/properties/exercise.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type StrengthDecline = Page & {
  title: Title
  exercise: Exercise
  declineDate: DeclineDate
}
