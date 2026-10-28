import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { reportAction } from "akasha/temper/addon/pages/items/modules/inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import {
  noteServerAction,
  serverActionWaitMs,
} from "akasha/temper/addon/pages/items/modules/inventory-server-action-window/inventory-server-action-window.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const VAULT_DEPOSIT_NS = `${ADDON_NAME}_VaultDeposit`
const VAULT_DEPOSIT_WATCHDOG_MS = 2000
const MAX_VAULT_DEPOSIT_RETRIES = 3

let vaultDepositRunning = false

export function isVaultDepositChainRunning(this: void): boolean {
  return vaultDepositRunning
}

function findNextVaultDepositSlot(): number | undefined {
  let found: number | undefined
  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (found !== undefined) return
    if (bagId !== BAG_BACKPACK) return
    if (action !== "move-to" || destination !== "furniture-vault") return
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slotIndex)
    if (stackCount === 0) return
    if (!CanStowFurnitureItem(BAG_BACKPACK, slotIndex)) return
    found = slotIndex
  })
  return found
}

export function startVaultDepositChain(
  bankMoveItem: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    stackCount: number
  ) => void
): undefined {
  if (vaultDepositRunning) return
  if (findNextVaultDepositSlot() === undefined) return
  vaultDepositRunning = true

  const depositedLinks: string[] = []
  let inFlightSlot: number | undefined
  let inFlightLink: string | undefined
  let retries = 0

  function cleanup(): undefined {
    EVENT_MANAGER.UnregisterForEvent(VAULT_DEPOSIT_NS, EVENT_INVENTORY_SINGLE_SLOT_UPDATE)
    EVENT_MANAGER.UnregisterForEvent(VAULT_DEPOSIT_NS, EVENT_CLOSE_BANK)
    vaultDepositRunning = false
    if (depositedLinks.length > 0) {
      reportAction("Deposited to furniture vault", depositedLinks)
    }
  }

  function issueNext(): undefined {
    if (!vaultDepositRunning) return
    const slot = findNextVaultDepositSlot()
    if (slot === undefined) {
      cleanup()
      return
    }
    const targetSlot = FindFirstEmptySlotInBag(BAG_FURNITURE_VAULT)
    if (targetSlot === undefined) {
      d(`[${ADDON_NAME}] Furniture vault is full, stopping deposit`)
      cleanup()
      return
    }
    const wait = serverActionWaitMs()
    if (wait > 0) {
      zo_callLater(() => issueNext(), wait)
      return
    }
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
    const itemLink = GetItemLink(BAG_BACKPACK, slot, LINK_STYLE_BRACKETS)
    inFlightSlot = slot
    inFlightLink = stackCount > 1 ? `${itemLink} x${stackCount}` : itemLink
    retries = 0
    noteServerAction()
    bankMoveItem(BAG_BACKPACK, slot, BAG_FURNITURE_VAULT, targetSlot, stackCount)
    scheduleWatchdog(slot)
  }

  function onMoveConfirmed(): undefined {
    if (!vaultDepositRunning) return
    if (inFlightSlot === undefined) return
    const [srcStack] = GetSlotStackSize(BAG_BACKPACK, inFlightSlot)
    if (srcStack > 0) return
    if (inFlightLink !== undefined) depositedLinks.push(inFlightLink)
    clearPendingAction(BAG_BACKPACK, inFlightSlot)
    inFlightSlot = undefined
    inFlightLink = undefined
    issueNext()
  }

  function scheduleWatchdog(expectSlot: number): undefined {
    zo_callLater(function (this: void): undefined {
      if (!vaultDepositRunning) return
      if (inFlightSlot === undefined || inFlightSlot !== expectSlot) return
      const [srcStack] = GetSlotStackSize(BAG_BACKPACK, inFlightSlot)
      if (srcStack === 0) {
        onMoveConfirmed()
        return
      }
      if (serverActionWaitMs() > 0) {
        scheduleWatchdog(expectSlot)
        return
      }
      retries++
      if (retries > MAX_VAULT_DEPOSIT_RETRIES) {
        d(`[${ADDON_NAME}] Vault deposit stalled at backpack slot ${inFlightSlot}, stopping`)
        cleanup()
        return
      }
      const targetSlot = FindFirstEmptySlotInBag(BAG_FURNITURE_VAULT)
      if (targetSlot === undefined) {
        cleanup()
        return
      }
      noteServerAction()
      bankMoveItem(BAG_BACKPACK, inFlightSlot, BAG_FURNITURE_VAULT, targetSlot, srcStack)
      scheduleWatchdog(expectSlot)
    }, VAULT_DEPOSIT_WATCHDOG_MS)
  }

  EVENT_MANAGER.RegisterForEvent(
    VAULT_DEPOSIT_NS,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (
      this: void,
      _event: number,
      bagId: number,
      _slotIndex: number,
      _isNewItem: boolean,
      _itemSoundCategory: number,
      _inventoryUpdateReason: number,
      _stackCountChange: number,
      _triggeredByCharacterName: string | undefined,
      _triggeredByDisplayName: string | undefined,
      isLastUpdateForMessage: boolean
    ): undefined {
      if (bagId !== BAG_FURNITURE_VAULT) return
      if (!isLastUpdateForMessage) return
      onMoveConfirmed()
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    VAULT_DEPOSIT_NS,
    EVENT_CLOSE_BANK,
    function (this: void): undefined {
      cleanup()
    }
  )

  issueNext()
}
