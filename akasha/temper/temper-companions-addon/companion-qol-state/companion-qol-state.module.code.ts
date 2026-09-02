import type {
  AddonVars,
  CompanionInfo,
  SettingsVars,
} from "../companion-qol-types/companion-qol-types.module.code.ts"

export interface FCOCO {
  addonVars: AddonVars

  LAM: unknown

  companionInfo: CompanionInfo
  isCompanionUnlocked: boolean

  playerActivatedDone: boolean

  settingsVars: SettingsVars

  FCOSettingsPanel: unknown

  ToggleCompanion: (
    this: void,
    companionIdToShow?: number,
    doShow?: boolean,
    onlyIfLastCompanionWasKnown?: boolean
  ) => void

  UpdateCompass: (this: void) => void

  getSettings: (this: void) => void

  Player_Activated: (this: void, eventId: number, waFirst?: boolean) => void
  Companion_Activated: (this: void, eventId: number, companionId: number) => void
  Companion_DeActivated: (this: void, eventId: number) => void
  CraftingTableInteract: (
    this: void,
    eventId: number,
    craftSkill: number,
    sameStation: boolean
  ) => void
  CraftingTableInteractEnd: (this: void, eventId: number, craftSkill: number) => void
  BankInteract: (this: void, eventId: number, bankBagId?: number) => void
  BankInteractEnd: (this: void, eventId: number) => void
  VendorInteract: (this: void, eventId: number, allowSell?: boolean, allowLaunder?: boolean) => void
  VendorInteractEnd: (this: void, eventId: number) => void
  addonLoaded: (this: void, eventName: string, addon: string) => void
  initialize: (this: void) => void

  buildAddonMenu: (this: void) => boolean | undefined
}

function asFCOCO(value: unknown): FCOCO {
  return value as FCOCO
}

function asSettingsVars(value: unknown): SettingsVars {
  return value as SettingsVars
}

export const FCOCO: FCOCO = asFCOCO({
  isCompanionUnlocked: false,
  playerActivatedDone: false,
  companionInfo: {},
  settingsVars: asSettingsVars({
    defaultSettings: {},
    settings: {},
    settingsPerToon: {},
    defaults: {},
    defaultsPerToon: {},
  }),
})
