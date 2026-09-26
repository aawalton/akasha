import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-settings/declarations/combat-alerts-settings-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-events/combat-alerts-alerts-events.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-channels/combat-alerts-alerts-channels.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-effects/combat-alerts-alerts-effects.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent-v2/combat-alerts-alerts-prominent-v2.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel/combat-alerts-info-panel.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import type {
  IndividualIconOptions,
  OptionColor,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    DisplayDamageable: (this: void, time: number, displayFormat?: string) => void
    ShowCCProgressAll: (
      this: void,
      abilityId: number,
      result: number,
      duration: number,
      sourceName: string
    ) => void
  }
}

export const SETTINGS_STATE: { selectedIndividual: string | undefined } = {
  selectedIndividual: undefined,
}

export function getNoSubtitlesZoneIdsAndNames(
  this: void
): LuaMultiReturn<[ids: number[], names: string[]]> {
  const ids: number[] = []
  const names: string[] = []
  for (const [zoneId] of pairs(CRUTCH.savedOptions.subtitlesIgnoredZones)) {
    table.insert(ids, zoneId)
    table.insert(names, string.format("%s (%d)", GetZoneNameById(zoneId), zoneId))
  }
  return $multi(ids, names)
}

export const INDIVIDUAL_NAMES: string[] = []

export function refreshIndividualIconNames(this: void): undefined {
  ZO_ClearTable(INDIVIDUAL_NAMES)
  for (const [name] of pairs(CRUTCH.savedOptions.drawing.attached.individualIcons)) {
    table.insert(INDIVIDUAL_NAMES, name)
  }
}

export function selectedIcon(this: void): IndividualIconOptions {
  return CRUTCH.savedOptions.drawing.attached.individualIcons[
    SETTINGS_STATE.selectedIndividual as string
  ] as IndividualIconOptions
}

const ABILITY_NAMES: string[] = []
const ABILITY_IDS: number[] = []

export function updateAbilitiesToReplace(this: void): undefined {
  ZO_ClearTable(ABILITY_NAMES)
  ZO_ClearTable(ABILITY_IDS)
  for (const [id] of pairs(CRUTCH.savedOptions.rockgrove.abilitiesToReplace)) {
    table.insert(ABILITY_IDS, id)
    table.insert(ABILITY_NAMES, string.format("%s (%d)", GetAbilityName(id) ?? "", id))
  }
  TemperCombatAlerts_AbilitiesToReplace.UpdateChoices(ABILITY_NAMES, ABILITY_IDS)
}

const OC_ABILITY_NAMES: string[] = []
const OC_ABILITY_IDS: number[] = []

export function updateOCAbilitiesToReplace(this: void): undefined {
  ZO_ClearTable(OC_ABILITY_NAMES)
  ZO_ClearTable(OC_ABILITY_IDS)
  for (const [id] of pairs(CRUTCH.savedOptions.osseincage.abilitiesToReplace)) {
    table.insert(OC_ABILITY_IDS, id)
    table.insert(OC_ABILITY_NAMES, string.format("%s (%d)", GetAbilityName(id) ?? "", id))
  }
  TemperCombatAlerts_OCAbilitiesToReplace.UpdateChoices(OC_ABILITY_NAMES, OC_ABILITY_IDS)
}

export function prominentSettings(
  this: void,
  zoneId: number,
  controls: LamControlData[]
): LamControlData[] {
  const items: object[] = controls
  const result: object[] = CRUTCH.GetProminentSettings(zoneId, items as Record<string, unknown>[])
  return result as LamControlData[]
}

export function effectSettings(
  this: void,
  zoneId: number,
  controls: LamControlData[]
): LamControlData[] {
  const items: object[] = controls
  const result: object[] = CRUTCH.GetEffectSettings(zoneId, items as Record<string, unknown>[])
  return result as LamControlData[]
}

export function colorDef(this: void, color: OptionColor): ZoColorDef {
  return ZO_ColorDef.New(color[0] as number, color[1] as number, color[2] as number, color[3])
}

export function unpackColor(
  this: void,
  color: OptionColor
): LuaMultiReturn<[r: number, g: number, b: number, a?: number]> {
  return $multi(color[0] as number, color[1] as number, color[2] as number, color[3])
}
