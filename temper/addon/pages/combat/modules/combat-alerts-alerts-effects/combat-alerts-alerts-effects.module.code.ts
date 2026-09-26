import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import type {
  AlertSettingData,
  SettingsControl,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent-v2/combat-alerts-alerts-prominent-v2.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { optionSection } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"
import { luaTruthy } from "akasha/temper/addon/pages/items/crafting-station/modules/price-lua-truthy/price-lua-truthy.module.code.ts"

export interface EffectFilters {
  [filter: number]: string
  filterFunction?: (this: void) => boolean
}

export interface EffectAbility {
  format: string
  duration?: number
  filters: EffectFilters
  gainedCallback?: (this: void, atName: string) => void
  fadedCallback?: (this: void, atName: string, expiredTimer: string | undefined) => void
  settings: AlertSettingData
}

export interface EffectZone {
  settingsSubcategory: string
  [abilityId: number]: EffectAbility
}

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    GetEffectSettings: (
      this: void,
      zoneId: number,
      controls: Record<string, unknown>[]
    ) => Record<string, unknown>[]
  }
}

const EFFECT_DATA: Record<number, EffectZone> = {
  [-1]: {
    settingsSubcategory: "general",
    17874: {
      format: "|cff6600<<C:1>>|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectMagmaShell",
        title: "Show Magma Shell Timer",
        description: 'Shows an "alert" timer for when your Magma Shell will expire',
      },
    },
    15957: {
      format: "|cff6600<<C:1>>|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectMagmaShell",
        title: "Show Magma Shell Timer",
        description: 'Shows an "alert" timer for when your Magma Shell will expire',
      },
    },
    17878: {
      format: "|cff6600<<C:1>>|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectMagmaShell",
        title: "Show Magma Shell Timer",
        description: 'Shows an "alert" timer for when your Magma Shell will expire',
      },
    },
    217089: {
      format: "|cf5bf42Parry|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectParry",
        title: "Show Fencer's Parry",
        description:
          'Shows an "alert" timer for your Fencer\'s Parry duration, along with when it is removed',
      },
    },
    217356: {
      format: "|cf5bf42Parry|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectParry",
        title: "Show Fencer's Parry",
        description:
          'Shows an "alert" timer for your Fencer\'s Parry duration, along with when it is removed',
      },
    },
    217195: {
      format: "|cf5bf42Parry|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectParry",
        title: "Show Fencer's Parry",
        description:
          'Shows an "alert" timer for your Fencer\'s Parry duration, along with when it is removed',
      },
    },
  },
  1051: {
    settingsSubcategory: "cloudrest",
    87346: {
      format: "|cFF00FF<<C:1>>|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectVoltaicOverload",
        title: "Show Voltaic Overload Timer",
        description:
          'Shows an "alert" timer for the duration of Voltaic Overload (barswap mechanic). Note that you still need "Show Voltaic Current timer" enabled to see Voltaic Current, which is the warning you get before Overload',
      },
    },
  },
  1478: {
    settingsSubcategory: "lucentcitadel",
    214138: {
      format: "|cFF00FF<<C:1>>|r",
      duration: 20100,
      filters: {},
      settings: {
        name: "effectFateSealer",
        title: "Show Fate Sealer Timer",
        description: 'Shows an "alert" timer for when Fate Sealer will seal your group\'s fate',
      },
    },
    213477: {
      format: "|cFF7700<<C:1>>: <<2>>|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG_PREFIX]: "group",
      },
      gainedCallback: (atName: string) => {
        if (CRUTCH.savedOptions.general.showRaidDiag) {
          CRUTCH.msg(zo_strformat("<<1>> picked up the knot", atName))
        }
      },
      fadedCallback: (atName: string, expiredTimer: string | undefined) => {
        if (CRUTCH.savedOptions.general.showRaidDiag) {
          CRUTCH.msg(
            zo_strformat("<<1>> dropped the knot with <<2>>s remaining", atName, expiredTimer)
          )
        }
      },
      settings: {
        name: "showKnotTimer",
        title: "Show Arcane Knot Timer",
        description: 'Shows an "alert" timer for the currently held Arcane Knot',
      },
    },
  },
  725: {
    settingsSubcategory: "mawoflorkhaj",
    73250: {
      format: "|cfff1ab<<C:1>>|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectShattered",
        title: "Show Shattered Timer",
        description: 'Shows an "alert" timer for how long your armor is shattered',
      },
    },
  },
  1565: {
    settingsSubcategory: "opulentordeal",
    250846: {
      format: "|cffe736<<C:1>>|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectRadiantLamplight",
        title: "Show Radiant Lamplight Timer",
        description: 'Shows an "alert" timer for when your nightlight will go out',
      },
    },
  },
  1263: {
    settingsSubcategory: "rockgrove",
    150078: {
      format: "|c7236ff<<C:1>>|r",
      filters: {
        [REGISTER_FILTER_UNIT_TAG]: "player",
      },
      settings: {
        name: "effectDeathTouch",
        title: "Show Death Touch Timer",
        description: 'Shows an "alert" timer for when your Bahsei curse will explode',
      },
    },
  },
}

