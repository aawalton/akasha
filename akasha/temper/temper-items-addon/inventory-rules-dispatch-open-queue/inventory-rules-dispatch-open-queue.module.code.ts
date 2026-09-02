import { requireFirst } from "@akasha/utils-narrow/require-first"
import { hasRoomAboveBuffer } from "../inventory-backpack-buffer/inventory-backpack-buffer.module.code.ts"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import {
  isAnyCooldownActive,
  isGameCooldownActive,
  isOpenCooldownEnabled,
  onContainerOpenedForCooldown,
} from "../inventory-open-cooldown-protection/inventory-open-cooldown-protection.module.code.ts"
import {
  clearPendingAction,
  setPendingAction,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { reportAction } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { RESCAN_INVENTORY_HOLDER } from "../inventory-rules-rescan-ref/inventory-rules-rescan-ref.module.code.ts"
import { evaluateScriptKnowledgeForOpen } from "../inventory-scribing-knowledge/inventory-scribing-knowledge.module.code.ts"
export interface OpenQueueEntry {
  bagId: number
  slotIndex: number
  itemLink: string
  isStackable: boolean
}

export const OPEN_TIMEOUT_MS = 5000
export const OPEN_RETRY_MS = 1000
export const OPEN_NS = ADDON_NAME + "_OpenLoot"

export let openQueueGen = 0
export let openQueue: OpenQueueEntry[] = []
export let openQueueOpenedLinks: string[] = []
export let savedUpdateLootWindow: EsoLootWindow["UpdateLootWindow"] | undefined

export const ATTEMPTED_OPEN_LINKS_HOLDER: { set: LuaSet<string> } = { set: new LuaSet<string>() }
export let inFinishOpenQueueRescan = false

export function resetAttemptedOpenLinksForChain(): undefined {
  if (!inFinishOpenQueueRescan) {
    ATTEMPTED_OPEN_LINKS_HOLDER.set = new LuaSet<string>()
  }
}

export function hookLootWindow(): undefined {
  if (savedUpdateLootWindow !== undefined) return
  const lootWindow = SYSTEMS.GetObject("loot")
  savedUpdateLootWindow = lootWindow.UpdateLootWindow
  lootWindow.UpdateLootWindow = function (this: EsoLootWindow): undefined {}
}

export function unhookLootWindow(): undefined {
  if (savedUpdateLootWindow === undefined) return
  const lootWindow = SYSTEMS.GetObject("loot")
  lootWindow.UpdateLootWindow = savedUpdateLootWindow
  savedUpdateLootWindow = undefined
  if (IsLooting()) {
    EndLooting()
  }
}

export function cleanupOpenLootEvents(): undefined {
  EVENT_MANAGER.UnregisterForUpdate(OPEN_NS + "_Timeout")
  EVENT_MANAGER.UnregisterForEvent(OPEN_NS, EVENT_LOOT_RECEIVED)
  EVENT_MANAGER.UnregisterForEvent(OPEN_NS, EVENT_LOOT_UPDATED)
  EVENT_MANAGER.UnregisterForEvent(OPEN_NS, EVENT_LOOT_CLOSED)
  unhookLootWindow()
}

export function finishOpenQueue(): undefined {
  const hadOpens = openQueueOpenedLinks.length > 0
  if (hadOpens) {
    reportAction("Opened", openQueueOpenedLinks)
  }
  openQueueOpenedLinks = []
  openQueue = []
  inFinishOpenQueueRescan = true
  RESCAN_INVENTORY_HOLDER.fn?.()
  inFinishOpenQueueRescan = false
}

export function enqueueOpenItems(items: OpenQueueEntry[]): undefined {
  openQueueGen++
  cleanupOpenLootEvents()
  openQueue = items
  openQueueOpenedLinks = []
  processNextOpen()
}

function dropHeadAndAdvance(): undefined {
  openQueue.splice(0, 1)
  processNextOpen()
}

function skipEntryAndAdvance(entry: OpenQueueEntry): undefined {
  ATTEMPTED_OPEN_LINKS_HOLDER.set.add(entry.itemLink)
  clearPendingAction(entry.bagId, entry.slotIndex)
  dropHeadAndAdvance()
}

export function processNextOpen(): undefined {
  const gen = openQueueGen

  if (openQueue.length === 0) {
    finishOpenQueue()
    return
  }

  const entry = requireFirst(openQueue)

  const [stackCount] = GetSlotStackSize(entry.bagId, entry.slotIndex)
  if (stackCount === 0) {
    clearPendingAction(entry.bagId, entry.slotIndex)
    dropHeadAndAdvance()
    return
  }

  if (!CanInteractWithItem(entry.bagId, entry.slotIndex)) {
    zo_callLater(function (this: void): undefined {
      if (gen !== openQueueGen) return
      processNextOpen()
    }, OPEN_RETRY_MS)
    return
  }

  if (IsLooting()) {
    zo_callLater(function (this: void): undefined {
      if (gen !== openQueueGen) return
      processNextOpen()
    }, OPEN_RETRY_MS)
    return
  }

  if (GetInteractionType() !== 0) {
    zo_callLater(function (this: void): undefined {
      if (gen !== openQueueGen) return
      processNextOpen()
    }, OPEN_RETRY_MS)
    return
  }

  if (isGameCooldownActive(entry.bagId, entry.slotIndex)) {
    skipEntryAndAdvance(entry)
    return
  }

  if (isOpenCooldownEnabled() && isAnyCooldownActive(entry.bagId, entry.slotIndex)) {
    const bypass = evaluateScriptKnowledgeForOpen(entry.bagId, entry.slotIndex)
    if (!bypass) {
      d(`[${ADDON_NAME}] Skipped opening container — cooldown active`)
      skipEntryAndAdvance(entry)
      return
    }
  }

  if (IsItemStolen(entry.bagId, entry.slotIndex)) {
    if (GetUnitStealthState("player") !== STEALTH_STATE_HIDDEN && IsInJusticeEnabledZone()) {
      setPendingAction(entry.bagId, entry.slotIndex, "open-stolen-when-safe")
      ATTEMPTED_OPEN_LINKS_HOLDER.set.add(entry.itemLink)
      dropHeadAndAdvance()
      return
    }
  }
  if (entry.isStackable && !hasRoomAboveBuffer(1)) {
    skipEntryAndAdvance(entry)
    return
  }

  const [stackBefore] = GetSlotStackSize(entry.bagId, entry.slotIndex)

  hookLootWindow()

  if (entry.isStackable) {
    EVENT_MANAGER.RegisterForEvent(OPEN_NS, EVENT_LOOT_RECEIVED, function (this: void): undefined {
      if (gen !== openQueueGen) return
      cleanupOpenLootEvents()
      onContainerOpenedForCooldown(entry.bagId, entry.slotIndex)
      openQueueOpenedLinks.push(entry.itemLink)
      clearPendingAction(entry.bagId, entry.slotIndex)
      zo_callLater(function (this: void): undefined {
        if (gen !== openQueueGen) return
        dropHeadAndAdvance()
      }, OPEN_RETRY_MS)
    })
  } else {
    EVENT_MANAGER.RegisterForEvent(OPEN_NS, EVENT_LOOT_UPDATED, function (this: void): undefined {
      if (gen !== openQueueGen) return
      EVENT_MANAGER.UnregisterForEvent(OPEN_NS, EVENT_LOOT_UPDATED)
      const autoCraftBag =
        GetSetting(SETTING_TYPE_LOOT, LOOT_SETTING_AUTO_ADD_TO_CRAFT_BAG) === "1" &&
        HasCraftBagAccess()
      let slotsNeeded = 0
      for (let i = 1; i <= GetNumLootItems(); i++) {
        const [lootId] = GetLootItemInfo(i)
        if (GetLootItemType(lootId) === LOOT_TYPE_ITEM) {
          if (
            !autoCraftBag ||
            !CanItemLinkBeVirtual(GetLootItemLink(lootId, LINK_STYLE_BRACKETS))
          ) {
            slotsNeeded++
          }
        }
      }
      const baseGameHasSpace = CheckInventorySpaceAndWarn(slotsNeeded)
      if (!baseGameHasSpace || !hasRoomAboveBuffer(slotsNeeded)) {
        ATTEMPTED_OPEN_LINKS_HOLDER.set.add(entry.itemLink)
        cleanupOpenLootEvents()
        openQueue = []
        finishOpenQueue()
        return
      }
      LOOT_SHARED.LootAllItems()
    })
    EVENT_MANAGER.RegisterForEvent(OPEN_NS, EVENT_LOOT_CLOSED, function (this: void): undefined {
      if (gen !== openQueueGen) return
      cleanupOpenLootEvents()
      onContainerOpenedForCooldown(entry.bagId, entry.slotIndex)
      openQueueOpenedLinks.push(entry.itemLink)
      clearPendingAction(entry.bagId, entry.slotIndex)
      zo_callLater(function (this: void): undefined {
        if (gen !== openQueueGen) return
        dropHeadAndAdvance()
      }, OPEN_RETRY_MS)
    })
  }

  EVENT_MANAGER.RegisterForUpdate(
    OPEN_NS + "_Timeout",
    OPEN_TIMEOUT_MS,
    function (this: void): undefined {
      if (gen !== openQueueGen) return
      cleanupOpenLootEvents()
      const [stackAfter] = GetSlotStackSize(entry.bagId, entry.slotIndex)
      if (stackAfter < stackBefore) {
        onContainerOpenedForCooldown(entry.bagId, entry.slotIndex)
        openQueueOpenedLinks.push(entry.itemLink)
      } else {
        ATTEMPTED_OPEN_LINKS_HOLDER.set.add(entry.itemLink)
      }
      clearPendingAction(entry.bagId, entry.slotIndex)
      dropHeadAndAdvance()
    }
  )

  if (IsProtectedFunction("UseItem")) {
    CallSecureProtected("UseItem", entry.bagId, entry.slotIndex)
  } else {
    UseItem(entry.bagId, entry.slotIndex)
  }
}

export function isOpenQueueActive(): boolean {
  return openQueue.length > 0
}
