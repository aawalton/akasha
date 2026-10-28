import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { bindingModifiers } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/properties/binding-modifiers.select-property.ts"

export type BindingModifiers = List<(typeof bindingModifiers.values)[number]>
