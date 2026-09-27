const ITEMTYPE_CONTAINER = 18
const ITEMTYPE_CONTAINER_CURRENCY = 70
const ITEMTYPE_CONTAINER_STACKABLE = 75
const ITEMTYPE_MASTER_WRIT = 60
const SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP = 100
const SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT = 101
const SPECIALIZED_ITEMTYPE_MASTER_WRIT = 2750
const SPECIALIZED_ITEMTYPE_HOLIDAY_WRIT = 2760

export const NEVER_OPENED_ITEM_IDS: readonly number[] = [
  217917, 217918, 217919, 217920, 217921, 217922, 217923, 219849, 219850, 219851, 219852, 219853,
  219854, 224681,
]

export function mayOpen(itemType: number, itemId: number): boolean {
  if (NEVER_OPENED_ITEM_IDS.includes(itemId)) return false
  return (
    itemType === ITEMTYPE_CONTAINER ||
    itemType === ITEMTYPE_CONTAINER_CURRENCY ||
    itemType === ITEMTYPE_CONTAINER_STACKABLE
  )
}

export function mayUse(itemType: number, specializedItemType: number): boolean {
  return !(
    itemType === ITEMTYPE_MASTER_WRIT ||
    specializedItemType === SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP ||
    specializedItemType === SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT ||
    specializedItemType === SPECIALIZED_ITEMTYPE_MASTER_WRIT ||
    specializedItemType === SPECIALIZED_ITEMTYPE_HOLIDAY_WRIT
  )
}
