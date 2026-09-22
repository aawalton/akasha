import { asLsmCastRecordStringUnknown } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  COLORS,
  constants,
  DEFAULT_SPACING,
  DROPDOWN_DEFAULTS,
  FONTS,
  HIGHLIGHTS,
  TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_DEFAULT,
} from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-scrollable-menu/scrollable-menu-string-ids/scrollable-menu-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"

constants.data = {
  subtables: {
    LSM_DATA_SUBTABLE: "_LSM",
    LSM_DATA_SUBTABLE_ORIGINAL_DATA: "OriginalData",
    LSM_DATA_SUBTABLE_CALLBACK_FUNCTIONS: "funcData",
  },
}

export const COMBO_BOX_MAPPING: Record<string, unknown> = {}
asLsmCastRecordStringUnknown(constants.comboBox).mapping = COMBO_BOX_MAPPING

const LSM_ENTRY_KEY_ZO_COMBO_BOX_ENTRY_KEY: Record<string, string> = {
  normalColor: "m_normalColor",
  disabledColor: "m_disabledColor",
  highlightColor: "m_highlightColor",
  highlightTemplate: "m_highlightTemplate",
}
COMBO_BOX_MAPPING.LSMEntryKeyZO_ComboBoxEntryKey = LSM_ENTRY_KEY_ZO_COMBO_BOX_ENTRY_KEY

const NIL_TO_TRUE = true
const NIL_IGNORE = false
const POSSIBLE_ENTRY_DATA_WITH_FUNCTION: Record<string, boolean> = {
  name: NIL_IGNORE,
  label: NIL_IGNORE,
  checked: NIL_IGNORE,
  font: NIL_IGNORE,
  enabled: NIL_TO_TRUE,
}
COMBO_BOX_MAPPING.possibleEntryDataWithFunction = POSSIBLE_ENTRY_DATA_WITH_FUNCTION

const [selR, selG, selB, selA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_SELECTED
)
export const COMBO_BOX_DEFAULTS: Record<string, unknown> = {
  m_disabledColor: COLORS.DEFAULT_TEXT_DISABLED_COLOR,
  m_enableMultiSelect: false,
  m_font: FONTS.DEFAULT_FONT,
  m_height: DROPDOWN_DEFAULTS.DEFAULT_HEIGHT,
  m_highlightColor: COLORS.DEFAULT_TEXT_HIGHLIGHT,
  m_highlightTemplate: TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_DEFAULT,
  m_isDropdownVisible: false,
  m_maxNumSelectionsErrorText: GetString(SI_COMBO_BOX_MAX_SELECTIONS_REACHED_ALERT),
  m_normalColor: COLORS.DEFAULT_TEXT_COLOR,
  m_selectedColor: [selR, selG, selB, selA],
  m_sortsItems: false,
  m_sortOrder: ZO_SORT_ORDER_UP,
  m_sortType: ZO_SORT_BY_NAME,
  m_spacing: DEFAULT_SPACING,
  multiSelectionTextFormatter: SI_COMBO_BOX_DEFAULT_MULTISELECTION_TEXT_FORMATTER,
  noSelectionText: GetString(SI_COMBO_BOX_DEFAULT_NO_SELECTION_TEXT),
  horizontalAlignment: TEXT_ALIGN_LEFT,
  itemYPad: 0,
  automaticRefresh: false,
  automaticSubmenuRefresh: false,
  baseEntryHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
  containerMinWidth: DROPDOWN_DEFAULTS.MIN_WIDTH_WITHOUT_SEARCH_HEADER,
  disableFadeGradient: false,
  enableFilter: false,
  headerFont: FONTS.DEFAULT_FONT,
  headerColor: COLORS.HEADER_TEXT_COLOR,
  headerCollapsed: false,
  submenuArrowColor: COLORS.DEFAULT_ARROW_COLOR,
  visibleRows: DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS,
  visibleRowsSubmenu: DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS,
}
asLsmCastRecordStringUnknown(constants.comboBox).defaults = COMBO_BOX_DEFAULTS

