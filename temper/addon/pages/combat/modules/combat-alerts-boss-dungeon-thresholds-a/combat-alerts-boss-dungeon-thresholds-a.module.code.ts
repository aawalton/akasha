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

const DUNGEON_THRESHOLDS: Record<string, BossThresholds> = {
  [getBossName("CRUTCH_BHB_QUINTUS_VERRES")]: {
    60: "Fires start",
    20: "Gargoyle",
  },
  [getBossName("CRUTCH_BHB_ATARUS")]: {
    30: "Monstrous Growth",
  },
  [getBossName("CRUTCH_BHB_OVERFIEND")]: {
    50: "Harvester",
  },
  [getBossName("CRUTCH_BHB_IBOMEZ_THE_FLESH_SCULPTOR")]: {
    75: "Prisoners",
    50: "Prisoners",
    25: "Prisoners",
  },
  [getBossName("CRUTCH_BHB_LORD_WARDEN_DUSK")]: {
    65: "Shades",
    35: "Shades",
  },
  [getBossName("CRUTCH_BHB_MOLAG_KENA")]: {
    60: "Shield",
    30: "Shield",
  },
  [getBossName("CRUTCH_BHB_TREEMINDER_NAKESH")]: {
    70: "Chudan",
    50: "Xal Nur",
    30: "Execute",
  },
  [getBossName("CRUTCH_BHB_SITHERA")]: {
    50: "Brazier",
    30: "Brazier",
  },
  [getBossName("CRUTCH_BHB_VELIDRETH")]: {
    66: "Banish",
    33: "Banish",
  },
  [getBossName("CRUTCH_BHB_CAILLAOIFE")]: {
    75: "Grove",
    50: "Grove",
    30: "Grove",
  },
  [getBossName("CRUTCH_BHB_STONEHEART")]: {
    20: "Execute!",
  },
  [getBossName("CRUTCH_BHB_EARTHGORE_AMALGAM")]: {
    80: "Split",
  },
  [getBossName("CRUTCH_BHB_DOMIHAUS_THE_BLOODYHORNED")]: {
    80: "Adds",
    70: "Grovel",
    60: "Adds",
    50: "Grovel",
    40: "Adds",
    30: "Grovel",
    20: "Adds",
    10: "Grovel",
    5: "Grovel",
  },
  [getBossName("CRUTCH_BHB_THURVOKUN")]: {
    normHealth: 1683986,
    vetHealth: 3594564,
    hmHealth: 5427792,
    Normal: {
      85: "Crystal",
      75: "Crystal",
      65: "Crystal",
      55: "Crystal",
    },
    Veteran: {
      85: "Crystal",
      75: "Crystal",
      65: "Crystal",
      55: "Crystal",
    },
    Hardmode: {
      85: "Crystal",
      75: "Crystal",
      65: "Crystal",
      55: "Crystal",
      40: "Colossus",
      30: "Colossus",
      20: "Colossus",
      10: "Colossus",
    },
  },
  [getBossName("CRUTCH_BHB_DOYLEMISH_IRONHEART")]: {
    80: "Stone Orb",
    60: "Stone Orb",
    40: "Stone Orb",
    20: "Stone Orb",
  },
  [getBossName("CRUTCH_BHB_MATRIARCH_ALDIS")]: {
    90: "Leiminid",
    80: "Leiminid",
    70: "Leiminid",
    60: "Leiminid",
    50: "Leiminid",
    40: "Leiminid",
    30: "Leiminid",
    20: "Leiminid",
    10: "Leiminid",
  },
  [getBossName("CRUTCH_BHB_ZAAN_THE_SCALECALLER")]: {
    80: "Winter's Purge",
    60: "Winter's Purge",
    40: "Winter's Purge",
    20: "Winter's Purge",
  },
  [getBossName("CRUTCH_BHB_JAILER_MELITUS")]: {
    80: "Werewolves",
    50: "Werewolves",
    30: "Werewolves",
  },
  [getBossName("CRUTCH_BHB_HEDGE_MAZE_GUARDIAN")]: {
    80: "Spriggans",
    60: "Spriggans",
    40: "Spriggans",
  },
  [getBossName("CRUTCH_BHB_MYLENNE_MOONCALLER")]: {
    normHealth: 2210231,
    Normal: {
      75: "",
      50: "",
      25: "",
    },
    Veteran: {
      80: "Warden",
      60: "Warden",
      40: "Warden",
      20: "Warden",
    },
  },
  [getBossName("CRUTCH_BHB_ARCHIVIST_ERNARDE")]: {
    normHealth: 1683986,
    Normal: {
      60: "Adds",
      40: "Adds",
      20: "Adds",
    },
    Veteran: {
      80: "Adds",
      60: "Adds",
      40: "Adds",
      20: "Adds",
    },
  },
  [getBossName("CRUTCH_BHB_VYKOSA_THE_ASCENDANT")]: {
    normHealth: 1515587,
    vetHealth: 4233356,
    hmHealth: 5503363,
    Normal: {
      90: "Werewolves",
      80: "Wolves",
      70: "Werewolves",
      60: "Wolves",
      50: "Werewolves",
      40: "Wolves",
      30: "Werewolves",
      20: "Wolves",
    },
    Veteran: {
      90: "Werewolves",
      80: "Wolves",
      70: "Werewolves",
      60: "Wolves",
      50: "Werewolves",
      40: "Wolves",
      30: "Werewolves",
      20: "Wolves",
    },
    Hardmode: {
      90: "Werewolves",
      85: "Werewolves",
      80: "Wolves",
      70: "Werewolves",
      65: "Werewolves",
      60: "Wolves",
      50: "Werewolves + Warden",
      45: "Werewolves",
      40: "Wolves",
      30: "Werewolves + Rune",
      25: "Werewolves",
      20: "Wolves",
    },
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
  [getBossName("CRUTCH_BHB_ICESTALKER")]: {
    90: "Scuttlers",
    80: "Wraiths",
    70: "Scuttlers",
    60: "Wraiths",
    50: "Scuttlers",
    40: "Wraiths",
    30: "Wraiths",
  },
  [getBossName("CRUTCH_BHB_WARLORD_TZOGVIN")]: {
    70: "Heat Field",
    35: "Whirlwinds",
  },
  [getBossName("CRUTCH_BHB_VAULT_PROTECTOR")]: {
    80: "2 Lasers",
    60: "3 Lasers",
    40: "4 Lasers",
    20: "4 Lasers",
  },
  [getBossName("CRUTCH_BHB_THE_STONEKEEPER")]: {
    55: "Skeevatons",
  },
  [getBossName("CRUTCH_BHB_THE_SCAVENGING_MAW")]: {
    normHealth: 2189182,
    Normal: {
      65: "Hide",
      30: "Hide",
    },
    Veteran: {
      80: "Hide",
      50: "Hide",
      25: "Hide",
    },
  },
  [getBossName("CRUTCH_BHB_THE_WEEPING_WOMAN")]: {
    normHealth: 1683986,
    Normal: {
      75: "",
      50: "",
      25: "",
    },
    Veteran: {
      75: "Watcher",
      55: "Watcher",
      35: "Watcher",
    },
  },
  [getBossName("CRUTCH_BHB_DARK_ORB")]: {
    80: "Off",
    60: "Off",
    40: "Off",
  },
  [getBossName("CRUTCH_BHB_SYMPHONY_OF_BLADES")]: {
    60: "Phalanx",
    30: "Phalanx",
    10: "Teleport",
  },
  [getBossName("CRUTCH_BHB_RISEN_RUINS")]: {
    90: "Boulder Storm",
    70: "Boulder Storm",
    50: "Boulder Storm",
    30: "Boulder Storm",
  },
  [getBossName("CRUTCH_BHB_DROZAKAR")]: {
    90: "Shield",
    60: "Shield",
    30: "Shield",
  },
  [getBossName("CRUTCH_BHB_KUJO_KETHBA")]: {
    90: "Geysers",
    70: "Geysers",
    50: "Geysers",
    30: "Geysers",
  },
  [getBossName("CRUTCH_BHB_GRUNDWULF")]: {
    70: "Dire-Maw",
    50: "Dire-Maw",
    30: "Dire-Maw",
    20: "Dire-Maw",
    10: "Dire-Maw",
  },
  [getBossName("CRUTCH_BHB_MAARSELOK")]: {
    60: "Perch",
    55: "Perch",
    50: "Flee",
  },
  [getBossName("CRUTCH_BHB_STORMBORN_REVENANT")]: {
    55: "Atronachs",
    40: "Atronachs",
  },
  [getBossName("CRUTCH_BHB_HAKGRYM_THE_HOWLER")]: {
    70: "Abomination",
    30: "Abomination",
    5: "Werewolf Form",
  },
  [getBossName("CRUTCH_BHB_KEEPER_OF_THE_KILN")]: {
    90: "Runes",
    60: "Runes",
    30: "Runes",
  },
  [getBossName("CRUTCH_BHB_ETERNAL_AEGIS")]: {
    90: "Adds",
    70: "Adds",
    50: "Adds",
    30: "Adds",
  },
  [getBossName("CRUTCH_BHB_ONDAGORE_THE_MAD")]: {
    80: "Poison",
    60: "Pillars",
    40: "Poison",
    20: "Pillars",
  },
  [getBossName("CRUTCH_BHB_KJALNAR_TOMBSKALD")]: {
    50: "Summon",
  },
  [getBossName("CRUTCH_BHB_VORIA_THE_HEARTTHIEF")]: {
    75: "Teleport",
    40: "Teleport",
  },
  [getBossName("CRUTCH_BHB_ARKASIS_THE_MAD_ALCHEMIST")]: {
    90: "Add",
    80: "Add",
    70: "Add",
    60: "Behemoth Phase",
    50: "Add",
    40: "Add",
    30: "Add",
    20: "Behemoth Phase",
    10: "Add",
  },
  [getBossName("CRUTCH_BHB_LADY_THORN")]: {
    60: "Batdance",
    20: "Batdance",
  },
  [getBossName("CRUTCH_BHB_CAPTAIN_GEMINUS")]: {
    70: "Invulnerable",
    30: "Invulnerable",
  },
  [getBossName("CRUTCH_BHB_PYROTURGE_ENCRATIS")]: {
    65: "Run",
  },
  [getBossName("CRUTCH_BHB_SENTINEL_AKSALAZ")]: {
    85: "Indrik",
    60: "Nereid",
    35: "Atronach",
    25: "Execute",
  },
  [getBossName("CRUTCH_BHB_TASKMASTER_VICCIA")]: {
    75: "Adds",
    50: "Adds",
    25: "Adds",
  },
  [getBossName("CRUTCH_BHB_ELIAM_MERICK")]: {
    85: "Liramindrel",
    60: "Ihudir",
    30: "Both",
  },
  [getBossName("CRUTCH_BHB_SCORION_BROODLORD")]: {
    80: "Adds",
    60: "Adds",
    40: "Adds",
    20: "Adds",
  },
  [getBossName("CRUTCH_BHB_MAGMA_INCARNATE")]: {
    65: "Portal",
    35: "Portal",
  },
}

for (const [k, v] of pairs(DUNGEON_THRESHOLDS)) {
  BHB.thresholds[k] = v
}
