import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { AlcoholDrinksPerWeek } from "akasha/person/properties/alcohol-drinks-per-week.number-property.types.ts"
import type { AnsweredBy } from "akasha/person/properties/answered-by.relation-property.types.ts"
import type { BirthDate } from "akasha/person/properties/birth-date.calendar-date-property.types.ts"
import type { Bodyweight } from "akasha/person/properties/bodyweight.number-property.types.ts"
import type { PersonContributor } from "akasha/person/properties/person-contributor.relation-property.types.ts"
import type { PersonHeight } from "akasha/person/properties/person-height.number-property.types.ts"
import type { Phone } from "akasha/person/properties/phone.phone-number-property.types.ts"
import type { Scheme } from "akasha/person/properties/scheme.select-property.types.ts"
import type { SeatNotices } from "akasha/person/properties/seat-notices.record-property.types.ts"
import type { Sex } from "akasha/person/properties/sex.select-property.types.ts"
import type { TobaccoUse } from "akasha/person/properties/tobacco-use.select-property.types.ts"
import type { EmailAddress } from "akasha/persona/properties/email-address.email-address-property.types.ts"

export type Person = Domain & {
  answeredBy: AnsweredBy
  phone?: Phone
  email?: EmailAddress
  bodyweight?: Bodyweight
  birthDate?: BirthDate
  height?: PersonHeight
  sex?: Sex
  tobaccoUse?: TobaccoUse
  alcoholDrinksPerWeek?: AlcoholDrinksPerWeek
  contributor?: PersonContributor
  scheme?: Scheme
  seatNotices?: SeatNotices
}
