import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { ArmorLevelScale } from "akasha/temper/catalog/gear/temper-quality/properties/armor-level-scale.number-property.types.ts"
import type { EsoDisplayQuality } from "akasha/temper/catalog/gear/temper-quality/properties/eso-display-quality.number-property.types.ts"
import type { GameName } from "akasha/temper/catalog/gear/temper-quality/properties/game-name.text-property.types.ts"
import type { SetBonusScale } from "akasha/temper/catalog/gear/temper-quality/properties/set-bonus-scale.number-property.types.ts"
import type { WeaponLevelScale } from "akasha/temper/catalog/gear/temper-quality/properties/weapon-level-scale.number-property.types.ts"
import type { Available } from "akasha/temper/catalog/thing/properties/available.boolean-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperQuality = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  available: Available
  hashPlace: HashPlace
  esoDisplayQuality: EsoDisplayQuality
  gameName?: GameName
  armorLevelScale?: ArmorLevelScale
  weaponLevelScale?: WeaponLevelScale
  setBonusScale?: SetBonusScale
}
