import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import type { BossThresholds } from "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"

export function onDestructiveEmber(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    CRUTCH.msg(zo_strformat("<<1>> picked up |cff6600fire dome", GetUnitDisplayName(unitTag)))
  } else if (changeType === EFFECT_RESULT_FADED) {
    CRUTCH.msg(zo_strformat("<<1>> put away |cff6600fire dome", GetUnitDisplayName(unitTag)))
  }
}

export function onPiercingHailstone(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    CRUTCH.msg(zo_strformat("<<1>> picked up |c8ef5f5ice dome", GetUnitDisplayName(unitTag)))
  } else if (changeType === EFFECT_RESULT_FADED) {
    CRUTCH.msg(zo_strformat("<<1>> put away |c8ef5f5ice dome", GetUnitDisplayName(unitTag)))
  }
}

const TWINS_THRESHOLDS: BossThresholds = {
  normHealth: 10906420,
  vetHealth: 27943440,
  hmHealth: 55886880,
  Normal: {
    [90]: "Atronach",
    [80]: "Atronach",
    [70]: "2nd Teleports",
    [65]: "1st Teleports",
    boss1: {},
    boss2: {},
  },
  Veteran: {
    [90]: "Atronach",
    [80]: "Atronach",
    [70]: "2nd Teleports",
    [65]: "1st Teleports",
    boss1: {},
    boss2: {},
  },
  Hardmode: {
    [90]: "Same-color Atro",
    [85]: "Off-color Atro",
    [80]: "Same-color Atro",
    [75]: "Off-color Atro",
    [70]: "2nd Teleports",
    [65]: "1st Teleports",
    boss1: {},
    boss2: {},
  },
}

const DIFFICULTIES = ["Normal", "Veteran", "Hardmode"] as const

function onBossHealthDrop(
  this: void,
  _eventCode: number,
  unitTag: string,
  _powerIndex: number,
  _powerType: number,
  powerValue: number,
  powerMax: number
): undefined {
  if (!IsUnitInCombat("player")) {
    return
  }

  if (powerValue >= powerMax) {
    return
  }

  EVENT_MANAGER.UnregisterForEvent(`${CRUTCH.name}DSRTwinsHealth`, EVENT_POWER_UPDATE)
  CRUTCH.dbgOther(`${unitTag} damaged`)

  for (const difficulty of DIFFICULTIES) {
    for (let i = 1; i <= 2; i++) {
      const boss = `boss${i}` as const
      const tab = (TWINS_THRESHOLDS[difficulty] as BossThresholds)[boss] as Record<number, string>
      ZO_ClearTable(tab)

      if (difficulty === "Normal" || difficulty === "Veteran") {
        tab[90] = "Atronach"
        tab[80] = "Atronach"
      } else {
        tab[90] = "Same-color Atro"
        tab[85] = "Off-color Atro"
        tab[80] = "Same-color Atro"
        tab[75] = "Off-color Atro"
      }

      if (boss === unitTag) {
        tab[65] = "1st Teleports"
      } else {
        tab[70] = "2nd Teleports"
      }
    }
  }

  CRUTCH.BossHealthBar.AddThresholdOverride(
    CRUTCH.GetCapitalizedString(crutchString("CRUTCH_BHB_LYLANAR")),
    TWINS_THRESHOLDS
  )
}

export function onBossesChanged(this: void): undefined {
  if (
    zo_strformat("<<1>>", crutchString("CRUTCH_BHB_LYLANAR")) ===
    zo_strformat("<<1>>", CRUTCH.BossHealthBar.GetUnitNameIfExists("boss1") ?? "")
  ) {
    EVENT_MANAGER.RegisterForEvent(
      `${CRUTCH.name}DSRTwinsHealth`,
      EVENT_POWER_UPDATE,
      onBossHealthDrop
    )
    EVENT_MANAGER.AddFilterForEvent(
      `${CRUTCH.name}DSRTwinsHealth`,
      EVENT_POWER_UPDATE,
      REGISTER_FILTER_UNIT_TAG_PREFIX,
      "boss"
    )
    EVENT_MANAGER.AddFilterForEvent(
      `${CRUTCH.name}DSRTwinsHealth`,
      EVENT_POWER_UPDATE,
      REGISTER_FILTER_POWER_TYPE,
      COMBAT_MECHANIC_FLAGS_HEALTH
    )
  } else {
    EVENT_MANAGER.UnregisterForEvent(`${CRUTCH.name}DSRTwinsHealth`, EVENT_POWER_UPDATE)
    CRUTCH.BossHealthBar.RemoveThresholdOverride(
      CRUTCH.GetCapitalizedString(crutchString("CRUTCH_BHB_LYLANAR"))
    )
  }
}
