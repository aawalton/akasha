export function slotKey(bagId: number, slotIndex: number): number {
  return bagId * 100000 + slotIndex
}
