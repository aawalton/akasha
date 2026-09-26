import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel/combat-alerts-info-panel.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export const PANEL_FROST_BOMB_INDEX = 4
export const FROST_BOMB_ID = 183768
export const FROST_BOMB_DOUBLE_ID = 185392
const frostBombPrefix = zo_strformat("|c66CCFF<<C:1>>: ", GetAbilityName(FROST_BOMB_ID))

export function onFrostBomb(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(PANEL_FROST_BOMB_INDEX, frostBombPrefix, 27800)
}

export function disableChimeraIcons(this: void): undefined {
  CRUTCH.DisableIconGroup("SEChimeraVetGryphon")
  CRUTCH.DisableIconGroup("SEChimeraVetLion")
  CRUTCH.DisableIconGroup("SEChimeraVetWamasu")
  CRUTCH.DisableIconGroup("SEChimeraHMGryphon")
  CRUTCH.DisableIconGroup("SEChimeraHMLion")
  CRUTCH.DisableIconGroup("SEChimeraHMWamasu")
}

const MANTLE_IDS: Record<number, string> = {
  [183640]: "Gryphon",
  [184983]: "Lion",
  [184984]: "Wamasu",
}

export function checkMantle(this: void): undefined {
  for (let i = 1; i <= GetNumBuffs("player"); i++) {
    const [, , , , , , , , , , abilityId] = GetUnitBuffInfo("player", i)
    const portal = MANTLE_IDS[abilityId]
    if (portal !== undefined) {
      let iconGroupString = "SEChimera"
      const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)

      if (powerMax === 93144792) {
        iconGroupString = `${iconGroupString}HM`
      } else if (powerMax === 46572396) {
        iconGroupString = `${iconGroupString}Vet`
      } else {
        iconGroupString = `${iconGroupString}Norm`
      }

      CRUTCH.EnableIconGroup(iconGroupString + portal)
    }
  }
}

export const PANEL_ARCTIC_INDEX = 5
const arcticPrefix = zo_strformat("|c8ef5f5<<C:1>>: ", GetAbilityName(184275))
let numArctic = 0

function onArcticShred(this: void): undefined {
  numArctic = numArctic + 1

  if (numArctic === 1) {
    CRUTCH.InfoPanel.CountDownDuration(PANEL_ARCTIC_INDEX, arcticPrefix, 5500)
  } else if (numArctic === 2) {
    CRUTCH.InfoPanel.StopCount(PANEL_ARCTIC_INDEX)
    CRUTCH.InfoPanel.SetLine(
      PANEL_ARCTIC_INDEX,
      arcticPrefix + zo_strformat("|cFFFF00after <<C:1>>", GetAbilityName(183858))
    )
  }
}

function onChainLightning(this: void): undefined {
  numArctic = 0
  CRUTCH.InfoPanel.CountDownDuration(PANEL_ARCTIC_INDEX, arcticPrefix, 6300)
}

export function resetArctic(this: void): undefined {
  numArctic = 0
}

export function onActivated(this: void): undefined {
  numArctic = 0
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  const [current2, powerMax2] = GetUnitPower("boss2", COMBAT_MECHANIC_FLAGS_HEALTH)

  if (current2 === undefined || powerMax2 === undefined || current2 / powerMax2 > 0.1) {
    CRUTCH.dbgOther("boss2 not dead")
    return
  }

  if (powerMax !== 93144792 && powerMax !== 46572396 && powerMax !== 16359630) {
    CRUTCH.dbgOther("not chimera")
    return
  }

  CRUTCH.InfoPanel.CountDownDuration(PANEL_ARCTIC_INDEX, arcticPrefix, 0)

  CRUTCH.RegisterForCombatEvent("SEArcticShred", onArcticShred, ACTION_RESULT_BEGIN, 184275)
  CRUTCH.RegisterForCombatEvent("SEChainLightning", onChainLightning, ACTION_RESULT_BEGIN, 183858)
}
