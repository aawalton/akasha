import { asBoolean, asNumber, asTyped } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asSearchUIEditBox,
  asVoidVarargsHandler,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"
import {
  getKeyboardSearchUIClass,
  getKeyboardSearchUIClassForOverride,
} from "../lib-sets-search-ui-keyboard-class/lib-sets-search-ui-keyboard-class.module.code.ts"
import { getSharedSuper } from "../lib-sets-search-ui-shared-class/lib-sets-search-ui-shared-class.module.code.ts"
import { searchUIName } from "../lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

const lib = LibSets

const getLocalizedText = lib.GetLocalizedText

const searchUIThrottledSearchHandlerName = `${searchUIName}_ThrottledSearch`
const SEARCH_UI_THROTTLED_DELAY = 500

const keyboardClass = getKeyboardSearchUIClass()
const keyboardOverride = getKeyboardSearchUIClassForOverride()
const sharedSuper = getSharedSuper()

function refreshSearchFilters(
  this: void,
  selfVar: LibSetsSearchUIKeyboardObject,
  editBoxControl: SearchUIEditBox
): undefined {
  selfVar.OnFilterChanged(undefined, editBoxControl)
  selfVar.StartSearch(undefined, false)
}

function onFilterDropdownEntryMouseEnterCallback(
  this: void,
  _comboBox: SearchUIComboBox,
  entry: SearchUIComboBoxItem | undefined
): undefined {
  const settings = lib.svData
  if (settings === undefined || settings.setSearchTooltipsAtFilterEntries !== true) {
    return
  }
  const tooltipText = entry?.m_data?.tooltipText
  if (entry === undefined || entry.m_data === undefined || tooltipText === undefined) {
    return
  }
  InitializeTooltip(InformationTooltip, asTyped<Control>(entry), BOTTOM, 0, -10)
  SetTooltipText(InformationTooltip, tooltipText)

  InformationTooltipTopLevel.BringWindowToTop()
}

function onFilterDropdownEntryMouseExitCallback(
  this: void,
  _comboBox: SearchUIComboBox,
  _entry: SearchUIComboBoxItem | undefined
): undefined {
  ClearTooltip(InformationTooltip)
}

export {
  onFilterDropdownEntryMouseEnterCallback,
  onFilterDropdownEntryMouseExitCallback,
  refreshSearchFilters,
  SEARCH_UI_THROTTLED_DELAY,
  searchUIThrottledSearchHandlerName,
}

keyboardClass.New = function (
  this: LibSetsSearchUIKeyboardClass,
  control: SearchUIControl
): LibSetsSearchUIKeyboardObject {
  return ZO_InitializingObject.New<LibSetsSearchUIKeyboardObject>(this, control)
}

