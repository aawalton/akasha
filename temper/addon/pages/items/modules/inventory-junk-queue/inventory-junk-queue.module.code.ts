import { slotKey } from "akasha/temper/addon/pages/items/modules/inventory-slot-key/inventory-slot-key.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

let gateOpen = false

const pendingJunk = new Map<number, boolean>()

export function openJunkGate(): undefined {
  gateOpen = true
}

export function flushJunkGate(): undefined {
  gateOpen = false
  if (pendingJunk.size === 0) return
  for (const [key, junk] of pendingJunk) {
    const bagId = math.floor(key / 100000)
    const slotIndex = key % 100000
    const [stackSize] = GetSlotStackSize(bagId, slotIndex)
    if (stackSize === 0) continue
    SetItemIsJunk(bagId, slotIndex, junk)
  }
  pendingJunk.clear()
}

export function setItemIsJunkGated(bagId: number, slotIndex: number, junk: boolean): undefined {
  if (gateOpen && GetInteractionType() === INTERACTION_NONE) {
    flushJunkGate()
  }
  if (gateOpen) {
    pendingJunk.set(slotKey(bagId, slotIndex), junk)
    return
  }
  SetItemIsJunk(bagId, slotIndex, junk)
}
