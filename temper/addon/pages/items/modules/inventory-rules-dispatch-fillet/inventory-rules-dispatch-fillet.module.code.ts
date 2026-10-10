import { planFilletMessage } from "akasha/temper/addon/pages/items/modules/inventory-fillet-plan/inventory-fillet-plan.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
  getPendingAction,
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
import { evaluateRules } from "akasha/temper/addon/pages/items/modules/inventory-rules-eval/inventory-rules-eval.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

interface FilletTarget {
  readonly bagId: number
  readonly slotIndex: number
  readonly link: string
  readonly ruleIndex: number
  readonly quantity: number
}

function isFish(this: void, bagId: number, slotIndex: number): boolean {
  const [itemType] = GetItemType(bagId, slotIndex)
  return itemType === ITEMTYPE_FISH
}

function targetAt(this: void, bagId: number, slotIndex: number): FilletTarget | undefined {
  const [quantity] = GetSlotStackSize(bagId, slotIndex)
  if (quantity === 0) return undefined
  if (!isFish(bagId, slotIndex)) return undefined
  return {
    bagId,
    slotIndex,
    link: GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS),
    ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
    quantity,
  }
}

function collectBankTargets(this: void, bankBagId: number, targets: FilletTarget[]): undefined {
  const bagSize = GetBagSize(bankBagId)
  for (let slot = 0; slot < bagSize; slot++) {
    const [stackCount] = GetSlotStackSize(bankBagId, slot)
    if (stackCount === 0) continue
    evaluateRules(bankBagId, slot)
    const action = getPendingAction(bankBagId, slot)
    if (action !== "fillet") {
      if (action !== undefined) clearPendingAction(bankBagId, slot)
      continue
    }
    const target = targetAt(bankBagId, slot)
    if (target === undefined) {
      clearPendingAction(bankBagId, slot)
      continue
    }
    targets.push(target)
  }
}

function sendFillet(this: void, targets: readonly FilletTarget[]): undefined {
  PrepareDeconstructMessage()
  const sent: string[] = []
  for (const t of targets) {
    if (!AddItemToDeconstructMessage(t.bagId, t.slotIndex, t.quantity)) continue
    sent.push(t.link)
    clearPendingAction(t.bagId, t.slotIndex)
  }
  if (sent.length === 0) return
  SendDeconstructMessage()
  reportAction("Filleted", sent)
}

export function filletAtStation(this: void, stationType: number): boolean {
  if (stationType !== CRAFTING_TYPE_PROVISIONING) return false

  const targets: FilletTarget[] = []
  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "fillet") return
    if (bagId !== BAG_BACKPACK) return
    const target = targetAt(bagId, slotIndex)
    if (target !== undefined) targets.push(target)
  })
  collectBankTargets(BAG_BANK, targets)
  if (IsESOPlusSubscriber()) collectBankTargets(BAG_SUBSCRIBER_BANK, targets)
  if (targets.length === 0) return false

  table.sort(targets, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    if (a.bagId !== b.bagId) return a.bagId < b.bagId
    return a.slotIndex < b.slotIndex
  })
  const chosen = planFilletMessage(
    targets,
    MAX_ITEM_SLOTS_PER_DECONSTRUCTION,
    MAX_ITERATIONS_PER_DECONSTRUCTION
  )
  if (chosen.length === 0) return false

  if (shouldConfirmAction("fillet")) {
    const links = chosen.map((t) => t.link)
    const n = links.length
    reportPendingAction("Fillet", links)
    showConfirmDialog(
      `Fillet ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(links)}`,
      function (this: void): undefined {
        sendFillet(chosen)
      }
    )
    return true
  }
  sendFillet(chosen)
  return true
}
