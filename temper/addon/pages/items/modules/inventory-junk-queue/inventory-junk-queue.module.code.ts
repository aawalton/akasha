import {
  noteServerAction,
  serverActionWaitMs,
} from "akasha/temper/addon/pages/items/modules/inventory-server-action-window/inventory-server-action-window.module.code.ts"
import { slotKey } from "akasha/temper/addon/pages/items/modules/inventory-slot-key/inventory-slot-key.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

let gateOpen = false

const pendingJunk = new Map<number, boolean>()
const deferredJunk = new Map<number, boolean>()
let drainScheduled = false

function scheduleDrain(this: void): undefined {
  if (drainScheduled) return
  drainScheduled = true
  const wait = serverActionWaitMs()
  zo_callLater(
    () => {
      drainScheduled = false
      const due: [number, boolean][] = []
      for (const entry of deferredJunk) due.push(entry)
      deferredJunk.clear()
      for (const [key, junk] of due) {
        setItemIsJunkGated(math.floor(key / 100000), key % 100000, junk)
      }
    },
    wait > 0 ? wait : 1
  )
}

function sendJunk(this: void, bagId: number, slotIndex: number, junk: boolean): undefined {
  const [stackSize] = GetSlotStackSize(bagId, slotIndex)
  if (stackSize === 0) return
  if (IsItemJunk(bagId, slotIndex) === junk) return
  if (serverActionWaitMs() > 0) {
    deferredJunk.set(slotKey(bagId, slotIndex), junk)
    scheduleDrain()
    return
  }
  noteServerAction()
  SetItemIsJunk(bagId, slotIndex, junk)
}

export function openJunkGate(): undefined {
  gateOpen = true
}

export function flushJunkGate(): undefined {
  gateOpen = false
  if (pendingJunk.size === 0) return
  for (const [key, junk] of pendingJunk) {
    sendJunk(math.floor(key / 100000), key % 100000, junk)
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
  sendJunk(bagId, slotIndex, junk)
}
