import { SAVED_VARIABLES_NAME } from "../item-browser-constants/item-browser-constants.module.code.ts"

export interface ExternalTooltipsVars {
  enableExtension: boolean
  showPieces: number
  showAccounts: number
}

export interface ItemBrowserVars {
  filterId: number
  usePercentage: boolean
  externalTooltips: ExternalTooltipsVars
  favorites: { [setId: number]: boolean | undefined }
}

const DEFAULTS: ItemBrowserVars = {
  filterId: 1,
  usePercentage: false,
  externalTooltips: {
    enableExtension: true,
    showPieces: 1,
    showAccounts: 1,
  },
  favorites: {},
}

function legacyBooleanToNumber(this: void, value: unknown): number {
  return value === true ? 1 : 0
}

export function migrateSettings(this: void, vars: ItemBrowserVars): undefined {
  const ett = vars.externalTooltips
  if (type(ett.showPieces) === "boolean") {
    ett.showPieces = legacyBooleanToNumber(ett.showPieces)
    ett.showAccounts = legacyBooleanToNumber(ett.showAccounts)
  }
  return undefined
}

export function initializeSavedVariables(this: void): ItemBrowserVars {
  return ZO_SavedVars.NewAccountWide(
    SAVED_VARIABLES_NAME,
    1,
    undefined,
    DEFAULTS,
    undefined,
    "$InstallationWide"
  )
}
