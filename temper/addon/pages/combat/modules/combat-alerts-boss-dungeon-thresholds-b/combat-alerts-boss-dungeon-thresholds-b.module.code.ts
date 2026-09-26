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
  [getBossName("CRUTCH_BHB_MALIGALIG")]: {
    70: "Whirlpool",
    40: "Whirlpool",
  },
  [getBossName("CRUTCH_BHB_SARYDIL")]: {
    75: "Trash",
    35: "Trash",
  },
  [getBossName("CRUTCH_BHB_VARALLION")]: {
    normHealth: 4209965,
    vetHealth: 6766879,
    hmHealth: 13195414,
    Normal: {
      95: "Gryphon",
      55: "Gryphon",
    },
    Veteran: {
      95: "Gryphon",
      80: "Gryphon",
      55: "Gryphon",
    },
    Hardmode: {
      95: "Gryphon",
      80: "Gryphon",
      55: "Gryphon",
      30: "Kargaeda",
    },
  },
  [getBossName("CRUTCH_BHB_ZBAZA")]: {
    60: "Conduit Tendril",
    30: "Conduit Tendril",
  },
  [getBossName("CRUTCH_BHB_FOREMAN_BRADIGGAN")]: {
    60: "Abomination",
    30: "Abomination",
  },
  [getBossName("CRUTCH_BHB_CAPTAIN_NUMIRRIL")]: {
    85: "Abomination",
    40: "Abomination",
  },
  [getBossName("CRUTCH_BHB_CORRUPTION_OF_STONE")]: {
    normHealth: 3367972,
    vetHealth: 5413503,
    hmHealth: 8120255,
    80: "Rock Shower",
    60: "Rock Shower",
    30: "Rock Shower",
  },
  [getBossName("CRUTCH_BHB_CORRUPTION_OF_ROOT")]: {
    75: "Clones",
    40: "Clones",
  },
  [getBossName("CRUTCH_BHB_ARCHDRUID_DEVYRIC")]: {
    65: "Bear Form",
    45: "Human Form",
    20: "Bear Form",
  },
  [getBossName("CRUTCH_BHB_ZELVRAAK_THE_UNBREATHING")]: {
    75: "Clones",
    50: "Afterlife",
    25: "Clones",
  },
  [getBossName("CRUTCH_BHB_KOVAN_GIRYON")]: {
    70: "Nix-Ox",
    45: "Iron Atronach",
    20: "Execute",
  },
  [getBossName("CRUTCH_BHB_ROKSA_THE_WARPED")]: {
    70: "Devour Light",
    40: "Devour Light",
  },
  [getBossName("CRUTCH_BHB_MATRIARCH_LLADI_TELVANNI")]: {
    75: "Poison Storm",
    45: "Poison Storm",
  },
  [getBossName("CRUTCH_BHB_RIFTMASTER_NAQRI")]: {
    85: "Book",
    55: "Book",
    35: "Book",
  },
  [getBossName("CRUTCH_BHB_OZEZAN_THE_INFERNO")]: {
    normHealth: 4546762,
    vetHealth: 7308229,
    hmHealth: 13154812,
    Normal: {
      75: "",
      50: "",
      25: "",
    },
    Veteran: {
      75: "",
      50: "",
      25: "",
    },
    Hardmode: {
      40: "Atronachs start",
    },
  },
  [getBossName("CRUTCH_BHB_VALINNA")]: {
    50: "Lamikhai leaves",
    55: "Valinna leaves",
    boss1: {
      55: "Valinna leaves",
    },
    boss2: {
      50: "Lamikhai leaves",
    },
  },
  [getBossName("CRUTCH_BHB_ANTHELMIRS_CONSTRUCT")]: {
    70: "b o n k",
  },
  [getBossName("CRUTCH_BHB_ARADROS_THE_AWAKENED")]: {
    50: "Furnace",
  },
  [getBossName("CRUTCH_BHB_SHATTERED_CHAMPION")]: {
    70: "Shard Bash",
    50: "Shard Bash",
  },
  [getBossName("CRUTCH_BHB_DARKSHARD")]: {
    80: "Maxus",
    60: "Atrocity",
    40: "Argonian",
  },
  [getBossName("CRUTCH_BHB_THE_BLIND")]: {
    80: "Blind Shards",
    60: "Glass Remnants",
    40: "Glass Remnants",
    20: "Gleaming Deluge",
  },
  [getBossName("CRUTCH_BHB_JERENSI")]: {
    80: "Condemn + Adds",
    50: "Condemn + Adds",
    30: "Condemn + Execute on timer",
  },
  [getBossName("CRUTCH_BHB_VANDORALLEN")]: {
    normHealth: 3169856,
    vetHealth: 7200895,
    hmHealth: 12601566,
    Normal: {
      90: "Spiders",
      70: "Spiders",
      50: "Spiders",
      30: "Spiders",
    },
    Veteran: {
      90: "Spiders",
      70: "Spiders",
      50: "Spiders",
      30: "Spiders",
    },
    Hardmode: {
      90: "Spiders",
      70: "Spiders",
      50: "Spiders + Simulacra on timer",
      30: "Spiders",
    },
  },
  [getBossName("CRUTCH_BHB_SQUALL_OF_RETRIBUTION")]: {
    normHealth: 3367972,
    vetHealth: 10263990,
    hmHealth: 15395986,
    Normal: {
      95: "Fire Atro",
      86: "Fire Atro",
      78: "Fire Atro",
      70: "Fire Atro",
      63: "Ice Atro",
      47: "Ice Atro",
      31: "Storm Atro",
      23: "Storm Atro",
    },
    Veteran: {
      95: "Fire Atro",
      86: "Fire Atro",
      78: "Fire Atro",
      70: "Fire Atro",
      63: "Ice Atro",
      47: "Ice Atro",
      31: "Storm Atro",
      23: "Storm Atro",
    },
    Hardmode: {
      95: "Fire Atro",
      86: "Fire Atro",
      78: "Fire Atro",
      70: "Fire Atro",
      63: "Ice Atro",
      53: "Ice Atro",
      47: "Ice Atro x2",
      31: "Storm Atro",
      23: "Storm Atro",
      15: "Storm Atro",
      7: "Storm Atro",
    },
  },
  [getBossName("CRUTCH_BHB_GARVIN_THE_TRACKER")]: {
    normHealth: 3367972,
    vetHealth: 5954854,
    hmHealth: 8932282,
    Hardmode: {
      80: "Hunt Duneripper",
      50: "Hunt Duneripper",
      40: "Hunt Duneripper",
      95: "Storm Mage",
      85: "Flame Archer",
      75: "Infuser",
      65: "Storm Mage",
      55: "Flame Archer",
      45: "Infuser",
      35: "Storm Mage",
      30: "Flame Archer",
      25: "Infuser",
    },
    Normal: {
      75: "Storm Mage",
      50: "Duneripper + Archer",
      25: "Infuser",
    },
    Veteran: {
      95: "Storm Mage",
      80: "Flame Archer",
      70: "Hunt Duneripper",
      60: "Infuser",
      50: "Storm Mage",
      40: "Hunt Duneripper",
      35: "Flame Archer",
      20: "Infuser",
    },
  },
  [getBossName("CRUTCH_BHB_SIEGE_MASTER_MALTHORAS")]: {
    50: "Adds",
  },
  [getBossName("CRUTCH_BHB_NORIWEN")]: {
    70: "Middle",
    50: "Gryphons",
    40: "Gryphons",
    20: "Middle",
  },
  [getBossName("CRUTCH_BHB_ORPHEON_THE_TACTICIAN")]: {
    85: "Alcunar",
    60: "Alcunar",
    40: "Alcunar",
    20: "Alcunar",
  },
  [getBossName("CRUTCH_BHB_PROSPECTOR_LYRAKTA")]: {
    75: "Adds",
    50: "Adds",
    25: "Adds",
  },
  [getBossName("CRUTCH_BHB_QUARRYMASTER_SALDEZAAR")]: {
    normHealth: 4209965,
    hmHealth: 13533758,
    Normal: {
      60: "Rupture",
      20: "Rupture",
    },
    Hardmode: {
      65: "Rupture",
      30: "Rupture",
    },
  },
  [getBossName("CRUTCH_BHB_GEMCARVER_HYNAX")]: {
    75: "Teleport",
    50: "Teleport",
    25: "Teleport",
  },
  [getBossName("CRUTCH_BHB_MISURA_ASSISTANT_TO_THE_HIGH_SOULBINDER")]: {
    75: "Adds",
    50: "Adds",
    25: "Adds",
  },
  [getBossName("CRUTCH_BHB_HIGH_SOULBINDER_VYKAND")]: {
    normHealth: 6314947,
    vetHealth: 12829988,
    hmHealth: 25659976,
    Normal: {
      75: "",
      50: "",
      25: "",
    },
    Veteran: {
      75: "",
      50: "",
      25: "",
    },
    Hardmode: {
      60: "Annihilation",
    },
  },
  [getBossName("CRUTCH_BHB_VOSKRONA_STONEHULK_POXITO")]: {
    90: "Adds",
    80: "Adds",
    70: "Totem",
    60: "Adds",
    50: "Totem",
    40: "Adds",
    30: "Totem",
  },
  [getBossName("CRUTCH_BHB_TALENLAH")]: {
    70: "Bar-Sakka",
    55: "Talen-Lah",
    30: "Bar-Sakka",
    5: "Together",
    boss1: {
      70: "Bar-Sakka",
      30: "Bar-Sakka",
    },
    boss2: {
      55: "Talen-Lah",
      5: "Talen-Lah",
    },
  },
  [getBossName("CRUTCH_BHB_GILDED_ALZIRIIX")]: {
    75: "Spooder",
    50: "Spooder",
    30: "Spooder",
  },
  [getBossName("CRUTCH_BHB_GILDED_BKYFXI")]: {
    84: "Wyrm",
    69: "Wyrm",
    54: "Wyrm",
    44: "Dark Transformation",
  },
  [getBossName("CRUTCH_BHB_GILDED_FATELINES_KNELL")]: {
    66: "Ritual",
    33: "Ritual",
  },
  [getBossName("CRUTCH_BHB_ARGENT_EXARCH_MOLONACH")]: {
    80: "Hunt",
    60: "Hunt",
    40: "Hunt",
    20: "Hunt",
  },
}

for (const [k, v] of pairs(DUNGEON_THRESHOLDS)) {
  BHB.thresholds[k] = v
}
