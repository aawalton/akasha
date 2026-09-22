import { asLsmCastThisVoidAUnknownUnknown } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmConstants } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { lib } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-scrollable-menu/scrollable-menu-game-shapes/scrollable-menu-game-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-scrollable-menu/scrollable-menu-string-ids/scrollable-menu-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

const tos = tostring

const MAJOR = "TemperScrollableMenu"

lib.name = MAJOR
lib.author = "AlanGaming"
lib.version = "2.44"

lib._objects = {}
lib.preventerVars = {}
lib.XML = {}
lib.contextMenuCallbacksRegistered = {}

const constants: LsmConstants = asLsmConstants({})
lib.constants = constants

const LSM_LOGTYPE_DEBUG = 1
const LSM_LOGTYPE_VERBOSE = 2
const LSM_LOGTYPE_DEBUG_CALLBACK = 3
const LSM_LOGTYPE_INFO = 10
const LSM_LOGTYPE_ERROR = 99

const LOGGER_TYPE_TO_NAME: Record<number, string> = {
  [LSM_LOGTYPE_DEBUG]: " -DEBUG- ",
  [LSM_LOGTYPE_VERBOSE]: " -VERBOSE- ",
  [LSM_LOGTYPE_DEBUG_CALLBACK]: " -CALLBACK- ",
  [LSM_LOGTYPE_INFO]: " -INFO- ",
  [LSM_LOGTYPE_ERROR]: " -ERROR- ",
}

lib.Debug = {
  doDebug: false,
  doVerboseDebug: false,
  controlNameCache: {},
  prefix: "[" + MAJOR + "]",
  loggerTypeToName: LOGGER_TYPE_TO_NAME,
  LSM_LOGTYPE_DEBUG,
  LSM_LOGTYPE_VERBOSE,
  LSM_LOGTYPE_DEBUG_CALLBACK,
  LSM_LOGTYPE_INFO,
  LSM_LOGTYPE_ERROR,
}
const libDebug = lib.Debug

lib.SVConstans = {
  name: "LibScrollableMenu_SavedVars",
  version: 1,
  profile: "LSM",
  defaults: {
    textSearchHistory: {},
    collapsedHeaderState: {},
  },
}
lib.SV = {}

lib.classes = {}
lib.Util = {}
const libUtil = lib.Util

export function getValueOrCallback(this: void, arg: unknown, ...args: unknown[]): unknown {
  if (libDebug.doDebug === true) {
    const dlog = libDebug.DebugLog
    if (dlog !== undefined) {
      dlog(libDebug.LSM_LOGTYPE_VERBOSE, 6, tos(arg))
    }
  }
  if (type(arg) === "function") {
    return asLsmCastThisVoidAUnknownUnknown(arg)(...args)
  }
  return arg
}
libUtil.getValueOrCallback = getValueOrCallback

const NIL_CHECK_TABLE: Record<string, unknown> = {}
constants.NIL_CHECK_TABLE = NIL_CHECK_TABLE

constants.throttledCallDelay = 10

const UINarrationName = MAJOR + "_UINarration"
constants.handlerNames = {
  dropdownCallLaterHandle: MAJOR + "_Timeout",
  UINarrationName: UINarrationName + "_",
  UINarrationUpdaterName: UINarrationName + "Updater_",
  throttledCallDelayName: MAJOR + "_throttledCallDelay",
}

constants.comboBox = {}

const DEFAULT_VISIBLE_ROWS = 10
const DEFAULT_SORTS_ENTRIES = false
const DEFAULT_HEIGHT = 250
const MIN_WIDTH_WITHOUT_SEARCH_HEADER = 50
const MIN_WIDTH_WITH_SEARCH_HEADER = 125
const DROPDOWN_DEFAULTS = {
  DEFAULT_VISIBLE_ROWS,
  DEFAULT_SORTS_ENTRIES,
  DEFAULT_HEIGHT,
  MIN_WIDTH_WITHOUT_SEARCH_HEADER,
  MIN_WIDTH_WITH_SEARCH_HEADER,
}
constants.dropdown = { defaults: DROPDOWN_DEFAULTS }

constants.submenu = { SUBMENU_SHOW_TIMEOUT: 500 }

const DIVIDER_ENTRY_HEIGHT = 7
const HEADER_ENTRY_HEIGHT = 30
const DEFAULT_SPACING = 0
const WITHOUT_ICON_LABEL_DEFAULT_OFFSETX = 4

