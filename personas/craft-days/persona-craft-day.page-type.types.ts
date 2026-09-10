import type { Date as PersonaCraftDayDate } from "../../alan/track/daily/days/properties/date.text-property.ts"
import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Icon } from "../../temper/things/properties/icon.text-property.ts"
import type { ValueSlug } from "../properties/value-slug.text-property.ts"
import type { AdvanceCount } from "./properties/advance-count.number-property.ts"
import type { CraftDayPersona } from "./properties/craft-day-persona.relation-property.ts"
import type { GreenDay } from "./properties/green-day.number-property.ts"
import type { ImprovementCount } from "./properties/improvement-count.number-property.ts"
import type { NewPersonaCount } from "./properties/new-persona-count.number-property.ts"
import type { PersonasCrafted } from "./properties/personas-crafted.relation-property.ts"

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
