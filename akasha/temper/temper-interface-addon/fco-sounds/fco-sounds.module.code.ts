import { asString, asStringRecord } from "../fco-casts/fco-casts.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

export const DISABLED_SOUND_BACKUPS: { current: Record<string, string> } = { current: {} }

export const DISABLE_SOUNDS_SHIFTER_BOX_CONTROL: { current: ShifterBox | undefined } = {
  current: undefined,
}

let SFX_SOUND_MUTED = false
const SOUND_VOLUMES_BEFORE: Record<number, Record<number, string>> = {}

const DISABLE_SOUNDS_SHIFTER_BOX_CUSTOM_SETTINGS: LibShifterBoxCustomSettings = {
  leftList: {
    title: "Available sounds",
  },
  rightList: {
    title: "Disabled sounds",
    buttonTemplates: {
      moveButton: {
        normalTexture: "/esoui/art/inventory/inventory_tabicon_craftbag_up.dds",
        mouseOverTexture: "/esoui/art/inventory/inventory_tabicon_craftbag_over.dds",
        pressedTexture: "/esoui/art/inventory/inventory_tabicon_craftbag_down.dds",
        disabledTexture: "/esoui/art/inventory/inventory_tabicon_craftbag_disabled.dds",
        anchors: {
          1: [BOTTOMRIGHT, "$(parent)List", BOTTOMLEFT, -2, 0],
        },
        dimensions: { x: 20, y: 20 },
      },
      moveAllButton: {
        normalTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        mouseOverTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        pressedTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        disabledTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        anchors: {
          1: [BOTTOM, "$(parent)Button", TOP, 0, -2],
        },
        dimensions: { x: 20, y: 20 },
      },
      searchButton: {
        normalTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        mouseOverTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        pressedTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        disabledTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        anchors: {
          1: [RIGHT, "$(parent)", RIGHT, -60, 0],
        },
        dimensions: { x: 60, y: 60 },
      },
    },
  },
  search: {
    enabled: true,
  },
}

const DISABLE_SOUNDS_SHIFTER_BOX_STYLE = {
  width: 600,
  height: 200,
}

export function setSoundsDisabledState(
  this: void
): [Record<string, string>, Record<string, unknown>] {
  const backupedSounds = DISABLED_SOUND_BACKUPS.current
  const settings = STATE.settingsVars.settings
  const isDisableSoundLSBEnabled = settings.disableSoundsLibShifterBox
  const leftListSoundsWithoutDisabledOnes: Record<string, string> = {}
  const disabledSoundsFromSV = settings.disabledSoundEntries
  const soundsWritable = asStringRecord(SOUNDS)
  for (const [k, v] of pairs(backupedSounds)) {
    if (disabledSoundsFromSV[k] === undefined) {
      leftListSoundsWithoutDisabledOnes[k] = v
      soundsWritable[k] = v
    } else {
      if (isDisableSoundLSBEnabled === true) {
        soundsWritable[k] = SOUNDS.NONE
      } else {
        soundsWritable[k] = v
      }
    }
  }
  return [leftListSoundsWithoutDisabledOnes, disabledSoundsFromSV]
}

export function updateDisableSoundsLibShifterBoxEntries(
  this: void,
  shifterBox: ShifterBox | undefined
): undefined {
  if (shifterBox === undefined) {
    return
  }
  const [leftListSoundsWithoutDisabledOnes, disabledSoundsFromSV] = setSoundsDisabledState()

  shifterBox.ClearLeftList()
  shifterBox.AddEntriesToLeftList(leftListSoundsWithoutDisabledOnes)

  shifterBox.ClearRightList()
  shifterBox.AddEntriesToRightList(disabledSoundsFromSV)
}

function myShifterBoxEventEntryMovedCallbackFunction(
  this: void,
  shifterBox: unknown,
  key: unknown,
  value: unknown,
  _categoryId: unknown,
  isDestListLeftList: unknown,
  _fromList: unknown,
  _toList: unknown
): undefined {
  if (shifterBox === undefined || key === undefined) {
    return
  }
  const settings = STATE.settingsVars.settings
  if (settings.disableSoundsLibShifterBox !== true) {
    return
  }

  const disabledSoundEntries = settings.disabledSoundEntries
  const soundsWritable = asStringRecord(SOUNDS)
  const soundKey = asString(key)
  if (isDestListLeftList === true) {
    disabledSoundEntries[soundKey] = undefined
    soundsWritable[soundKey] = DISABLED_SOUND_BACKUPS.current[soundKey]
  } else {
    disabledSoundEntries[soundKey] = value
    const backupSoundName = asString(value)
    DISABLED_SOUND_BACKUPS.current[soundKey] = backupSoundName
    soundsWritable[soundKey] = SOUNDS.NONE
  }
}