const FONTS = {
  DEFAULT_FONT: "ZoFontGame",
  HeaderFontTitle: "ZoFontHeader3",
  HeaderFontSubtitle: "ZoFontHeader2",
  HeaderCollapsedTitle: "ZoFontGamepad18",
}
constants.fonts = FONTS

const [headerR, headerG, headerB, headerA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_SELECTED
)
const [normalR, normalG, normalB, normalA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_NORMAL
)
const [hiR, hiG, hiB, hiA] = GetInterfaceColor(
  INTERFACE_COLOR_TYPE_TEXT_COLORS,
  INTERFACE_TEXT_COLOR_CONTEXT_HIGHLIGHT
)
const HEADER_TEXT_COLOR = ZO_ColorDef.New(headerR, headerG, headerB, headerA)
const DEFAULT_TEXT_COLOR = ZO_ColorDef.New(normalR, normalG, normalB, normalA)
const DEFAULT_TEXT_HIGHLIGHT = ZO_ColorDef.New(hiR, hiG, hiB, hiA)
const COLORS = {
  HEADER_TEXT_COLOR,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_HIGHLIGHT,
  DEFAULT_TEXT_DISABLED_COLOR: ZO_GAMEPAD_UNSELECTED_COLOR,
  DEFAULT_ARROW_COLOR: ZO_ColorDef.New("FFFFFF"),
}
constants.colors = COLORS

constants.textures = { iconNewIcon: ZO_KEYBOARD_NEW_ICON }

constants.narration = {
  iconNarrationNewValue: GetString(SI_SCREEN_NARRATION_NEW_ICON_NARRATION),
}

export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL = 1
export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER = 2
export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER = 3
export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU = 4
export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX = 5
export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON = 6
export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON = 7
export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX = 8
export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER = 9

export const TEMPER_SCROLLABLE_MENU_UPDATE_MODE_MAINMENU = 1
export const TEMPER_SCROLLABLE_MENU_UPDATE_MODE_SUBMENU = 2
export const TEMPER_SCROLLABLE_MENU_UPDATE_MODE_BOTH = 99

export const DIVIDER = "-"
lib.DIVIDER = DIVIDER

const SCROLL_LIST_ROW_TYPES: Record<string, number> = {
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER,
}

export { SCROLL_LIST_ROW_TYPES }

lib.scrollListRowTypes = SCROLL_LIST_ROW_TYPES

const ENTRY_TYPES: Record<string, unknown> = {}
const ENTRY_TYPE_DEFAULTS: Record<string, unknown> = {
  DIVIDER_ENTRY_HEIGHT,
  HEADER_ENTRY_HEIGHT,
  DEFAULT_SPACING,
  WITHOUT_ICON_LABEL_DEFAULT_OFFSETX,
}
const HIGHLIGHTS: Record<string, unknown> = {
  defaultHighlightTemplate: undefined,
  defaultHighlightColor: undefined,
  defaultHighLightAnimationFieldName: "TemperScrollableMenuHighlightAnimation",
  subAndContextMenuHighlightAnimationBreadcrumbsPattern: "%s_%s",
}
ENTRY_TYPE_DEFAULTS.highlights = HIGHLIGHTS
ENTRY_TYPES.defaults = ENTRY_TYPE_DEFAULTS
constants.entryTypes = ENTRY_TYPES

for (const [key, value] of pairs(SCROLL_LIST_ROW_TYPES)) {
  lib[key] = value
  ENTRY_TYPES[key] = value
}

const ON_ENTRY_MOUSE_UP_EXCLUDE: Record<number, boolean> = {
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER]: true,
}
ENTRY_TYPES.onEntryMouseUpExclude = ON_ENTRY_MOUSE_UP_EXCLUDE

const ENTRY_TYPE_TO_BUTTON_CHILD_NAME: Record<number, string> = {
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX]: "Checkbox",
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON]: "RadioButton",
}
ENTRY_TYPES.entryTypeToButtonChildName = ENTRY_TYPE_TO_BUTTON_CHILD_NAME

const IS_ENTRY_TYPE_WITH_PARENT_MOC_CTRL: Record<number, boolean> = {
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER]: true,
}
ENTRY_TYPES.isEntryTypeWithParentMocCtrl = IS_ENTRY_TYPE_WITH_PARENT_MOC_CTRL

const LIBRARY_ALLOWED_ENTRY_TYPES: Record<number, boolean> = {
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER]: true,
}
ENTRY_TYPES.libraryAllowedEntryTypes = LIBRARY_ALLOWED_ENTRY_TYPES
lib.AllowedEntryTypes = LIBRARY_ALLOWED_ENTRY_TYPES

