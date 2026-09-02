import "@akasha/temper-eso-types/eso-api-2"
import "@akasha/temper-eso-types/eso-enums-02"
import "@akasha/temper-eso-types/eso-enums-06"
import "@akasha/temper-eso-types/eso-enums-15"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-interface-extra-2"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-language-extensions"
import {
  checkForActiveCompanion,
  INTERACTIONS,
  onCollectibleUseResult,
  onEventInteractionEnded,
  onStartInteraction,
  onStealthStateChanged,
} from "../companion-qol-interaction-state/companion-qol-interaction-state.module.code.ts"
import { FCOCO } from "../companion-qol-state/companion-qol-state.module.code.ts"

FCOCO.Player_Activated = function (this: void, _eventId: number, _waFirst?: boolean): undefined {
  FCOCO.UpdateCompass()

  const [isPending, isActive] = checkForActiveCompanion()
  if (isPending || isActive) {
    FCOCO.settingsVars.settings.lastCompanionId = INTERACTIONS.actualCompanionDefId
  }

  FCOCO.playerActivatedDone = true
  return undefined
}

FCOCO.Companion_Activated = function (
  this: void,
  _eventId: number,
  companionId: number
): undefined {
  if (!FCOCO.settingsVars.settings) {
    return undefined
  }
  FCOCO.settingsVars.settings.companionIsSummoned = true
  FCOCO.settingsVars.settings.lastCompanionId = companionId
  return undefined
}

FCOCO.Companion_DeActivated = function (this: void, _eventId: number): undefined {
  if (!FCOCO.settingsVars.settings) {
    return undefined
  }
  FCOCO.settingsVars.settings.companionIsSummoned = false
  return undefined
}

FCOCO.CraftingTableInteract = function (
  this: void,
  _eventId: number,
  _craftSkill: number,
  _sameStation: boolean
): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtCraftingTables) {
    INTERACTIONS.lastCompanionIdBeforeCrafting = undefined
    return undefined
  }
  const [isPending, isActive] = checkForActiveCompanion()
  if (INTERACTIONS.actualCompanionDefId !== undefined) {
    if (isActive) {
      INTERACTIONS.companionWasSummonedBefore = true
      INTERACTIONS.lastCompanionIdBeforeCrafting = INTERACTIONS.actualCompanionDefId
      FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeCrafting, false, true)
    } else if (isPending) {
      INTERACTIONS.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${FCOCO.addonVars.addonName}_CraftingTable`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${FCOCO.addonVars.addonName}_CraftingTable`,
            EVENT_COMPANION_ACTIVATED
          )
          if (
            !ZO_CraftingUtils_IsCraftingWindowOpen() &&
            !ZO_CraftingUtils_IsPerformingCraftProcess()
          ) {
            INTERACTIONS.lastCompanionIdBeforeCrafting = undefined
            return undefined
          }
          INTERACTIONS.lastCompanionIdBeforeCrafting = INTERACTIONS.actualCompanionDefId
          FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeCrafting, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

FCOCO.CraftingTableInteractEnd = function (
  this: void,
  _eventId: number,
  _craftSkill: number
): undefined {
  const settings = FCOCO.settingsVars.settings
  if (
    !settings.unSummonAtCraftingTables ||
    !settings.reSummonAfterCraftingTables ||
    INTERACTIONS.lastCompanionIdBeforeCrafting === undefined
  ) {
    INTERACTIONS.lastCompanionIdBeforeCrafting = undefined
    return undefined
  }
  FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeCrafting, true, true)
  INTERACTIONS.lastCompanionIdBeforeCrafting = undefined
  INTERACTIONS.companionWasSummonedBefore = false
  return undefined
}

FCOCO.BankInteract = function (this: void, _eventId: number, _bankBagId?: number): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtBanks) {
    INTERACTIONS.lastCompanionIdBeforeBank = undefined
    return undefined
  }
  const [isPending, isActive] = checkForActiveCompanion()
  if (INTERACTIONS.actualCompanionDefId !== undefined) {
    if (isActive) {
      INTERACTIONS.companionWasSummonedBefore = true
      INTERACTIONS.lastCompanionIdBeforeBank = INTERACTIONS.actualCompanionDefId
      FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeBank, false, true)
    } else if (isPending) {
      INTERACTIONS.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${FCOCO.addonVars.addonName}_Bank`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${FCOCO.addonVars.addonName}_Bank`,
            EVENT_COMPANION_ACTIVATED
          )
          if (!IsBankOpen() && !IsGuildBankOpen()) {
            INTERACTIONS.lastCompanionIdBeforeBank = undefined
            return undefined
          }
          INTERACTIONS.lastCompanionIdBeforeBank = INTERACTIONS.actualCompanionDefId
          FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeBank, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

