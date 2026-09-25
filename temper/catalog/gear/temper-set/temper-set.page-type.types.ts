import type { Bonuses } from "akasha/temper/catalog/gear/temper-set/properties/bonuses.page-property-entry.types.ts"
import type { EsoArmorTypes } from "akasha/temper/catalog/gear/temper-set/properties/eso-armor-types.text-property.types.ts"
import type { EsoEquipTypes } from "akasha/temper/catalog/gear/temper-set/properties/eso-equip-types.text-property.types.ts"
import type { EsoItemIds } from "akasha/temper/catalog/gear/temper-set/properties/eso-item-ids.number-property.types.ts"
import type { EsoSetId } from "akasha/temper/catalog/gear/temper-set/properties/eso-set-id.number-property.types.ts"
import type { EsoWeaponTypes } from "akasha/temper/catalog/gear/temper-set/properties/eso-weapon-types.text-property.types.ts"
import type { Icons } from "akasha/temper/catalog/gear/temper-set/properties/icons.page-property-entry.types.ts"
import type { SetCategory } from "akasha/temper/catalog/gear/temper-set/properties/set-category.relation-property.types.ts"
import type { SetClassId } from "akasha/temper/catalog/gear/temper-set/properties/set-class-id.relation-property.types.ts"
import type { SetDlcId } from "akasha/temper/catalog/gear/temper-set/properties/set-dlc-id.number-property.types.ts"
import type { SetDropLocationNamesDe } from "akasha/temper/catalog/gear/temper-set/properties/set-drop-location-names-de.text-property.types.ts"
import type { SetDropLocationNamesEn } from "akasha/temper/catalog/gear/temper-set/properties/set-drop-location-names-en.text-property.types.ts"
import type { SetDropMechanics } from "akasha/temper/catalog/gear/temper-set/properties/set-drop-mechanics.number-property.types.ts"
import type { SetDropZones } from "akasha/temper/catalog/gear/temper-set/properties/set-drop-zones.number-property.types.ts"
import type { SetNameDe } from "akasha/temper/catalog/gear/temper-set/properties/set-name-de.text-property.types.ts"
import type { SetNameEs } from "akasha/temper/catalog/gear/temper-set/properties/set-name-es.text-property.types.ts"
import type { SetNameFr } from "akasha/temper/catalog/gear/temper-set/properties/set-name-fr.text-property.types.ts"
import type { SetNameRu } from "akasha/temper/catalog/gear/temper-set/properties/set-name-ru.text-property.types.ts"
import type { SetNameZh } from "akasha/temper/catalog/gear/temper-set/properties/set-name-zh.text-property.types.ts"
import type { SetProcsAllowedInPvp } from "akasha/temper/catalog/gear/temper-set/properties/set-procs-allowed-in-pvp.boolean-property.types.ts"
import type { SetTraitsNeeded } from "akasha/temper/catalog/gear/temper-set/properties/set-traits-needed.number-property.types.ts"
import type { SetTypeId } from "akasha/temper/catalog/gear/temper-set/properties/set-type-id.number-property.types.ts"
import type { SetUndauntedChestId } from "akasha/temper/catalog/gear/temper-set/properties/set-undaunted-chest-id.number-property.types.ts"
import type { SetVeteran } from "akasha/temper/catalog/gear/temper-set/properties/set-veteran.boolean-property.types.ts"
import type { SetVeteranEquipTypes } from "akasha/temper/catalog/gear/temper-set/properties/set-veteran-equip-types.text-property.types.ts"
import type { SetWayshrines } from "akasha/temper/catalog/gear/temper-set/properties/set-wayshrines.number-property.types.ts"
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
  setTypeId?: SetTypeId
  setDropMechanics?: SetDropMechanics
  setDlcId?: SetDlcId
  setVeteran?: SetVeteran
  setVeteranEquipTypes?: SetVeteranEquipTypes
  setWayshrines?: SetWayshrines
  setDropZones?: SetDropZones
  setProcsAllowedInPvp?: SetProcsAllowedInPvp
  setTraitsNeeded?: SetTraitsNeeded
  setUndauntedChestId?: SetUndauntedChestId
  setDropLocationNamesEn?: SetDropLocationNamesEn
  setDropLocationNamesDe?: SetDropLocationNamesDe
  setNameDe?: SetNameDe
  setNameEs?: SetNameEs
  setNameFr?: SetNameFr
  setNameRu?: SetNameRu
  setNameZh?: SetNameZh
}
