import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-reach/combat-alerts-trials-b-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    Do20StormBreath: (this: void) => void
  }
}

function enableLokkIcons(this: void): undefined {
  if (!CRUTCH.savedOptions.sunspire.showLokkIcons) return

  if (CRUTCH.savedOptions.sunspire.lokkIconsSoloHeal) {
    CRUTCH.EnableIcon("SHLokkBeam1")
    CRUTCH.EnableIcon("SHLokkBeam2")
    CRUTCH.EnableIcon("SHLokkBeam3")
    CRUTCH.EnableIcon("SHLokkBeam4")
    CRUTCH.EnableIcon("SHLokkBeam5")
    CRUTCH.EnableIcon("SHLokkBeam6")
    CRUTCH.EnableIcon("SHLokkBeam7")
    CRUTCH.EnableIcon("SHLokkBeam8")
    CRUTCH.EnableIcon("SHLokkBeam9")
    CRUTCH.EnableIcon("SHLokkBeamH")
  } else {
    CRUTCH.EnableIcon("LokkBeam1")
    CRUTCH.EnableIcon("LokkBeam2")
    CRUTCH.EnableIcon("LokkBeam3")
    CRUTCH.EnableIcon("LokkBeam4")
    CRUTCH.EnableIcon("LokkBeam5")
    CRUTCH.EnableIcon("LokkBeam6")
    CRUTCH.EnableIcon("LokkBeam7")
    CRUTCH.EnableIcon("LokkBeam8")
    CRUTCH.EnableIcon("LokkBeamLH")
    CRUTCH.EnableIcon("LokkBeamRH")
  }
}

export function disableLokkIcons(this: void): undefined {
  CRUTCH.DisableIcon("SHLokkBeam1")
  CRUTCH.DisableIcon("SHLokkBeam2")
  CRUTCH.DisableIcon("SHLokkBeam3")
  CRUTCH.DisableIcon("SHLokkBeam4")
  CRUTCH.DisableIcon("SHLokkBeam5")
  CRUTCH.DisableIcon("SHLokkBeam6")
  CRUTCH.DisableIcon("SHLokkBeam7")
  CRUTCH.DisableIcon("SHLokkBeam8")
  CRUTCH.DisableIcon("SHLokkBeam9")
  CRUTCH.DisableIcon("SHLokkBeamH")

  CRUTCH.DisableIcon("LokkBeam1")
  CRUTCH.DisableIcon("LokkBeam2")
  CRUTCH.DisableIcon("LokkBeam3")
  CRUTCH.DisableIcon("LokkBeam4")
  CRUTCH.DisableIcon("LokkBeam5")
  CRUTCH.DisableIcon("LokkBeam6")
  CRUTCH.DisableIcon("LokkBeam7")
  CRUTCH.DisableIcon("LokkBeam8")
  CRUTCH.DisableIcon("LokkBeamLH")
  CRUTCH.DisableIcon("LokkBeamRH")
}

const LOKK_HM_HEALTH = 97025800
function isLokkHM(this: void): boolean {
  const [, maxHealth] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  return maxHealth === LOKK_HM_HEALTH
}

function maybeEnableLokkIcons(this: void): undefined {
  if (!CRUTCH.savedOptions.sunspire.showLokkIcons) return

  if (isLokkHM()) {
    enableLokkIcons()
  }
}

export function onLokkFly(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  _targetType: number,
  _hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  _targetUnitId: number,
  abilityId: number
): undefined {
  maybeEnableLokkIcons()

  if (CRUTCH.savedOptions.general.showDamageable) {
    if (abilityId === 122820) {
      CRUTCH.DisplayDamageable(40, "Beam in ")
      zo_callLater(function (this: void) {
        CRUTCH.DisplayDamageable(12.8)
      }, 40500)
    } else if (abilityId === 122821) {
      CRUTCH.DisplayDamageable(10.2, "Beam in ")
      zo_callLater(function (this: void) {
        CRUTCH.DisplayDamageable(54.6)
      }, 10300)
    } else if (abilityId === 122822) {
      CRUTCH.DisplayDamageable(34.2, "Beam in ")
      zo_callLater(function (this: void) {
        CRUTCH.DisplayDamageable(29.7)
      }, 34200)
    }
  }
}

export function onLokkBeam(this: void): undefined {
  zo_callLater(function (this: void) {
    disableLokkIcons()
  }, 15000)
}

export function onBossesChanged(this: void): undefined {
  const [, maxHealth] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)

  if (maxHealth === LOKK_HM_HEALTH) {
    maybeEnableLokkIcons()
  } else {
    disableLokkIcons()
  }
}

let prevMaxHealth = 0
export function onPowerUpdate(
  this: void,
  _eventCode: number,
  _unitTag: string,
  _powerIndex: number,
  _powerType: number,
  _powerValue: number,
  powerMax: number
): undefined {
  if (prevMaxHealth === powerMax) {
    return
  }
  prevMaxHealth = powerMax

  if (powerMax === LOKK_HM_HEALTH) {
    maybeEnableLokkIcons()
  } else {
    disableLokkIcons()
  }
}

const X_X = 114941
const X_Y = 56106
const X_Z = 105959
function do20StormBreath(this: void): undefined {
  if (!isLokkHM()) return

  const key3 = CRUTCH.Drawing.CreateWorldTexture(
    "TemperCombat/assets/floor/square.dds",
    X_X,
    X_Y,
    X_Z,
    50,
    8,
    [1, 0, 0, 0.2],
    true,
    false,
    [math.pi / 2, math.pi / 4 + 0.13, 0],
    undefined
  )
  zo_callLater(function (this: void) {
    CRUTCH.Drawing.RemoveWorldTexture(key3)
  }, 18000)

  zo_callLater(function (this: void) {
    const key4 = CRUTCH.Drawing.CreateWorldTexture(
      "TemperCombat/assets/floor/square.dds",
      X_X,
      X_Y + 1,
      X_Z,
      50,
      8,
      [1, 0, 0, 0.2],
      true,
      false,
      [math.pi / 2, (math.pi * 3) / 4 + 0.24, 0],
      undefined
    )
    zo_callLater(function (this: void) {
      CRUTCH.Drawing.RemoveWorldTexture(key4)
    }, 18000)
  }, 8300)
}
CRUTCH.Do20StormBreath = do20StormBreath

export function registerStormBreath(this: void): undefined {
  CRUTCH.RegisterForCombatEvent(
    "StormBreath1",
    function (this: void) {
      if (!isLokkHM()) return
      const key = CRUTCH.Drawing.CreateWorldTexture(
        "TemperCombat/assets/floor/square.dds",
        114900,
        56105,
        106100,
        50,
        8,
        [1, 0, 0, 0.2],
        true,
        false,
        [math.pi / 2, 0.03, 0],
        undefined
      )
      zo_callLater(function (this: void) {
        CRUTCH.Drawing.RemoveWorldTexture(key)
      }, 18000)
    },
    ACTION_RESULT_EFFECT_GAINED_DURATION,
    119596
  )

  CRUTCH.RegisterForCombatEvent(
    "StormBreath3",
    do20StormBreath,
    ACTION_RESULT_EFFECT_GAINED_DURATION,
    122961
  )
}

export function unregisterStormBreath(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("StormBreath1")
  CRUTCH.UnregisterForCombatEvent("StormBreath3")
}
