import { chainAtBankClosed } from "akasha/temper/addon/pages/items/modules/inventory-assistant-chain/inventory-assistant-chain.module.code.ts"
import { registerAutoMaintenanceEvents } from "akasha/temper/addon/pages/items/modules/inventory-auto-maintenance/inventory-auto-maintenance.module.code.ts"
import {
  hideBankActionPanel,
  refreshBankActionPanel,
} from "akasha/temper/addon/pages/items/modules/inventory-bank-action-panel/inventory-bank-action-panel.module.code.ts"
import {
  beginBankProfile,
  scheduleBankProfileFinalize,
} from "akasha/temper/addon/pages/items/modules/inventory-bank-profile/inventory-bank-profile.module.code.ts"
import {
  beginBankTrace,
  finishBankOpenHandler,
  markBankClosed,
  recordBankPhaseMs,
  recordSettlingMs,
} from "akasha/temper/addon/pages/items/modules/inventory-bank-trace/inventory-bank-trace.module.code.ts"
import { getInventoryConfig } from "akasha/temper/addon/pages/items/modules/inventory-config/inventory-config.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import {
  scanAccountCurrencies,
  scanBankedCurrencies,
  scanCharacterCurrencies,
  updateCurrency,
} from "akasha/temper/addon/pages/items/modules/inventory-currency/inventory-currency.module.code.ts"
import {
  addPlacedFurnishing,
  removePlacedFurnishing,
  scanPlacedFurnishings,
} from "akasha/temper/addon/pages/items/modules/inventory-furnishing-scanner/inventory-furnishing-scanner.module.code.ts"
import {
  recomputeNetWorthAndUpdateHud,
  reseedNetWorthBaseline,
  resetSession,
} from "akasha/temper/addon/pages/items/modules/inventory-hud-fields/inventory-hud-fields.module.code.ts"
import {
  flushJunkGate,
  openJunkGate,
} from "akasha/temper/addon/pages/items/modules/inventory-junk-queue/inventory-junk-queue.module.code.ts"
import {
  recordFullScan,
  scanBankBags,
  scanCompanionWorn,
  scanCraftBag,
  scanCurrentFurnitureVault,
  scanCurrentGuildBank,
  scanHouseBanks,
  scanPersonalBags,
  updateSlot,
} from "akasha/temper/addon/pages/items/modules/inventory-ops/inventory-ops.module.code.ts"
import { annotateContainerIfPending } from "akasha/temper/addon/pages/items/modules/inventory-quest-annotations/inventory-quest-annotations.module.code.ts"
import {
  clearPendingAction,
  getPendingAction,
  isPendingActionStale,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { captureCraftingLevels } from "akasha/temper/addon/pages/items/modules/inventory-rules-core-inspire/inventory-rules-core-inspire.module.code.ts"
import {
  isDispatchingBank,
  onOpenBank,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-bank/inventory-rules-dispatch-bank.module.code.ts"
import { isPacedBankRunning } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-bank-paced/inventory-rules-dispatch-bank-paced.module.code.ts"
import { dispatchEquipActions } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-equip/inventory-rules-dispatch-equip.module.code.ts"
import { onOpenGuildBank } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-guild-crafting/inventory-rules-dispatch-guild-crafting.module.code.ts"
import { dispatchGuildBankCurrency } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-guild-currency/inventory-rules-dispatch-guild-currency.module.code.ts"
import { isOpenQueueActive } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-open-queue/inventory-rules-dispatch-open-queue.module.code.ts"
import { dispatchUnlockActions } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-unlock/inventory-rules-dispatch-unlock.module.code.ts"
import {
  dispatchSafeOpenActions,
  dispatchUseActions,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-use/inventory-rules-dispatch-use.module.code.ts"
import {
  evaluateRules,
  fireInventoryActionsChanged,
  rescanInventory,
  rescanWornItems,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { registerAutoListResultEvents } from "akasha/temper/addon/pages/items/modules/inventory-rules-list/inventory-rules-list.module.code.ts"
import { registerVenueDispatchEvents } from "akasha/temper/addon/pages/items/modules/inventory-rules-venue-events/inventory-rules-venue-events.module.code.ts"
import { invalidateScribingKnowledgeCache } from "akasha/temper/addon/pages/items/modules/inventory-scribing-knowledge/inventory-scribing-knowledge.module.code.ts"
import { migrateLocksToTemperLocks } from "akasha/temper/addon/pages/items/modules/inventory-temper-lock-migrate/inventory-temper-lock-migrate.module.code.ts"
import { closeBankWhenIdle } from "akasha/temper/addon/pages/items/modules/inventory-venue-exit/inventory-venue-exit.module.code.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const NET_WORTH_DEBOUNCE_MS = 500
let netWorthRecomputePending = false

function scheduleNetWorthRecompute(): undefined {
  if (netWorthRecomputePending) return
  netWorthRecomputePending = true
  zo_callLater(function (this: void): undefined {
    netWorthRecomputePending = false
    recomputeNetWorthAndUpdateHud()
  }, NET_WORTH_DEBOUNCE_MS)
}

export function registerInventoryEvents(): undefined {
  const ns = ADDON_NAME

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void, _eventCode: number, initial: boolean): undefined {
      if (initial) {
        zo_callLater(() => resetSession(), 2500)
      } else {
        zo_callLater(() => reseedNetWorthBaseline(), 2500)
      }
      invalidateScribingKnowledgeCache()
      scanPersonalBags()
      scanCraftBag()
      scanCharacterCurrencies()
      scanAccountCurrencies()
      captureCraftingLevels()
      if (HasActiveCompanion()) {
        scanCompanionWorn()
      }
      if (GetCurrentZoneHouseId() > 0 && IsOwnerOfCurrentHouse()) {
        scanPlacedFurnishings()
      }
      recordFullScan()
      if (getInventoryConfig().backpack?.autoStack !== false) {
        zo_callLater(() => StackBag(BAG_BACKPACK), 500)
      }
      zo_callLater(() => migrateLocksToTemperLocks(), 1500)
      zo_callLater(() => rescanInventory(), 2000)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_SlotUpdate`,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (
      this: void,
      _eventCode: number,
      bagId: number,
      slotIndex: number,
      _isNewItem: boolean,
      _itemSoundCategory: number,
      inventoryUpdateReason: number
    ): undefined {
      if (inventoryUpdateReason !== INVENTORY_UPDATE_REASON_DEFAULT) return
      const slotStart = GetGameTimeMilliseconds()
      updateSlot(bagId, slotIndex)
      recordSettlingMs("slotUpdate", GetGameTimeMilliseconds() - slotStart)
      scheduleNetWorthRecompute()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_FullUpdate`,
    EVENT_INVENTORY_FULL_UPDATE,
    function (this: void): undefined {
      const fullStart = GetGameTimeMilliseconds()
      scanPersonalBags()
      recordSettlingMs("fullUpdate", GetGameTimeMilliseconds() - fullStart)
      const craftStart = GetGameTimeMilliseconds()
      scanCraftBag()
      recordSettlingMs("scanCraftBag", GetGameTimeMilliseconds() - craftStart)
      scheduleNetWorthRecompute()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenBank`,
    EVENT_OPEN_BANK,
    function (this: void): undefined {
      beginBankTrace(GetBankingBag())
      beginBankProfile(GetBankingBag())
      const scanStart = GetGameTimeMilliseconds()
      scanBankBags()
      recordBankPhaseMs("scanBankBags", GetGameTimeMilliseconds() - scanStart)
      scanBankedCurrencies()
      if (GetBankingBag() === BAG_FURNITURE_VAULT) {
        scanCurrentFurnitureVault()
      }
      if (GetCurrentZoneHouseId() > 0 && IsOwnerOfCurrentHouse()) {
        scanHouseBanks()
      }
      openJunkGate()
      const summary = onOpenBank()
      const panelStart = GetGameTimeMilliseconds()
      refreshBankActionPanel(summary)
      recordBankPhaseMs("refreshPanel", GetGameTimeMilliseconds() - panelStart)
      finishBankOpenHandler()
      closeBankWhenIdle()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseBank`,
    EVENT_CLOSE_BANK,
    function (this: void): undefined {
      markBankClosed()
      scheduleBankProfileFinalize()
      flushJunkGate()
      hideBankActionPanel()
      dispatchUseActions()
      chainAtBankClosed()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_GuildBank`,
    EVENT_GUILD_BANK_ITEMS_READY,
    function (this: void): undefined {
      scanCurrentGuildBank()
      openJunkGate()
      onOpenGuildBank()
      dispatchGuildBankCurrency()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseGuildBank`,
    EVENT_CLOSE_GUILD_BANK,
    function (this: void): undefined {
      flushJunkGate()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CompanionActivated`,
    EVENT_COMPANION_ACTIVATED,
    function (this: void): undefined {
      scanCompanionWorn()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CompanionMenu`,
    EVENT_OPEN_COMPANION_MENU,
    function (this: void): undefined {
      rescanInventory()
      dispatchEquipActions()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CurrencyUpdate`,
    EVENT_CURRENCY_UPDATE,
    function (
      this: void,
      _eventCode: number,
      currencyType: number,
      currencyLocation: number,
      newAmount: number
    ): undefined {
      updateCurrency(currencyType, currencyLocation, newAmount)
      scheduleNetWorthRecompute()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_FurniturePlaced`,
    EVENT_HOUSING_FURNITURE_PLACED,
    function (this: void, _eventCode: number, furnitureId: Id64): undefined {
      addPlacedFurnishing(furnitureId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_FurnitureRemoved`,
    EVENT_HOUSING_FURNITURE_REMOVED,
    function (this: void, _eventCode: number, furnitureId: Id64): undefined {
      removePlacedFurnishing(furnitureId)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_PlayerDeactivated`,
    EVENT_PLAYER_DEACTIVATED,
    function (this: void): undefined {
      flushJunkGate()
      scanPersonalBags()
      scanCraftBag()
      scanCharacterCurrencies()
      scanAccountCurrencies()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_RulesSlotUpdate`,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (
      this: void,
      _eventCode: number,
      bagId: number,
      slotIndex: number,
      _isNewItem: boolean,
      _itemSoundCategory: number,
      inventoryUpdateReason: number
    ): undefined {
      if (inventoryUpdateReason !== INVENTORY_UPDATE_REASON_DEFAULT) return
      if (bagId !== BAG_BACKPACK) return
      zo_callLater(function (this: void): undefined {
        if (isDispatchingBank()) return
        if (getPendingAction(bagId, slotIndex) !== undefined) {
          if (isPendingActionStale(bagId, slotIndex)) {
            clearPendingAction(bagId, slotIndex)
          } else {
            return
          }
        }
        annotateContainerIfPending(bagId, slotIndex)
        evaluateRules(bagId, slotIndex)
        fireInventoryActionsChanged()
        const action = getPendingAction(bagId, slotIndex)
        if (action !== "use" && action !== "open") return
        if (isOpenQueueActive() || isPacedBankRunning()) return
        dispatchUseActions()
      }, 0)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_StealthChanged`,
    EVENT_STEALTH_STATE_CHANGED,
    function (this: void, _eventCode: number, unitTag: string, stealthState: number): undefined {
      if (unitTag !== "player") return
      if (stealthState !== STEALTH_STATE_HIDDEN) return
      dispatchSafeOpenActions()
    }
  )

  INVENTORY_FRAGMENT.RegisterCallback(
    "StateChange",
    function (this: void, _oldState: number, newState: number): undefined {
      if (newState !== SCENE_FRAGMENT_SHOWING) return
      rescanWornItems()
      dispatchUnlockActions()
      dispatchSafeOpenActions()
    }
  )

  registerVenueDispatchEvents(ns)

  registerAutoListResultEvents(ns)

  registerAutoMaintenanceEvents(`${ns}_Maintenance`)
}
