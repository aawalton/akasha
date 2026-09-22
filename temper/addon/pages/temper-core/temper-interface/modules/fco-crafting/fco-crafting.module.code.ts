import {
  setArmorTypeSwitchButtonHiddenForCraftType,
  smithingModifications,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/fco-crafting-smithing/fco-crafting-smithing.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/fco-state/fco-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"

function onEventCraftingStationClose(this: void): undefined {
  const settings = STATE.settingsVars.settings
  if (settings.changeSoundAtCrafting === true) {
    resetVolumeLevels(SETTING_TYPE_AUDIO, AUDIO_SETTING_AUDIO_VOLUME)
  }
}

export function onEventCraftingStationOpened(
  this: void,
  _eventCode?: unknown,
  tradeskillType?: unknown,
  _sameStation?: unknown
): undefined {
  soundLowerAtCraftingCheck()
  setArmorTypeSwitchButtonHiddenForCraftType(tradeskillType)
}

function resetVolumeLevels(
  this: void,
  audioType: number | string,
  audioVolumeId?: number
): undefined {
  if (audioType === undefined || audioVolumeId === undefined) {
    return
  }
  const audioTypeId = tonumber(audioType) ?? 0
  const settings = STATE.settingsVars.settings
  const volumes = settings.volumes
  let audioVolumeRestored: string | number | undefined
  const audioTypeTable = volumes[audioTypeId]
  if (audioTypeTable !== undefined && audioTypeTable[audioVolumeId] !== undefined) {
    audioVolumeRestored = audioTypeTable[audioVolumeId]
  }
  if (audioVolumeRestored !== undefined) {
    SetSetting(audioTypeId, audioVolumeId, tostring(audioVolumeRestored), undefined)
  }
}

export function saveVolumeLevels(this: void, settingType: number, settingId: number): undefined {
  const settings = STATE.settingsVars.settings
  const currentAudioVolume = GetSetting(settingType, settingId)
  if (currentAudioVolume !== undefined) {
    const volumes = settings.volumes
    const audioTypeTable: Record<number, string | number> = volumes[settingType] ?? {}
    volumes[settingType] = audioTypeTable
    audioTypeTable[settingId] = currentAudioVolume
  }
}

function changeVolumeLevels(this: void, changeType: string): boolean {
  if (changeType === undefined) {
    return false
  }
  const settings = STATE.settingsVars.settings
  if (changeType === "crafting") {
    if (settings.changeSoundAtCrafting === true) {
      saveVolumeLevels(SETTING_TYPE_AUDIO, AUDIO_SETTING_AUDIO_VOLUME)
      SetSetting(
        SETTING_TYPE_AUDIO,
        AUDIO_SETTING_AUDIO_VOLUME,
        tostring(settings.changeSoundAtCraftingVolume),
        undefined
      )
      return true
    }
  }
  return false
}

export function soundLowerAtCraftingCheck(this: void): boolean {
  if (!ZO_CraftingUtils_IsCraftingWindowOpen()) {
    return false
  }
  if (STATE.settingsVars.settings.changeSoundAtCrafting === true) {
    changeVolumeLevels("crafting")
    EVENT_MANAGER.RegisterForEvent(
      `${STATE.addonVars.addonName}_SOUND`,
      EVENT_END_CRAFTING_STATION_INTERACT,
      onEventCraftingStationClose
    )
  } else {
    resetVolumeLevels("crafting")
    EVENT_MANAGER.UnregisterForEvent(
      `${STATE.addonVars.addonName}_SOUND`,
      EVENT_END_CRAFTING_STATION_INTERACT
    )
  }
  return false
}

function soundModifications(this: void): undefined {
  soundLowerAtCraftingCheck()
}

export function craftingModifications(this: void): undefined {
  smithingModifications()
  soundModifications()
}
