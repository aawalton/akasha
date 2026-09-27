export interface SlotItem {
  lnk: string
  uid: string | undefined
}

export type SlotItems = Record<number, Record<number, SlotItem | undefined> | undefined>

export function rememberSlotItem(
  this: void,
  items: SlotItems,
  bag: number,
  slot: number,
  item: SlotItem
): undefined {
  let held = items[bag]
  if (held === undefined) {
    held = {}
    items[bag] = held
  }
  held[slot] = item
}

export function removedSlotItem(
  this: void,
  items: SlotItems,
  bag: number,
  slot: number,
  stamped: { lnk?: string; uid?: string }
): SlotItem | undefined {
  if (stamped.lnk !== undefined) {
    return { lnk: stamped.lnk, uid: stamped.uid }
  }
  return items[bag]?.[slot]
}
