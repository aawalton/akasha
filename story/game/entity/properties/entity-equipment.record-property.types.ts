import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { EquipmentAttack } from "akasha/story/game/entity/properties/equipment-attack.number-property.types.ts"
import type { EquipmentDefense } from "akasha/story/game/entity/properties/equipment-defense.number-property.types.ts"
import type { EquipmentSlot } from "akasha/story/game/entity/properties/equipment-slot.text-property.types.ts"
import type { ListedName } from "akasha/story/game/entity/properties/listed-name.text-property.types.ts"
import type { ListedNote } from "akasha/story/game/entity/properties/listed-note.text-property.types.ts"
import type { ScaledBy } from "akasha/story/game/entity/properties/scaled-by.relation-property.types.ts"

export type EntityEquipment = List<{
  name: ListedName
  slot?: EquipmentSlot
  attack?: EquipmentAttack
  defense?: EquipmentDefense
  scaling?: ScaledBy
  note?: ListedNote
}>
