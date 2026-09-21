import {
  type ChainStep,
  chainStep,
  VENUE_EXIT_CHECK_MS,
  venueExitVerdict,
} from "akasha/temper/addon/pages/items/modules/inventory-assistant-chain/inventory-assistant-chain.module.code.ts"
import { isConfirmDialogShowing } from "akasha/temper/addon/pages/items/modules/inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import { isStackingBags } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-bank/inventory-rules-dispatch-bank.module.code.ts"
import { isPacedBankRunning } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-bank-paced/inventory-rules-dispatch-bank-paced.module.code.ts"
import { isOpenQueueActive } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-open-queue/inventory-rules-dispatch-open-queue.module.code.ts"
import { isRefining } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-refine/inventory-rules-dispatch-refine.module.code.ts"
import { isWritCrafting } from "akasha/temper/addon/pages/items/modules/inventory-writ-crafting-queue/inventory-writ-crafting-queue.module.code.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function stillWorking(): boolean {
  if (isConfirmDialogShowing()) return true
  if (isWritCrafting()) return true
  if (isRefining()) return true
  if (isPacedBankRunning()) return true
  if (isStackingBags()) return true
  return isOpenQueueActive()
}

function closeWhenIdle(at: ChainStep, interactionType: number): undefined {
  if (chainStep() !== at) return undefined
  const openedAtMs = GetGameTimeMilliseconds()

  function look(this: void): undefined {
    if (chainStep() !== at) return undefined
    const verdict = venueExitVerdict(stillWorking(), GetGameTimeMilliseconds() - openedAtMs)
    if (verdict === "give-up") return undefined
    if (verdict === "wait") {
      zo_callLater(look, VENUE_EXIT_CHECK_MS)
      return undefined
    }
    EndInteraction(interactionType)
    return undefined
  }

  zo_callLater(look, VENUE_EXIT_CHECK_MS)
  return undefined
}

export function closeStationWhenIdle(): undefined {
  return closeWhenIdle("deconstructing", INTERACTION_CRAFT)
}

export function closeStoreWhenIdle(): undefined {
  return closeWhenIdle("selling", INTERACTION_VENDOR)
}

export function closeBankWhenIdle(): undefined {
  return closeWhenIdle("banking", INTERACTION_BANK)
}
