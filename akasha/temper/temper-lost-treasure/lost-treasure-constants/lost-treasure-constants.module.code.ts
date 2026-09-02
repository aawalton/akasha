import { registerUiStrings } from "../lost-treasure-ui-strings/lost-treasure-ui-strings.module.code.ts"

registerUiStrings()

export const ADDON_NAME = "TemperLostTreasure"
export const ADDON_DISPLAY_NAME = "Lost Treasure"

export const SAVED_VARIABLES_ACCOUNT = "TemperLostTreasure_Account"
export const SAVED_VARIABLES_CHARACTER = "TemperLostTreasure_Character"

export const LOST_TREASURE_BLANK_SAVED_VARS = 0

export type MarkOption = "using" | "inventory" | "all"
export const LOST_TREASURE_MARK_OPTIONS_USING = "using" satisfies MarkOption
export const LOST_TREASURE_MARK_OPTIONS_INVENTORY = "inventory" satisfies MarkOption
export const LOST_TREASURE_MARK_OPTIONS_ALL = "all" satisfies MarkOption

export type PinKey = "worldmap" | "compass"
export const LOST_TREASURE_PIN_KEY_MAP = "worldmap" satisfies PinKey
export const LOST_TREASURE_PIN_KEY_COMPASS = "compass" satisfies PinKey

export type PinType = "treasure" | "survey" | "clue"
export const LOST_TREASURE_PIN_TYPE_TREASURE = "treasure" satisfies PinType
export const LOST_TREASURE_PIN_TYPE_SURVEYS = "survey" satisfies PinType
export const LOST_TREASURE_PIN_TYPE_CLUES = "clue" satisfies PinType

export const LOST_TREASURE_MAP_NOT_OPENED = GetString(SI_LOST_TREASURE_BUGREPORT_PICKUP_NO_MAP)
export const LOST_TREASURE_BOOK_NOT_OPENED = 0

export const LOST_TREASURE_NO_PIN_TYPE = "nil"

export interface PinTypeDataEntry {
  pinName: string
  specializedItemType: number
  compareString: string
  name: string
  interactionType: number
}

export const LOST_TREASURE_PIN_TYPE_DATA: Record<PinType, PinTypeDataEntry> = {
  [LOST_TREASURE_PIN_TYPE_TREASURE]: {
    pinName: "TemperLostTreasure_TreasureMapPin",
    specializedItemType: SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP,
    compareString: zo_strlower(GetString(SI_SPECIALIZEDITEMTYPE100)),
    name: GetString(SI_SPECIALIZEDITEMTYPE100),
    interactionType: INTERACTION_NONE,
  },
  [LOST_TREASURE_PIN_TYPE_SURVEYS]: {
    pinName: "TemperLostTreasure_SurveyReportPin",
    specializedItemType: SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT,
    compareString: zo_strlower(GetString(SI_SPECIALIZEDITEMTYPE101)),
    name: GetString(SI_SPECIALIZEDITEMTYPE101),
    interactionType: INTERACTION_HARVEST,
  },
  [LOST_TREASURE_PIN_TYPE_CLUES]: {
    pinName: "TemperLostTreasure_TributeCluePin",
    specializedItemType: SPECIALIZED_ITEMTYPE_TROPHY_TRIBUTE_CLUE,
    compareString: zo_strlower(GetString(SI_SPECIALIZEDITEMTYPE113)),
    name: GetString(SI_SPECIALIZEDITEMTYPE113),
    interactionType: INTERACTION_NONE,
  },
}

interface AddOnInfo {
  author: string
  version: number
}

function getAddOnInfo(this: void): AddOnInfo {
  const addOnManager = GetAddOnManager()
  const numAddOns = addOnManager.GetNumAddOns()
  for (let i = 1; i <= numAddOns; i += 1) {
    const [name, , author] = addOnManager.GetAddOnInfo(i)
    if (name === ADDON_NAME) {
      return { author, version: addOnManager.GetAddOnVersion(i) }
    }
  }
  return { author: "", version: 0 }
}

const ADD_ON_INFO_HOLDER: { value: AddOnInfo | undefined } = { value: undefined }

function getMemoizedAddOnInfo(this: void): AddOnInfo {
  if (ADD_ON_INFO_HOLDER.value === undefined) {
    ADD_ON_INFO_HOLDER.value = getAddOnInfo()
  }
  return ADD_ON_INFO_HOLDER.value
}

export function getAddonAuthor(this: void): string {
  return getMemoizedAddOnInfo().author
}

export function getAddonVersion(this: void): number {
  return getMemoizedAddOnInfo().version
}

export const API_VERSION = GetAPIVersion()
