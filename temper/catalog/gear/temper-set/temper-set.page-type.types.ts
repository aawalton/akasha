import type { Bonuses } from "akasha/temper/catalog/gear/temper-set/properties/bonuses.page-property-entry.types.ts"
import type { EsoArmorTypes } from "akasha/temper/catalog/gear/temper-set/properties/eso-armor-types.text-property.types.ts"
import type { EsoEquipTypes } from "akasha/temper/catalog/gear/temper-set/properties/eso-equip-types.text-property.types.ts"
import type { EsoItemIds } from "akasha/temper/catalog/gear/temper-set/properties/eso-item-ids.number-property.types.ts"
import type { EsoSetId } from "akasha/temper/catalog/gear/temper-set/properties/eso-set-id.number-property.types.ts"
import type { EsoWeaponTypes } from "akasha/temper/catalog/gear/temper-set/properties/eso-weapon-types.text-property.types.ts"
import type { Icons } from "akasha/temper/catalog/gear/temper-set/properties/icons.page-property-entry.types.ts"
import type { SetCategory } from "akasha/temper/catalog/gear/temper-set/properties/set-category.relation-property.types.ts"
import type { SetClassId } from "akasha/temper/catalog/gear/temper-set/properties/set-class-id.relation-property.types.ts"
import type { ValidPieces } from "akasha/temper/catalog/gear/temper-set/properties/valid-pieces.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperSet = TemperCatalogThing & {
  key: Key
  esoSetId: EsoSetId
  bonuses: Bonuses
  icons: Icons
  valid: ValidPieces
  classId?: SetClassId
  category: SetCategory
  esoItemIds?: EsoItemIds
  esoArmorTypes?: EsoArmorTypes
  esoEquipTypes?: EsoEquipTypes
  esoWeaponTypes?: EsoWeaponTypes
}
