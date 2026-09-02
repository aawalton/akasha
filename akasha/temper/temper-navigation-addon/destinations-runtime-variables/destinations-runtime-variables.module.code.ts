import {
  DEST_PIN_TEXT_COLOR_OTHER,
  DEST_PIN_TEXT_COLOR_OTHER_DONE,
} from "../destinations-colors/destinations-colors.module.code.ts"
import type { PinDefaultsKey } from "../destinations-pin-defaults/destinations-pin-defaults.module.code.ts"
import type { AchievementPinKey } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"

export interface DestinationsRuntimeVariables {
  MapMiscPOIs: boolean
  LastMapShown: string
  pinName: string | undefined
  pinTag: string[] | undefined
  pinType: number
  pinTypeName: string
  AchPins: AchievementPinKey[]
  AchPinTex: PinDefaultsKey[]
  AchTextColorDefs: Record<AchievementPinKey, ZoColorDef>
  AchTextColorDefsDone: Record<AchievementPinKey, ZoColorDef>
}

export const DRTV: DestinationsRuntimeVariables = {
  MapMiscPOIs: false,
  LastMapShown: "",
  pinName: undefined,
  pinTag: undefined,
  pinType: 99,
  pinTypeName: "",
  AchPins: [
    "MAIQ",
    "LB_GTTP_CP",
    "PEACEMAKER",
    "NOSEDIVER",
    "EARTHLYPOS",
    "ON_ME",
    "BRAWL",
    "PATRON",
    "WROTHGAR_JUMPER",
    "CHAMPION",
    "RELIC_HUNTER",
    "BREAKING",
    "CUTPURSE",
  ],
  AchPinTex: [
    "pinTextureMaiq",
    "pinTextureOther",
    "pinTexturePeacemaker",
    "pinTextureNosediver",
    "pinTextureEarthlyPos",
    "pinTextureOnMe",
    "pinTextureBrawl",
    "pinTexturePatron",
    "pinTextureWrothgarJumper",
    "pinTextureChampion",
    "pinTextureRelicHunter",
    "pinTextureBreaking",
    "pinTextureCutpurse",
  ],
  AchTextColorDefs: {
    LB_GTTP_CP: DEST_PIN_TEXT_COLOR_OTHER,
    MAIQ: DEST_PIN_TEXT_COLOR_OTHER,
    PEACEMAKER: DEST_PIN_TEXT_COLOR_OTHER,
    NOSEDIVER: DEST_PIN_TEXT_COLOR_OTHER,
    EARTHLYPOS: DEST_PIN_TEXT_COLOR_OTHER,
    ON_ME: DEST_PIN_TEXT_COLOR_OTHER,
    BRAWL: DEST_PIN_TEXT_COLOR_OTHER,
    PATRON: DEST_PIN_TEXT_COLOR_OTHER,
    WROTHGAR_JUMPER: DEST_PIN_TEXT_COLOR_OTHER,
    RELIC_HUNTER: DEST_PIN_TEXT_COLOR_OTHER,
    BREAKING: DEST_PIN_TEXT_COLOR_OTHER,
    CUTPURSE: DEST_PIN_TEXT_COLOR_OTHER,
    CHAMPION: DEST_PIN_TEXT_COLOR_OTHER,
  },
  AchTextColorDefsDone: {
    LB_GTTP_CP: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    MAIQ: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    PEACEMAKER: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    NOSEDIVER: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    EARTHLYPOS: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    ON_ME: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    BRAWL: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    PATRON: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    WROTHGAR_JUMPER: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    RELIC_HUNTER: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    BREAKING: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    CUTPURSE: DEST_PIN_TEXT_COLOR_OTHER_DONE,
    CHAMPION: DEST_PIN_TEXT_COLOR_OTHER_DONE,
  },
}
