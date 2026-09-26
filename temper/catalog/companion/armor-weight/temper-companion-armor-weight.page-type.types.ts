import type { ArmorPassive } from "akasha/temper/catalog/companion/armor-weight/properties/armor-passive.relation-property.types.ts"
import type { ArmorSkillLine } from "akasha/temper/catalog/companion/armor-weight/properties/armor-skill-line.relation-property.types.ts"
import type { ArmorType } from "akasha/temper/catalog/companion/armor-weight/properties/armor-type.number-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionArmorWeight = TemperCompanionThing & {
  key: Key
  hashPlace: HashPlace
  armorType?: ArmorType
  armorPassiveId?: ArmorPassive
  armorSkillLineId?: ArmorSkillLine
}
