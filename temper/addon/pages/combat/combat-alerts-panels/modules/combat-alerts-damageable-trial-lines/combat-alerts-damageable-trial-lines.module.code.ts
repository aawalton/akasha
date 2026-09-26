import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-utils/combat-alerts-utils.module.code.ts"
import type { DamageableLines } from "akasha/temper/addon/pages/combat/combat-alerts-panels/modules/combat-alerts-damageable/combat-alerts-damageable.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"
import type { CrutchStringId } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-ids/combat-alerts-lang-ids.module.code.ts"

function nameStr(this: void, id: CrutchStringId): string {
  return CRUTCH.GetCapitalizedString(crutchString(id))
}

export const DAMAGEABLE_TRIAL_LINES: Record<string, DamageableLines> = {
  [nameStr("CRUTCH_BHB_ZMAJA")]: {
    [crutchString("CRUTCH_DMG_I_WONT_BE_BEATEN_ILL_SMASH_THIS")]: 14.4,
    [crutchString("CRUTCH_DMG_YOU_CHALLENGE_THE_POWER_OF_THE_SEA")]: {
      time: 7.5,
      singleZoneId: 1051,
    },
    [crutchString("CRUTCH_DMG_YOU_DARE_FIGHT_AGAINST_DARKNESS_ITSELF")]: {
      time: 7.5,
      singleZoneId: 1051,
    },
    [crutchString("CRUTCH_DMG_DARKNESS_SHALL_REIGN_ACROSS_SUMMERSET")]: {
      time: 7.5,
      singleZoneId: 1051,
    },
    [crutchString("CRUTCH_DMG_CLOUDREST_HAS_ALREADY_FALLEN_AND_SO_TOO")]: {
      time: 7.5,
      singleZoneId: 1051,
    },
    [crutchString("CRUTCH_DMG_SOON_MY_SHADOWS_SHALL_SPREAD_TO_ALL_OF")]: {
      time: 7.5,
      singleZoneId: 1051,
    },
    [crutchString("CRUTCH_DMG_THE_SHADOWS_ANSWER_TO_ME_NOW")]: { time: 7.5, singleZoneId: 1051 },
    [crutchString("CRUTCH_DMG_DO_YOU_TRULY_THINK_YOU_CAN_STAND_AGAINST")]: {
      time: 7.5,
      singleZoneId: 1051,
    },
    [crutchString("CRUTCH_DMG_I_CAN_WAIT_AFTER_ALL_YOUR_DEATHS_ARE")]: {
      time: 7.5,
      singleZoneId: 1051,
    },
  },
  [nameStr("CRUTCH_DMG_TURLASSIL")]: {
    [crutchString("CRUTCH_DMG_FRESH_CHALLENGERS_MORE_LIKE")]: 16.6,
    [crutchString("CRUTCH_DMG_DONT_GET_UP_LY_THIS_WILL_JUST_BE_A")]: 6.4,
    [crutchString("CRUTCH_DMG_ILL_TAKE_THE_FIRST_ROUND_LY")]: 6.4,
    [crutchString("CRUTCH_DMG_THAT_WAS_JUST_A_TASTE_OF_WHATS_TO_COME")]: 6.4,
    [crutchString("CRUTCH_DMG_YOU_LOOKED_A_LITTLE_TOO_EAGER_TO_KILL")]: 6.4,
    [crutchString("CRUTCH_DMG_YOU_PASS_BARELY")]: 6.4,
    [crutchString("CRUTCH_DMG_I_DONT_WANT_TO_FINISH_THEM_OFF_BEFORE")]: 7.5,
    [crutchString("CRUTCH_DMG_NOT_YOUR_FINEST_HOUR_LY_LET_ME_SHOW")]: 7.5,
    [crutchString("CRUTCH_DMG_IF_YOURE_DONE_SULKING_LY_SOME")]: 8,
    [crutchString("CRUTCH_DMG_IT_WOULD_SEEM_MY_BAD_LUCK_HAS_RUBBED_OFF")]: 8,
  },
  [nameStr("CRUTCH_BHB_LYLANAR")]: {
    [crutchString("CRUTCH_DMG_HAD_YOUR_WARM_UP_THEN")]: 6.4,
    [crutchString("CRUTCH_DMG_ILL_CALL_FIRST_ROUND")]: 6.4,
    [crutchString("CRUTCH_DMG_MADE_IT_FARTHER_THAN_THE_THRALLS_DO")]: 6.4,
    [crutchString("CRUTCH_DMG_NOW_THE_REAL_FIGHT_BEGINS")]: 6.4,
    [crutchString("CRUTCH_DMG_WATCH_ME_TURLI_THIS_IS_HOW_ITS_DONE")]: 6.4,
    [crutchString("CRUTCH_DMG_I_DONT_WISH_TO_HOG_ALL_THE_EXCITEMENT")]: 7.5,
    [crutchString("CRUTCH_DMG_THAT_WAS_A_LIMP_PERFORMANCE_TURLI_ILL")]: 7.5,
    [crutchString("CRUTCH_DMG_YOU_DONT_LOOK_TO_BE_FAIRING_ANY_BETTER")]: 8,
    [crutchString("CRUTCH_DMG_COME_ON_TURLI_LETS_SECURE_THE")]: 8,
  },
  [nameStr("CRUTCH_DMG_FLEET_QUEEN_TALERIA")]: {
    [crutchString("CRUTCH_DMG_BARGING_INTO_A_LADYS_PRIVATE_CHAMBERS")]: 23.5,
  },
  [nameStr("CRUTCH_BHB_ASSEMBLY_GENERAL")]: {
    [crutchString("CRUTCH_DMG_REPROCESSING_YARD_CONTAMINATION_CRITICAL")]: 10.2,
  },
  [nameStr("CRUTCH_DMG_DIVAYTH_FYR")]: {
    [crutchString("CRUTCH_DMG_INTERESTING_THESE_DEVICES_HAVE_ALL_RESET")]: 16.0,
    [crutchString("CRUTCH_DMG_WELL_WELL_NOW_THATS_THE_SECOND_LARGEST")]: 26.4,
  },
  [nameStr("CRUTCH_BHB_LORD_FALGRAVN")]: {
    [crutchString("CRUTCH_DMG_YOU_DARE_FACE_ME_BALEFUL_POWER_LURKS")]: 9.7,
    [crutchString("CRUTCH_DMG_YOU_WISH_TO_SEE_MY_WORKS_VERY_WELL_I")]: 12.6,
    [crutchString("CRUTCH_DMG_FEED_MY_PETS_FEED")]: { time: 30, displayFormat: "Torturers in " },
    [crutchString("CRUTCH_DMG_COME_CATTLE_TIME_FOR_THE_SLAUGHTER")]: {
      time: 30,
      displayFormat: "Torturers in ",
    },
    [crutchString("CRUTCH_DMG_BEHOLD_MY_BANQUET")]: { time: 30, displayFormat: "Torturers in " },
    [crutchString("CRUTCH_DMG_GO_CHILDREN_AND_DRINK_YOUR_FILL")]: {
      time: 30,
      displayFormat: "Torturers in ",
    },
  },
  [nameStr("CRUTCH_DMG_XORYN")]: {
    [crutchString("CRUTCH_DMG_LIKE_THEM")]: 17.6,
  },
  [nameStr("CRUTCH_DMG_MIRARRO")]: {
    [crutchString("CRUTCH_DMG_DONT_ITS_TRAP_HES_COMING")]: 16.8,
  },
  [nameStr("CRUTCH_DMG_KULANDRO")]: {
    [crutchString("CRUTCH_DMG_HAVE_YOU_NOT_HEARD_ME_HAVE_I_NOT_MADE_YOUR_CHOICE")]: 26.4,
  },
  [nameStr("CRUTCH_DMG_SKORKHIF")]: {
    [crutchString("CRUTCH_DMG_WHEN_IM_THE_ONE_WHO_CAUSED_THEIR_SUFFERING")]: 13.4,
  },
  [nameStr("CRUTCH_BHB_FLAMEHERALD_BAHSEI")]: {
    [crutchString("CRUTCH_DMG_GREAT_XALVAKKA_DRANK_DEEP_FROM_THE")]: 7.0,
  },
  [nameStr("CRUTCH_BHB_EXARCHANIC_YASEYLA")]: {
    [crutchString("CRUTCH_DMG_YOUR_SORCERY_DECEIVES_GOOD_PEOPLE_IT")]: 7.9,
  },
  [nameStr("CRUTCH_DMG_ARCHWIZARD_TWELVANE")]: {
    [crutchString("CRUTCH_DMG_WHY_DO_YOU_STILL_HESITATE_VANTON")]: 6.8,
  },
  [nameStr("CRUTCH_DMG_WARLOCK_VANTON")]: {
    [crutchString("CRUTCH_DMG_THE_GRYPHON_IS_STRONG_BUT_YOU_MAY_BE_STRONGER")]: 6.5,
    [crutchString("CRUTCH_DMG_YOU_TAMED_THE_GRYPHON_ITS_VULNERABLE")]: 6.5,
    [crutchString("CRUTCH_DMG_YOU_DID_IT_YOU_WOKE_THE_GRYPHON")]: 6.5,
    [crutchString("CRUTCH_DMG_YOU_HAVE_THE_WAMASUS_POWER")]: 6.5,
    [crutchString("CRUTCH_DMG_YOU_BEAT_THE_WAMASU_PLEASE_DONT_DIE_NOW")]: 6.5,
    [crutchString("CRUTCH_DMG_THE_WAMASUS_POWER_CAN_TURN_AGAINST_THE_CHIMERA")]: 6.5,
    [crutchString("CRUTCH_DMG_YOU_BEAT_THE_HOUSE_OF_THE_LION")]: 6.5,
    [crutchString("CRUTCH_DMG_DID_YOU_TAKE_THE_LIONS_FIRE")]: 6.5,
    [crutchString("CRUTCH_DMG_WHO_ARE_YOU_ARE_YOU_ONE_OF_HERS_SHES_HURTING_ME")]: 13,
  },
  [nameStr("CRUTCH_BHB_NAHVIINTAAS")]: {
    [crutchString("CRUTCH_DMG_TO_RESTORE_THE_NATURAL_ORDER_TO_RECLAIM")]: 22.2,
  },
  ["Shade of the Grove"]: {
    ["You wish to challenge the Hunter's Grove? Very well—begin!"]: 3.8,
    ["Do not wilt from this challenge, hunter."]: 3.8,
    ["You face the full might of the hunt!"]: 3.8,
    ["Are you predator or prey, hunter?"]: 3.8,
    ["I embody life! I cannot be defeated!"]: 4.1,
    ["This shell brings your death!"]: 4.1,
    ["This new host serves me better!"]: 4.1,
  },
  ["Aydolan"]: {
    ["You made it all the way to the end! Only one final challenge left. Me!"]: 12.7,
    ["Ihr habt es ganz bis zum Ende geschafft! Nur noch eine letzte Herausforderung: Ich!"]: 12.7,
  },
}
