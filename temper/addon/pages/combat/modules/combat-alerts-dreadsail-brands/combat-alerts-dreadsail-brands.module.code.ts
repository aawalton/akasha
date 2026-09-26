import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export const FIREBRAND_ID = 166472
export const FROSTBRAND_ID = 166482
const FIREBRANDS: string[] = []
const FROSTBRANDS: string[] = []
const BRAND_SPOTS = [
  { x: 68548, y: 36075, z: 85175, displayName: "entrance" },
  { x: 69510, y: 36075, z: 85172, displayName: "center" },
]

let lastStacks = 0

function stackBrands(
  this: void,
  abilityId: number,
  hitValue: number,
  sourceUnitId: number
): undefined {
  if (FIREBRANDS.length !== 2 || FROSTBRANDS.length !== 2) {
    return
  }

  if (GetGameTimeMilliseconds() - lastStacks < 3000) {
    ZO_ClearTable(FIREBRANDS)
    ZO_ClearTable(FROSTBRANDS)
    return
  }
  lastStacks = GetGameTimeMilliseconds()

  table.sort(FIREBRANDS, (a, b) => GetUnitDisplayName(a) < GetUnitDisplayName(b))
  table.sort(FROSTBRANDS, (a, b) => GetUnitDisplayName(a) < GetUnitDisplayName(b))

  let mySpot: number | undefined
  let partner: string | undefined
  for (let i = 0; i < 2; i++) {
    const firebrand = FIREBRANDS[i] as string
    const frostbrand = FROSTBRANDS[i] as string
    if (AreUnitsEqual("player", firebrand)) {
      mySpot = i
      partner = frostbrand
    } else if (AreUnitsEqual("player", frostbrand)) {
      mySpot = i
      partner = firebrand
    }

    if (CRUTCH.savedOptions.general.showRaidDiag) {
      CRUTCH.msg(
        string.format(
          "Brands: %s & %s (%s)",
          GetUnitDisplayName(firebrand),
          GetUnitDisplayName(frostbrand),
          BRAND_SPOTS[i]?.displayName
        )
      )
    }
  }

  if (mySpot !== undefined) {
    const spot = BRAND_SPOTS[mySpot] as (typeof BRAND_SPOTS)[number]
    const label = string.format(
      "|cAAAAAASuggested stack: |cff00ff%s (%s)",
      GetUnitDisplayName(partner as string),
      spot.displayName
    )
    CRUTCH.DisplayNotification(abilityId, label, hitValue, sourceUnitId, 0, 0, 0, 0, 0, 0, false)

    const key = CRUTCH.Drawing.CreatePlacedIcon(
      "/esoui/art/actionbar/stateoverlay_vulnerable.dds",
      spot.x,
      spot.y + 75,
      spot.z,
      150,
      [1, 0, 1]
    )
    zo_callLater(() => {
      CRUTCH.Drawing.RemovePlacedIcon(key)
    }, hitValue)
  }

  ZO_ClearTable(FIREBRANDS)
  ZO_ClearTable(FROSTBRANDS)
}

export function onFirebrand(
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
  hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number
): undefined {
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]
  if (unitTag === undefined) {
    CRUTCH.dbgOther(`|cFF0000Brand couldn't find tag for ${targetUnitId}`)
    return
  }
  FIREBRANDS.push(unitTag)
  stackBrands(abilityId, hitValue, sourceUnitId)
}

export function onFrostbrand(
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
  hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number
): undefined {
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]
  if (unitTag === undefined) {
    CRUTCH.dbgOther(`|cFF0000Brand couldn't find tag for ${targetUnitId}`)
    return
  }
  FROSTBRANDS.push(unitTag)
  stackBrands(abilityId, hitValue, sourceUnitId)
}

export function clearBrands(this: void): undefined {
  ZO_ClearTable(FIREBRANDS)
  ZO_ClearTable(FROSTBRANDS)
}

export const ELIXIR_ID = 170547

export function onElixir(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  targetName: string,
  _targetType: number,
  _hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  targetUnitId: number
): undefined {
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]

  if (unitTag === undefined) {
    CRUTCH.dbgOther(
      zo_strformat(
        "|cFF0000Elixir couldn't find unit tag for <<1>> ID <<2>>",
        targetName,
        targetUnitId
      )
    )
    return
  }

  CRUTCH.dbgSpam(zo_strformat("Elixir on <<1>> (<<2>>)", targetName, unitTag))
  const [, x, y, z] = GetUnitRawWorldPosition(unitTag)
  const key = CRUTCH.Drawing.CreatePlacedIcon(
    "/esoui/art/inventory/inventory_consumables_tabicon_active.dds",
    x,
    y + 50,
    z,
    100,
    [1, 0, 1]
  )
  zo_callLater(() => {
    CRUTCH.Drawing.RemovePlacedIcon(key)
  }, 16300)
}
