import {
  asString,
  asStringOpt,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import { asComboBoxSortKeyFunc } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

const tos = tostring

export const SORT_BY_ALL: Record<string, ZoSortKeyConfig> = {
  filterType: { isNumeric: true },
  releaseDateTimeStamp: { isNumeric: true },
  nameClean: {},
}
const SORT_TYPE_TO_SORT_DATA: { [sortKey: string]: Record<string, ZoSortKeyConfig> } = {
  filterType: SORT_BY_ALL,
  releaseDateTimeStamp: SORT_BY_ALL,
  nameClean: SORT_BY_ALL,
}

export function sortFilterComboBox(
  this: void,
  comboBox: SearchUIComboBox,
  sortKey: string | ((this: void, comboBox: SearchUIComboBox) => string) | undefined,
  suppressRebuild?: boolean
): undefined {
  let sortKeyData = sortKey
  if (type(sortKey) === "function") {
    sortKeyData = asComboBoxSortKeyFunc(sortKey)(comboBox)
  }
  const sortKeyStr = asStringOpt(sortKeyData)
  const sortKeys = sortKeyStr === undefined ? undefined : SORT_TYPE_TO_SORT_DATA[sortKeyStr]
  if (sortKeys === undefined) {
    const containerName =
      comboBox.m_container !== undefined ? comboBox.m_container.GetName() : tos(comboBox)
    d(
      `${lib.prefix}Errors: Sortkeys not found for Set Search UI Keyboard - comboBox: ${tos(containerName)}, sortKey: ${tos(sortKey)}, sortKeyData: ${tos(sortKeyData)}`
    )
    return
  }
  const sortedItems = comboBox.m_sortedItems
  const sortOrder = comboBox.m_sortOrder
  table.sort(sortedItems, (item1, item2) =>
    ZO_TableOrderingFunction(item1, item2, asString(sortKeyStr), sortKeys, sortOrder)
  )

  if (suppressRebuild !== true) {
    if (comboBox.IsDropdownVisible()) {
      comboBox.ShowDropdown()
    }
  }
}
