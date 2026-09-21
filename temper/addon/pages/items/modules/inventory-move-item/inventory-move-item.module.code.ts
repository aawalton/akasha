import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export function moveItem(
  sourceBag: number,
  sourceSlot: number,
  targetBag: number,
  targetSlot: number,
  stackCount: number
): undefined {
  if (IsProtectedFunction("RequestMoveItem")) {
    CallSecureProtected("RequestMoveItem", sourceBag, sourceSlot, targetBag, targetSlot, stackCount)
  } else {
    RequestMoveItem(sourceBag, sourceSlot, targetBag, targetSlot, stackCount)
  }
}
