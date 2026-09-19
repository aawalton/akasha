import type { TestedAgain } from "akasha/alan/value/health/fitness/coaching/movement-restriction/properties/tested-again.calendar-date-property.types.ts"
import type { MovementPattern } from "akasha/alan/value/health/fitness/strength/exercise/properties/movement-pattern.select-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type MovementRestriction = Page & {
  title: Title
  movementPattern: MovementPattern
  testedAgain: TestedAgain
}