const ALLOWED_ENTRY_TYPES_FOR_CONTEXT_MENU: Record<number, boolean> = {
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER]: true,
}
ENTRY_TYPES.allowedEntryTypesForContextMenu = ALLOWED_ENTRY_TYPES_FOR_CONTEXT_MENU
lib.AllowedEntryTypesForContextMenu = ALLOWED_ENTRY_TYPES_FOR_CONTEXT_MENU

const ENTRY_TYPES_FOR_CONTEXT_MENU_WITHOUT_MANDATORY_CALLBACK: Record<number, boolean> = {
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER]: true,
  [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU]: true,
}
ENTRY_TYPES.entryTypesForContextMenuWithoutMandatoryCallback =
  ENTRY_TYPES_FOR_CONTEXT_MENU_WITHOUT_MANDATORY_CALLBACK

const ADDITIONAL_DATA_KEY_TO_LSM_ENTRY_TYPE: Record<string, number> = {
  isDivider: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER,
  isHeader: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER,
  isCheckbox: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
  isButton: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON,
  isRadioButton: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON,
  isEditBox: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX,
  isSlider: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER,
}
ENTRY_TYPES.additionalDataKeyToLSMEntryType = ADDITIONAL_DATA_KEY_TO_LSM_ENTRY_TYPE

const UPDATE_ENTRY_PATHS_DATA = {
  updateEntryPath: "updateEntryPath",
  updateEntryPathCheckFunc: "updateEntryPathCheckFunc",
  updateIconPath: "updateIconPath",
}
ENTRY_TYPES.updateEntryPathsData = UPDATE_ENTRY_PATHS_DATA

const DATA_ALLOWED_AUTOMATIC_UPDATE_RAISE: Record<number, string> = {
  [1]: UPDATE_ENTRY_PATHS_DATA.updateEntryPath,
  [2]: UPDATE_ENTRY_PATHS_DATA.updateIconPath,
}
ENTRY_TYPES.dataAllowedAutomaticUpdateRaise = DATA_ALLOWED_AUTOMATIC_UPDATE_RAISE

export const TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_DEFAULT = "ZO_SelectionHighlight"
export const TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_GREEN = "TemperScrollableMenu_Highlight_Green"
export const TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_BLUE = "TemperScrollableMenu_Highlight_Blue"
export const TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_RED = "TemperScrollableMenu_Highlight_Red"
export const TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_OPAQUE = "TemperScrollableMenu_Highlight_Opaque"

const SCROLL_LIST_ROW_HIGHLIGHTS: Record<string, string> = {
  TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_DEFAULT,
  TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_GREEN,
  TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_BLUE,
  TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_RED,
  TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_OPAQUE,
}

export { SCROLL_LIST_ROW_HIGHLIGHTS }

lib.scrollListRowHighlights = SCROLL_LIST_ROW_HIGHLIGHTS

for (const [key, value] of pairs(SCROLL_LIST_ROW_HIGHLIGHTS)) {
  lib[key] = value
  HIGHLIGHTS[key] = value
}

const DEFAULT_HIGHLIGHT_TEMPLATE_DATA = {
  template: TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_DEFAULT,
  color: COLORS.DEFAULT_TEXT_HIGHLIGHT,
}
HIGHLIGHTS.defaultHighlightTemplateData = DEFAULT_HIGHLIGHT_TEMPLATE_DATA

const DEFAULT_HIGHLIGHT_TEMPLATE_DATA_ENTRY_HAVING_SUB_MENU_WITH_CALLBACK = {
  template: TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_GREEN,
  color: COLORS.DEFAULT_TEXT_HIGHLIGHT,
}
HIGHLIGHTS.defaultHighlightTemplateDataEntryHavingSubMenuWithCallback =
  DEFAULT_HIGHLIGHT_TEMPLATE_DATA_ENTRY_HAVING_SUB_MENU_WITH_CALLBACK

const DEFAULT_HIGHLIGHT_TEMPLATE_DATA_ENTRY_CONTEXT_MENU_OPENING_CONTROL = {
  template: TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_GREEN,
  color: COLORS.DEFAULT_TEXT_HIGHLIGHT,
}
HIGHLIGHTS.defaultHighlightTemplateDataEntryContextMenuOpeningControl =
  DEFAULT_HIGHLIGHT_TEMPLATE_DATA_ENTRY_CONTEXT_MENU_OPENING_CONTROL

export { COLORS, constants, DEFAULT_SPACING, DROPDOWN_DEFAULTS, ENTRY_TYPES, FONTS, HIGHLIGHTS }
