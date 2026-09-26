import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import type { ProminentZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent-v2/combat-alerts-alerts-prominent-v2.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

export const PROMINENT_DATA_A: Record<number, ProminentZone> = {
  1051: {
    settingsSubcategory: "cloudrest",
    105380: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        filterFunction: (hitValue: number) => hitValue > 1000,
      },
      text: "INTERRUPT",
      color: [0.5, 1, 1],
      slot: 2,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentDirectCurrent",
        title: "Alert Direct Current",
        description: "Shows a prominent alert for Relequen's interruptible attack, Direct Current",
        checkOldForDefault: true,
        default: true,
      },
    },
    106405: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "INTERRUPT",
      color: [0.5, 1, 1],
      slot: 2,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentGlacialSpikes",
        title: "Alert Glacial Spikes",
        description: "Shows a prominent alert for Galenwe's interruptible attack, Glacial Spikes",
        checkOldForDefault: true,
        default: true,
      },
    },
    105016: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "CREEPER",
      color: [0.5, 1, 0.5],
      slot: 1,
      playSound: true,
      millis: 3000,
      settings: {
        name: "prominentCreeper",
        title: "Alert Creeper Spawn",
        description: "Shows a prominent alert when a Malicious Creeper spawns",
        checkOldForDefault: true,
        default: true,
      },
    },
    104646: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_DAMAGE,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
      },
      text: "STOP REZZING",
      color: [0.6, 0, 1],
      slot: 4,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentGrievous",
        title: "Alert Grievous Retaliation",
        description:
          "Shows a prominent alert when you try to resurrect a player with their shade still up",
        checkOldForDefault: false,
        default: true,
      },
    },
  },
  1344: {
    settingsSubcategory: "dreadsailreef",
    169587: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_EFFECT_GAINED_DURATION,
      },
      text: "WAVE",
      color: C.ORANGE,
      slot: 1,
      playSound: () => {
        CRUTCH.PlayMultiSound(
          SOUNDS.BATTLEGROUND_CAPTURE_FLAG_TAKEN_OWN_TEAM as string,
          4,
          4,
          700,
          true
        )
      },
      millis: 6000,
      settings: {
        name: "prominentWeaponWave",
        title: "Alert Scalding Swell / Biting Billow",
        description:
          "Shows a prominent alert and plays a sound when a weapon is killed and releases a shockwave",
        checkOldForDefault: true,
        default: true,
      },
    },
    169594: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_EFFECT_GAINED_DURATION,
      },
      text: "WAVE",
      color: C.ICEBLUE,
      slot: 2,
      playSound: () => {
        CRUTCH.PlayMultiSound(
          SOUNDS.BATTLEGROUND_CAPTURE_FLAG_TAKEN_OWN_TEAM as string,
          4,
          4,
          700,
          true
        )
      },
      millis: 6000,
      settings: {
        name: "prominentWeaponWave",
        title: "Alert Scalding Swell / Biting Billow",
        description:
          "Shows a prominent alert and plays a sound when a weapon is killed and releases a shockwave",
        checkOldForDefault: true,
        default: true,
      },
    },
    167466: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "NEED ICE DOME",
      color: C.ICEBLUE,
      slot: 3,
      playSound: () => {
        CRUTCH.PlayMultiSound(SOUNDS.JUSTICE_NOW_KOS as string, 2, 4, 1000, false)
      },
      millis: 4000,
      settings: {
        name: "prominentDome",
        title: "Alert Charred Constriction / Frigidarium",
        description:
          "Shows a prominent alert and plays a sound when a boss teleports and the opposite side needs to run the dome over",
        checkOldForDefault: true,
        default: true,
      },
    },
    167545: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "NEED FIRE DOME",
      color: C.ORANGE,
      slot: 3,
      playSound: () => {
        CRUTCH.PlayMultiSound(SOUNDS.JUSTICE_NOW_KOS as string, 2, 4, 1000, false)
      },
      millis: 4000,
      settings: {
        name: "prominentDome",
        title: "Alert Charred Constriction / Frigidarium",
        description:
          "Shows a prominent alert and plays a sound when a boss teleports and the opposite side needs to run the dome over",
        checkOldForDefault: true,
        default: true,
      },
    },
    170188: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
      },
      text: "BOOT",
      color: [223 / 255, 71 / 255, 237 / 255],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentCascadingBoot",
        title: "Alert Cascading Boot",
        description:
          "Shows a prominent alert when a Dreadsail Overseer tries to yeet you with Cascading Boot",
        checkOldForDefault: true,
        default: true,
      },
    },
    164158: {
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
        name: "prominentDSRBonk",
        title: "Alert bonks",
        description:
          "Shows a prominent alert when you are not a tank and a Sea Behemoth tries to light attack you",
        checkOldForDefault: true,
        default: true,
      },
    },
    164160: {
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
        name: "prominentDSRBonk",
        title: "Alert bonks",
        description:
          "Shows a prominent alert when you are not a tank and a Sea Behemoth tries to light attack you",
        checkOldForDefault: true,
        default: true,
      },
    },
    164162: {
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
        name: "prominentDSRBonk",
        title: "Alert bonks",
        description:
          "Shows a prominent alert when you are not a tank and a Sea Behemoth tries to light attack you",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  975: {
    settingsSubcategory: "hallsoffabrication",
    90876: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "INTERRUPT",
      color: [0.5, 1, 1],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentPinnacleDirectCurrent",
        title: "Alert Direct Current",
        description:
          "Shows a prominent alert when the Pinnacle Factotum casts its interruptible, Direct Current",
        checkOldForDefault: true,
        default: true,
      },
    },
    90499: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_EFFECT_FADED,
      },
      text: "ADDS",
      color: [1, 0.2, 0.2],
      slot: 1,
      playSound: false,
      millis: 2000,
      settings: {
        name: "prominentReclaimTheRuined",
        title: "Alert Reclaim the Ruined",
        description: "Shows a prominent alert when the adds spawn during the triplets fight",
        checkOldForDefault: true,
        default: true,
      },
    },
    91454: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_BEGIN,
      },
      text: "BLOCK",
      color: [1, 0.2, 0.2],
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentStomp",
        title: "Alert Stomp",
        description:
          "Shows a prominent alert when the Assembly General does Stomp(for trench strat)",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
  1196: {
    settingsSubcategory: "kynesaegis",
    133559: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_EFFECT_GAINED,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
      },
      text: "CHAURUS",
      color: C.POISONGREEN,
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentChaurus",
        title: "Alert Chaurus Bile",
        description:
          "Shows a prominent alert when you have a Chaurus Bile projectile incoming from the Chaurus Totem.If you dodge, you will not receive the Chaurus Bile Pool around you",
        checkOldForDefault: true,
        default: true,
      },
    },
    136873: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_EFFECT_GAINED,
        [REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE]: COMBAT_UNIT_TYPE_PLAYER,
        filterFunction: () => GetSelectedLFGRole() !== LFG_ROLE_TANK,
      },
      text: "GARGOYLE",
      color: C.PHYSICALTAN,
      slot: 2,
      playSound: SOUNDS.BATTLEGROUND_MURDERBALL_TAKEN_OTHER_TEAM,
      millis: 1000,
      settings: {
        name: "prominentGargoyle",
        title: "Alert Gargoyle's Curse",
        description:
          "Shows a prominent alert when you have a Gargoyle's Curse projectile incoming from the Gargoyle Totem.It can be blocked or dodged to avoid the stun.This alert does not show if your LFG role is tank",
        checkOldForDefault: true,
        default: true,
      },
    },
    136548: {
      event: EVENT_COMBAT_EVENT,
      filters: {
        [REGISTER_FILTER_COMBAT_RESULT]: ACTION_RESULT_EFFECT_FADED,
        filterFunction: () => GetSelectedLFGRole() === LFG_ROLE_TANK,
      },
      text: "BOOGER",
      color: C.RED,
      slot: 1,
      playSound: true,
      millis: 1000,
      settings: {
        name: "prominentBooger",
        title: "Alert Hemorrhage Ended(Tank Only)",
        description:
          "Shows a prominent alert if you are a tank and the Hemorrhage phase ends, as a reminder to taunt the new coagulant",
        checkOldForDefault: true,
        default: true,
      },
    },
  },
}
