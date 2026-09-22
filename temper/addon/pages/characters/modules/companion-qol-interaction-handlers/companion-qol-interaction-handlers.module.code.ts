import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import {
  checkForActiveCompanion,
  INTERACTIONS,
  onCollectibleUseResult,
  onEventInteractionEnded,
  onStartInteraction,
  onStealthStateChanged,
} from "akasha/temper/addon/pages/characters/modules/companion-qol-interaction-state/companion-qol-interaction-state.module.code.ts"
import { COMPANION_QOL } from "akasha/temper/addon/pages/characters/modules/companion-qol-state/companion-qol-state.module.code.ts"
import "akasha/temper/addon/pages/characters/companions-declarations/companions-declarations.type-declaration.d.ts"

COMPANION_QOL.Player_Activated = function (
  this: void,
  _eventId: number,
  _waFirst?: boolean
): undefined {
  COMPANION_QOL.UpdateCompass()

  const [isPending, isActive] = checkForActiveCompanion()
  if (isPending || isActive) {
    COMPANION_QOL.settingsVars.settings.lastCompanionId = INTERACTIONS.actualCompanionDefId
  }

  COMPANION_QOL.playerActivatedDone = true
  return undefined
}

COMPANION_QOL.Companion_Activated = function (
  this: void,
  _eventId: number,
  companionId: number
): undefined {
  if (!COMPANION_QOL.settingsVars.settings) {
    return undefined
  }
  COMPANION_QOL.settingsVars.settings.companionIsSummoned = true
  COMPANION_QOL.settingsVars.settings.lastCompanionId = companionId
  return undefined
}

COMPANION_QOL.Companion_DeActivated = function (this: void, _eventId: number): undefined {
  if (!COMPANION_QOL.settingsVars.settings) {
    return undefined
  }
  COMPANION_QOL.settingsVars.settings.companionIsSummoned = false
  return undefined
}

