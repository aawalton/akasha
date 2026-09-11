import type { Date as PersonaCraftDayDate } from "akasha/alan/track/daily/days/properties/date.text-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { AdvanceCount } from "akasha/personas/craft-days/properties/advance-count.number-property.types.ts"
import type { CraftDayPersona } from "akasha/personas/craft-days/properties/craft-day-persona.relation-property.types.ts"
import type { GreenDay } from "akasha/personas/craft-days/properties/green-day.number-property.types.ts"
import type { ImprovementCount } from "akasha/personas/craft-days/properties/improvement-count.number-property.types.ts"
import type { NewPersonaCount } from "akasha/personas/craft-days/properties/new-persona-count.number-property.types.ts"
import type { PersonasCrafted } from "akasha/personas/craft-days/properties/personas-crafted.relation-property.types.ts"
import type { ValueSlug } from "akasha/personas/properties/value-slug.text-property.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"

export type PersonaCraftDay = Page & {
  title: Title
  persona: CraftDayPersona
  date: PersonaCraftDayDate
  valueSlug: ValueSlug
  icon?: Icon
  personasCrafted?: PersonasCrafted
  newPersonaCount?: NewPersonaCount
  improvementCount?: ImprovementCount
  advanceCount?: AdvanceCount
  greenDay?: GreenDay
}
