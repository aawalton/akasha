import {
  clearPendingAction,
  forEachPendingAction,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { reportAction } from "akasha/temper/addon/pages/items/modules/inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
import { isTemperLocked } from "akasha/temper/addon/pages/items/modules/inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

function isLeftAlone(bagId: number, slotIndex: number): boolean {
  const [stackCount] = GetSlotStackSize(bagId, slotIndex)
  if (stackCount === 0) return true
  if (IsItemBound(bagId, slotIndex)) return true
  return IsItemPlayerLocked(bagId, slotIndex) || isTemperLocked(bagId, slotIndex)
}

export function dispatchBindActions(): undefined {
  const items: { bagId: number; slotIndex: number }[] = []
  forEachPendingAction(function (this: void, bagId, slotIndex, action): undefined {
    if (action !== "bind") return
    items.push({ bagId, slotIndex })
  })
  if (items.length === 0) return

  const piecesBound = new LuaSet<number>()
  const boundLinks: string[] = []
  for (const item of items) {
    clearPendingAction(item.bagId, item.slotIndex)
    if (isLeftAlone(item.bagId, item.slotIndex)) continue
    const itemLink = GetItemLink(item.bagId, item.slotIndex, LINK_STYLE_BRACKETS)
    if (IsItemLinkSetCollectionPiece(itemLink)) {
      const pieceId = GetItemLinkItemId(itemLink)
      if (IsItemSetCollectionPieceUnlocked(pieceId) || piecesBound.has(pieceId)) continue
      piecesBound.add(pieceId)
    }
    BindItem(item.bagId, item.slotIndex)
    boundLinks.push(itemLink)
  }

  if (boundLinks.length > 0) reportAction("Bound", boundLinks)
}
