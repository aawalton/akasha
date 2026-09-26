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

const TRIAL_THRESHOLDS: Record<string, BossThresholds> = {
  "Example Boss 1": {
    85: "Some mechanic",
    70: "Another mechanic",
    35: "A mechanic",
  },
  [getBossName("CRUTCH_BHB_RA_KOTU")]: {
    35: "Beyblade",
  },
  [getBossName("CRUTCH_BHB_THE_WARRIOR")]: {
    85: "Statue Smash",
    70: "Statue Smash",
    35: "Shockwave",
  },
  [getBossName("CRUTCH_BHB_THE_MAGE")]: {
    16: "Knockdown",
  },
  [getBossName("CRUTCH_BHB_ZHAJHASSA_THE_FORGOTTEN")]: {
    70: "Shield",
    30: "Shield",
  },
  [getBossName("CRUTCH_BHB_RAKKHAT")]: {
    11: "Execute",
  },
  [getBossName("CRUTCH_BHB_HUNTERKILLER_NEGATRIX")]: {
    15: "",
  },
  [getBossName("CRUTCH_BHB_PINNACLE_FACTOTUM")]: {
    80: "Simulacra",
    60: "Conduits",
    40: "Spinner",
  },
  [getBossName("CRUTCH_BHB_REACTOR")]: {
    70: "Reset",
    40: "Reset",
    20: "Reset",
  },
  [getBossName("CRUTCH_BHB_ASSEMBLY_GENERAL")]: {
    85: "Terminals",
    65: "Terminals",
    45: "Terminals",
    25: "Execute",
  },
  [getBossName("CRUTCH_BHB_SAINT_OLMS_THE_JUST")]: {
    90: "Big Jump",
    75: "Big Jump",
    50: "Big Jump",
    25: "Big Jump",
  },
  [getBossName("CRUTCH_BHB_SHADE_OF_SIRORIA")]: {
    60: "Siroria starts jumping",
  },
  [getBossName("CRUTCH_BHB_LOKKESTIIZ")]: {
    80: "Atros + Beam",
    50: "Beam + Atros",
    20: "Atros + Beam",
  },
  [getBossName("CRUTCH_BHB_YOLNAHKRIIN")]: {
    75: "Cataclysm",
    50: "Cataclysm",
    25: "Cataclysm",
  },
  [getBossName("CRUTCH_BHB_NAHVIINTAAS")]: {
    90: "Time Shift",
    80: "Takeoff",
    70: "Time Shift",
    60: "Takeoff",
    50: "Time Shift",
    40: "Takeoff",
  },
  [getBossName("CRUTCH_BHB_YANDIR_THE_BUTCHER")]: {
    50: "Enrage",
  },
  [getBossName("CRUTCH_BHB_CAPTAIN_VROL")]: {
    50: "Shamans",
  },
  [getBossName("CRUTCH_BHB_LORD_FALGRAVN")]: {
    90: "Conga Line",
    80: "Conga Line",
    70: "Floor Shatter",
    35: "Floor Shatter",
  },
  [getBossName("CRUTCH_BHB_OAXILTSO")]: {
    95: "Mini",
    75: "Mini",
    50: "Mini",
    20: "Mini",
  },
  [getBossName("CRUTCH_BHB_FLAMEHERALD_BAHSEI")]: {
    90: "Abomination",
    85: "Abomination",
    80: "Abomination",
    75: "Abomination",
    70: "Abomination",
    65: "Abomination",
    60: "Abomination",
    50: "Behemoth",
    40: "Behemoth",
    30: "Meteor",
    25: "Behemoth",
    20: "Behemoth",
    10: "Behemoth",
  },
  [getBossName("CRUTCH_BHB_XALVAKKA")]: {
    70: "Run!",
    40: "Run!",
  },
  [getBossName("CRUTCH_BHB_LYLANAR")]: {
    normHealth: 10906420,
    vetHealth: 27943440,
    hmHealth: 55886880,
    Normal: {
      90: "Atronach",
      80: "Atronach",
      70: "2nd Teleports",
      65: "1st Teleports",
    },
    Veteran: {
      90: "Atronach",
      80: "Atronach",
      70: "2nd Teleports",
      65: "1st Teleports",
    },
    Hardmode: {
      90: "Same-color Atro",
      85: "Off-color Atro",
      80: "Same-color Atro",
      75: "Off-color Atro",
      70: "2nd Teleports",
      65: "1st Teleports",
    },
  },
  [getBossName("CRUTCH_BHB_REEF_GUARDIAN")]: {
    vetHealth: 27943440,
    hmHealth: 41915160,
    Veteran: {
      80: "Big Split",
      50: "Split",
    },
    Hardmode: {
      100: "Big Split",
      80: "Split",
    },
  },
  [getBossName("CRUTCH_BHB_TIDEBORN_TALERIA")]: {
    85: "Winter Storm",
    75: "Sirens",
    50: "Bridge",
    35: "Bridge",
    20: "Bridge",
  },
  [getBossName("CRUTCH_BHB_EXARCHANIC_YASEYLA")]: {
    vetHealth: 65201356,
    hmHealth: 97802032,
    Veteran: {
      90: "Wamasu",
      70: "Wamasu",
      60: "Portals",
      50: "Wamasu",
      35: "Portals",
      30: "Wamasu",
      20: "Wamasu",
      10: "Wamasu",
    },
    Hardmode: {
      90: "Wamasu",
      80: "Shrapnel",
      70: "Wamasu",
      60: "Portals",
      55: "Shrapnel",
      50: "Wamasu",
      35: "Portals",
      30: "Wamasu",
      25: "Shrapnel + on timer",
      20: "Wamasu",
      10: "Wamasu",
    },
  },
  [getBossName("CRUTCH_BHB_ANSUUL_THE_TORMENTOR")]: {
    90: "Manic Phobia",
    80: "Maze",
    70: "Manic Phobia",
    60: "Maze",
    50: "Manic Phobia",
    40: "Maze",
    30: "Manic Phobia",
    20: "Split / Phobia on timer",
  },
  [getBossName("CRUTCH_BHB_ORPHIC_SHATTERED_SHARD")]: {
    90: "Color Change",
    60: "Color Change",
    40: "Color Change",
    25: "Adds",
    15: "Color Change",
  },
  [getBossName("CRUTCH_BHB_DEFENSE_PRISM")]: {
    30: "",
  },
  [getBossName("CRUTCH_BHB_JYNORAH")]: {
    75: "",
    35: "",
  },
  [getBossName("CRUTCH_BHB_OVERFIEND_KAZPIAN")]: {
    85: "Portal",
    55: "Portal",
    35: "Portal",
  },
}

for (const [k, v] of pairs(TRIAL_THRESHOLDS)) {
  BHB.thresholds[k] = v
}
