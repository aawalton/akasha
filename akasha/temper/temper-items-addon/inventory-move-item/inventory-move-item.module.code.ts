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
