import {
  ADDON_VERSION_NUMBER,
  SAVED_VARIABLES_NAME,
} from "@akasha/temper-combat-addon/combat-actions-constants"

export interface BarSettings {
  readonly barEnabled: boolean
  readonly barShowShift: boolean
  readonly barShowShiftFully: boolean
  readonly barShowShiftScalePercent: number
  readonly barShowInQuickslot: boolean
  readonly barShiftOffsetX: number
  readonly barShiftOffsetY: number
  readonly barLabelYOffset: number
  readonly barLabelYOffsetInShift: number
  readonly barStackLabelYOffset: number
  readonly barStackLabelYOffsetInShift: number
  readonly barLabelEnabled: boolean
  readonly barLabelFontName: string
  readonly barLabelFontSize: number
  readonly barLabelFontStyle: string
  readonly barStackLabelEnabled: boolean
  readonly barStackLabelFontName: string
  readonly barStackLabelFontSize: number
  readonly barStackLabelFontStyle: string
  readonly barLabelIgnoreDecimal: boolean
  readonly barLabelIgnoreDecimalThreshold: number
  readonly barLabelColor: readonly [number, number, number, number]
  readonly barLabelEndingColor: readonly [number, number, number, number]
  readonly barLowPriorityLabelColor: readonly [number, number, number, number]
  readonly barStackLabelColor: readonly [number, number, number, number]
  readonly barCooldownVisible: boolean
  readonly barCooldownColor: readonly [number, number, number, number]
  readonly barCooldownEndingSeconds: number
  readonly barCooldownEndingColor: readonly [number, number, number, number]
  readonly barCooldownOpacity: number
  readonly barCooldownThickness: number
  readonly patchMoveBarsEnabled: boolean
  readonly vampireStageLabelEnabled: boolean
}

export const DEFAULTS: BarSettings & Record<string, unknown> = {
  barEnabled: true,
  barShowShift: true,
  barShowShiftFully: false,
  barShowShiftScalePercent: 100,
  barShowInQuickslot: false,
  barShiftOffsetX: 0,
  barShiftOffsetY: 0,
  barLabelYOffset: 0,
  barLabelYOffsetInShift: 0,
  barStackLabelYOffset: 0,
  barStackLabelYOffsetInShift: 0,
  barLabelEnabled: true,
  barLabelFontName: "BOLD_FONT",
  barLabelFontSize: 18,
  barLabelFontStyle: "thick-outline",
  barStackLabelEnabled: true,
  barStackLabelFontName: "BOLD_FONT",
  barStackLabelFontSize: 18,
  barStackLabelFontStyle: "thick-outline",
  barLabelIgnoreDecimal: true,
  barLabelIgnoreDecimalThreshold: 10,
  barLabelColor: [1, 1, 1, 1],
  barLabelEndingColor: [1, 0, 0, 1],
  barLowPriorityLabelColor: [0.6, 0.6, 0.6, 1],
  barStackLabelColor: [1, 1, 1, 1],
  barCooldownVisible: true,
  barCooldownColor: [1, 1, 0, 1],
  barCooldownEndingSeconds: 1,
  barCooldownEndingColor: [1, 0, 0, 1],
  barCooldownOpacity: 100,
  barCooldownThickness: 2,
  patchMoveBarsEnabled: true,
  vampireStageLabelEnabled: true,
}

export interface CruxDiagnosticEntry {
  t: number
  changeType: number
  sourceType: number
  unitTag: string
  unitId: number
  stackCount: number
  abilityId: number
  icon: string
}

const CRUX_DIAGNOSTICS_CAP = 100

interface SavedVariables extends BarSettings {
  cruxDiagnostics: CruxDiagnosticEntry[]
}

let savedVarsInstance: SavedVariables | undefined

export function initSavedVariables(): undefined {
  const fullDefaults: SavedVariables & Record<string, unknown> = {
    ...DEFAULTS,
    cruxDiagnostics: [],
  }
  savedVarsInstance = ZO_SavedVars.NewAccountWide(
    SAVED_VARIABLES_NAME,
    ADDON_VERSION_NUMBER,
    undefined,
    fullDefaults
  )
  return undefined
}

export function recordCruxDiagnostic(entry: CruxDiagnosticEntry): undefined {
  if (savedVarsInstance === undefined) return undefined
  const ring = savedVarsInstance.cruxDiagnostics
  ring.push(entry)
  while (ring.length > CRUX_DIAGNOSTICS_CAP) {
    ring.shift()
  }
  return undefined
}

export function getSavedVariables(): BarSettings {
  if (savedVarsInstance === undefined) return DEFAULTS
  return savedVarsInstance
}
