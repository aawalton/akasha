import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { BindingModifiers } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/properties/binding-modifiers.select-property.types.ts"
import type { BindingSlot } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/properties/binding-slot.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type KeyBindings = List<{
  slot: BindingSlot
  key: Key
  modifiers?: BindingModifiers
}>
