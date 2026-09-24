import type { Icon } from "akasha/page/properties/icon.text-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { IconSlot } from "akasha/temper/catalog/gear/temper-set/properties/icon-slot.text-property.types.ts"

export type Icons = "jsonl"

export type IconsRow = {
  id: Id
  slot: IconSlot
  icon: Icon
}
