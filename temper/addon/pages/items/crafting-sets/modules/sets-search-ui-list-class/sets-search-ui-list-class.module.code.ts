import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

const listClass = ZO_SortFilterList.Subclass<SetsSearchUIListClass>()

export function getSearchUIListClass(this: void): SetsSearchUIListClass {
  return listClass
}
