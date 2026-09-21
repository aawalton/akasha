import "akasha/temper/addon/crafting-addon/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/keybinder-addon/keybinder-declarations/keybinder-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function asVkScrollData(value: unknown): VkScrollData {
  return value as VkScrollData
}

export function asControl(value: unknown): Control {
  return value as Control
}
