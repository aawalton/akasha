import {
  setArmorTypeSwitchButtonHiddenForCraftType,
  smithingModifications,
} from "../fco-crafting-smithing/fco-crafting-smithing.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

export function onEventCraftingStationClose(this: void): undefined {
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

export function resetVolumeLevels(
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

export function changeVolumeLevels(this: void, changeType: string): boolean {
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

export function soundModifications(this: void): undefined {
  soundLowerAtCraftingCheck()
}

export function craftingModifications(this: void): undefined {
  smithingModifications()
  soundModifications()
}