function getGroupTagNumberForDisplayName(this: void, displayName: string): number | undefined {
  for (let i = 1; i <= GetGroupSize(); i++) {
    if (GetUnitDisplayName(GetGroupUnitTagByIndex(i)) === displayName) {
      return i
    }
  }
  return undefined
}

function onEffectChanged(
  this: void,
  changeType: number,
  unitTag: string,
  beginTime: number,
  endTime: number,
  abilityId: number,
  abilityData: EffectAbility
): undefined {
  const atName = GetUnitDisplayName(unitTag)
  let tagId: number | undefined
  if (unitTag === "player") {
    if (IsUnitGrouped("player")) {
      tagId = getGroupTagNumberForDisplayName(GetUnitDisplayName("player"))
    } else {
      tagId = 14
      CRUTCH.dbgSpam(
        "|cFF0000unhandled unitTag " + tostring(unitTag) + ", probably player not grouped"
      )
    }
  } else if (string.sub(unitTag, 1, 5) === "group") {
    tagId = CRUTCH.GetGroupTagNumber(unitTag)
  } else {
    tagId = 13
    CRUTCH.dbgSpam("|cFF0000unhandled unitTag " + tostring(unitTag))
  }
  const fakeSourceUnitId = 88800000 + abilityId * 100 + (tagId as number)

  if (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED) {
    const label = zo_strformat(abilityData.format, GetAbilityName(abilityId), atName)
    CRUTCH.DisplayNotification(
      abilityId,
      label,
      abilityData.duration ?? (endTime - beginTime) * 1000,
      fakeSourceUnitId,
      0,
      0,
      0,
      0,
      0,
      0,
      false
    )

    if (abilityData.gainedCallback !== undefined) {
      abilityData.gainedCallback(atName)
    }
  } else if (changeType === EFFECT_RESULT_FADED) {
    const expiredTimer = CRUTCH.Interrupted(fakeSourceUnitId)

    if (abilityData.fadedCallback !== undefined) {
      abilityData.fadedCallback(atName, expiredTimer)
    }
  }
}

const effectResults = CRUTCH.Constants.EFFECT_RESULTS

