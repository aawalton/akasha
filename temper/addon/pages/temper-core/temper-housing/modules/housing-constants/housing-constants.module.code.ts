export const ADDON_NAME = "TemperHousing"
export const SAVED_VARS_NAME = "TemperPortToFriendsHouse_SavedVariables"
export const SAVED_VARS_VERSION = 1
export const SLASH_CMD = "/temperhouses"

export const TAB_HOUSE = 1
export const TAB_VC = 2
export const TAB_MYHOUSES = 3
export const TAB_LIBRARY = 4

export const SORT_ID_HOUSE = 1
export const SORT_ID_LOCATION = 2

export const FILTER_ID_NONE = 1
export const FILTER_ID_HIGHLIGHT = 2
export const FILTER_ID_LABYRINTH = 3
export const FILTER_ID_JUMPNRUN = 4
export const FILTER_ID_CRAFTING = 5
export const FILTER_ID_GUILD = 6
export const FILTER_ID_ROLEPLAY = 7
export const FILTER_ID_RAID = 8
export const FILTER_ID_HIDE_SEEK = 9
export const FILTER_ID_ERP = 10

export const LIBRARY_SORT_ID_NONE = 1
export const LIBRARY_SORT_ID_NAME = 2
export const LIBRARY_SORT_ID_HOUSE = 3

export const PORT_MODE_NONE = 1
export const PORT_MODE_ON_CLICK = 2
export const PORT_MODE_ON_DEACTIVATE = 3

export const PORT_TYPE_INSIDE = 1
export const PORT_TYPE_OUTSIDE = 2

export const SEND_BASIC_STRING = "%s%s %d (%s)"
export const SEND_KEY_WORD = "HouseTravel_VisitCard: "
export const SEND_BASIC_COMMENT = "Port to Friend's House Visit Card"

export interface HouseTravelConstantsMenu {
  DISPLAY_NAME?: string
  AUTHOR?: string
  VERSION?: string
  TITLE?: string
  DESCRIPTION?: string
  G1?: string
  O1?: string
  G2?: string
  O2?: string
  G3?: string
  O3?: string
  G4?: string
  O4?: string
  G5?: string
  O5?: string
  EMOTE?: string
  SAY?: string
  YELL?: string
  GROUP?: string
  TELL?: string
  ZONE?: string
  ENZONE?: string
  FRZONE?: string
  DEZONE?: string
  JPZONE?: string
  ALLOW_SELF?: string
  PORT_MODE?: string
  PORT_MODE_NONE?: string
  PORT_MODE_CLICK?: string
  PORT_MODE_DEACTIVATE?: string
  DEFAULT_TAB?: string
}