keyboardOverride.Initialize = function (
  this: LibSetsSearchUIKeyboardObject,
  control: SearchUIControl
): undefined {
  sharedSuper.Initialize(this, control)

  const backGround = this.control.GetNamedChild("BG")
  backGround.SetAlpha(1)

  const filters = this.filtersControl
  const content = this.contentControl

  const selfVar = this

  this.resetButton = this.control.GetNamedChild("ButtonReset")
  this.searchButton = this.control.GetNamedChild("ButtonSearch")

  this.searchEditBoxControl = asTyped<SearchUIEditBox>(filters.GetNamedChild("TextSearchBox"))
  this.searchEditBoxControl.SetDefaultText(getLocalizedText("nameTextSearch"))
  this.searchEditBoxControl.SetHandler("OnMouseEnter", function (this: void): undefined {
    const settings = lib.svData
    if (settings === undefined || settings.setSearchTooltipsAtTextFilters !== true) {
      return
    }
    InitializeTooltip(
      InformationTooltip,
      asTyped<Control>(selfVar.searchEditBoxControl),
      BOTTOM,
      0,
      -10
    )
    SetTooltipText(InformationTooltip, getLocalizedText("nameTextSearchTT"))
  })
  this.searchEditBoxControl.SetHandler("OnMouseExit", function (this: void): undefined {
    ClearTooltip(InformationTooltip)
  })
  this.searchEditBoxControl.SetHandler(
    "OnTextChanged",
    function (this: void, ...args: unknown[]): undefined {
      const editBoxCtrl = asSearchUIEditBox(args[0])
      selfVar.ThrottledCall(
        searchUIThrottledSearchHandlerName,
        SEARCH_UI_THROTTLED_DELAY,
        asVoidVarargsHandler(refreshSearchFilters),
        selfVar,
        selfVar.searchEditBoxControl
      )
      selfVar.UpdateSearchHistory(editBoxCtrl)
    }
  )
  this.searchEditBoxControl.SetHandler(
    "OnMouseUp",
    function (this: void, ...args: unknown[]): undefined {
      const editBoxCtrl = asSearchUIEditBox(args[0])
      const mouseButton = asNumber(args[1])
      const upInside = asBoolean(args[2])
      const shift = asBoolean(args[3])
      const ctrl = asBoolean(args[4])
      const alt = asBoolean(args[5])
      const command = asBoolean(args[6])
      if (mouseButton === MOUSE_BUTTON_INDEX_RIGHT && upInside) {
        selfVar.OnSearchEditBoxContextMenu(editBoxCtrl, shift, ctrl, alt, command)
      }
    }
  )

  this.bonusSearchEditBoxControl = asTyped<SearchUIEditBox>(
    filters.GetNamedChild("BonusTextSearchBox")
  )
  this.bonusSearchEditBoxControl.SetDefaultText(getLocalizedText("bonusTextSearch"))
  this.bonusSearchEditBoxControl.SetHandler("OnMouseEnter", function (this: void): undefined {
    const settings = lib.svData
    if (settings === undefined || settings.setSearchTooltipsAtTextFilters !== true) {
      return
    }
    InitializeTooltip(
      InformationTooltip,
      asTyped<Control>(selfVar.bonusSearchEditBoxControl),
      BOTTOM,
      0,
      -10
    )
    SetTooltipText(InformationTooltip, getLocalizedText("bonusTextSearchTT"))
  })
  this.bonusSearchEditBoxControl.SetHandler("OnMouseExit", function (this: void): undefined {
    ClearTooltip(InformationTooltip)
  })
  this.bonusSearchEditBoxControl.SetHandler(
    "OnTextChanged",
    function (this: void, ...args: unknown[]): undefined {
      const editBoxCtrl = asSearchUIEditBox(args[0])
      selfVar.ThrottledCall(
        searchUIThrottledSearchHandlerName,
        SEARCH_UI_THROTTLED_DELAY,
        asVoidVarargsHandler(refreshSearchFilters),
        selfVar,
        selfVar.bonusSearchEditBoxControl
      )
      selfVar.UpdateSearchHistory(editBoxCtrl)
    }
  )
  this.bonusSearchEditBoxControl.SetHandler(
    "OnMouseUp",
    function (this: void, ...args: unknown[]): undefined {
      const editBoxCtrl = asSearchUIEditBox(args[0])
      const mouseButton = asNumber(args[1])
      const upInside = asBoolean(args[2])
      const shift = asBoolean(args[3])
      const ctrl = asBoolean(args[4])
      const alt = asBoolean(args[5])
      const command = asBoolean(args[6])
      if (mouseButton === MOUSE_BUTTON_INDEX_RIGHT && upInside) {
        selfVar.OnSearchEditBoxContextMenu(editBoxCtrl, shift, ctrl, alt, command)
      }
    }
  )

  this.editBoxFilters = [this.searchEditBoxControl, this.bonusSearchEditBoxControl]
  this.editBoxFilterToSearchParamName = new LuaMap<SearchUIEditBox, string>()
  this.editBoxFilterToSearchParamName.set(this.searchEditBoxControl, "names")
  this.editBoxFilterToSearchParamName.set(this.bonusSearchEditBoxControl, "bonuses")

  this.setTypeFiltersControl = filters.GetNamedChild("SetTypeFilter")
  this.armorTypeFiltersControl = filters.GetNamedChild("ArmorTypeFilter")
  this.weaponTypeFiltersControl = filters.GetNamedChild("WeaponTypeFilter")
  this.equipmentTypeFiltersControl = filters.GetNamedChild("EquipmentTypeFilter")
  this.DCLIdFiltersControl = filters.GetNamedChild("DLCIdFilter")
  this.enchantSearchCategoryTypeFiltersControl = filters.GetNamedChild(
    "EnchantSearchCategoryTypeFilter"
  )
  this.favoritesFiltersControl = filters.GetNamedChild("FavoritesFilter")
  this.dropZoneFiltersControl = filters.GetNamedChild("DropZoneFilter")
  this.dropMechanicsFiltersControl = filters.GetNamedChild("DropMechanicsFilter")
  this.dropLocationsFiltersControl = filters.GetNamedChild("DropLocationsFilter")
  this.numBonusFiltersControl = filters.GetNamedChild("NumBonusFilter")

  this.multiSelectFilterDropdowns = [
    this.setTypeFiltersControl,
    this.armorTypeFiltersControl,
    this.weaponTypeFiltersControl,
    this.equipmentTypeFiltersControl,
    this.DCLIdFiltersControl,
    this.enchantSearchCategoryTypeFiltersControl,
    this.favoritesFiltersControl,
    this.dropZoneFiltersControl,
    this.dropMechanicsFiltersControl,
    this.dropLocationsFiltersControl,
    this.numBonusFiltersControl,
  ]
  this.multiSelectFilterDropdownToSearchParamName = new LuaMap<SearchUIControl, string>()
  this.multiSelectFilterDropdownToSearchParamName.set(this.setTypeFiltersControl, "setTypes")
  this.multiSelectFilterDropdownToSearchParamName.set(this.armorTypeFiltersControl, "armorTypes")
  this.multiSelectFilterDropdownToSearchParamName.set(this.weaponTypeFiltersControl, "weaponTypes")
  this.multiSelectFilterDropdownToSearchParamName.set(
    this.equipmentTypeFiltersControl,
    "equipmentTypes"
  )
  this.multiSelectFilterDropdownToSearchParamName.set(this.DCLIdFiltersControl, "DLCIds")
  this.multiSelectFilterDropdownToSearchParamName.set(
    this.enchantSearchCategoryTypeFiltersControl,
    "enchantSearchCategoryTypes"
  )
  this.multiSelectFilterDropdownToSearchParamName.set(this.favoritesFiltersControl, "favorites")
  this.multiSelectFilterDropdownToSearchParamName.set(this.dropZoneFiltersControl, "dropZones")
  this.multiSelectFilterDropdownToSearchParamName.set(
    this.dropMechanicsFiltersControl,
    "dropMechanics"
  )
  this.multiSelectFilterDropdownToSearchParamName.set(
    this.dropLocationsFiltersControl,
    "dropLocations"
  )
  this.multiSelectFilterDropdownToSearchParamName.set(this.numBonusFiltersControl, "numBonuses")

  this.multiSelectFilterTypeNameToDropdown = {
    setTypes: this.setTypeFiltersControl,
    armorTypes: this.armorTypeFiltersControl,
    weaponTypes: this.weaponTypeFiltersControl,
    equipmentTypes: this.equipmentTypeFiltersControl,
    DLCIds: this.DCLIdFiltersControl,
    enchantSearchCategoryTypes: this.enchantSearchCategoryTypeFiltersControl,
    favorites: this.favoritesFiltersControl,
    dropZones: this.dropZoneFiltersControl,
    dropMechanics: this.dropMechanicsFiltersControl,
    dropLocations: this.dropLocationsFiltersControl,
    numBonuses: this.numBonusFiltersControl,
  }

  this.multiSelectMinAndMaxData = new LuaMap<SearchUIControl, LibSetsMultiSelectMinMaxData>()

  this.multiSelectMinAndMaxData.set(this.setTypeFiltersControl, { minX: 200, maxX: "25%" })
  this.multiSelectMinAndMaxData.set(this.armorTypeFiltersControl, { minX: 200, maxX: "25%" })
  this.multiSelectMinAndMaxData.set(this.weaponTypeFiltersControl, { minX: 200, maxX: "25%" })
  this.multiSelectMinAndMaxData.set(this.equipmentTypeFiltersControl, { minX: 200, maxX: "25%" })

  this.multiSelectMinAndMaxData.set(this.searchEditBoxControl, { minX: 200, maxX: "25%" })
  this.multiSelectMinAndMaxData.set(this.DCLIdFiltersControl, { minX: 200, maxX: "25%" })
  this.multiSelectMinAndMaxData.set(this.enchantSearchCategoryTypeFiltersControl, {
    minX: 200,
    maxX: "25%",
  })
  this.multiSelectMinAndMaxData.set(this.favoritesFiltersControl, { minX: 200, maxX: "25%" })

  this.multiSelectMinAndMaxData.set(this.bonusSearchEditBoxControl, { minX: 200, maxX: "25%" })
  this.multiSelectMinAndMaxData.set(this.numBonusFiltersControl, { minX: 100, maxX: "15%" })
  this.multiSelectMinAndMaxData.set(this.dropZoneFiltersControl, { minX: 190, maxX: "20%" })
  this.multiSelectMinAndMaxData.set(this.dropMechanicsFiltersControl, { minX: 200, maxX: "20%" })
  this.multiSelectMinAndMaxData.set(this.dropLocationsFiltersControl, { minX: 180, maxX: "20%" })

  this.isItemIdRelevantMultiSelectFilterDropdown = new LuaMap<SearchUIControl, boolean>()
  this.isItemIdRelevantMultiSelectFilterDropdown.set(this.armorTypeFiltersControl, true)
  this.isItemIdRelevantMultiSelectFilterDropdown.set(this.weaponTypeFiltersControl, true)
  this.isItemIdRelevantMultiSelectFilterDropdown.set(this.equipmentTypeFiltersControl, true)
  this.isItemIdRelevantMultiSelectFilterDropdown.set(
    this.enchantSearchCategoryTypeFiltersControl,
    true
  )

  this.InitializeFilters()

  this.counterControl = content.GetNamedChild("Counter")

  this.resultsListControl = content.GetNamedChild("List")
  this.resultsList = LibSets_SearchUI_List.New(content, this)

  this.LoadSearchUIPositionAndSize()

  this.SetMultiSelectDropdownDimensionConstraints()
  this.resultsList.SetHeaderAndColumnDimensionConstraints()

  this.tooltipControlTLC = asTyped<SearchUIControl>(LibSets_SearchUI_TooltipTopLevel)
  this.tooltipControlTLC.AllowBringToTop(true)
  this.tooltipControl = asTyped<SearchUIControl>(LibSets_SearchUI_Tooltip)
  this.tooltipKeyboardHookWasDone = false

  SYSTEMS.RegisterKeyboardObject(searchUIName, this)
}
