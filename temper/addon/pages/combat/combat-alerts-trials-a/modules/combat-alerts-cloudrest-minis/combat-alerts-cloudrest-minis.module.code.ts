import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-utils/combat-alerts-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import type { BossThresholds } from "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"
import type { CrutchStringId } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-ids/combat-alerts-lang-ids.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchCloudrest {
    RegisterMinis: (this: void) => void
    UnregisterMinis: (this: void) => void
  }
}

interface MiniData {
  unitTag: string
  fgColor: number[]
  bgColor: number[]
  detectIds: number[]
}

const CR = CRUTCH.Cloudrest
const C = CRUTCH.Constants

function isZmaja(this: void): boolean {
  return (
    zo_strformat(SI_UNIT_NAME, GetUnitName("boss1")) ===
    CRUTCH.GetCapitalizedString(crutchString("CRUTCH_BHB_ZMAJA"))
  )
}

function getBossName(this: void, id: CrutchStringId): string {
  return CRUTCH.GetCapitalizedString(crutchString(id))
}

const MINI_NAMES = [
  getBossName("CRUTCH_BHB_SHADE_OF_SIRORIA"),
  getBossName("CRUTCH_BHB_SHADE_OF_RELEQUEN"),
  getBossName("CRUTCH_BHB_SHADE_OF_GALENWE"),
]

let numMinisToSpoof = 0

const MINI_DATA: Record<string, MiniData> = {
  [getBossName("CRUTCH_BHB_SHADE_OF_SIRORIA")]: {
    unitTag: "boss2",
    fgColor: C.FELMS_FG,
    bgColor: C.FELMS_BG,
    detectIds: [103531],
  },
  [getBossName("CRUTCH_BHB_SHADE_OF_RELEQUEN")]: {
    unitTag: "boss3",
    fgColor: [7 / 255, 87 / 255, 179 / 255],
    bgColor: [1 / 255, 11 / 255, 23 / 255],
    detectIds: [103555],
  },
  [getBossName("CRUTCH_BHB_SHADE_OF_GALENWE")]: {
    unitTag: "boss4",
    fgColor: C.LLOTHIS_FG,
    bgColor: C.LLOTHIS_BG,
    detectIds: [],
  },
}

let totalMinis = 0
const KNOWN_MINIS: Record<string, string> = {}

const TRACKED_UNITS: Record<number, string> = {}

function getTrackedId(this: void, unitTag: string): number | undefined {
  for (const [id, tag] of pairs(TRACKED_UNITS)) {
    if (tag === unitTag) return id
  }
  return undefined
}

function getMiniNumber(this: void, name: string): number {
  if (name === getBossName("CRUTCH_BHB_SHADE_OF_SIRORIA")) {
    return 2
  } else if (name === getBossName("CRUTCH_BHB_SHADE_OF_GALENWE")) {
    return totalMinis + 1
  } else {
    if (totalMinis === 1) return 2
    if (KNOWN_MINIS[getBossName("CRUTCH_BHB_SHADE_OF_SIRORIA")] !== undefined) return 3
    return 2
  }
}

function onMiniMechanicEvent(this: void, name: string): undefined {
  const tag = `boss${getMiniNumber(name)}`
  KNOWN_MINIS[tag] = name
  for (const id of (MINI_DATA[name] as MiniData).detectIds) {
    CRUTCH.UnregisterForCombatEvent(`CRMiniDetect${id}`)
  }

  if (getTrackedId(tag) !== undefined) {
    CRUTCH.TrackUnitForReticleSyncing(name, getTrackedId(tag) as number)
    CRUTCH.dbgOther("mini was already spawned")
  }
}

function onNumMinisDetected(this: void): undefined {
  if (totalMinis === 3) {
    for (let i = 0; i < MINI_NAMES.length; i++) {
      const name = MINI_NAMES[i] as string
      const tag = `boss${i + 2}`
      KNOWN_MINIS[tag] = name

      if (getTrackedId(tag) !== undefined) {
        CRUTCH.TrackUnitForReticleSyncing(name, getTrackedId(tag) as number)
        CRUTCH.dbgOther("mini was already spawned")
      }
    }
    return
  }

  for (const [name, data] of pairs(MINI_DATA)) {
    for (const id of data.detectIds) {
      CRUTCH.RegisterForCombatEvent(
        `CRMiniDetect${id}`,
        () => {
          CRUTCH.dbgOther(`|cFF9900Detected ${GetAbilityName(id)}`)
          onMiniMechanicEvent(name)
        },
        undefined,
        id
      )
    }
  }
}

