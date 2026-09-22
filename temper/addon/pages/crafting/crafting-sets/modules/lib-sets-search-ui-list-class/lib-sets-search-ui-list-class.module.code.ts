import "akasha/temper/addon/pages/crafting/crafting-sets/lib-sets-search-ui-globals/lib-sets-search-ui-globals.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/lib-sets-search-ui-shapes-4/lib-sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

const listClass = ZO_SortFilterList.Subclass<LibSetsSearchUIListClass>()

export function getSearchUIListClass(this: void): LibSetsSearchUIListClass {
  return listClass
}

LibSets_SearchUI_List = listClass