COMPANION_QOL.CraftingTableInteract = function (
  this: void,
  _eventId: number,
  _craftSkill: number,
  _sameStation: boolean
): undefined {
  const settings = COMPANION_QOL.settingsVars.settings
  if (!settings.unSummonAtCraftingTables) {
    INTERACTIONS.lastCompanionIdBeforeCrafting = undefined
    return undefined
  }
  const [isPending, isActive] = checkForActiveCompanion()
  if (INTERACTIONS.actualCompanionDefId !== undefined) {
    if (isActive) {
      INTERACTIONS.companionWasSummonedBefore = true
      INTERACTIONS.lastCompanionIdBeforeCrafting = INTERACTIONS.actualCompanionDefId
      COMPANION_QOL.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeCrafting, false, true)
    } else if (isPending) {
      INTERACTIONS.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${COMPANION_QOL.addonVars.addonName}_CraftingTable`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${COMPANION_QOL.addonVars.addonName}_CraftingTable`,
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
          COMPANION_QOL.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeCrafting, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

COMPANION_QOL.CraftingTableInteractEnd = function (
  this: void,
  _eventId: number,
  _craftSkill: number
): undefined {
  const settings = COMPANION_QOL.settingsVars.settings
  if (
    !settings.unSummonAtCraftingTables ||
    !settings.reSummonAfterCraftingTables ||
    INTERACTIONS.lastCompanionIdBeforeCrafting === undefined
  ) {
    INTERACTIONS.lastCompanionIdBeforeCrafting = undefined
    return undefined
  }
  COMPANION_QOL.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeCrafting, true, true)
  INTERACTIONS.lastCompanionIdBeforeCrafting = undefined
  INTERACTIONS.companionWasSummonedBefore = false
  return undefined
}

COMPANION_QOL.BankInteract = function (
  this: void,
  _eventId: number,
  _bankBagId?: number
): undefined {
  const settings = COMPANION_QOL.settingsVars.settings
  if (!settings.unSummonAtBanks) {
    INTERACTIONS.lastCompanionIdBeforeBank = undefined
    return undefined
  }
  const [isPending, isActive] = checkForActiveCompanion()
  if (INTERACTIONS.actualCompanionDefId !== undefined) {
    if (isActive) {
      INTERACTIONS.companionWasSummonedBefore = true
      INTERACTIONS.lastCompanionIdBeforeBank = INTERACTIONS.actualCompanionDefId
      COMPANION_QOL.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeBank, false, true)
    } else if (isPending) {
      INTERACTIONS.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${COMPANION_QOL.addonVars.addonName}_Bank`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${COMPANION_QOL.addonVars.addonName}_Bank`,
            EVENT_COMPANION_ACTIVATED
          )
          if (!IsBankOpen() && !IsGuildBankOpen()) {
            INTERACTIONS.lastCompanionIdBeforeBank = undefined
            return undefined
          }
          INTERACTIONS.lastCompanionIdBeforeBank = INTERACTIONS.actualCompanionDefId
          COMPANION_QOL.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeBank, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

COMPANION_QOL.BankInteractEnd = function (this: void, _eventId: number): undefined {
  const settings = COMPANION_QOL.settingsVars.settings
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

  COMPANION_QOL.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeBank, true, true)
  INTERACTIONS.lastCompanionIdBeforeBank = undefined
  INTERACTIONS.companionWasSummonedBefore = false
  return undefined
}

COMPANION_QOL.VendorInteract = function (
  this: void,
  _eventId: number,
  _allowSell?: boolean,
  _allowLaunder?: boolean
): undefined {
  const settings = COMPANION_QOL.settingsVars.settings
  if (!settings.unSummonAtVendors) {
    INTERACTIONS.lastCompanionIdBeforeVendor = undefined
    return undefined
  }
  const [isPending, isActive] = checkForActiveCompanion()
  if (INTERACTIONS.actualCompanionDefId !== undefined) {
    if (isActive) {
      INTERACTIONS.companionWasSummonedBefore = true
      INTERACTIONS.lastCompanionIdBeforeVendor = INTERACTIONS.actualCompanionDefId
      COMPANION_QOL.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeVendor, false, true)
    } else if (isPending) {
      INTERACTIONS.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${COMPANION_QOL.addonVars.addonName}_Vendor`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${COMPANION_QOL.addonVars.addonName}_Vendor`,
            EVENT_COMPANION_ACTIVATED
          )
          if (!ZO_Store_IsShopping()) {
            INTERACTIONS.lastCompanionIdBeforeVendor = undefined
            return undefined
          }
          INTERACTIONS.lastCompanionIdBeforeVendor = INTERACTIONS.actualCompanionDefId
          COMPANION_QOL.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeVendor, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

COMPANION_QOL.VendorInteractEnd = function (this: void, _eventId: number): undefined {
  const settings = COMPANION_QOL.settingsVars.settings
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

  COMPANION_QOL.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeVendor, true, true)
  INTERACTIONS.lastCompanionIdBeforeVendor = undefined
  INTERACTIONS.companionWasSummonedBefore = false
  return undefined
}

COMPANION_QOL.addonLoaded = function (this: void): undefined {
  COMPANION_QOL.getSettings()

  COMPANION_QOL.buildAddonMenu()

  SecurePostHook(
    FISHING_MANAGER ?? INTERACTIVE_WHEEL_MANAGER ?? {},
    "StartInteraction",
    onStartInteraction
  )

  const addonName = COMPANION_QOL.addonVars.addonName
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_PLAYER_ACTIVATED, COMPANION_QOL.Player_Activated)
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_COMPANION_ACTIVATED,
    COMPANION_QOL.Companion_Activated
  )
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_COMPANION_DEACTIVATED,
    COMPANION_QOL.Companion_DeActivated
  )
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_CRAFTING_STATION_INTERACT,
    COMPANION_QOL.CraftingTableInteract
  )
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_END_CRAFTING_STATION_INTERACT,
    COMPANION_QOL.CraftingTableInteractEnd
  )
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_BANK, COMPANION_QOL.BankInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_CLOSE_BANK, COMPANION_QOL.BankInteractEnd)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_GUILD_BANK, COMPANION_QOL.BankInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_CLOSE_GUILD_BANK, COMPANION_QOL.BankInteractEnd)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_STORE, COMPANION_QOL.VendorInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_FENCE, COMPANION_QOL.VendorInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_CLOSE_STORE, COMPANION_QOL.VendorInteractEnd)
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