function maybeStartTracking(
  this: void,
  unitName: string,
  unitId: number,
  abilityId: number
): undefined {
  if (TRACKED_UNITS[unitId] !== undefined) return
  const miniMaxHealth =
    GetCurrentZoneDungeonDifficulty() === DUNGEON_DIFFICULTY_VETERAN ? 13971720 : 6816516

  TRACKED_UNITS[unitId] = `boss${2 + NonContiguousCount(TRACKED_UNITS)}`
  const unitTag = TRACKED_UNITS[unitId]
  CRUTCH.dbgOther(
    zo_strformat("found <<1>> via <<2>> (<<3>>)", unitName, GetAbilityName(abilityId), abilityId)
  )

  CRUTCH.TrackUnitForSpoofing(unitId, unitName, unitTag, miniMaxHealth)
  const known = KNOWN_MINIS[unitTag]
  if (known !== undefined) {
    CRUTCH.TrackUnitForReticleSyncing(known, unitId)
    CRUTCH.dbgOther(`${known} was found first, now tracking new spawn`)
  }

  numMinisToSpoof = numMinisToSpoof - 1
  if (numMinisToSpoof <= 0) {
    CRUTCH.UnregisterForCombatEvent("CRMiniSpoofDetect")
  }
}

const onMiniCombatEvent: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId,
  abilityId
) => {
  if (!isZmaja() || numMinisToSpoof <= 0) {
    CRUTCH.dbgOther("not Z'Maja")
    CRUTCH.UnregisterForCombatEvent("CRMiniSpoofDetect")
    return
  }

  maybeStartTracking("Mini", targetUnitId, abilityId)
}

const KNOWN_HEALTHS: Record<number, number[]> = { [1]: [50], [2]: [65, 35], [3]: [75, 50, 25] }
const FOUND_MINI_SHADES: Record<number, boolean> = {}
const ZMAJA_THRESHOLDS: BossThresholds = {}
let foundMinis = false

function overrideBHBThresholds(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(`${CRUTCH.name}CRBossSpeedTimeout`)

  foundMinis = true
  numMinisToSpoof = NonContiguousCount(FOUND_MINI_SHADES)
  totalMinis = numMinisToSpoof
  ZO_ClearTable(ZMAJA_THRESHOLDS)

  for (const threshold of KNOWN_HEALTHS[numMinisToSpoof] as number[]) {
    ZMAJA_THRESHOLDS[threshold] = "Mini"
  }

  CRUTCH.dbgOther(`Inferred ${numMinisToSpoof} minis, overriding thresholds...`)
  CRUTCH.BossHealthBar.AddThresholdOverride(
    CRUTCH.GetCapitalizedString(crutchString("CRUTCH_BHB_ZMAJA")),
    ZMAJA_THRESHOLDS
  )

  if (!CRUTCH.savedOptions.experimental) return
  onNumMinisDetected()
  CRUTCH.RegisterForCombatEvent(
    "CRMiniSpoofDetect",
    onMiniCombatEvent,
    ACTION_RESULT_EFFECT_GAINED,
    105541
  )
}

const onMiniBoss: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) => {
  if (foundMinis) return

  CRUTCH.dbgSpam(`detected a mini, unit ID ${targetUnitId}`)
  FOUND_MINI_SHADES[targetUnitId] = true

  EVENT_MANAGER.RegisterForUpdate(`${CRUTCH.name}CRBossSpeedTimeout`, 500, overrideBHBThresholds)
}

function untrackAll(this: void): undefined {
  for (const [unitId] of pairs(TRACKED_UNITS)) {
    CRUTCH.UntrackUnitForSpoofing(unitId)
    delete TRACKED_UNITS[unitId]
  }

  for (const name of MINI_NAMES) {
    CRUTCH.UntrackUnitForReticleSyncing(name)
  }
}

function cleanUp(this: void): undefined {
  foundMinis = false
  ZO_ClearTable(FOUND_MINI_SHADES)
  CRUTCH.BossHealthBar.RemoveThresholdOverride(
    CRUTCH.GetCapitalizedString(crutchString("CRUTCH_BHB_ZMAJA"))
  )

  numMinisToSpoof = 0
  totalMinis = 0
  untrackAll()
  ZO_ClearTable(KNOWN_MINIS)

  for (const [, data] of pairs(MINI_DATA)) {
    for (const id of data.detectIds) {
      CRUTCH.UnregisterForCombatEvent(`CRMiniDetect${id}`)
    }
  }
}

CR.RegisterMinis = function (this: void) {
  CRUTCH.RegisterExitedGroupCombatListener("ExitedCombatCloudrestMinis", cleanUp)

  if (CRUTCH.savedOptions.bossHealthBar.enabled) {
    CRUTCH.RegisterForCombatEvent(
      "CRMiniBossDetect",
      onMiniBoss,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      105541
    )
  }
}

CR.UnregisterMinis = function (this: void) {
  CRUTCH.UnregisterExitedGroupCombatListener("ExitedCombatCloudrestMinis")

  CRUTCH.UnregisterForCombatEvent("CRMiniBossDetect")

  cleanUp()
}
