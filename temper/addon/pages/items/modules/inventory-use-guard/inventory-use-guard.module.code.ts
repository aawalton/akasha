const ITEMTYPE_CONTAINER = 18
const ITEMTYPE_CONTAINER_CURRENCY = 70
const ITEMTYPE_CONTAINER_STACKABLE = 75
const ITEMTYPE_MASTER_WRIT = 60
const SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP = 100
const SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT = 101
const SPECIALIZED_ITEMTYPE_MASTER_WRIT = 2750
const SPECIALIZED_ITEMTYPE_HOLIDAY_WRIT = 2760

export function mayOpen(itemType: number): boolean {
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
