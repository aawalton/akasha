import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchConstants {
    WHITE: number[]
    RED: number[]
    REDORANGE: number[]
    ORANGE: number[]
    YELLOW: number[]
    BLUE: number[]
    PURPLE: number[]
    BLACK: number[]
    POISONGREEN: number[]
    PHYSICALTAN: number[]
    ICEBLUE: number[]
    CURSEPURPLE: number[]
    LLOTHIS_FG: number[]
    LLOTHIS_BG: number[]
    FELMS_FG: number[]
    FELMS_BG: number[]
    DORMANT_FG: number[]
    DORMANT_BG: number[]
    RED_2: number[]
    ZERO_ORIENTATION: number[]
    FLAT_ORIENTATION: number[]
    ICON_NONE: string
    CIRCLE: string
    DIAMOND: string
    CHEVRON: string
    CHEVRON_THIN: string
    LCI: string
    CUSTOM: string
    PRIORITY: {
      SUPPRESS: number
      MECHANIC_2_PRIORITY: number
      MECHANIC_1_PRIORITY: number
      GROUP_DEAD: number
      ASPECT: number
      INDIVIDUAL_ICONS: number
      GROUP_CROWN: number
      GROUP_ROLE: number
    }
    ID: {
      DAMAGE_TAKEN: number
      COLOR_SWAP: number
      STATIC: number
      POISON: number
      DROP_FROST: number
      SEEKING_SURGE_DROPPED: number
    }
    ACTION_RESULTS: Record<number, string>
    UNIT_TYPES: Record<number, string>
    EFFECT_RESULTS: Record<number, string>
  }
}

const C = CRUTCH.Constants

C.WHITE = [1, 1, 1]
C.RED = [1, 0, 0]
C.REDORANGE = [1, 0.35, 0]
C.ORANGE = [1, 0.5, 0]
C.YELLOW = [1, 1, 0]
C.BLUE = [0, 0, 1]
C.PURPLE = [0.8, 0.2, 1]
C.BLACK = [0, 0, 0]
C.POISONGREEN = [0.4, 0.9, 0]
C.PHYSICALTAN = [1, 0.95, 0.67]
C.ICEBLUE = [0.56, 0.96, 0.96]
C.CURSEPURPLE = [183 / 255, 38 / 255, 1]

C.LLOTHIS_FG = [15 / 255, 113 / 255, 0]
C.LLOTHIS_BG = [5 / 255, 20 / 255, 0]
C.FELMS_FG = [120 / 255, 15 / 255, 0]
C.FELMS_BG = [30 / 255, 5 / 255, 0]
C.DORMANT_FG = [92 / 255, 92 / 255, 92 / 255]
C.DORMANT_BG = [28 / 255, 28 / 255, 28 / 255]

C.RED_2 = [1, 0, 0, 0.2]

C.ZERO_ORIENTATION = C.BLACK
C.FLAT_ORIENTATION = [-math.pi / 2, 0, 0]

C.ICON_NONE = "None"
C.CIRCLE = "Circle"
C.DIAMOND = "Diamond"
C.CHEVRON = "Chevron"
C.CHEVRON_THIN = "Thin chevron"
C.LCI = "LibCustomIcons (Hodor)"
C.CUSTOM = "Custom texture"

C.PRIORITY = {
  SUPPRESS: 10001,
  MECHANIC_2_PRIORITY: 510,
  MECHANIC_1_PRIORITY: 500,
  GROUP_DEAD: 110,
  ASPECT: 108,
  INDIVIDUAL_ICONS: 107,
  GROUP_CROWN: 105,
  GROUP_ROLE: 100,
}

C.ID = {
  DAMAGE_TAKEN: 888002,
  COLOR_SWAP: 888003,
  STATIC: 888004,
  POISON: 888006,
  DROP_FROST: 888007,
  SEEKING_SURGE_DROPPED: 888008,
}

C.ACTION_RESULTS = {
  [ACTION_RESULT_BEGIN]: "BEGIN",
  [ACTION_RESULT_EFFECT_GAINED]: "GAIN",
  [ACTION_RESULT_EFFECT_GAINED_DURATION]: "DUR",
  [ACTION_RESULT_EFFECT_FADED]: "FADED",
  [ACTION_RESULT_DAMAGE]: "DAMAGE",
}

C.UNIT_TYPES = {
  [COMBAT_UNIT_TYPE_GROUP]: "G",
  [COMBAT_UNIT_TYPE_NONE]: "N",
  [COMBAT_UNIT_TYPE_OTHER]: "O",
  [COMBAT_UNIT_TYPE_PLAYER]: "P",
  [COMBAT_UNIT_TYPE_PLAYER_COMPANION]: "C",
  [COMBAT_UNIT_TYPE_PLAYER_PET]: "PET",
  [COMBAT_UNIT_TYPE_TARGET_DUMMY]: "D",
}

C.EFFECT_RESULTS = {
  [EFFECT_RESULT_FADED]: "FADED",
  [EFFECT_RESULT_FULL_REFRESH]: "FULL_REFRESH",
  [EFFECT_RESULT_GAINED]: "GAINED",
  [EFFECT_RESULT_TRANSFER]: "TRANSFER",
  [EFFECT_RESULT_UPDATED]: "UPDATED",
}