function myShifterBoxEventEntryHighlightedCallbackFunction(
  this: void,
  _control: unknown,
  shifterBox: unknown,
  key: unknown,
  _value: unknown,
  _categoryId: unknown,
  isLeftList: unknown
): undefined {
  if (shifterBox === undefined || key === undefined) {
    return
  }
  if (STATE.settingsVars.settings.disableSoundsLibShifterBox !== true) {
    return
  }

  const soundKey = asString(key)
  if (isLeftList === true) {
    const soundName = SOUNDS[soundKey]
    if (soundName !== undefined && soundName !== "") {
      PlaySound(soundName)
    }
  } else {
    const backupName = DISABLED_SOUND_BACKUPS.current[soundKey]
    if (backupName !== undefined && backupName !== "") {
      PlaySound(backupName)
    }
  }
}

function updateDisableSoundsLibShifterBox(this: void, parentCtrl: Control | undefined): undefined {
  const disableSoundsShifterBox = DISABLE_SOUNDS_SHIFTER_BOX_CONTROL.current
  if (disableSoundsShifterBox === undefined || parentCtrl === undefined) {
    return
  }
  parentCtrl.SetResizeToFitDescendents(true)

  disableSoundsShifterBox.SetAnchor(TOPLEFT, parentCtrl, TOPLEFT, 0, 0)
  disableSoundsShifterBox.SetDimensions(
    DISABLE_SOUNDS_SHIFTER_BOX_STYLE.width,
    DISABLE_SOUNDS_SHIFTER_BOX_STYLE.height
  )

  updateDisableSoundsLibShifterBoxEntries(disableSoundsShifterBox)

  updateDisabledSoundsLibShifterBoxState(parentCtrl, disableSoundsShifterBox)

  disableSoundsShifterBox.RegisterCallback(
    LibShifterBox.EVENT_ENTRY_MOVED,
    myShifterBoxEventEntryMovedCallbackFunction
  )
  disableSoundsShifterBox.RegisterCallback(
    LibShifterBox.EVENT_ENTRY_HIGHLIGHTED,
    myShifterBoxEventEntryHighlightedCallbackFunction
  )
}

export function updateDisabledSoundsLibShifterBoxState(
  this: void,
  parentCtrl: Control | undefined,
  disableSoundsShifterBox?: ShifterBox | undefined
): undefined {
  const box = disableSoundsShifterBox ?? DISABLE_SOUNDS_SHIFTER_BOX_CONTROL.current
  if (parentCtrl === undefined || box === undefined) {
    return
  }
  const isDisableSoundLSBEnabled = STATE.settingsVars.settings.disableSoundsLibShifterBox === true
  parentCtrl.SetHidden(false)
  parentCtrl.SetMouseEnabled(isDisableSoundLSBEnabled)
  box.SetHidden(false)
  box.SetEnabled(isDisableSoundLSBEnabled)
}

export function buildSoundsLibShifterBox(this: void, parentCtrl: Control | undefined): undefined {
  if (parentCtrl === undefined) {
    return
  }
  const addonName = STATE.addonVars.addonName

  STATE.LSB = LibShifterBox
  const disableSoundsShifterBox = LibShifterBox(
    addonName,
    "FCOCHANGESTUFF_LAM_CUSTOM_SOUNDS_DISABLE_PARENT_LSB",
    parentCtrl,
    DISABLE_SOUNDS_SHIFTER_BOX_CUSTOM_SETTINGS
  )
  DISABLE_SOUNDS_SHIFTER_BOX_CONTROL.current = disableSoundsShifterBox
  updateDisableSoundsLibShifterBox(parentCtrl)
}

export function getSoundsLibShifterBox(
  this: void,
  parentCtrl: Control | undefined
): ShifterBox | undefined {
  if (parentCtrl === undefined) {
    return undefined
  }
  updateSoundsLibShifterBox(parentCtrl)
  return DISABLE_SOUNDS_SHIFTER_BOX_CONTROL.current
}

