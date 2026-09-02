import {
  PIN_ICON_REAL,
  PINS_BOOKSHELF,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_COMPASS_BOOKSHELF,
  PINS_COMPASS_EIDETIC,
  PINS_EIDETIC,
  PINS_EIDETIC_COLLECTED,
  PINS_UNKNOWN,
  SAVED_VARIABLES_NAME,
  SAVEDVARIABLES_VERSION,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import type { LoreBooksSavedVars } from "../lorebooks-types/lorebooks-types.module.code.ts"

export const DEFAULTS = {
  compassMaxDistance: 0.04,
  pinTexture: {
    type: PIN_ICON_REAL,
    size: 26,
    level: 40,
  },
  pinGrayscale: true,
  pinTextureEidetic: PIN_ICON_REAL,
  pinGrayscaleEidetic: true,
  filters: {
    [PINS_COMPASS_EIDETIC]: false,
    [PINS_COMPASS]: true,
    [PINS_UNKNOWN]: true,
    [PINS_COLLECTED]: false,
    [PINS_EIDETIC]: false,
    [PINS_EIDETIC_COLLECTED]: false,
    [PINS_BOOKSHELF]: true,
    [PINS_COMPASS_BOOKSHELF]: false,
  },
  unlockEidetic: false,
  immersiveMode: 1,
  showClickMenu: true,
  showDungeonTag: true,
  showQuestName: true,
} satisfies LoreBooksSavedVars

let dbInstance: LoreBooksSavedVars | undefined

export function initializeSavedVariables(): LoreBooksSavedVars {
  dbInstance = ZO_SavedVars.NewAccountWide(
    SAVED_VARIABLES_NAME,
    SAVEDVARIABLES_VERSION,
    undefined,
    DEFAULTS
  )
  return dbInstance
}

export function getSavedVariables(): LoreBooksSavedVars {
  if (dbInstance === undefined) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return dbInstance
}
