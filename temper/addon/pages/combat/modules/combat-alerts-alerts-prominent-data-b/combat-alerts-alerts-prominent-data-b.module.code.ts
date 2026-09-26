import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import type { ProminentZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent-v2/combat-alerts-alerts-prominent-v2.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

export const PROMINENT_DATA_B: Record<number, ProminentZone> = {
  1478: {
    settingsSubcategory: "lucentcitadel",
    214338: {
      event: EVENT_EFFECT_CHANGED,
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      text: "DARK",
      color: [0.5, 0, 1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentDarknessInflicted",
        title: "Alert Darkness Inflicted",
        description:
          "Shows a prominent alert when you gain Darkness Inflicted (3 stacks of Creeping Darkness)",
        checkOldForDefault: true,
        default: true,
      },
    },
    214136: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        filterFunction: () => GetSelectedLFGRole() === LFG_ROLE_TANK,
      },
      text: "FATE SEALER",
      color: [1, 0, 1],
      slot: 1,
      playSound: true,
      millis: 2000,
      settings: {
        name: "prominentFateSealer",
        title: "Alert Fate Sealer",
        description:
          "Shows a prominent alert when the Orphic Shattered Shard summons a Fate Sealer orb and if you are a tank",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  725: {
    settingsSubcategory: "mawoflorkhaj",
    73249: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
      },
      text: "SHATTER",
      color: C.RED,
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentShatteringStrike",
        title: "Alert Shattering Strike",
        description:
          "Shows a prominent alert when a Dro-m'Athra Savage targets you to shatter your armor with Shattering Strike",
        checkOldForDefault: true,
        default: true,
      },
    },
    76049: {
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
        name: "prominentGripOfLorkhaj",
        title: "Alert Grip of Lorkhaj",
        description: "Shows a prominent alert when you are cursed by Zhaj'hassa",
        checkOldForDefault: true,
        default: true,
      },
    },
    73741: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "BLOCK",
      color: [1, 0.9, 0.66],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentThreshingWings",
        title: "Alert Threshing Wings",
        description: "Shows a prominent alert when you should block to avoid Rakkhat's knockback",
        checkOldForDefault: true,
        default: true,
      },
    },
    74488: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_EFFECT_GAINED,
      },
      text: "UNSTABLE",
      color: C.RED,
      slot: 2,
      playSound: true,
      millis: 2000,
      settings: {
        name: "prominentUnstableVoid",
        title: "Alert Unstable Void",
        description:
          "Shows a prominent alert when you receive Unstable Void and should take the bomb out of group",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  1548: {
    settingsSubcategory: "osseincage",
    236569: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "GHOST",
      color: [1, 0, 1],
      slot: 1,
      playSound: true,
      millis: 1000,
      preMillis: 700,
      settings: {
        name: "prominentSpectralRevenge",
        title: "Alert Spectral Revenge",
        description: "Shows a prominent alert when an Osteon Spectral Revenant swipes at you",
        checkOldForDefault: true,
        default: true,
      },
    },
    232773: {
      event: EVENT_EFFECT_CHANGED,
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      text: "CHAIN",
      color: [1, 0, 1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentDominatorsChains",
        title: "Alert Dominator's Chains",
        description: "Shows a prominent alert when you are about to be tethered to another player",
        checkOldForDefault: true,
        default: true,
      },
    },
    232775: {
      event: EVENT_EFFECT_CHANGED,
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      text: "CHAIN",
      color: [1, 0, 1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentDominatorsChains",
        title: "Alert Dominator's Chains",
        description: "Shows a prominent alert when you are about to be tethered to another player",
        checkOldForDefault: true,
        default: true,
      },
    },
    245208: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_EFFECT_GAINED,
      },
      text: "DODGE",
      color: [1, 0, 0],
      slot: 2,
      playSound: true,
      millis: 1000,
      preMillis: 1000,
      settings: {
        name: "prominentSeethingVileLeap",
        title: "Alert Seething Vile Leap",
        description: "Shows a prominent alert when Kazpian does an enraged leap",
        checkOldForDefault: true,
        default: true,
      },
      hitValueOverride: 1500,
    },
  },
  1263: {
    settingsSubcategory: "rockgrove",
    149414: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "BLITZ",
      color: [1, 1, 0.5],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentSavageBlitz",
        title: "Alert Savage Blitz",
        description: "Shows a prominent alert when Oaxiltso charges",
        checkOldForDefault: true,
        default: true,
      },
    },
    153180: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        filterFunction: () => GetSelectedLFGRole() !== LFG_ROLE_TANK,
      },
      text: "BONK",
      color: [1, 0, 0],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentBonk",
        title: "Alert bonks",
        description:
          "Shows a prominent alert when you are not a tank and a Flesh Abomination or Fire Behemoth tries to light attack you",
        checkOldForDefault: true,
        default: true,
      },
    },
    153350: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        filterFunction: () => GetSelectedLFGRole() !== LFG_ROLE_TANK,
      },
      text: "BONK",
      color: [1, 0, 0],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentBonk",
        title: "Alert bonks",
        description:
          "Shows a prominent alert when you are not a tank and a Flesh Abomination or Fire Behemoth tries to light attack you",
        checkOldForDefault: true,
        default: true,
      },
    },
    152385: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        filterFunction: () => GetSelectedLFGRole() !== LFG_ROLE_TANK,
      },
      text: "BONK",
      color: [1, 0, 0],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentBonk",
        title: "Alert bonks",
        description:
          "Shows a prominent alert when you are not a tank and a Flesh Abomination or Fire Behemoth tries to light attack you",
        checkOldForDefault: true,
        default: true,
      },
    },
    152383: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        filterFunction: () => GetSelectedLFGRole() !== LFG_ROLE_TANK,
      },
      text: "BONK",
      color: [1, 0, 0],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentBonk",
        title: "Alert bonks",
        description:
          "Shows a prominent alert when you are not a tank and a Flesh Abomination or Fire Behemoth tries to light attack you",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  1427: {
    settingsSubcategory: "sanitysedge",
    184540: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "CHAIN",
      color: C.RED,
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentChainPull",
        title: "Alert Chain Pull",
        description: "Shows a prominent alert when Yaseyla chains you and you should break free",
        checkOldForDefault: true,
        default: true,
      },
    },
    198482: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        filterFunction: () => CRUTCH.IsInVantonPortal(CRUTCH.playerGroupTag),
      },
      text: "INTERRUPT",
      color: C.ICEBLUE,
      slot: 2,
      playSound: true,
      millis: 1700,
      settings: {
        name: "prominentVantonExecute",
        title: "Alert Execute (Warlock Vanton)",
        description:
          "Shows a prominent alert when the lightning portal Vanton starts to execute a player and must be interrupted",
        checkOldForDefault: true,
        default: true,
      },
    },
    198797: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        filterFunction: () => !CRUTCH.IsInVantonPortal(CRUTCH.playerGroupTag),
      },
      text: "INTERRUPT",
      color: C.ICEBLUE,
      slot: 1,
      playSound: true,
      millis: 1700,
      settings: {
        name: "prominentAnsuulExecute",
        title: "Alert Execute (Ansuul)",
        description:
          "Shows a prominent alert when Ansuul starts to execute a player and must be interrupted",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
}