export function updateSoundsLibShifterBox(this: void, parentCtrl: Control | undefined): undefined {
  if (parentCtrl === undefined) {
    return
  }
  if (DISABLE_SOUNDS_SHIFTER_BOX_CONTROL.current === undefined) {
    buildSoundsLibShifterBox(parentCtrl)
  } else {
    updateDisableSoundsLibShifterBox(parentCtrl)
  }
}

function changeOrRestoreSound(
  this: void,
  settingType: number,
  soundType: number | undefined,
  volume: string | number | undefined,
  doMute: boolean
): undefined {
  if (soundType === undefined) {
    return
  }
  if (doMute === true) {
    let beforeForType = SOUND_VOLUMES_BEFORE[settingType]
    if (beforeForType === undefined) {
      beforeForType = {}
      SOUND_VOLUMES_BEFORE[settingType] = beforeForType
    }
    beforeForType[soundType] = GetSetting(settingType, soundType)
    const newVolume = volume ?? "0"
    SetSetting(settingType, soundType, tostring(newVolume), undefined)
  } else {
    let restoreSoundVolume =
      tonumber(volume) ?? tonumber(SOUND_VOLUMES_BEFORE[settingType]?.[soundType]) ?? 0
    if (restoreSoundVolume < 0) {
      restoreSoundVolume = 0
    }
    if (restoreSoundVolume > 100) {
      restoreSoundVolume = 100
    }
    SetSetting(settingType, soundType, tostring(restoreSoundVolume), undefined)
  }
}

let SOUND_MUTED_ON_MOUNTING_VOLUME_BEFORE: string | number = 0
let eventMountStateChangedWasRegistered: boolean | undefined

export function muteMountSound(this: void): undefined {
  const addonName = STATE.addonVars.addonName
  const settings = STATE.settingsVars.settings
  if (settings.muteMountSound === true) {
    const onMountStateChanged = (_eventId: unknown, isMounted: unknown): undefined => {
      if (isMounted === true) {
        const isSoundEnabled = GetSetting_Bool(SETTING_TYPE_AUDIO, AUDIO_SETTING_AUDIO_ENABLED)
        if (isSoundEnabled !== true) {
          return
        }
        if (settings.muteMountSound !== true) {
          return
        }
        SOUND_MUTED_ON_MOUNTING_VOLUME_BEFORE = GetSetting(
          SETTING_TYPE_AUDIO,
          AUDIO_SETTING_SFX_VOLUME
        )
        if (SOUND_MUTED_ON_MOUNTING_VOLUME_BEFORE === "0") {
          return
        }
        changeOrRestoreSound(
          SETTING_TYPE_AUDIO,
          AUDIO_SETTING_SFX_VOLUME,
          settings.muteMountSoundVolume,
          true
        )
        const soundMuteDelay = settings.muteMountSoundDelay
        zo_callLater((): undefined => {
          if (SOUND_MUTED_ON_MOUNTING_VOLUME_BEFORE !== "0") {
            changeOrRestoreSound(
              SETTING_TYPE_AUDIO,
              AUDIO_SETTING_SFX_VOLUME,
              SOUND_MUTED_ON_MOUNTING_VOLUME_BEFORE,
              false
            )
          }
        }, soundMuteDelay)
      }
    }
    eventMountStateChangedWasRegistered = EVENT_MANAGER.RegisterForEvent(
      `${addonName}_MOUNT_STATE_CHANGED`,
      EVENT_MOUNTED_STATE_CHANGED,
      onMountStateChanged
    )
  } else {
    if (eventMountStateChangedWasRegistered !== undefined) {
      EVENT_MANAGER.UnregisterForEvent(
        `${addonName}_MOUNT_STATE_CHANGED`,
        EVENT_MOUNTED_STATE_CHANGED
      )
    }
  }
}

export function muteSFXSound(this: void): undefined {
  let volume: number | undefined
  if (!SFX_SOUND_MUTED) {
    volume = 0
  }
  changeOrRestoreSound(SETTING_TYPE_AUDIO, AUDIO_SETTING_SFX_VOLUME, volume, !SFX_SOUND_MUTED)
  SFX_SOUND_MUTED = !SFX_SOUND_MUTED
}

type SoundsTable = Record<string, string>
function asSoundsTable(this: void, value: unknown): SoundsTable {
  return value as SoundsTable
}

export function soundChanges(this: void): undefined {
  DISABLED_SOUND_BACKUPS.current = ZO_ShallowTableCopy(asSoundsTable(SOUNDS))

  setSoundsDisabledState()
}
