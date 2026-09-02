import {
  DEFAULT_COLORS,
  type MarkerState,
} from "../writ-mark-constants/writ-mark-constants.module.code.ts"

export interface MwimSavedVars {
  inventoryTweaks?: boolean
  motifChar?: string
  requireMats?: boolean
  doable?: number
  completed?: number
  unknown?: number
}

interface MwimGlobalTable {
  TemperMasterWritInventoryMarker_SavedVariables?: Record<string, MwimSavedVars>
}

function asGlobalTable(this: void, value: unknown): MwimGlobalTable {
  return value as MwimGlobalTable
}

let sv: MwimSavedVars | undefined

export function initSavedVariables(this: void): undefined {
  const server = LibCodesCommonCode.GetServerName()
  const globals = asGlobalTable(globalThis)
  let saved = globals.TemperMasterWritInventoryMarker_SavedVariables
  if (saved === undefined) {
    saved = {}
    globals.TemperMasterWritInventoryMarker_SavedVariables = saved
  }
  if (saved[server] === undefined) {
    saved[server] = {}
  }
  sv = saved[server]
  return undefined
}

export function getSv(this: void): MwimSavedVars {
  if (sv === undefined) {
    throw new Error("TemperMasterWritInventoryMarker saved variables not initialized")
  }
  return sv
}

export function areInventoryTweaksEnabled(this: void): boolean {
  return getSv().inventoryTweaks !== false
}

export function getMotifCharId(this: void): string | undefined {
  const motifChar = getSv().motifChar
  if (motifChar === "current") {
    return undefined
  }
  if (typeof motifChar === "string" && zo_strlen(motifChar) === 16) {
    return motifChar
  }
  const char = LibCharacterKnowledge.GetCharacterList()[0]
  return char !== undefined ? char.id : undefined
}

export function getMarkerColor(this: void, key: MarkerState): number {
  const stored = getSv()[key]
  if (typeof stored === "number") {
    return stored
  }
  return DEFAULT_COLORS[key]
}
