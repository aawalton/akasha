import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent/combat-alerts-alerts-prominent.module.code.ts"
import type { ProminentDisplayData } from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent/combat-alerts-alerts-prominent.module.code.ts"
import { PROMINENT_DATA_A } from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent-data-a/combat-alerts-alerts-prominent-data-a.module.code.ts"
import { PROMINENT_DATA_B } from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent-data-b/combat-alerts-alerts-prominent-data-b.module.code.ts"
import { PROMINENT_DATA_C } from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent-data-c/combat-alerts-alerts-prominent-data-c.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { optionSection } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"
import { luaTruthy } from "akasha/temper/addon/pages/items/crafting-station/modules/price-lua-truthy/price-lua-truthy.module.code.ts"

export type ProminentFilterFunction = (
  this: void,
  hitValue: number,
  effectUnitId: number
) => boolean

export interface ProminentFilters {
  [filter: number]: number | string
  filterFunction?: ProminentFilterFunction
}

export interface AlertSettingData {
  name: string
  title: string
  description: string
  checkOldForDefault?: boolean
  default?: boolean
}

export interface ProminentAbility extends ProminentDisplayData {
  event: number
  filters: ProminentFilters
  preMillis?: number
  hitValueOverride?: number
  settings: AlertSettingData
}

export interface ProminentZone {
  settingsSubcategory: string
  [abilityId: number]: ProminentAbility
}

export type SettingsControl = Record<string, unknown>

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    GetProminentSettings: (
      this: void,
      zoneId: number,
      controls: Record<string, unknown>[]
    ) => Record<string, unknown>[]
  }
}

const PROMINENT_DATA: Record<number, ProminentZone> = {}
for (const part of [PROMINENT_DATA_A, PROMINENT_DATA_B, PROMINENT_DATA_C]) {
  for (const [zoneId, zoneData] of pairs(part)) {
    PROMINENT_DATA[zoneId] = zoneData
  }
}

function getProminentSetting(
  this: void,
  subcategory: string,
  settingsData: AlertSettingData
): SettingsControl {
  return {
    type: "checkbox",
    name: settingsData.title,
    tooltip: settingsData.description,
    default: settingsData.default,
    getFunc: () => optionSection(CRUTCH.savedOptions, subcategory)[settingsData.name],
    setFunc: (value: boolean) => {
      optionSection(CRUTCH.savedOptions, subcategory)[settingsData.name] = value
      CRUTCH.OnPlayerActivated()
    },
    width: "full",
  }
}

CRUTCH.GetProminentSettings = function (this: void, zoneId, controls) {
  controls.push({
    type: "description",
    title: "|c08BD1DProminent Alerts|r",
    text: "These display as large, obnoxious alerts, usually with a ding sound too.",
    width: "full",
  })

  const zoneData = PROMINENT_DATA[zoneId] as ProminentZone
  const added: Record<string, boolean> = {}
  for (const [abilityId, abilityData] of pairs(zoneData)) {
    if (
      typeof abilityId === "number" &&
      typeof abilityData !== "string" &&
      added[abilityData.settings.name] !== true
    ) {
      controls.push(getProminentSetting(zoneData.settingsSubcategory, abilityData.settings))
      added[abilityData.settings.name] = true
    }
  }
  return controls
}

const resultStrings = CRUTCH.Constants.ACTION_RESULTS

