import {
  asAnyObject,
  asNumberOpt,
  asPresent,
  asString,
  asStringOpt,
  asStrRecordOpt,
  asTyped,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSetsSearchRowData,
  asLibSetsSearchRowDataOpt,
  asSearchUIControl,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"

const lib = LibSets

import { getSearchUIListClass } from "../lib-sets-search-ui-list-class/lib-sets-search-ui-list-class.module.code.ts"
import { searchUI } from "../lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

const listClass = getSearchUIListClass()

const favoriteIconTextStar = searchUI.favoriteIconTextStar
const favoriteIconTexts = searchUI.favoriteIconTexts

function asSearchControl(this: void, control: Control): SearchUIControl {
  return asTyped<SearchUIControl>(control)
}

function updateFavoriteColumn(
  this: void,
  selfVar: LibSetsSearchUIList,
  rowControl: SearchUIControl | undefined,
  isFavorite: boolean | undefined,
  favoriteCategory: string | undefined
): undefined {
  if (rowControl === undefined || isFavorite === undefined || favoriteCategory === undefined) {
    return
  }
  let data = asLibSetsSearchRowDataOpt(rowControl.data)
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
  data = asLibSetsSearchRowData(rowControl.data)

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
  this: LibSetsSearchUIListClass,
  listParentControl: SearchUIControl,
  parentObject: LibSetsSearchUIKeyboardObject
): LibSetsSearchUIList {
  const listObject = ZO_SortFilterList.New<LibSetsSearchUIList>(
    this,
    asTyped<Control>(listParentControl)
  )
  listObject._parentObject = parentObject
  listObject.Setup()
  return listObject
}

listClass.Setup = function (this: LibSetsSearchUIList) {
  ZO_ScrollList_AddDataType(
    this.list,
    searchUI.scrollListDataTypeDefault,
    "LibSetsSearchUIRow",
    30,
    (control, data) => {
      this.SetupItemRow(asSearchControl(control), asLibSetsSearchRowData(data))
    }
  )
  ZO_ScrollList_EnableHighlight(this.list, "ZO_ThinListHighlight")
  this.SetAlternateRowBackgrounds(true)

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

  const headerAndColumnsMinAndMaxData = new LuaMap<SearchUIControl, LibSetsListColumnData>()
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
  this: LibSetsSearchUIList,
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
              asTyped<SearchUIControl>(asAnyObject(anchorData.relativeTo)),
              anchorData.relativePoint,
              asNumberOpt(anchorData.offsetX),
              asNumberOpt(anchorData.offsetY)
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
  this: LibSetsSearchUIList,
  control: SearchUIControl,
  data: LibSetsSearchRowData
) {
  control.data = data

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
    const favoriteType = type(isFavorite)
    if (favoriteType === "number" || favoriteType === "boolean") {
      if (isFavorite === LIBSETS_SET_ITEMID_TABLE_VALUE_OK || isFavorite === true) {
        favoriteIconColumnText = favoriteIconTextStar
      }
    } else if (favoriteType === "string") {
      favoriteIconColumnText = favoriteIconTexts[asString(isFavorite)] ?? ""
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
  lastColumn.SetAnchor(RIGHT, control, RIGHT, -10, 0)

  ZO_SortFilterList.SetupRow(this, asTyped<Control>(control), data)
}

listClass.BuildSortKeys = function (this: LibSetsSearchUIList) {
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

listClass.UpdateCounter = function (this: LibSetsSearchUIList, scrollData: unknown[]) {
  let listCountAndTotal = ""
  if (this.masterList === undefined || this.masterList.length === 0) {
    listCountAndTotal = "0 / 0"
  } else {
    listCountAndTotal = string.format("%d / %d", scrollData.length, this.masterList.length)
  }
  this._parentObject.counterControl.SetText(listCountAndTotal)
}

listClass.AddFavorite = function (
  this: LibSetsSearchUIList,
  rowControl: SearchUIControl,
  favoriteCategory: string
) {
  updateFavoriteColumn(this, rowControl, true, favoriteCategory)
}

listClass.RemoveFavorite = function (
  this: LibSetsSearchUIList,
  rowControl: SearchUIControl,
  favoriteCategory: string
) {
  updateFavoriteColumn(this, rowControl, false, favoriteCategory)
}
