import type { Date as PersonaCraftDayDate } from "akasha/alan/track/daily/day/properties/date.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { AdvanceCount } from "akasha/persona/craft-day/properties/advance-count.number-property.types.ts"
import type { CraftDayPersona } from "akasha/persona/craft-day/properties/craft-day-persona.relation-property.types.ts"
import type { GreenDay } from "akasha/persona/craft-day/properties/green-day.number-property.types.ts"
import type { ImprovementCount } from "akasha/persona/craft-day/properties/improvement-count.number-property.types.ts"
import type { NewPersonaCount } from "akasha/persona/craft-day/properties/new-persona-count.number-property.types.ts"
import type { PersonasCrafted } from "akasha/persona/craft-day/properties/personas-crafted.relation-property.types.ts"
import type { Value } from "akasha/persona/properties/value.relation-property.types.ts"
import type { Icon } from "akasha/temper/thing/properties/icon.text-property.types.ts"

export type PersonaCraftDay = Page & {
  title: Title
  persona: CraftDayPersona
  date: PersonaCraftDayDate
  value: Value
  icon?: Icon
  personasCrafted?: PersonasCrafted
  newPersonaCount?: NewPersonaCount
  improvementCount?: ImprovementCount
  advanceCount?: AdvanceCount
  greenDay?: GreenDay
}
