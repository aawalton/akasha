import {
  asNumberOpt,
  asPresent,
  asStringOpt,
  asStrRecordOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import {
  asSearchUIControl,
  asSetsSearchRowData,
  asSetsSearchRowDataOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"

import { getSearchUIListClass } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-list-class/sets-search-ui-list-class.module.code.ts"
import {
  asControl,
  asSearchControl,
  asSearchControlOpt,
  searchUI,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-shared-state/sets-search-ui-shared-state.module.code.ts"
import { formatCount } from "akasha/temper/window/modules/window-numbers/window-numbers.module.code.ts"
import {
  drawPanel,
  paintRowHover,
} from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import { SETS_SET_ITEMID_TABLE_VALUE_OK } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-3/sets-search-ui-shapes-3.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-port/eso-item-browser-port.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const listClass = getSearchUIListClass()

const favoriteIconTextStar = searchUI.favoriteIconTextStar
const favoriteIconTexts = searchUI.favoriteIconTexts

function anchorOffset(this: void, offset: number | string | undefined): number | undefined {
  return typeof offset === "string" ? tonumber(offset) : offset
}

function updateFavoriteColumn(
  this: void,
  selfVar: SetsSearchUIList,
  rowControl: SearchUIControl | undefined,
  isFavorite: boolean | undefined,
  favoriteCategory: string | undefined
): undefined {
  if (rowControl === undefined || isFavorite === undefined || favoriteCategory === undefined) {
    return
  }
  let data = asSetsSearchRowDataOpt(rowControl.data)
  if (data === undefined) {
    return
  }

  if (isFavorite) {
    if (data.isFavorite !== favoriteCategory) {
      data.isFavorite = favoriteCategory
    }
  } else {
    if (data.isFavorite !== favoriteCategory) {
      return
    }
    data.isFavorite = undefined
  }
  data = asSetsSearchRowData(rowControl.data)

  const favoriteColumn = rowControl.GetNamedChild("Favorite")
  if (favoriteColumn === undefined) {
    return
  }
  favoriteColumn.SetText(isFavorite ? (favoriteIconTexts[favoriteCategory] ?? "") : "")

  if (!isFavorite) {
    const setId = data.setId
    const nextFavoriteCategory = selfVar._parentObject.GetNextFavoritesCategory(setId)
    if (nextFavoriteCategory !== undefined) {
      const nextFavCatIcon = favoriteIconTexts[nextFavoriteCategory]
      if (nextFavCatIcon !== undefined) {
        favoriteColumn.SetText(nextFavCatIcon)
        data.isFavorite = nextFavoriteCategory
      }
    }
  }
}

listClass.New = function (
  this: SetsSearchUIListClass,
  listParentControl: SearchUIControl,
  parentObject: SetsSearchUIKeyboardObject
): SetsSearchUIList {
  const listObject = ZO_SortFilterList.New<SetsSearchUIList>(this, asControl(listParentControl))
  listObject._parentObject = parentObject
  listObject.Setup()
  return listObject
}

listClass.Setup = function (this: SetsSearchUIList) {
  ZO_ScrollList_AddDataType(
    this.list,
    searchUI.scrollListDataTypeDefault,
    "TemperItemsCraftingSetsSearchUIRow",
    30,
    (control, data) => {
      this.SetupItemRow(asSearchControl(control), asSetsSearchRowData(data))
    }
  )
  this.SetAlternateRowBackgrounds(false)
  const content = asControl(this.control)
  drawPanel(content, "$(parent)Panel", content, content)

  this.SetEmptyText(`\n${GetString(SI_TRADINGHOUSESEARCHOUTCOME2)}\n`)

  this.masterList = []

  this.currentSortKey = "name"
  this.currentSortOrder = ZO_SORT_ORDER_UP
  this.sortHeaderGroup.SelectAndResetSortForKey(this.currentSortKey)

  this.sortFunction = (listEntry1, listEntry2) => {
    const currentSortKey = this.currentSortKey
    const currentSortOrder = this.currentSortOrder
    const sortKeys = this.sortKeys
    const listEntry1Data = asStrRecordOpt(listEntry1.data)
    const listEntry2Data = asStrRecordOpt(listEntry2.data)

    if (
      currentSortKey === undefined ||
      currentSortOrder === undefined ||
      ZO_IsTableEmpty(sortKeys) ||
      sortKeys[currentSortKey] === undefined ||
      listEntry1Data === undefined ||
      listEntry1Data[currentSortKey] === undefined ||
      listEntry2Data === undefined ||
      listEntry2Data[currentSortKey] === undefined
    ) {
      return false
    }
    return ZO_TableOrderingFunction(
      listEntry1Data,
      listEntry2Data,
      currentSortKey,
      sortKeys,
      currentSortOrder
    )
  }

  const control = asSearchUIControl(this.control)
  const headers = control.GetNamedChild("Headers")
  this.headers = headers
  this.headerFavorite = headers.GetNamedChild("Favorite")
  this.headerName = headers.GetNamedChild("Name")
  this.headerSetType = headers.GetNamedChild("SetType")
  this.headerArmorOrWeaponType = headers.GetNamedChild("ArmorOrWeaponType")
  this.headerEquipSlot = headers.GetNamedChild("EquipSlot")
  this.headerDropLocations = headers.GetNamedChild("DropLocations")
  this.headerSetId = headers.GetNamedChild("SetId")

  const headerAndColumnsMinAndMaxData = new LuaMap<SearchUIControl, SetsListColumnData>()
  headerAndColumnsMinAndMaxData.set(asSearchUIControl(this.headerFavorite), {
    minX: 24,
    maxX: 24,
    columnName: "Favorite",
  })
  headerAndColumnsMinAndMaxData.set(asSearchUIControl(this.headerName), {
    minX: 400,
    maxX: 400,
    columnName: "Name",
  })
  headerAndColumnsMinAndMaxData.set(asSearchUIControl(this.headerSetType), {
    minX: 40,
    maxX: 40,
    columnName: "SetType",
  })
  headerAndColumnsMinAndMaxData.set(asSearchUIControl(this.headerArmorOrWeaponType), {
    minX: 40,
    maxX: 40,
    columnName: "ArmorOrWeaponType",
  })
  headerAndColumnsMinAndMaxData.set(asSearchUIControl(this.headerEquipSlot), {
    minX: 40,
    maxX: 40,
    columnName: "EquipSlot",
  })
  headerAndColumnsMinAndMaxData.set(asSearchUIControl(this.headerDropLocations), {
    minX: 300,
    maxX: "calcByTLCWidth,-650",
    factorMultiplier: 2,
    columnName: "DropLocations",
  })
  this.headerAndColumnsMinAndMaxData = headerAndColumnsMinAndMaxData
}

listClass.SetHeaderAndColumnDimensionConstraints = function (
  this: SetsSearchUIList,
  rowControl?: SearchUIControl,
  columnsToo?: boolean,
  noHeaderIn?: boolean
) {
  if (ZO_IsTableEmpty(this.headerAndColumnsMinAndMaxData)) {
    return
  }

  const changeColumnsToo = rowControl !== undefined && columnsToo === true
  const noHeader = noHeaderIn ?? false

  for (const [controlToSetDimensions, dimensionsData] of this.headerAndColumnsMinAndMaxData) {
    if (dimensionsData !== undefined) {
      controlToSetDimensions.minX = dimensionsData.minX
      controlToSetDimensions.maxX = dimensionsData.maxX
      controlToSetDimensions.factorMultiplier = dimensionsData.factorMultiplier
      if (!noHeader) {
        asPresent(lib.XMLGetDynamicWidth)(
          controlToSetDimensions,
          undefined,
          undefined,
          true,
          undefined,
          undefined,
          true
        )

        const anchors = dimensionsData.anchors
        if (anchors !== undefined && !ZO_IsTableEmpty(anchors)) {
          controlToSetDimensions.ClearAnchors()
          for (const [, anchorData] of ipairs(anchors)) {
            controlToSetDimensions.SetAnchor(
              anchorData.point,
              asSearchControlOpt(anchorData.relativeTo),
              anchorData.relativePoint,
              anchorOffset(anchorData.offsetX),
              anchorOffset(anchorData.offsetY)
            )
          }
        }
      }

      if (changeColumnsToo && rowControl !== undefined) {
        const columnName = dimensionsData.columnName
        if (columnName !== undefined && columnName !== "") {
          const rowChildControl = rowControl.GetNamedChild(columnName)
          if (rowChildControl !== undefined) {
            rowChildControl.minX = dimensionsData.minX
            rowChildControl.maxX = dimensionsData.maxX
            rowChildControl.factorMultiplier = dimensionsData.factorMultiplier
            asPresent(lib.XMLGetDynamicWidth)(
              rowChildControl,
              undefined,
              undefined,
              true,
              30,
              30,
              true
            )
          }
        }
      }
    }
  }
}

listClass.SetupItemRow = function (
  this: SetsSearchUIList,
  control: SearchUIControl,
  data: SetsSearchRowData
) {
  control.data = data
  paintRowHover(asControl(control), false)

  const updateListColumnWith = this.updateListColumnWith
  if (updateListColumnWith !== undefined) {
    const controlUpdatedListColumnWith = asNumberOpt(control._updatedListColumnWith)
    if (
      controlUpdatedListColumnWith === undefined ||
      controlUpdatedListColumnWith < updateListColumnWith
    ) {
      this.SetHeaderAndColumnDimensionConstraints(control, true, true)
      control._updatedListColumnWith = updateListColumnWith
    }
  }

  const favoriteColumn = control.GetNamedChild("Favorite")
  favoriteColumn.normalColor = ZO_DEFAULT_TEXT
  favoriteColumn.ClearAnchors()
  favoriteColumn.SetAnchor(LEFT, control, undefined, 0, 0)
  let favoriteIconColumnText = ""
  const isFavorite = data.isFavorite
  if (isFavorite !== undefined) {
    if (typeof isFavorite === "number" || typeof isFavorite === "boolean") {
      if (isFavorite === SETS_SET_ITEMID_TABLE_VALUE_OK || isFavorite === true) {
        favoriteIconColumnText = favoriteIconTextStar
      }
    } else if (typeof isFavorite === "string") {
      favoriteIconColumnText = favoriteIconTexts[isFavorite] ?? ""
    }
  }
  favoriteColumn.SetText(favoriteIconColumnText)
  favoriteColumn.SetHidden(false)

  const nameColumn = control.GetNamedChild("Name")
  nameColumn.normalColor = ZO_DEFAULT_TEXT
  nameColumn.ClearAnchors()
  nameColumn.SetAnchor(LEFT, favoriteColumn, RIGHT, 0, 0)
  nameColumn.SetText(data.name)
  nameColumn.SetHidden(false)

  const setTypeColumn = control.GetNamedChild("SetType")
  setTypeColumn.ClearAnchors()
  setTypeColumn.SetAnchor(LEFT, nameColumn, RIGHT, 0, 0)
  setTypeColumn.SetText(data.setTypeTexture ?? tostring(data.setType ?? ""))
  setTypeColumn.SetHidden(false)

  const armorOrWeaponTypeColumn = control.GetNamedChild("ArmorOrWeaponType")
  armorOrWeaponTypeColumn.ClearAnchors()
  armorOrWeaponTypeColumn.SetAnchor(LEFT, setTypeColumn, RIGHT, 0, 0)
  armorOrWeaponTypeColumn.SetText(asStringOpt(data.armorOrWeaponTypeTexture) ?? "")
  armorOrWeaponTypeColumn.SetHidden(false)

  const slotColumn = control.GetNamedChild("EquipSlot")
  slotColumn.ClearAnchors()
  slotColumn.SetAnchor(LEFT, armorOrWeaponTypeColumn, RIGHT, 0, 0)
  slotColumn.SetText(asStringOpt(data.equipSlotTexture) ?? asStringOpt(data.equipSlotText) ?? "")
  slotColumn.SetHidden(false)

  const dropLocationsColumn = control.GetNamedChild("DropLocations")
  dropLocationsColumn.ClearAnchors()
  dropLocationsColumn.SetAnchor(LEFT, slotColumn, RIGHT, 0, 0)
  dropLocationsColumn.SetText(data.dropLocationText ?? "")
  dropLocationsColumn.SetHidden(false)

  const setIdColumn = control.GetNamedChild("SetId")
  setIdColumn.ClearAnchors()
  setIdColumn.SetAnchor(LEFT, dropLocationsColumn, RIGHT, 0, 0)
  setIdColumn.SetText(tostring(data.setId ?? ""))
  setIdColumn.SetHidden(false)

  const lastColumn = setIdColumn
  lastColumn.SetAnchor(RIGHT, control, RIGHT, -spaceOf("2"), 0)

  ZO_SortFilterList.SetupRow(this, asControl(control), data)
}

listClass.BuildSortKeys = function (this: SetsSearchUIList) {
  this.sortKeys = {
    isFavorite: { caseInsensitive: true, tiebreaker: "name" },
    name: { caseInsensitive: true },
    setType: { isNumeric: true, tiebreaker: "name" },
    armorOrWeaponType: { isNumeric: true, tiebreaker: "name" },
    equipSlot: { isNumeric: true, tiebreaker: "name" },
    dropLocationSort: { caseInsensitive: true, tiebreaker: "name" },
    setId: { isNumeric: true, tiebreaker: "name" },
    DLCID: { isNumeric: true, tiebreaker: "name" },
  }
}

listClass.UpdateCounter = function (this: SetsSearchUIList, scrollData: unknown[]) {
  let listCountAndTotal = ""
  if (this.masterList === undefined || this.masterList.length === 0) {
    listCountAndTotal = "0 / 0"
  } else {
    listCountAndTotal = `${formatCount(scrollData.length)} / ${formatCount(this.masterList.length)}`
  }
  this._parentObject.counterControl.SetText(listCountAndTotal)
}

listClass.AddFavorite = function (
  this: SetsSearchUIList,
  rowControl: SearchUIControl,
  favoriteCategory: string
) {
  updateFavoriteColumn(this, rowControl, true, favoriteCategory)
}

listClass.RemoveFavorite = function (
  this: SetsSearchUIList,
  rowControl: SearchUIControl,
  favoriteCategory: string
) {
  updateFavoriteColumn(this, rowControl, false, favoriteCategory)
}
