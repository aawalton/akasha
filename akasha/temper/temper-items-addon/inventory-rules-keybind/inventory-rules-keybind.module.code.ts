import { refreshEquipmentLockOverlays } from "../inventory-equipment-lock-overlay/inventory-equipment-lock-overlay.module.code.ts"
import { verdictActionForJunk } from "../inventory-item-rule-verdict-core/inventory-item-rule-verdict-core.module.code.ts"
import { setItemRuleVerdict } from "../inventory-item-rule-verdict-store/inventory-item-rule-verdict-store.module.code.ts"
import { refreshLockOverlays } from "../inventory-lock-overlay/inventory-lock-overlay.module.code.ts"
import { toggleTemperLock } from "../inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"

interface HoveredSlot {
  bagId: number
  slotIndex: number
}

function isIndexable(value: unknown): value is Record<string, unknown> {
  const luaType = type(value)
  return luaType === "table" || luaType === "userdata"
}

function firstNumberField(
  rec: Record<string, unknown>,
  keys: readonly string[]
): number | undefined {
  for (const key of keys) {
    const value = rec[key]
    if (typeof value === "number") return value
  }
  return undefined
}

function readSlotFromControl(control: unknown): HoveredSlot | undefined {
  if (!isIndexable(control)) return undefined
  const dataEntry = control.dataEntry
  if (isIndexable(dataEntry) && isIndexable(dataEntry.data)) {
    const data = dataEntry.data
    const bagId = firstNumberField(data, ["bagId", "bag"])
    const slotIndex = firstNumberField(data, ["slotIndex", "index"])
    if (bagId !== undefined && slotIndex !== undefined) return { bagId, slotIndex }
  }
  const directBag = firstNumberField(control, ["bagId"])
  const directSlot = firstNumberField(control, ["slotIndex"])
  if (directBag !== undefined && directSlot !== undefined) {
    return { bagId: directBag, slotIndex: directSlot }
  }
  return undefined
}

function getHoveredBagAndSlot(): HoveredSlot | undefined {
  const moc = WINDOW_MANAGER.GetMouseOverControl()
  if (moc === undefined) return undefined
  const direct = readSlotFromControl(moc)
  if (direct !== undefined) return direct
  return readSlotFromControl(moc.GetParent())
}

export function toggleHoveredItemSell(): undefined {
  const slot = getHoveredBagAndSlot()
  if (slot === undefined) return
  if (!CanItemBeMarkedAsJunk(slot.bagId, slot.slotIndex)) return
  const willBeJunk = !IsItemJunk(slot.bagId, slot.slotIndex)
  SetItemIsJunk(slot.bagId, slot.slotIndex, willBeJunk)
  const itemLink = GetItemLink(slot.bagId, slot.slotIndex, LINK_STYLE_BRACKETS)
  if (itemLink === "") return
  const itemId = GetItemLinkItemId(itemLink)
  if (itemId === 0) return
  const itemName = zo_strformat("<<1>>", GetItemLinkName(itemLink))
  setItemRuleVerdict(itemId, itemName, verdictActionForJunk(willBeJunk))
}

export function toggleHoveredItemLock(): undefined {
  const slot = getHoveredBagAndSlot()
  if (slot === undefined) {
    const moc = WINDOW_MANAGER.GetMouseOverControl()
    const mocName = moc !== undefined ? moc.GetName() : "nil"
    d(`[TemperInventory] Temper Lock: no item under the cursor (moc=${mocName}).`)
    return
  }
  const nowLocked = toggleTemperLock(slot.bagId, slot.slotIndex)
  const itemLink = GetItemLink(slot.bagId, slot.slotIndex, LINK_STYLE_BRACKETS)
  d(`[TemperInventory] ${nowLocked ? "Locked" : "Unlocked"} ${itemLink}`)
  refreshLockOverlays()
  refreshEquipmentLockOverlays()
}