function registerProminent(
  this: void,
  abilityId: number,
  abilityData: ProminentAbility
): undefined {
  const prominentCallback = (
    _eventCode: number,
    result: number,
    _isError: unknown,
    _abilityName: unknown,
    _effectUnitTag: unknown,
    _abilityGraphic: unknown,
    sourceName: unknown,
    _sourceType: unknown,
    targetName: unknown,
    _targetType: unknown,
    eventHitValue: number,
    _powerType: unknown,
    _damageType: unknown,
    _log: unknown,
    effectUnitId: number
  ) => {
    let hitValue = eventHitValue
    if (abilityData.event === EVENT_EFFECT_CHANGED && result !== EFFECT_RESULT_GAINED) {
      return
    }

    const filterFunction = abilityData.filters.filterFunction
    if (filterFunction !== undefined) {
      if (!filterFunction(hitValue, effectUnitId)) {
        return
      }
    }

    if (
      abilityData.event === EVENT_COMBAT_EVENT &&
      abilityData.filters[REGISTER_FILTER_COMBAT_RESULT] === undefined
    ) {
      CRUTCH.dbgOther(
        zo_strformat(
          "|cFF0000<<1>>: <<2>> <<3>> -> <<4>> for <<5>>",
          resultStrings[result],
          sourceName,
          GetAbilityName(abilityId),
          targetName,
          hitValue
        )
      )
    }

    if (abilityData.hitValueOverride !== undefined) {
      hitValue = abilityData.hitValueOverride
      CRUTCH.dbgOther("|cFFAA00Overriding hitValue for " + GetAbilityName(abilityId))
    }

    const preMillis = abilityData.preMillis
    if (preMillis !== undefined) {
      CRUTCH.dbgOther("Calling later " + (hitValue - preMillis))
      zo_callLater(() => {
        CRUTCH.DisplayProminent2(abilityId, abilityData)
      }, hitValue - preMillis)
    } else {
      CRUTCH.DisplayProminent2(abilityId, abilityData)
    }
  }

  const eventName = CRUTCH.name + "Prominent" + tostring(abilityId) + tostring(abilityData.event)
  EVENT_MANAGER.RegisterForEvent(eventName, abilityData.event, prominentCallback)
  EVENT_MANAGER.AddFilterForEvent(
    eventName,
    abilityData.event,
    REGISTER_FILTER_ABILITY_ID,
    abilityId
  )
  for (const [filter, value] of pairs(abilityData.filters)) {
    if (filter !== "filterFunction") {
      EVENT_MANAGER.AddFilterForEvent(eventName, abilityData.event, filter, value)
    }
  }
  CRUTCH.dbgSpam("Registered " + GetAbilityName(abilityId))
}

CRUTCH.RegisterProminents = function (this: void, zoneId) {
  const zoneData = PROMINENT_DATA[zoneId]
  if (zoneData === undefined) {
    return
  }

  for (const [abilityId, abilityData] of pairs(zoneData)) {
    if (typeof abilityId === "number" && typeof abilityData !== "string") {
      const settingsData = abilityData.settings
      const prominentEnabled = optionSection(CRUTCH.savedOptions, zoneData.settingsSubcategory)[
        settingsData.name
      ]
      if (luaTruthy(prominentEnabled)) {
        registerProminent(abilityId, abilityData)
      }
    }
  }
}

CRUTCH.UnregisterProminents = function (this: void, zoneId) {
  const zoneData = zoneId !== undefined ? PROMINENT_DATA[zoneId] : undefined
  if (zoneData === undefined) {
    return
  }

  for (const [abilityId, abilityData] of pairs(zoneData)) {
    if (typeof abilityId === "number" && typeof abilityData !== "string") {
      EVENT_MANAGER.UnregisterForEvent(
        CRUTCH.name + "Prominent" + tostring(abilityId) + tostring(abilityData.event),
        abilityData.event
      )
      CRUTCH.dbgSpam("Unregistered " + GetAbilityName(abilityId))
    }
  }
}

CRUTCH.AddProminentDefaults = function (this: void) {
  for (const [, zoneData] of pairs(PROMINENT_DATA)) {
    const subcategory = zoneData.settingsSubcategory
    for (const [abilityId, abilityData] of pairs(zoneData)) {
      if (typeof abilityId === "number" && typeof abilityData !== "string") {
        optionSection(CRUTCH.defaultOptions, subcategory)[abilityData.settings.name] =
          abilityData.settings.default
      }
    }
  }
}

CRUTCH.InitProminentV2Options = function (this: void) {
  for (const [, zoneData] of pairs(PROMINENT_DATA)) {
    const subcategory = zoneData.settingsSubcategory
    for (const [abilityId, abilityData] of pairs(zoneData)) {
      if (typeof abilityId === "number" && typeof abilityData !== "string") {
        const settingsData = abilityData.settings
        let value: boolean | undefined = settingsData.default
        if (settingsData.checkOldForDefault === true) {
          value = CRUTCH.savedOptions.general.showProminent
        }
        optionSection(CRUTCH.savedOptions, subcategory)[settingsData.name] = value
      }
    }
  }
}