const COMBO_BOX_DEFAULTS_CONTEXTUAL_INIT_VALUES = {
  m_sortsItems: { ifEquals: true, changeTo: COMBO_BOX_DEFAULTS.m_sortsItems },
}
asLsmCastRecordStringUnknown(constants.comboBox).defaultsContextualInitValues =
  COMBO_BOX_DEFAULTS_CONTEXTUAL_INIT_VALUES

HIGHLIGHTS.defaultHighlightTemplate = COMBO_BOX_DEFAULTS.m_highlightTemplate
HIGHLIGHTS.defaultHighlightColor = COMBO_BOX_DEFAULTS.m_highlightColor

const DEFAULT_COMBO_BOX_OPTIONS: Record<string, unknown> = {
  automaticRefresh: false,
  automaticSubmenuRefresh: false,
  enableFilter: false,
  disableFadeGradient: false,
  font: FONTS.DEFAULT_FONT,
  headerCollapsed: false,
  headerCollapsible: false,
  highlightContextMenuOpeningControl: false,
  sortEntries: DROPDOWN_DEFAULTS.DEFAULT_SORTS_ENTRIES,
  spacing: DEFAULT_SPACING,
  useDefaultHighlightForSubmenuWithCallback: false,
  visibleRowsDropdown: DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS,
  visibleRowsSubmenu: DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS,
}
asLsmCastRecordStringUnknown(constants.comboBox).defaultComboBoxOptions = DEFAULT_COMBO_BOX_OPTIONS

const LSM_OPTIONS_KEY_TO_ZO_COMBO_BOX_OPTIONS_KEY: Record<string, string> = {
  automaticRefresh: "automaticRefresh",
  automaticSubmenuRefresh: "automaticSubmenuRefresh",
  disableFadeGradient: "disableFadeGradient",
  disabledColor: "m_disabledColor",
  enableFilter: "enableFilter",
  enableMultiSelect: "m_enableMultiSelect",
  headerCollapsible: "headerCollapsible",
  headerCollapsed: "headerCollapsed",
  headerColor: "headerColor",
  headerFont: "headerFont",
  headerIcon: "headerIcon",
  highlightContextMenuOpeningControl: "highlightContextMenuOpeningControl",
  maxNumSelections: "m_maxNumSelections",
  maxNumSelectionsErrorText: "m_overrideMaxSelectionsErrorText",
  multiSelectionTextFormatter: "multiSelectionTextFormatter",
  narrate: "narrateData",
  normalColor: "m_normalColor",
  noSelectionText: "noSelectionText",
  subtitleText: "subtitleText",
  subtitleFont: "subtitleFont",
  titleFont: "titleFont",
  titleText: "titleText",
  titleTextAlignment: "titleTextAlignment",
  useDefaultHighlightForSubmenuWithCallback: "useDefaultHighlightForSubmenuWithCallback",
  visibleRowsSubmenu: "visibleRowsSubmenu",
  font: "m_font",
  maxDropdownHeight: "maxHeight",
  maxDropdownWidth: "maxWidth",
  minDropdownWidth: "minWidth",
  preshowDropdownFn: "m_preshowDropdownFn",
  sortEntries: "m_sortsItems",
  sortOrder: "m_sortOrder",
  sortType: "m_sortType",
  spacing: "m_spacing",
  submenuArrowColor: "submenuArrowColor",
  submenuOpenToSide: "submenuOpenToSide",
  multiSelectSubmenuSelectedArrowColor: "multiSelectSubmenuSelectedArrowColor",
  visibleRowsDropdown: "visibleRows",
}
COMBO_BOX_MAPPING.LSMOptionsKeyToZO_ComboBoxOptionsKey = LSM_OPTIONS_KEY_TO_ZO_COMBO_BOX_OPTIONS_KEY