function registerEffect(this: void, abilityId: number, abilityData: EffectAbility): undefined {
  const effectCallback = (
    _eventCode: number,
    changeType: number,
    _effectSlot: number,
    _effectName: string,
    unitTag: string,
    beginTime: number,
    endTime: number
  ) => {
    const filterFunction = abilityData.filters.filterFunction
    if (filterFunction !== undefined) {
      if (!filterFunction()) {
        return
      }
    }

    CRUTCH.dbgSpam(
      zo_strformat(
        "|cFF5555<<1>>: <<2>> (<<3>>) on <<4>> (<<5>>) for <<6>> (<<7>> to <<8>>)",
        effectResults[changeType],
        GetAbilityName(abilityId),
        abilityId,
        GetUnitDisplayName(unitTag),
        unitTag,
        (endTime - beginTime) * 1000,
        beginTime,
        endTime
      )
    )

    onEffectChanged(changeType, unitTag, beginTime, endTime, abilityId, abilityData)
  }

  const eventName = CRUTCH.name + "EffectAlert" + tostring(abilityId)
  EVENT_MANAGER.RegisterForEvent(eventName, EVENT_EFFECT_CHANGED, effectCallback)
  EVENT_MANAGER.AddFilterForEvent(
    eventName,
    EVENT_EFFECT_CHANGED,
    REGISTER_FILTER_ABILITY_ID,
    abilityId
  )
  for (const [filter, value] of pairs(abilityData.filters)) {
    if (filter !== "filterFunction") {
      EVENT_MANAGER.AddFilterForEvent(eventName, EVENT_EFFECT_CHANGED, filter, value)
    }
  }
  CRUTCH.dbgSpam("Registered " + GetAbilityName(abilityId))
}

CRUTCH.RegisterEffects = function (this: void, zoneId) {
  if (zoneId !== -1) {
    CRUTCH.RegisterEffects(-1)
  }

  const zoneData = EFFECT_DATA[zoneId]
  if (zoneData === undefined) {
    return
  }

  for (const [abilityId, abilityData] of pairs(zoneData)) {
    if (
      typeof abilityId === "number" &&
      typeof abilityData !== "string" &&
      luaTruthy(
        optionSection(CRUTCH.savedOptions, zoneData.settingsSubcategory)[abilityData.settings.name]
      )
    ) {
      registerEffect(abilityId, abilityData)
    }
  }
}

CRUTCH.UnregisterEffects = function (this: void, zoneId) {
  if (zoneId !== -1) {
    CRUTCH.UnregisterEffects(-1)
  }

  const zoneData = zoneId !== undefined ? EFFECT_DATA[zoneId] : undefined
  if (zoneData === undefined) {
    return
  }

  for (const [abilityId] of pairs(zoneData)) {
    if (typeof abilityId === "number") {
      EVENT_MANAGER.UnregisterForEvent(
        CRUTCH.name + "EffectAlert" + tostring(abilityId),
        EVENT_EFFECT_CHANGED
      )
      CRUTCH.dbgSpam("Unregistered " + GetAbilityName(abilityId))
    }
  }
}

function getEffectSetting(
  this: void,
  subcategory: string,
  settingsData: AlertSettingData
): SettingsControl {
  return {
    type: "checkbox",
    name: settingsData.title,
    tooltip: settingsData.description,
    default: true,
    getFunc: () => optionSection(CRUTCH.savedOptions, subcategory)[settingsData.name],
    setFunc: (value: boolean) => {
      optionSection(CRUTCH.savedOptions, subcategory)[settingsData.name] = value
      CRUTCH.OnPlayerActivated()
    },
    width: "full",
  }
}

CRUTCH.GetEffectSettings = function (this: void, zoneId, controls) {
  controls.push({
    type: "description",
    title: "|c08BD1DEffect Timers|r",
    text: "These are curated timers that display alongside incoming begin/gained casts, usually for specific timed mechanics such as debuffs on yourself.",
    width: "full",
  })

  const zoneData = EFFECT_DATA[zoneId] as EffectZone
  const added: Record<string, boolean> = {}
  for (const [abilityId, abilityData] of pairs(zoneData)) {
    if (typeof abilityId === "number" && typeof abilityData !== "string") {
      if (added[abilityData.settings.name] !== true) {
        controls.push(getEffectSetting(zoneData.settingsSubcategory, abilityData.settings))
        added[abilityData.settings.name] = true
      }
    }
  }
  return controls
}

CRUTCH.AddEffectDefaults = function (this: void) {
  for (const [, zoneData] of pairs(EFFECT_DATA)) {
    const subcategory = zoneData.settingsSubcategory
    for (const [abilityId, abilityData] of pairs(zoneData)) {
      if (typeof abilityId === "number" && typeof abilityData !== "string") {
        optionSection(CRUTCH.defaultOptions, subcategory)[abilityData.settings.name] = true
      }
    }
  }
}
