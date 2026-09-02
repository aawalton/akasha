import { isLocked, updateStored } from "../craft-inventory/craft-inventory.module.code.ts"
import { LANG } from "../craft-lang-index/craft-lang-index.module.code.ts"
import { applyStorageCounts } from "../craft-storage-counts/craft-storage-counts.module.code.ts"
import { isValidEquip } from "../craft-validation/craft-validation.module.code.ts"
import { stripLink, updateMatsInfo } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

const defined = <T>(value: T | undefined): T =>
  value ?? error("TemperCrafting: unexpected nil value")

const asSharedInventorySlotData = (value: { bagId: number }): SharedInventorySlotData =>
  value as SharedInventorySlotData

export function houseBankQuantity(
  this: void,
  bag: number,
  slot?: number | false,
  link?: string | false
): number {
  let resolvedLink: string | false = link ?? false
  const items = SHARED_INVENTORY.GenerateFullSlotData(undefined, bag)
  if (slot !== undefined && slot !== false) {
    resolvedLink = stripLink(GetItemLink(bag, slot))
  }
  let quantity = 0
  for (const [, data] of ipairs(items)) {
    if (resolvedLink === stripLink(GetItemLink(data.bagId, data.slotIndex))) {
      const [, stack] = GetItemInfo(data.bagId, data.slotIndex)
      quantity = quantity + stack
    }
  }
  return quantity
}

export function onInventorySlotAdded(
  this: void,
  bag: number,
  slot: number,
  data: SharedInventorySlotData,
  replace?: boolean
): undefined {
  if (!replace) {
    replace = false
  }
  if (
    bag !== BAG_BACKPACK &&
    bag !== BAG_BANK &&
    bag !== BAG_SUBSCRIBER_BANK &&
    bag !== BAG_VIRTUAL &&
    !IsHouseBankBag(bag)
  ) {
    return
  }
  const link = stripLink(GetItemLink(bag, slot))
  const [a1, a2, a3] = GetItemLinkStacks(link)

  let stored = STATE.Account.storage[link]
  if (stored === undefined) {
    stored = {}
    STATE.Account.storage[link] = stored
  }
  stored[LANG.en.craftbag] = a3
  if (a3 === 0) {
    stored[LANG.en.craftbag] = undefined
  }

  stored[LANG.en.bank] = a2
  if (a2 === 0) {
    stored[LANG.en.bank] = undefined
  }

  stored[STATE.CurrentPlayer] = a1
  if (a1 === 0) {
    stored[STATE.CurrentPlayer] = undefined
  }

  if (IsHouseBankBag(bag)) {
    if (stored[`${LANG.en.housebank}${bag - 7}`] === undefined) {
      stored[LANG.en.housebank] = 0
    }
    stored[`${LANG.en.housebank}${bag - 7}`] = houseBankQuantity(bag, slot)
  }
  updateMatsInfo(link)
  data.uid = Id64ToString(GetItemUniqueId(bag, slot))
  data.lnk = link
  if (isValidEquip(GetItemLinkEquipType(link))) {
    if (isLocked(bag, slot) === true) {
      updateStored("removed", data, replace)
    } else {
      updateStored("added", data)
    }
  }
}

export function onInventorySlotRemoved(
  this: void,
  bag: number,
  _slot: number,
  data: SharedInventorySlotData
): undefined {
  if (
    bag !== BAG_BACKPACK &&
    bag !== BAG_BANK &&
    bag !== BAG_SUBSCRIBER_BANK &&
    bag !== BAG_VIRTUAL &&
    !IsHouseBankBag(bag)
  ) {
    return
  }
  const link = stripLink(defined(data.lnk))
  const [a1, a2, a3] = GetItemLinkStacks(link)

  const stored = applyStorageCounts(STATE.Account.storage, link, [
    [LANG.en.craftbag, a3],
    [LANG.en.bank, a2],
    [STATE.CurrentPlayer, a1],
  ])
  if (stored === undefined) {
    return
  }
  if (IsHouseBankBag(bag)) {
    stored[`${LANG.en.housebank}${bag - 7}`] = houseBankQuantity(bag, false, link)
  }
  updateMatsInfo(link)
  if (isValidEquip(GetItemLinkEquipType(link))) {
    updateStored("removed", data)
  }
}

export function onStackSplitShow(this: void): undefined {
  if (STATE.Account.options.stacksplit) {
    ZO_StackSplitSpinnerDisplay.TakeFocus()
    ZO_StackSplitSpinnerDisplay.SelectAll()
  }
}

export function onInventorySingleSlotUpdate(
  this: void,
  _eventCode: number,
  bagId: number,
  slotId: number,
  _isNewItem: boolean,
  _itemSoundCategory: number,
  inventoryUpdateReason: number,
  _stackCountChange: number
): undefined {
  const replace = inventoryUpdateReason === 4
  onInventorySlotAdded(bagId, slotId, asSharedInventorySlotData({ bagId: bagId }), replace)
}

export function onMoneyUpdate(
  this: void,
  _eventCode: number,
  newMoney: number,
  oldMoney: number,
  reason: number
): undefined {
  if (reason === 42 || reason === 43) {
    STATE.Character.income[2] = defined(STATE.Character.income[2]) + newMoney - oldMoney
  }
}
