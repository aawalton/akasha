import "akasha/temper/addon/pages/crafting/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-keybinder/keybinder-declarations/keybinder-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function asVkScrollData(value: unknown): VkScrollData {
  return value as VkScrollData
}

export function asControl(value: unknown): Control {
  return value as Control
}
