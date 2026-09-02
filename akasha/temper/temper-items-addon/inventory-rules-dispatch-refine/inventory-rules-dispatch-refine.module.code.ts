import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
  getPendingAction,
  getPendingRuleIndex,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  shouldConfirmAction,
  showConfirmDialog,
} from "../inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import {
  formatItemList,
  reportAction,
  reportPendingAction,
} from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { evaluateRules } from "../inventory-rules-eval/inventory-rules-eval.module.code.ts"

const MAX_REFINE_OPS = 50

const REFINE_CRAFT_TYPES = new LuaSet<number>()
REFINE_CRAFT_TYPES.add(CRAFTING_TYPE_BLACKSMITHING)
REFINE_CRAFT_TYPES.add(CRAFTING_TYPE_CLOTHIER)
REFINE_CRAFT_TYPES.add(CRAFTING_TYPE_WOODWORKING)
REFINE_CRAFT_TYPES.add(CRAFTING_TYPE_JEWELRYCRAFTING)

interface RefineTarget {
  bagId: number
  slotIndex: number
  link: string
  ruleIndex: number
}

function isRefinable(
  this: void,
  bagId: number,
  slotIndex: number,
  stationType: number,
  requiredStack: number
): boolean {
  const [stackCount] = GetSlotStackSize(bagId, slotIndex)
  if (stackCount === 0) return false
  if (!CanItemBeSmithingExtractedOrRefined(bagId, slotIndex, stationType)) return false
  const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
  const [backpackCount, bankCount, craftBagCount] = GetItemLinkStacks(itemLink)
  return backpackCount + bankCount + craftBagCount >= requiredStack
}

function collectBankRefineTargets(
  this: void,
  bankBagId: number,
  targets: RefineTarget[],
  stationType: number,
  requiredStack: number
): undefined {
  const bagSize = GetBagSize(bankBagId)
  for (let slot = 0; slot < bagSize; slot++) {
    const [stackCount] = GetSlotStackSize(bankBagId, slot)
    if (stackCount === 0) continue

    evaluateRules(bankBagId, slot)

    const action = getPendingAction(bankBagId, slot)
    if (action === "refine") {
      if (!isRefinable(bankBagId, slot, stationType, requiredStack)) {
        clearPendingAction(bankBagId, slot)
        continue
      }
      targets.push({
        bagId: bankBagId,
        slotIndex: slot,
        link: GetItemLink(bankBagId, slot, LINK_STYLE_BRACKETS),
        ruleIndex: getPendingRuleIndex(bankBagId, slot) ?? 999999,
      })
    } else if (action !== undefined) {
      clearPendingAction(bankBagId, slot)
    }
  }
}

function startRefining(
  this: void,
  station: SmithingStation,
  targets: readonly RefineTarget[],
  requiredStack: number
): undefined {
  const ns = `${ADDON_NAME}_Refine`
  const queue: RefineTarget[] = []
  for (const t of targets) queue.push(t)
  const refinedLinks: string[] = []

  if (station.mode !== SMITHING_MODE_REFINMENT) {
    ZO_MenuBar_SelectDescriptor(station.modeBar, SMITHING_MODE_REFINMENT)
  }

  function stackBigEnough(this: void): boolean {
    return station.refinementPanel.extractionSlot.GetStackCount() >= requiredStack
  }

  function finish(this: void): undefined {
    EVENT_MANAGER.UnregisterForEvent(ns, EVENT_CRAFT_COMPLETED)
    station.refinementPanel.ClearSelections()
    if (refinedLinks.length > 0) reportAction("Refined", refinedLinks)
  }

  function process(this: void): undefined {
    EVENT_MANAGER.UnregisterForEvent(ns, EVENT_CRAFT_COMPLETED)
    while (!stackBigEnough() && queue.length > 0) {
      const t = queue.pop()
      if (t === undefined) break
      const [stackCount] = GetSlotStackSize(t.bagId, t.slotIndex)
      if (stackCount === 0) {
        clearPendingAction(t.bagId, t.slotIndex)
        continue
      }
      station.AddItemToCraft(t.bagId, t.slotIndex)
      refinedLinks.push(t.link)
      clearPendingAction(t.bagId, t.slotIndex)
    }
    if (stackBigEnough()) {
      EVENT_MANAGER.RegisterForEvent(ns, EVENT_CRAFT_COMPLETED, process)
      station.refinementPanel.ExtractAll()
    } else {
      finish()
    }
  }

  process()
}

export function runRefinePass(this: void, stationType: number): undefined {
  if (!REFINE_CRAFT_TYPES.has(stationType)) return

  const requiredStack = GetRequiredSmithingRefinementStackSize()
  if (requiredStack <= 0) return

  const targets: RefineTarget[] = []

  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "refine") return
    if (bagId !== BAG_BACKPACK) return
    if (!isRefinable(bagId, slotIndex, stationType, requiredStack)) return
    targets.push({
      bagId,
      slotIndex,
      link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
      ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
    })
  })

  collectBankRefineTargets(BAG_BANK, targets, stationType, requiredStack)
  if (IsESOPlusSubscriber()) {
    collectBankRefineTargets(BAG_SUBSCRIBER_BANK, targets, stationType, requiredStack)
  }

  if (targets.length === 0) return

  table.sort(targets, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    return a.slotIndex < b.slotIndex
  })
  if (targets.length > MAX_REFINE_OPS) targets.splice(MAX_REFINE_OPS)

  const stationCandidate: unknown = SMITHING
  const station = stationCandidate as SmithingStation

  if (shouldConfirmAction("refine")) {
    const links = targets.map((t) => t.link)
    const n = links.length
    reportPendingAction("Refine", links)
    showConfirmDialog(
      `Refine ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`,
      function (this: void): undefined {
        startRefining(station, targets, requiredStack)
      }
    )
    return
  }

  startRefining(station, targets, requiredStack)
}
