import { asLsmCastRecordStringUnknown } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asString } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  COLORS,
  constants,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-string-ids/scrollable-menu-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const SUBMENU_CLASS_EXPOSED_VARIABLES: Record<string, boolean> = {
  m_customEntryTemplateInfos: false,
  m_height: false,
  m_containerWidth: true,
  m_enableMultiSelect: true,
  m_font: true,
  m_highlightColor: true,
  m_maxNumSelections: true,
  m_multiSelectItemData: true,
  m_overrideMaxSelectionsErrorText: true,
  multiSelectionTextFormatter: true,
  noSelectionText: true,
  onSelectionBlockedCallback: true,
  m_normalColor: true,
  m_selectedItemText: false,
  m_selectedItemData: false,
  m_isDropdownVisible: false,
  m_sortedItems: false,
  horizontalAlignment: true,
  m_container: true,
  m_disabledColor: true,
  m_name: true,
  m_openDropdown: true,
  m_preshowDropdownFn: true,
  m_selectedColor: true,
  m_sortsItems: true,
  m_sortOrder: true,
  m_sortType: true,
  m_spacing: true,
  headerCollapsed: false,
  headerCollapsible: false,
  headerIcon: false,
  disableFadeGradient: true,
  headerFont: true,
  headerColor: true,
  highlightContextMenuOpeningControl: true,
  options: true,
  maxDropdownHeight: true,
  maxDropdownWidth: true,
  minDropdownWidth: true,
  m_highlightTemplate: true,
  narrateData: true,
  submenuArrowColor: true,
  submenuOpenToSide: true,
  multiSelectSubmenuSelectedArrowColor: true,
  useDefaultHighlightForSubmenuWithCallback: true,
  visibleRowsSubmenu: true,
  XMLRowTemplates: true,
  XMLRowHighlightTemplates: true,
}
asLsmCastRecordStringUnknown(constants.submenu).submenuClass_exposedVariables =
  SUBMENU_CLASS_EXPOSED_VARIABLES

const SUBMENU_CLASS_EXPOSED_FUNCTIONS: Record<string, boolean> = {
  SelectItem: true,
  IsItemSelected: true,
}
asLsmCastRecordStringUnknown(constants.submenu).submenuClass_exposedFunctions =
  SUBMENU_CLASS_EXPOSED_FUNCTIONS

const SEARCH_FILTER: Record<string, unknown> = {}
constants.searchFilter = SEARCH_FILTER

const NO_ENTRIES_RESULTS: Record<string, unknown> = {
  entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL,
  enabled: false,
  name: GetString(SI_SORT_FILTER_LIST_NO_RESULTS) + "    ",
  m_disabledColor: COLORS.DEFAULT_TEXT_DISABLED_COLOR,
  callback: function (this: void): undefined {
    d("no entries found!")
  },
  selectable: false,
  isNoEntriesResult: true,
}
SEARCH_FILTER.noEntriesResults = NO_ENTRIES_RESULTS

const NO_ENTRIES_SUBMENU_RESULTS: Record<string, unknown> = {
  entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL,
  enabled: false,
  name: GetString(SI_QUICKSLOTS_EMPTY) + "    ",
  m_disabledColor: COLORS.DEFAULT_TEXT_DISABLED_COLOR,
  callback: function (this: void): undefined {
    d("no submenu entries found!")
  },
  selectable: false,
  isNoEntriesResult: true,
}
SEARCH_FILTER.noEntriesSubmenuResults = NO_ENTRIES_SUBMENU_RESULTS

const FILTERED_ENTRY_TYPES: Record<number, boolean> = {
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER]: true,
}
SEARCH_FILTER.filteredEntryTypes = FILTERED_ENTRY_TYPES

const FILTERED_ENTRY_TYPS_CHILDS_TO_SEARCH: Record<number, unknown> = {
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX]: {
    [1]: {
      dataTable: "editBoxData",
      dataName: "_EditBoxCtrl",
      getFunc: "GetText",
      getFuncReturnType: "string",
    },
  },
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER]: {
    [1]: {
      dataTable: "sliderData",
      dataName: "_SliderCtrl",
      getFunc: "GetValue",
      getFuncReturnType: "number",
    },
  },
}
SEARCH_FILTER.filteredEntryTypsChildsToSearch = FILTERED_ENTRY_TYPS_CHILDS_TO_SEARCH

const FILTER_NAMES_EXEMPTS: Record<string, boolean> = {
  [""]: true,
  [asString(NO_ENTRIES_SUBMENU_RESULTS.name)]: true,
}
SEARCH_FILTER.filterNamesExempts = FILTER_NAMES_EXEMPTS

const origSoundComboClicked = SOUNDS.COMBO_CLICK
const origSoundDefaultClicked = SOUNDS.DEFAULT_CLICK
const soundClickedSilenced = SOUNDS.NONE
const DEFAULT_CLICK = "DEFAULT_CLICK"
const COMBO_CLICK = "COMBO_CLICK"
constants.sounds = {
  origSoundComboClicked,
  origSoundDefaultClicked,
  soundClickedSilenced,
  defaultClick: DEFAULT_CLICK,
  comboClick: COMBO_CLICK,
  entryTypeToSilenceSoundName: {
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL]: COMBO_CLICK,
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX]: DEFAULT_CLICK,
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON]: DEFAULT_CLICK,
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON]: DEFAULT_CLICK,
  },
  entryTypeToOriginalSelectedSound: {
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL]: origSoundComboClicked,
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX]: origSoundDefaultClicked,
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON]: origSoundDefaultClicked,
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON]: origSoundDefaultClicked,
  },
}
