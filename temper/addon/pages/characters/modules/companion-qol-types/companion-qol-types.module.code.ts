export interface CompanionQolSettings {
  language?: number
  saveMode?: number

  alwaysUseClientLanguage?: boolean

  companionIsSummoned: boolean
  lastCompanionId?: number

  unSummonAtCraftingTables: boolean
  reSummonAfterCraftingTables: boolean
  unSummonAtBanks: boolean
  reSummonAfterBanks: boolean
  unSummonAtVendors: boolean
  reSummonAfterVendors: boolean
  unSummonAtFishing: boolean
  reSummonAfterFishing: boolean
  reSummonAfterFishingDelay: number
  disableCompanionAtCompass: boolean
  unSummonAtCrouching: boolean
  unSummonAtCrouchingNoCombat: boolean
  reSummonAfterCrouching: boolean
  reSummonAfterCrouchingDelay: number
}

export interface CompanionQolDefaultSettings {
  language: number
  saveMode: number
}

export interface AddonVars {
  addonSavedVarsVersion: string
  addonSavedVarsVersionPerToon: string
  addonSavedVarsForAllTable: string
  addonSavedVarsNormalTable: string
  addonName: string
  addonNameMenu: string
  addonNameMenuDisplay: string
  addonSavedVariablesName: string
  addonSavedVariablesNamePerToon: string
}

export interface SettingsVars {
  defaultSettings: CompanionQolDefaultSettings
  settings: CompanionQolSettings
  settingsPerToon: CompanionQolSettings
  defaults: CompanionQolSettings
  defaultsPerToon: CompanionQolSettings
}

export type CompanionInfo = Record<number, number>
