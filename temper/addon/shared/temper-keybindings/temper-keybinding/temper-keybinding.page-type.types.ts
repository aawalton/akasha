import type { ActionLayer } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/properties/action-layer.text-property.types.ts"
import type { BindingChangedAt } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/properties/binding-changed-at.instant-property.types.ts"
import type { KeyBindings } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/properties/key-bindings.record-property.types.ts"
import type { SharedAcrossCharacters } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/properties/shared-across-characters.boolean-property.types.ts"
import type { Category } from "akasha/temper/thing/properties/category.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperKeybinding = TemperThing & {
  key: Key
  layer?: ActionLayer
  category?: Category
  bindings?: KeyBindings
  shared: SharedAcrossCharacters
  changedAt: BindingChangedAt
}
