import { asLakTable } from "akasha/temper/addon/pages/hud/temper-keybinder/modules/addon-keybinds-casts/addon-keybinds-casts.module.code.ts"
import { onLoad } from "akasha/temper/addon/pages/hud/temper-keybinder/modules/addon-keybinds-load/addon-keybinds-load.module.code.ts"
import {
  LAK_NAME,
  LAK_VERSION,
} from "akasha/temper/addon/pages/hud/temper-keybinder/modules/addon-keybinds-names/addon-keybinds-names.module.code.ts"
import type { LakTable } from "akasha/temper/addon/pages/hud/temper-keybinder/modules/addon-keybinds-types/addon-keybinds-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-keybindings/eso-keybindings.type-declaration.d.ts"

export function installAddonKeybinds(this: void): undefined {
  const lak: LakTable = asLakTable({
    name: LAK_NAME,
    version: LAK_VERSION,
    showAddonKeybinds: false,
  })

  const keybindingManager: KeybindingManager | undefined =
    KEYBOARD_KEYBINDING_MANAGER ?? KEYBINDING_MANAGER
  if (keybindingManager === undefined) {
    error(`${LAK_NAME}: KEYBINDING_MANAGER not found`)
  }

  EVENT_MANAGER.UnregisterForEvent(LAK_NAME, EVENT_ADD_ON_LOADED)
  EVENT_MANAGER.RegisterForEvent(
    LAK_NAME,
    EVENT_ADD_ON_LOADED,
    (eventCode: number, addonName: string): undefined =>
      onLoad(lak, keybindingManager, eventCode, addonName)
  )
  return undefined
}
