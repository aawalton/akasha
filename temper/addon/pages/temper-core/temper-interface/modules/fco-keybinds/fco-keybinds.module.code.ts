import {
  KEYBIND_TOGGLE_SETTINGS_COMPASS_QUEST_GIVERS,
  KEYBIND_TOGGLE_SETTINGS_INNOCENT_ATTACK,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/fco-constants/fco-constants.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/fco-state/fco-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

function toggledZeroOne(this: void, settingType: number, settingId: number): string | undefined {
  const current = tonumber(GetSetting(settingType, settingId))
  if (current === undefined) {
    return undefined
  }
  let next = current
  if (current === 0) {
    next = 1
  } else if (current === 1) {
    next = 0
  }
  return tostring(next)
}

export function keybinds(this: void, keybindType: string): undefined {
  if (keybindType === "") {
    return
  }
  const settings = STATE.settingsVars.settings
  if (keybindType === KEYBIND_TOGGLE_SETTINGS_COMPASS_QUEST_GIVERS) {
    if (settings.enableKeybindCompassQuestGivers === true) {
      const next = toggledZeroOne(SETTING_TYPE_UI, UI_SETTING_COMPASS_QUEST_GIVERS)
      if (next !== undefined) {
        SetSetting(SETTING_TYPE_UI, UI_SETTING_COMPASS_QUEST_GIVERS, next, undefined)
      }
    }
  } else if (keybindType === KEYBIND_TOGGLE_SETTINGS_INNOCENT_ATTACK) {
    if (settings.enableKeybindInnocentAttack === true) {
      const next = toggledZeroOne(SETTING_TYPE_COMBAT, COMBAT_SETTING_PREVENT_ATTACKING_INNOCENTS)
      if (next !== undefined) {
        SetSetting(SETTING_TYPE_COMBAT, COMBAT_SETTING_PREVENT_ATTACKING_INNOCENTS, next, undefined)
      }
    }
  }
}
