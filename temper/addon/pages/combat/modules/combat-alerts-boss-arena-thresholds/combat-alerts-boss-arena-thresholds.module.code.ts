import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-utils/combat-alerts-utils.module.code.ts"
import type { BossThresholds } from "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"
import type { CrutchStringId } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-ids/combat-alerts-lang-ids.module.code.ts"

const BHB = CRUTCH.BossHealthBar

BHB.thresholds = BHB.thresholds ?? {}

function getBossName(this: void, id: CrutchStringId): string {
  return CRUTCH.GetCapitalizedString(crutchString(id))
}

const ARENA_THRESHOLDS: Record<string, BossThresholds> = {
  [getBossName("CRUTCH_BHB_TAMESTHEBEAST")]: {
    60: "Mini",
    40: "Mini",
  },
  [getBossName("CRUTCH_BHB_LADY_MINARA")]: {
    80: "Infuser",
    60: "Colossus",
    40: "Colossus + Infuser",
    20: "Colossus + Infusers",
  },
  [getBossName("CRUTCH_BHB_CHAMPION_MARCAULD")]: {
    75: "Adds",
    40: "Adds",
  },
  [getBossName("CRUTCH_BHB_EARTHEN_HEART_KNIGHT")]: {
    70: "Adds",
    30: "Adds",
  },
  [getBossName("CRUTCH_BHB_ANALA_TUWHA")]: {
    80: "Adds",
    40: "Adds",
  },
  [getBossName("CRUTCH_BHB_PISHNA_LONGSHOT")]: {
    70: "Adds",
    40: "Adds",
  },
  [getBossName("CRUTCH_BHB_MAVUS_TALNARITH")]: {
    80: "Adds",
    40: "Adds",
  },
  [getBossName("CRUTCH_BHB_VAMPIRE_LORD_THISA")]: {
    80: "Portal",
    40: "Adds",
  },
  [getBossName("CRUTCH_BHB_HIATH_THE_BATTLEMASTER")]: {
    75: "Adds",
    50: "Pull + Adds",
    25: "Pull",
  },
  [getBossName("CRUTCH_BHB_THE_PYRELORD")]: {
    70: "Colossus",
    30: "Colossus",
  },
}

for (const [k, v] of pairs(ARENA_THRESHOLDS)) {
  BHB.thresholds[k] = v
}
