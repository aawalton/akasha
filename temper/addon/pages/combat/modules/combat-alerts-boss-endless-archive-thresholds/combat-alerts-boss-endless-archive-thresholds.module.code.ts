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

const ENDLESS_ARCHIVE_THRESHOLDS: Record<string, BossThresholds> = {
  [getBossName("CRUTCH_BHB_COUNCILOR_VANDACIA")]: {
    50: "Desperation",
  },
  [getBossName("CRUTCH_BHB_DEATHS_LEVIATHAN")]: {
    50: "Immolate",
  },
  [getBossName("CRUTCH_BHB_DOYLEMISH_IRONHEART")]: {
    50: "Stone Orb",
  },
  [getBossName("CRUTCH_BHB_DRANOS_VELADOR")]: {
    50: "Duplicity",
  },
  [getBossName("CRUTCH_BHB_GHEMVAS_THE_HARBINGER")]: {
    50: "Unstable Energy",
  },
  [getBossName("CRUTCH_BHB_KRAGH_THE_DREUGH_KING")]: {
    50: "Mudcrabs",
  },
  [getBossName("CRUTCH_BHB_LAATVULON")]: {
    50: "Blizzard",
  },
  [getBossName("CRUTCH_BHB_LADY_BELAIN")]: {
    50: "Awakening",
  },
  [getBossName("CRUTCH_BHB_LADY_THORN")]: {
    50: "Batdance",
  },
  [getBossName("CRUTCH_BHB_MULAAMNIR")]: {
    50: "Storm",
  },
  [getBossName("CRUTCH_BHB_NERIENETH")]: {
    50: "Ebony Blade",
  },
  [getBossName("CRUTCH_BHB_SENTINEL_AKSALAZ")]: {
    75: "Add",
    50: "Add",
    25: "Add",
  },
  [getBossName("CRUTCH_BHB_THE_MAGE")]: {
    50: "Arcane Vortex",
  },
  [getBossName("CRUTCH_BHB_THE_WARRIOR")]: {
    50: "Shehai",
  },
  [getBossName("CRUTCH_BHB_THOAT_REPLICANUM")]: {
    70: "Shard",
  },
  [getBossName("CRUTCH_BHB_THOAT_SHARD")]: {
    70: "Shard",
  },
  [getBossName("CRUTCH_BHB_VORENOR_WINTERBOURNE")]: {
    50: "Blood Mist",
  },
  [getBossName("CRUTCH_BHB_XEEMHOK_THE_TROPHYTAKER")]: {
    50: "Fury",
  },
  [getBossName("CRUTCH_BHB_YOLNAHKRIIN")]: {
    50: "Cataclysm",
  },
}

BHB.eaThresholds = ENDLESS_ARCHIVE_THRESHOLDS
