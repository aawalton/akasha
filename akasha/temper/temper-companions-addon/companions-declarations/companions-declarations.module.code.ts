import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-interface-extra-2"

declare global {
  interface FcoFishingManager {
    StartInteraction: (this: FcoFishingManager) => undefined
  }

  const FISHING_MANAGER: FcoFishingManager | undefined

  const INTERACTIVE_WHEEL_MANAGER: FcoFishingManager | undefined

  const ZO_Store_IsShopping: (this: void) => boolean

  interface FcoSceneFragment {
    IsShowing: (this: FcoSceneFragment) => boolean
  }

  const COMPANION_OVERVIEW_KEYBOARD_FRAGMENT: FcoSceneFragment

  interface RapportBar {
    control: Control
    valueLabel?: LabelControl
  }

  interface RapportOverviewKeyboard {
    rapportBar: RapportBar
  }

  const FCOCO_NO_COMPANION_UNLOCKED_YET: number

  const FCOCO_TOGGLE_COMPANION: number

  const FCOCO_LAM_SV_MODE: number

  const FCOCO_LAM_SV_MODE_TT: number

  const FCOCO_LAM_SV_EACH_CHARACTER: number

  const FCOCO_LAM_SV_ACCOUNT_WIDE: number

  const FCOCO_LAM_SETTING_HEADER_CRAFTING: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_CRAFTING_TABLE: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_CRAFTING_TABLE_TT: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_CRAFTING_TABLE: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_CRAFTING_TABLE_TT: number

  const FCOCO_LAM_SETTING_HEADER_BANKS: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_BANK: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_BANK_TT: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_BANK: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_BANK_TT: number

  const FCOCO_LAM_SETTING_HEADER_VENDORS: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_VENDOR: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_VENDOR_TT: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_VENDOR: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_VENDOR_TT: number

  const FCOCO_LAM_SETTING_HEADER_FISHING: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_FISHING: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_FISHING_TT: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING_TT: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING_DELAY: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING_DELAY_TT: number

  const FCOCO_LAM_SETTING_HEADER_CROUCH: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING_TT: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING_NO_COMBAT: number

  const FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING_NO_COMBAT_TT: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING_TT: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING_DELAY: number

  const FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING_DELAY_TT: number

  const FCOCO_LAM_SETTING_HEADER_COMPASS: number

  const FCOCO_LAM_SETTING_DISABLE_PIN_AT_COMPASS: number

  const FCOCO_LAM_SETTING_DISABLE_PIN_AT_COMPASS_TT: number

  interface TemperCharactersTabManager {
    RegisterExternalTab: (
      this: void,
      tabDef: { id: string; title: string; subTabs: { id: string; title: string }[] },
      creators: Record<string, (this: void, container: Control) => Control>,
      refreshers: Record<string, (this: void) => undefined>
    ) => undefined
    RefreshActivePanel: (this: void) => undefined
    SelectTopTab: (this: void, tabId: string, subTabId?: string) => undefined
    SelectSubTab: (this: void, parentTabId: string, subTabId: string) => undefined
  }

  interface TemperCharactersSavedVariables {
    navigation: {
      selectedTab: string
      selectedSubTab: string
      windowPosition?: { left: number; top: number }
    }
    account: { achievements: Record<string, unknown> }
    characters: Record<string, { companionRapport?: Record<number, number> }>
  }

  const TemperCharacters: {
    getSavedVariables: (this: void) => TemperCharactersSavedVariables
    HideWindow: (this: void) => undefined
    ShowWindow: (this: void) => undefined
    ToggleWindow: (this: void) => undefined
    scheduleTaskAutoCompletionCheck: (this: void) => undefined
    TabManager: TemperCharactersTabManager
  }

  const TemperInventory: {
    getSavedVariables: (this: void) => {
      automation?: {
        characters: Record<string, { equipment?: boolean; food?: boolean; potions?: boolean }>
        companions: Record<string, { equipment?: boolean; skills?: boolean }>
      }
    }
  }
}