export interface HouseTravelConstants {
  sendBasicString: string
  sendKeyWord: string
  sendBasicComment: string
  controls: ControlNames
  TAB_HOUSE: number
  TAB_VC: number
  TAB_MYHOUSES: number
  TAB_LIBRARY: number
  SORT_ID_HOUSE: number
  SORT_ID_LOCATION: number
  FILTER_ID_NONE: number
  FILTER_ID_HIGHLIGHT: number
  FILTER_ID_LABYRINTH: number
  FILTER_ID_JUMPNRUN: number
  FILTER_ID_CRAFTING: number
  FILTER_ID_GUILD: number
  FILTER_ID_ROLEPLAY: number
  FILTER_ID_RAID: number
  FILTER_ID_HIDE_SEEK: number
  FILTER_ID_ERP: number
  LIBRARY_SORT_ID_NONE: number
  LIBRARY_SORT_ID_NAME: number
  LIBRARY_SORT_ID_HOUSE: number
  PORT_MODE_NONE: number
  PORT_MODE_ON_CLICK: number
  PORT_MODE_ON_DEACTIVATE: number
  PORT_TYPE_INSIDE: number
  PORT_TYPE_OUTSIDE: number
  HEADER_TITLE?: string
  LABEL_PLAYER?: string
  BUTTON_PORT?: string
  BUTTON_ADD_FAVORITE?: string
  BUTTON_SEND_VISITCARD?: string
  BUTTON_MAIN_RESIDENCE?: string
  VC_HEADER_TITLE?: string
  VC_PLAYER?: string
  VC_HOUSE?: string
  BUTTON_REMOVE?: string
  BUTTON_VC?: string
  TOGGLE_PORT_WINDOW?: string
  PORT_TO_FAVORITE?: string
  PORT_TO_FAVORITE_MY_HOUSE_INSIDE?: string
  PORT_TO_FAVORITE_MY_HOUSE_OUTSIDE?: string
  INVALID_FAVORITE_ID?: string
  SORT_NAME?: string
  SORT_HOUSE?: string
  CMD_HELP_1?: string
  CMD_HELP_2?: string
  CMD_HELP_3?: string
  CMD_HELP_4?: string
  CMD_HELP_5?: string
  CMD_HELP_6?: string
  CMD_HELP_7?: string
  TAB_HOUSE_TITLE?: string
  TAB_VC_TITLE?: string
  TAB_MYHOUSES_TITLE?: string
  TAB_LIBRARY_TITLE?: string
  LIBRARY_MESSAGE?: string
  SORT_LABEL?: string
  SORT_LOCATION?: string
  FILTER_LABEL?: string
  FILTER_NONE?: string
  FILTER_HIGHLIGHT?: string
  FILTER_LABYRINTH?: string
  FILTER_JUMPNRUN?: string
  FILTER_CRAFTING?: string
  FILTER_GUILD?: string
  FILTER_ROLEPLAY?: string
  FILTER_RAID?: string
  FILTER_HIDE_SEEK?: string
  FILTER_ERP?: string
  LIBRARY_SORT_LABEL?: string
  LIBRARY_SORT_NONE?: string
  LIBRARY_SORT_NAME?: string
  LIBRARY_SORT_HOUSE?: string
  MYHOUSES_FRONT_DOOR?: string
  MYHOUSES_PORT_INSIDE?: string
  CONTEXT_MENU_SEND?: string
  menu: HouseTravelConstantsMenu
}

export const CONTROLS = {
  TLW_NAME: "HouseTravel_TLW",
  TLW_VC_NAME: "HouseTravel_VC_TLW",
  HEADER_NAME: "HouseTravel_Header",
  HEADER_CONTROL: "HouseTravel_Header_Control",
  HEADER_BACKDROP: "HouseTravel_Header_Backdrop",
  HEADER_BUTTON: "HouseTravel_Header_Button",
  BODY_CONTROL: "HouseTravel_Body_Control",
  BODY_BACKDROP: "HouseTravel_Body_Backdrop",
  BODY_EDITBOX: "HouseTravel_Body_Editbox",
  BODY_DROPDOWN: "HouseTravel_Body_Dropdown",
  SEARCH_BODY_BACKDROP: "HouseTravel_Search_Body_Dropdown",
  SCROLL_CONTROL: "HouseTravel_Scroll_Control",
  COMBOBOX_FAVORITES: "HouseTravel_Combobox_Favorites_%d_%d",
  COMBOBOX_LIBRARY: "HouseTravel_Combobox_Library",
  COMBOBOX_SORT_LIBRARY: "HouseTravel_Combobox_Sort_Library",
  COMBOBOX_MYHOUSES: "HouseTravel_Combobox_MyHouses",
  COMBOBOX_MYHOUSES_FAVORITES: "HouseTravel_Combobox_Favorites_%d_%d_%d_%d",
  VC_HEADER_NAME: "HouseTravel_VC_Header",
  VC_HEADER_CONTROL: "HouseTravel_VC_Header_Control",
  VC_HEADER_BACKDROP: "HouseTravel_VC_Header_Backdrop",
  VC_HEADER_BUTTON: "HouseTravel_VC_Header_Button",
  VC_BODY_CONTROL: "HouseTravel_VC_Body_Control",
  VC_BODY_BACKDROP: "HouseTravel_VC_Body_Backdrop",
  VC_SCROLL_CONTROL: "HouseTravel_VC_Scroll_Control",
} as const

export type ControlNames = typeof CONTROLS
