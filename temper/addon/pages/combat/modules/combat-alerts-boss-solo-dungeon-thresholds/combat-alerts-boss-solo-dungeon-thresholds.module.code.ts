import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-utils/combat-alerts-utils.module.code.ts"
import type { BossThresholds } from "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"
import type { CrutchStringId } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-ids/combat-alerts-lang-ids.module.code.ts"

const BHB = CRUTCH.BossHealthBar

function getBossName(this: void, id: CrutchStringId): string {
  return CRUTCH.GetCapitalizedString(crutchString(id))
}

const SOLO_DUNGEON_THRESHOLDS: Record<string, BossThresholds> = {
  [getBossName("CRUTCH_BHB_JAILER_MELITUS")]: {
    80: "Werewolves",
    50: "Werewolves",
    30: "Werewolves",
  },
  [getBossName("CRUTCH_BHB_HEDGE_MAZE_GUARDIAN")]: {
    80: "2 Spriggans",
    70: "Adds",
    45: "3-5 Spriggans",
    35: "Adds",
    15: "Adds + 5 Spriggans",
  },
  [getBossName("CRUTCH_BHB_MYLENNE_MOONCALLER")]: {
    80: "Wardens",
    65: "Wolves",
    50: "Wardens",
    27: "Wolves",
    20: "Wardens",
  },
  [getBossName("CRUTCH_BHB_ARCHIVIST_ERNARDE")]: {
    80: "Symbols",
    62: "Adds",
    50: "Symbols",
    40: "Adds",
    30: "Symbols",
  },
  [getBossName("CRUTCH_BHB_VYKOSA_THE_ASCENDANT")]: {
    80: "Melee + Werewolf",
    60: "Ranged",
    40: "Melee + Werewolf",
    20: "Ranged",
  },
  [getBossName("CRUTCH_BHB_TARCYR")]: {
    80: "Hunt",
    55: "Hunt",
    20: "Hunt",
  },
  [getBossName("CRUTCH_BHB_BALORGH")]: {
    80: "Hunt",
    60: "Hunt",
    40: "Hunt",
    20: "Hunt",
  },
}

BHB.soloDungeonThresholds = SOLO_DUNGEON_THRESHOLDS
