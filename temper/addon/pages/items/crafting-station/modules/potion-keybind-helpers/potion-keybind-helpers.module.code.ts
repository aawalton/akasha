import { PotMaker } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-state/potion-state.module.code.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

type KeybindDescriptorArray = KeybindButtonGroupDescriptor[]
function asKeybindDescriptorArray(value: unknown): KeybindDescriptorArray {
  return value as KeybindDescriptorArray
}

export function updateKeyStrip(this: void, descriptor: string | undefined): undefined {
  const hasGroup = KEYBIND_STRIP.HasKeybindButtonGroup(
    asKeybindDescriptorArray(PotMaker.keybindStripDescriptor)
  )
  const needGroup =
    descriptor === PotMaker.descriptorPotion || descriptor === PotMaker.descriptorPoison
  if (hasGroup !== needGroup) {
    if (needGroup) {
      PushActionLayerByName(GetString(SI_KEYBINDINGS_LAYER_POTIONMAKER))
      KEYBIND_STRIP.AddKeybindButtonGroup(asKeybindDescriptorArray(PotMaker.keybindStripDescriptor))
    } else {
      KEYBIND_STRIP.RemoveKeybindButtonGroup(
        asKeybindDescriptorArray(PotMaker.keybindStripDescriptor)
      )
      RemoveActionLayerByName(GetString(SI_KEYBINDINGS_LAYER_POTIONMAKER))
    }
  }
}
