import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import type {
  BossHealthFunction,
  SpoofedBoss,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import type { OptionColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"

const BHB = CRUTCH.BossHealthBar

const SPOOFED_BOSSES: Record<string, SpoofedBoss> = {}
BHB.spoofedBosses = SPOOFED_BOSSES

function setBarColors(
  this: void,
  index: number | string,
  fgColor: OptionColor | undefined,
  bgColor: OptionColor | undefined
): undefined {
  const fg = fgColor ?? CRUTCH.savedOptions.bossHealthBar.foreground
  const bg = bgColor ?? CRUTCH.savedOptions.bossHealthBar.background

  const bar = TemperCombatAlertsBossHealthBarContainer.GetNamedChild<StatusBarControl>(
    "Bar" + tostring(index)
  )
  if (bar === undefined) {
    return
  }
  bar.SetColor(
    fg[0] ?? 0,
    fg[1] ?? 0,
    fg[2] ?? 0,
    fg[3] ?? CRUTCH.savedOptions.bossHealthBar.foreground[3]
  )
  const backdrop = bar.GetNamedChild<BackdropControl>("Backdrop")
  backdrop?.SetEdgeColor(
    bg[0] ?? 0,
    bg[1] ?? 0,
    bg[2] ?? 0,
    bg[3] ?? CRUTCH.savedOptions.bossHealthBar.background[3]
  )
  backdrop?.SetCenterColor(
    bg[0] ?? 0,
    bg[1] ?? 0,
    bg[2] ?? 0,
    bg[3] ?? CRUTCH.savedOptions.bossHealthBar.background[3]
  )
}
CRUTCH.SetBarColors = setBarColors

function spoofBoss(
  this: void,
  unitTag: string,
  name: string,
  getHealthFunction: BossHealthFunction,
  fgColor?: OptionColor,
  bgColor?: OptionColor
): undefined {
  const spoofed = {
    name,
    getHealthFunction,
    fgColor: fgColor ?? CRUTCH.savedOptions.bossHealthBar.foreground,
    bgColor: bgColor ?? CRUTCH.savedOptions.bossHealthBar.background,
  }
  SPOOFED_BOSSES[unitTag] = spoofed

  BHB.ShowOrHideBars(false, true)
  const index = string.sub(unitTag, 5, 5)
  setBarColors(index, spoofed.fgColor, spoofed.bgColor)
  CRUTCH.dbgOther(string.format("Spoofing %s as %s", name, unitTag))
}
CRUTCH.SpoofBoss = spoofBoss

function unspoofBoss(this: void, unitTag: string): undefined {
  if (SPOOFED_BOSSES[unitTag] !== undefined) {
    CRUTCH.dbgOther(string.format("Unspoofing %s", unitTag))
    delete SPOOFED_BOSSES[unitTag]

    BHB.ShowOrHideBars(false, true)
    const index = string.sub(unitTag, 5, 5)
    setBarColors(index, undefined, undefined)
  }
}
CRUTCH.UnspoofBoss = unspoofBoss

function updateSpoofedBossHealth(
  this: void,
  unitTag: string,
  value: number,
  max: number
): undefined {
  BHB.OnPowerUpdate(undefined, unitTag, undefined, undefined, value, max, max)
}
CRUTCH.UpdateSpoofedBossHealth = updateSpoofedBossHealth

interface TrackedUnit {
  name: string
  unitTag: string
  maxHealth: number
  health: number
  fgColor: OptionColor | undefined
  bgColor: OptionColor | undefined
}

const TRACKED_UNITS: Record<number, TrackedUnit> = {}

const DAMAGE_TYPES: Record<number, string> = {
  [ACTION_RESULT_DAMAGE]: "dmg",
  [ACTION_RESULT_CRITICAL_DAMAGE]: "dmg*",
  [ACTION_RESULT_DOT_TICK]: "tick",
  [ACTION_RESULT_DOT_TICK_CRITICAL]: "tick*",
  [ACTION_RESULT_HEAL]: "heal",
  [ACTION_RESULT_CRITICAL_HEAL]: "heal*",
}

function onDamage(
  this: void,
  _eventCode: number,
  result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  _targetType: number,
  hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  targetUnitId: number,
  abilityId: number
): undefined {
  const trackedUnit = TRACKED_UNITS[targetUnitId]
  if (trackedUnit === undefined) return

  if (result === ACTION_RESULT_HEAL || result === ACTION_RESULT_CRITICAL_HEAL) {
    trackedUnit.health = zo_clamp(trackedUnit.health + hitValue, 0, trackedUnit.maxHealth)

    if (abilityId !== 86304) {
      CRUTCH.dbgOther(
        string.format(
          "|cFFAA00%s (%d) %s for %d via %s (%d)",
          trackedUnit.name,
          targetUnitId,
          DAMAGE_TYPES[result],
          hitValue,
          GetAbilityName(abilityId),
          abilityId
        )
      )
    }
  } else {
    trackedUnit.health = zo_clamp(trackedUnit.health - hitValue, 0, trackedUnit.maxHealth)
  }
  updateSpoofedBossHealth(trackedUnit.unitTag, trackedUnit.health, trackedUnit.maxHealth)
}

function unregisterDamageEvents(this: void): undefined {
  for (const [, text] of pairs(DAMAGE_TYPES)) {
    CRUTCH.UnregisterForCombatEvent("BossSpoofing" + text)
  }
}

function registerDamageEvents(this: void): undefined {
  unregisterDamageEvents()
  for (const [result, text] of pairs(DAMAGE_TYPES)) {
    CRUTCH.RegisterForCombatEvent(
      "BossSpoofing" + text,
      onDamage,
      result,
      undefined,
      undefined,
      COMBAT_UNIT_TYPE_NONE
    )
  }
}

const RETICLE_TRACKING_UNITS: Record<string, number> = {}

function onReticleTargetChanged(this: void): undefined {
  if (!DoesUnitExist("reticleover")) return
  const name = zo_strformat(SI_UNIT_NAME, GetUnitName("reticleover"))
  const unitId = RETICLE_TRACKING_UNITS[name]
  if (unitId === undefined) return

  const trackedUnit = TRACKED_UNITS[unitId]
  if (trackedUnit === undefined) {
    CRUTCH.dbgOther(
      zo_strformat(
        "|cFF0000<<1>> (<<2>>) is registered for reticle tracking but not tracked unit?",
        name,
        unitId
      )
    )
    return
  }

  const [current, max] = GetUnitPower("reticleover", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (trackedUnit.maxHealth !== max) {
    CRUTCH.dbgOther(
      zo_strformat(
        "|cFF0000<<1>> (<<2>>) max health <<3>> does not match initial; updating. Initial: <<4>>",
        name,
        unitId,
        max,
        trackedUnit.maxHealth
      )
    )
    trackedUnit.maxHealth = max
  }

  if (trackedUnit.health !== current) {
    CRUTCH.dbgOther(
      zo_strformat(
        "|cFFAA00<<1>> (<<2>>) syncing health from <<3>> -> <<4>>",
        name,
        unitId,
        trackedUnit.health,
        current
      )
    )
    trackedUnit.health = current
    updateSpoofedBossHealth(trackedUnit.unitTag, trackedUnit.health, trackedUnit.maxHealth)
  }
}

function unregisterReticleEvents(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "BossSpoofingReticle",
    EVENT_RETICLE_TARGET_CHANGED
  )
}

function registerReticleEvents(this: void): undefined {
  unregisterReticleEvents()
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "BossSpoofingReticle",
    EVENT_RETICLE_TARGET_CHANGED,
    onReticleTargetChanged
  )
}

CRUTCH.TrackUnitForSpoofing = function (
  this: void,
  unitId,
  name,
  unitTag,
  maxHealth,
  fgColor,
  bgColor,
  initialHealth
) {
  TRACKED_UNITS[unitId] = {
    name,
    unitTag,
    maxHealth,
    health: initialHealth ?? maxHealth,
    fgColor,
    bgColor,
  }

  function getHealthFunction(this: void): LuaMultiReturn<[number, number, number]> {
    const tracked = TRACKED_UNITS[unitId] as TrackedUnit
    return $multi(tracked.health, tracked.maxHealth, tracked.maxHealth)
  }

  spoofBoss(unitTag, name, getHealthFunction, fgColor, bgColor)

  registerDamageEvents()
}

CRUTCH.UntrackUnitForSpoofing = function (this: void, unitId) {
  const trackedUnit = TRACKED_UNITS[unitId]
  if (trackedUnit !== undefined) {
    unspoofBoss(trackedUnit.unitTag)
  }
  delete TRACKED_UNITS[unitId]

  if (ZO_IsTableEmpty(TRACKED_UNITS)) {
    unregisterDamageEvents()
  }
}

CRUTCH.TrackUnitForReticleSyncing = function (this: void, name, unitId) {
  CRUTCH.dbgOther("Starting reticle tracking for " + name + " " + unitId)
  RETICLE_TRACKING_UNITS[name] = unitId

  registerReticleEvents()
}

CRUTCH.UntrackUnitForReticleSyncing = function (this: void, name) {
  CRUTCH.dbgOther("Stopping reticle tracking for " + name)
  delete RETICLE_TRACKING_UNITS[name]

  if (ZO_IsTableEmpty(RETICLE_TRACKING_UNITS)) {
    unregisterReticleEvents()
  }
}
