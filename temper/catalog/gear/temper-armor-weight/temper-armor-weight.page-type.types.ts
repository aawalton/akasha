import type { ArmorType } from "akasha/temper/catalog/companion/armor-weight/properties/armor-type.number-property.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { ArmorBaseValue } from "akasha/temper/catalog/gear/temper-armor-weight/properties/armor-base-value.number-property.types.ts"
import type { CraftedGlyphItemId } from "akasha/temper/catalog/gear/temper-armor-weight/properties/crafted-glyph-item-id.number-property.types.ts"
import type { IsStandard } from "akasha/temper/catalog/gear/temper-armor-weight/properties/is-standard.boolean-property.types.ts"
import type { EsoWeaponTypeNumber } from "akasha/temper/catalog/gear/temper-weapon-type/properties/eso-weapon-type-number.number-property.types.ts"
import type { SkillLine } from "akasha/temper/catalog/thing/properties/skill-line.relation-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperArmorWeight = TemperCatalogThing & {
  key: Key
  baseValue: ArmorBaseValue
  isStandard: IsStandard
  skillLineId: SkillLine
  craftedGlyphItemId?: CraftedGlyphItemId
  hashPlace: HashPlace
  armorType?: ArmorType
  esoWeaponTypeNumber?: EsoWeaponTypeNumber
}
