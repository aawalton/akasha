import type {
  DropdownData,
  LamControl,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-eso-combobox/addon-menu-eso-combobox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-fonts/eso-fonts.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"

const DEFAULT_VISIBLE_ROWS = 10
const PADDING_Y = ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y
const ROUNDING_MARGIN = 0.01

export function setDropdownHeight(
  this: LamControl,
  dropdown: LamComboBox,
  dropdownData: DropdownData
): LuaMultiReturn<[number, number, number]> {
  const entrySpacing = dropdown.GetSpacing()
  const numSortedItems = dropdown.m_sortedItems.length
  let min: number
  let max: number

  const isScrollable = dropdownData.scrollable !== undefined && dropdownData.scrollable !== false
  const visibleRows =
    typeof dropdownData.scrollable === "number" ? dropdownData.scrollable : DEFAULT_VISIBLE_ROWS
  if (numSortedItems < visibleRows) {
    min = numSortedItems
    max = numSortedItems
  } else if (isScrollable) {
    min = DEFAULT_VISIBLE_ROWS < visibleRows ? DEFAULT_VISIBLE_ROWS : visibleRows
    max = DEFAULT_VISIBLE_ROWS > visibleRows ? DEFAULT_VISIBLE_ROWS : visibleRows
  } else {
    min = DEFAULT_VISIBLE_ROWS
    max = numSortedItems
  }

  const numEntries = zo_clamp(numSortedItems, min, max)
  const objectSpacing = dropdown.m_dropdownObject?.spacing ?? 0
  const entryHeightWithSpacing = ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT + objectSpacing
  const allItemsHeight =
    entryHeightWithSpacing * numEntries - entrySpacing + PADDING_Y * 2 + ROUNDING_MARGIN
  dropdown.SetHeight?.(allItemsHeight)
  const scroll = dropdown.m_scroll
  if (scroll !== undefined) {
    ZO_ScrollList_Commit(scroll)
  }

  return $multi(visibleRows, min, max)
}