FCOCO.BankInteractEnd = function (this: void, _eventId: number): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtBanks || !settings.reSummonAfterBanks) {
    INTERACTIONS.lastCompanionIdBeforeBank = undefined
    return undefined
  }
  if (INTERACTIONS.lastCompanionIdBeforeBank === undefined) {
    if (
      INTERACTIONS.companionWasSummonedBefore === true &&
      settings.lastCompanionId !== undefined
    ) {
      INTERACTIONS.lastCompanionIdBeforeBank = settings.lastCompanionId
    } else {
      return undefined
    }
  }

  FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeBank, true, true)
  INTERACTIONS.lastCompanionIdBeforeBank = undefined
  INTERACTIONS.companionWasSummonedBefore = false
  return undefined
}

FCOCO.VendorInteract = function (
  this: void,
  _eventId: number,
  _allowSell?: boolean,
  _allowLaunder?: boolean
): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtVendors) {
    INTERACTIONS.lastCompanionIdBeforeVendor = undefined
    return undefined
  }
  const [isPending, isActive] = checkForActiveCompanion()
  if (INTERACTIONS.actualCompanionDefId !== undefined) {
    if (isActive) {
      INTERACTIONS.companionWasSummonedBefore = true
      INTERACTIONS.lastCompanionIdBeforeVendor = INTERACTIONS.actualCompanionDefId
      FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeVendor, false, true)
    } else if (isPending) {
      INTERACTIONS.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${FCOCO.addonVars.addonName}_Vendor`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${FCOCO.addonVars.addonName}_Vendor`,
            EVENT_COMPANION_ACTIVATED
          )
          if (!ZO_Store_IsShopping()) {
            INTERACTIONS.lastCompanionIdBeforeVendor = undefined
            return undefined
          }
          INTERACTIONS.lastCompanionIdBeforeVendor = INTERACTIONS.actualCompanionDefId
          FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeVendor, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

FCOCO.VendorInteractEnd = function (this: void, _eventId: number): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtVendors || !settings.reSummonAfterVendors) {
    INTERACTIONS.lastCompanionIdBeforeVendor = undefined
    return undefined
  }
  if (INTERACTIONS.lastCompanionIdBeforeVendor === undefined) {
    if (
      INTERACTIONS.companionWasSummonedBefore === true &&
      settings.lastCompanionId !== undefined
    ) {
      INTERACTIONS.lastCompanionIdBeforeVendor = settings.lastCompanionId
    } else {
      return undefined
    }
  }

  FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeVendor, true, true)
  INTERACTIONS.lastCompanionIdBeforeVendor = undefined
  INTERACTIONS.companionWasSummonedBefore = false
  return undefined
}

FCOCO.addonLoaded = function (this: void, eventName: string, addon: string): undefined {
  if (addon !== FCOCO.addonVars.addonName) {
    return undefined
  }
  EVENT_MANAGER.UnregisterForEvent(eventName, EVENT_ADD_ON_LOADED)

  FCOCO.getSettings()

  FCOCO.buildAddonMenu()

  SecurePostHook(
    FISHING_MANAGER ?? INTERACTIVE_WHEEL_MANAGER ?? {},
    "StartInteraction",
    onStartInteraction
  )

  const addonName = FCOCO.addonVars.addonName
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_PLAYER_ACTIVATED, FCOCO.Player_Activated)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_COMPANION_ACTIVATED, FCOCO.Companion_Activated)
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_COMPANION_DEACTIVATED,
    FCOCO.Companion_DeActivated
  )
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_CRAFTING_STATION_INTERACT,
    FCOCO.CraftingTableInteract
  )
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_END_CRAFTING_STATION_INTERACT,
    FCOCO.CraftingTableInteractEnd
  )
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_BANK, FCOCO.BankInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_CLOSE_BANK, FCOCO.BankInteractEnd)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_GUILD_BANK, FCOCO.BankInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_CLOSE_GUILD_BANK, FCOCO.BankInteractEnd)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_STORE, FCOCO.VendorInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_FENCE, FCOCO.VendorInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_CLOSE_STORE, FCOCO.VendorInteractEnd)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_COLLECTIBLE_USE_RESULT, onCollectibleUseResult)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_INTERACTION_ENDED, onEventInteractionEnded)
  EVENT_MANAGER.RegisterForEvent(
    `${addonName}_STEALTH_STATE_CHANGED`,
    EVENT_STEALTH_STATE_CHANGED,
    onStealthStateChanged
  )
  EVENT_MANAGER.AddFilterForEvent(
    `${addonName}_STEALTH_STATE_CHANGED`,
    EVENT_STEALTH_STATE_CHANGED,
    REGISTER_FILTER_UNIT_TAG,
    "player"
  )
  return undefined
}

FCOCO.initialize = function (this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    FCOCO.addonVars.addonName,
    EVENT_ADD_ON_LOADED,
    function (this: void, _eventCode: number, addon: string): undefined {
      FCOCO.addonLoaded(FCOCO.addonVars.addonName, addon)
      return undefined
    }
  )
  return undefined
}
