import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
  getPendingRuleIndex,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  shouldConfirmAction,
  showConfirmDialog,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import {
  formatItemList,
  reportAction,
  reportPendingAction,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { isVendorCrossCharDestination } from "akasha/temper/addon/pages/items/modules/inventory-rules-cross-char/inventory-rules-cross-char.module.code.ts"
import { dispatchBuyShortfall } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-buy/inventory-rules-dispatch-buy.module.code.ts"
import { runPaced } from "akasha/temper/addon/pages/items/modules/inventory-server-action-window/inventory-server-action-window.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

type Send = (this: void) => boolean

function vendorOpen(this: void): boolean {
  return GetInteractionType() === INTERACTION_VENDOR
}

interface Target {
  readonly bagId: number
  readonly slotIndex: number
  readonly link: string
}

function paceEach<T extends Target>(
  this: void,
  targets: readonly T[],
  done: string,
  links: string[],
  send: (this: void, t: T, stackCount: number) => boolean,
  first?: Send
): undefined {
  const steps: Send[] = first === undefined ? [] : [first]
  for (const t of targets) {
    steps.push(function (this: void): boolean {
      const [stackCount] = GetSlotStackSize(t.bagId, t.slotIndex)
      if (stackCount === 0 || !send(t, stackCount)) return false
      links.push(t.link)
      return true
    })
  }
  runPaced(steps, vendorOpen, function (this: void, finished: boolean): undefined {
    if (links.length > 0) reportAction(done, links)
    if (!finished)
      d(`[${ADDON_NAME}] The vendor closed before every item was ${done.toLowerCase()}.`)
  })
}

function destroyOne(this: void, t: Target): boolean {
  DestroyItem(t.bagId, t.slotIndex)
  clearPendingAction(t.bagId, t.slotIndex)
  return true
}

export function onOpenStore(): undefined {
  const soldLinks: string[] = []
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    if (!IsItemJunk(BAG_BACKPACK, slot)) continue
    if (IsItemStolen(BAG_BACKPACK, slot)) continue
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
    if (stackCount === 0) continue
    soldLinks.push(GetItemLink(BAG_BACKPACK, slot, LINK_STYLE_BRACKETS))
  }

  const sellTargets: {
    bagId: number
    slotIndex: number
    link: string
    ruleIndex: number
    stackCount: number
  }[] = []
  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (action !== "sell") return
    if (isVendorCrossCharDestination(destination)) return
    if (IsItemStolen(bagId, slotIndex)) return
    if (IsItemJunk(bagId, slotIndex)) return
    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount === 0) return
    sellTargets.push({
      bagId,
      slotIndex,
      link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
      ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
      stackCount,
    })
  })
  table.sort(sellTargets, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })
  const junkCount = soldLinks.length
  for (const t of sellTargets) {
    soldLinks.push(t.link)
  }

  const destroyTargets: { bagId: number; slotIndex: number; link: string; ruleIndex: number }[] = []
  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "destroy") return
    if (IsItemStolen(bagId, slotIndex)) return
    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount === 0) return
    destroyTargets.push({
      bagId,
      slotIndex,
      link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
      ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
    })
  })
  table.sort(destroyTargets, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })

  const confirmSell = soldLinks.length > 0 && shouldConfirmAction("sell")
  const confirmDestroy = destroyTargets.length > 0 && shouldConfirmAction("destroy")

  function executeSell(): undefined {
    if (soldLinks.length === 0) return
    const sold = soldLinks.slice(0, junkCount)
    paceEach(
      sellTargets,
      "Sold",
      sold,
      function (this: void, t, stackCount): boolean {
        SellInventoryItem(t.bagId, t.slotIndex, stackCount)
        clearPendingAction(t.bagId, t.slotIndex)
        return true
      },
      function (this: void): boolean {
        SellAllJunk()
        return true
      }
    )
  }

  function executeDestroy(): undefined {
    paceEach(destroyTargets, "Destroyed", [], destroyOne)
  }

  if (confirmSell || confirmDestroy) {
    const parts: string[] = []
    if (confirmSell) {
      const n = soldLinks.length
      parts.push(`Sell ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(soldLinks)}`)
    }
    if (confirmDestroy) {
      const links = destroyTargets.map((t) => t.link)
      const n = links.length
      parts.push(`Destroy ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`)
    }

    if (confirmSell) reportPendingAction("Sell", soldLinks)
    if (confirmDestroy)
      reportPendingAction(
        "Destroy",
        destroyTargets.map((t) => t.link)
      )

    if (!confirmSell) executeSell()
    if (!confirmDestroy) executeDestroy()

    showConfirmDialog(`${parts.join("\n")}`, function (this: void): undefined {
      if (confirmSell) executeSell()
      if (confirmDestroy) executeDestroy()
    })
  } else {
    executeSell()
    executeDestroy()
  }

  dispatchBuyShortfall()
}

