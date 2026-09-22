import type { ArmorBaseValue } from "akasha/temper/catalog/gear/temper-armor-weight/properties/armor-base-value.number-property.types.ts"
import type { IsStandard } from "akasha/temper/catalog/gear/temper-armor-weight/properties/is-standard.boolean-property.types.ts"
import type { SkillLine } from "akasha/temper/catalog/thing/properties/skill-line.relation-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperArmorWeight = TemperCatalogThing & {
  key: Key
  baseValue: ArmorBaseValue
  isStandard: IsStandard
  skillLineId: SkillLine
}
