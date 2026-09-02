import { PotMaker } from "../potion-state/potion-state.module.code.ts"

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