export function onOpenFence(allowSell: boolean, allowLaunder: boolean): undefined {
  const bagSize = GetBagSize(BAG_BACKPACK)

  const fenceSellTargets: {
    bagId: number
    slotIndex: number
    link: string
    isPending: boolean
    ruleIndex: number
    stackCount: number
  }[] = []

  if (allowSell) {
    for (let slot = 0; slot < bagSize; slot++) {
      if (!IsItemJunk(BAG_BACKPACK, slot)) continue
      if (!IsItemStolen(BAG_BACKPACK, slot)) continue
      const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
      if (stackCount === 0) continue
      fenceSellTargets.push({
        bagId: BAG_BACKPACK,
        slotIndex: slot,
        link: GetItemLink(BAG_BACKPACK, slot, LINK_STYLE_BRACKETS),
        isPending: false,
        ruleIndex: 999999,
        stackCount,
      })
    }

    forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
      if (action !== "fence-sell") return
      if (isVendorCrossCharDestination(destination)) return
      const [stackCount] = GetSlotStackSize(bagId, slotIndex)
      if (stackCount === 0) return
      fenceSellTargets.push({
        bagId,
        slotIndex,
        link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
        isPending: true,
        ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
        stackCount,
      })
    })
  }

  const fenceLaunderTargets: {
    bagId: number
    slotIndex: number
    link: string
    ruleIndex: number
    stackCount: number
  }[] = []

  if (allowLaunder) {
    forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
      if (action !== "fence-launder") return
      if (isVendorCrossCharDestination(destination)) return
      const [stackCount] = GetSlotStackSize(bagId, slotIndex)
      if (stackCount === 0) return
      fenceLaunderTargets.push({
        bagId,
        slotIndex,
        link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
        ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
        stackCount,
      })
    })
  }

  const fenceDestroyTargets: {
    bagId: number
    slotIndex: number
    link: string
    ruleIndex: number
  }[] = []

  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "destroy") return
    if (!IsItemStolen(bagId, slotIndex)) return
    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount === 0) return
    fenceDestroyTargets.push({
      bagId,
      slotIndex,
      link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
      ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
    })
  })

  table.sort(fenceSellTargets, function (this: void, a, b): boolean {
    if (a.stackCount !== b.stackCount) return a.stackCount < b.stackCount
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })
  table.sort(fenceLaunderTargets, function (this: void, a, b): boolean {
    if (a.stackCount !== b.stackCount) return a.stackCount < b.stackCount
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })
  table.sort(fenceDestroyTargets, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })

  const confirmSell = fenceSellTargets.length > 0 && shouldConfirmAction("sell")
  const confirmDestroy = fenceDestroyTargets.length > 0 && shouldConfirmAction("destroy")

  function executeFenceSell(): undefined {
    if (fenceSellTargets.length === 0) return
    const [totalSells, sellsUsed] = GetFenceSellTransactionInfo()
    let sellsRemaining = totalSells - sellsUsed
    paceEach(fenceSellTargets, "Fence-sold", [], function (this: void, t, stackCount): boolean {
      if (sellsRemaining <= 0) return false
      const qty = math.min(stackCount, sellsRemaining)
      SellInventoryItem(t.bagId, t.slotIndex, qty)
      if (t.isPending && qty === stackCount) clearPendingAction(t.bagId, t.slotIndex)
      sellsRemaining -= qty
      return true
    })
  }

  function executeFenceLaunder(): undefined {
    if (fenceLaunderTargets.length === 0) return
    const [totalLaunders, laundersUsed] = GetFenceLaunderTransactionInfo()
    let laundersRemaining = totalLaunders - laundersUsed
    paceEach(fenceLaunderTargets, "Laundered", [], function (this: void, t, stackCount): boolean {
      if (laundersRemaining <= 0) return false
      const qty = math.min(stackCount, laundersRemaining)
      LaunderItem(t.bagId, t.slotIndex, qty)
      if (qty === stackCount) clearPendingAction(t.bagId, t.slotIndex)
      laundersRemaining -= qty
      return true
    })
  }

  function executeFenceDestroy(): undefined {
    paceEach(fenceDestroyTargets, "Destroyed", [], destroyOne)
  }

  if (confirmSell || confirmDestroy) {
    const parts: string[] = []
    if (confirmSell) {
      const links = fenceSellTargets.map((t) => t.link)
      const n = links.length
      parts.push(`Fence-sell ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`)
    }
    if (confirmDestroy) {
      const links = fenceDestroyTargets.map((t) => t.link)
      const n = links.length
      parts.push(`Destroy ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`)
    }

    if (confirmSell)
      reportPendingAction(
        "Fence-sell",
        fenceSellTargets.map((t) => t.link)
      )
    if (confirmDestroy)
      reportPendingAction(
        "Destroy",
        fenceDestroyTargets.map((t) => t.link)
      )

    if (!confirmSell) executeFenceSell()
    executeFenceLaunder()
    if (!confirmDestroy) executeFenceDestroy()

    showConfirmDialog(`${parts.join("\n")}`, function (this: void): undefined {
      if (confirmSell) executeFenceSell()
      if (confirmDestroy) executeFenceDestroy()
    })
  } else {
    executeFenceSell()
    executeFenceLaunder()
    executeFenceDestroy()
  }
}

export function fenceWorkPending(this: void): boolean {
  const [totalSells, sellsUsed] = GetFenceSellTransactionInfo()
  const [totalLaunders, laundersUsed] = GetFenceLaunderTransactionInfo()
  const canSell = totalSells - sellsUsed > 0
  const canLaunder = totalLaunders - laundersUsed > 0
  if (!canSell && !canLaunder) return false
  let pending = false
  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (pending) return
    if (bagId !== BAG_BACKPACK) return
    if (action === "fence-sell" && !canSell) return
    if (action === "fence-launder" && !canLaunder) return
    if (action !== "fence-sell" && action !== "fence-launder") return
    if (isVendorCrossCharDestination(destination)) return
    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount > 0) pending = true
  })
  if (pending) return true
  if (!canSell) return false
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    if (!IsItemJunk(BAG_BACKPACK, slot)) continue
    if (!IsItemStolen(BAG_BACKPACK, slot)) continue
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
    if (stackCount > 0) return true
  }
  return false
}
