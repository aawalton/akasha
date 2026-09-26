import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import type { ProminentZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent-v2/combat-alerts-alerts-prominent-v2.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

export const PROMINENT_DATA_C: Record<number, ProminentZone> = {
  1121: {
    settingsSubcategory: "sunspire",
    117075: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
      },
      text: "SHIELD CHARGE",
      color: [0.5, 1, 1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentShieldCharge",
        title: "Alert Shield Charge",
        description: "Shows a prominent alert when a Ruin of Alkosh targets you with Shield Charge",
        checkOldForDefault: true,
        default: true,
      },
    },
    121422: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
      },
      text: "CONE",
      color: [0.5, 1, 1],
      slot: 1,
      playSound: true,
      preMillis: 700,
      millis: 1000,
      settings: {
        name: "prominentSunderingGale",
        title: "Alert Sundering Gale",
        description:
          "Shows a prominent alert when the Eternal Servant in the portal targets you with the Sundering Gale cone",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  1082: {
    settingsSubcategory: "blackrose",
    111161: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
      },
      text: "LAVA WHIP",
      color: [1, 0.6, 0],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentLavaWhip",
        title: "Alert Lava Whip",
        description:
          "Shows a prominent alert when an Imperial Dread Knight targets you with Lava Whip",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  635: {
    settingsSubcategory: "dragonstar",
    15164: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "HEAT WAVE",
      color: [1, 0.3, 0.1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentHeatWaveDSA",
        title: "Alert Heat Wave",
        description: "Shows a prominent alert when a fire mage casts Heat Wave",
        checkOldForDefault: true,
        default: true,
      },
    },
    12459: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "WINTER'S REACH",
      color: [0.5, 1, 1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentWintersReachDSA",
        title: "Alert Winter's Reach",
        description: "Shows a prominent alert when an ice mage casts Winter's Reach",
        checkOldForDefault: true,
        default: true,
      },
    },
    54608: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
      },
      text: "DODGE",
      color: [0, 0.6, 0],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentDrainingPoison",
        title: "Alert Draining Poison",
        description:
          "Shows a prominent alert when a Pacthunter Ranger targets you with Draining Poison.You should dodge to avoid having your resources drained",
        checkOldForDefault: true,
        default: true,
      },
    },
    52773: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_EFFECT_GAINED_DURATION,
      },
      text: "ICE COMET",
      color: [0.5, 1, 1],
      slot: 2,
      playSound: true,
      millis: 1750,
      settings: {
        name: "prominentIceComet",
        title: "Alert Ice Comet",
        description: "Shows a prominent alert when Mavus Talnarith casts Ice Comet",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  1436: {
    settingsSubcategory: "endlessArchive",
    197434: {
      event: EVENT_EFFECT_CHANGED,
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      text: "CURSE",
      color: [0.5, 0, 1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentGraspOfLorkhaj",
        title: "Alert Grasp of Lorkhaj",
        description: "Shows a prominent alert when you are cursed by Zhaj'hassa",
        checkOldForDefault: true,
        default: true,
      },
    },
    211976: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "METEOR",
      color: C.RED,
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentMeteorCall",
        title: "Alert Meteor Call",
        description: "Shows a prominent alert when a Fabled Mystic summons a Meteor",
        checkOldForDefault: true,
        default: true,
      },
    },
    196689: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        filterFunction: (_hitValue: number, effectUnitId: number) => {
          CRUTCH.dbgSpam(zo_strformat("testing <<1>> unitId", effectUnitId))
          return (
            GetEndlessDungeonCounterValue(ENDLESS_DUNGEON_COUNTER_TYPE_ARC) > 3 &&
            !CRUTCH.majorCowardiceUnitIds[effectUnitId]
          )
        },
      },
      text: "VENOM",
      color: C.POISONGREEN,
      slot: 2,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentVenomousArrow",
        title: "Alert Venomous Arrow(Arc 4+)",
        description:
          "Shows a prominent alert when an Ascendant Archer or Grovebound Blightbow casts Venomous Arrow at you, only in Arc 4 and above and if there is no Major Cowardice on it.The DoT snapshots the current strength, so even if you debuff the archer afterwards, the DoT ticks will remain high.Therefore, it's better to dodge the shot when possible",
        checkOldForDefault: true,
        default: true,
      },
    },
    196777: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        filterFunction: (_hitValue: number, effectUnitId: number) => {
          CRUTCH.dbgSpam(zo_strformat("testing <<1>> unitId", effectUnitId))
          return (
            GetEndlessDungeonCounterValue(ENDLESS_DUNGEON_COUNTER_TYPE_ARC) > 9 &&
            !CRUTCH.majorCowardiceUnitIds[effectUnitId]
          )
        },
      },
      text: "BLOOD CRAZE",
      color: C.RED,
      slot: 2,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentBloodCraze",
        title: "Alert Blood Craze(Arc 10+)",
        description:
          "Shows a prominent alert when a Firesong Wildling, Goblin Berserker, or Grovebound Mauler casts Blood Craze at you, only in Arc 10 and above and if there is no Major Cowardice on it.The DoT snapshots the current strength, so even if you debuff the enemy afterwards, the DoT ticks will remain high.Therefore, it's better to dodge when possible, but this attack happens very quickly",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  677: {
    settingsSubcategory: "maelstrom",
    70701: {
      event: EVENT_EFFECT_CHANGED,
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      text: "CLEANSE",
      color: [0.5, 1, 0.5],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentPoisonArrowSpray",
        title: "Alert Poison Arrow Spray",
        description:
          "Shows a prominent alert when you get arrow sprayed by an Argonian Venomshot in the Vault of Umbrage and should cleanse the DoT",
        checkOldForDefault: true,
        default: true,
      },
    },
    69855: {
      event: EVENT_EFFECT_CHANGED,
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      text: "CLEANSE",
      color: [0.5, 1, 0.5],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentVolatilePoison",
        title: "Alert Volatile Poison",
        description:
          "Shows a prominent alert when you get poisoned by a plant in the Vault of Umbrage and should cleanse the DoT",
        checkOldForDefault: true,
        default: true,
      },
    },
    15164: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "HEAT WAVE",
      color: [1, 0.3, 0.1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentHeatWaveMA",
        title: "Alert Heat Wave",
        description: "Shows a prominent alert when a fire mage casts Heat Wave",
        checkOldForDefault: true,
        default: true,
      },
    },
    75277: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "AMBUSH",
      color: [223 / 255, 71 / 255, 237 / 255],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentTeleportStrike",
        title: "Alert Teleport Strike",
        description: "Shows a prominent alert when a Dremora Kynlurker ambushes you",
        checkOldForDefault: true,
        default: true,
      },
    },
    75281: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "TETHER",
      color: [223 / 255, 71 / 255, 237 / 255],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentSoulTether",
        title: "Alert Soul Tether",
        description: "Shows a prominent alert when a Dremora Kynlurker casts Soul Tether",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  1227: {
    settingsSubcategory: "vateshran",
    15164: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "HEAT WAVE",
      color: [1, 0.3, 0.1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentHeatWaveVH",
        title: "Alert Heat Wave",
        description: "Shows a prominent alert when a fire mage casts Heat Wave",
        checkOldForDefault: true,
        default: true,
      },
    },
    12459: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "WINTER'S REACH",
      color: [0.5, 1, 1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentWintersReachVH",
        title: "Alert Winter's Reach",
        description: "Shows a prominent alert when an ice mage casts Winter's Reach",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
}
