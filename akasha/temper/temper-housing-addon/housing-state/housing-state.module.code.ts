import {
  CONTROLS,
  PORT_MODE_ON_DEACTIVATE,
  SEND_BASIC_COMMENT,
  SEND_BASIC_STRING,
  SEND_KEY_WORD,
  TAB_HOUSE,
} from "../housing-constants/housing-constants.module.code.ts"
import type { PortToFriendHolder } from "../housing-holder-types/housing-holder-types.module.code.ts"
import { portToFriendMenu } from "../housing-menu-state/housing-menu-state.module.code.ts"
import type {
  PortToFriendData,
  PortToFriendDefaults,
} from "../housing-state-types/housing-state-types.module.code.ts"
import type { SavedVars, VcChatAllowed } from "../housing-types/housing-types.module.code.ts"

function asPortToFriendHolder(value: unknown): PortToFriendHolder {
  return value as PortToFriendHolder
}
function asPortToFriendData(value: unknown): PortToFriendData {
  return value as PortToFriendData
}

const libData: PortToFriendData = asPortToFriendData({
  euData: [],
  naData: [],
  currentData: [],
})

const VC_CHAT_ALLOWED_DEFAULTS: VcChatAllowed = {
  g1: true,
  o1: true,
  g2: true,
  o2: true,
  g3: true,
  o3: true,
  g4: true,
  o4: true,
  g5: true,
  o5: true,
  emote: false,
  say: false,
  yell: false,
  group: true,
  tell: true,
  zone: false,
  enzone: false,
  frzone: false,
  dezone: false,
  jpzone: false,
}

const DEFAULTS: PortToFriendDefaults = {
  vc_chatAllowed: VC_CHAT_ALLOWED_DEFAULTS,
  vc: { allowSelf: false },
  port_mode: PORT_MODE_ON_DEACTIVATE,
  defaultTab: TAB_HOUSE,
}

export const portToFriend: PortToFriendHolder = asPortToFriendHolder({
  addonName: "PortToFriendsHouse",
  version: 1,
  versionString: "2.5.46",
  updateInterval: 20,
  author: "@s0rdrak (PC / EU)",
  credits: "@Neltje, @Graham82, @Nita65",
  slashCmd: "/ptf",
  callbackName: "PtfOnPlayerDeactivated",
  libData,
  config: {
    size: {
      width: 800,
      height: 600,
      headerHeight: 25,
      headerHeightOffset: 8,
      gap: -4,
    },
    isMovable: true,
    isMouseEnabled: true,
    isClampedToScreen: true,
    fonts: { header: "$(BOLD_FONT)|$(KB_20)soft-shadow-thick" },
    search: { max: 5, height: 25, width: 250, minChars: 2 },
    color: {
      default: { R: 0.85, G: 0.83, B: 0.7 },
      backdrop: { R: 0.0, G: 0.0, B: 0.0, A: 0.7 },
      backdropEdge: { R: 1.0, G: 1.0, B: 1.0, A: 0.7 },
      searchBackdrop: { R: 0.0, G: 0.0, B: 0.0, A: 0.9 },
      searchBackdropEdge: { R: 1.0, G: 1.0, B: 1.0, A: 0.8 },
      backDropLine: { R: 0.4, G: 0.6, B: 1.0, A: 0.3 },
      visitCardFontColor: {
        R: 0.77254903316498,
        G: 0.76078432798386,
        B: 0.61960786581039,
        A: 1,
      },
      selectedVisitCardColor: { R: 0.8, G: 0.6, B: 0.4, A: 0.3 },
      selectedVisitCardColorOnMouseOver: { R: 0.4, G: 0.6, B: 1.0, A: 0.7 },
      tabSelected: { r: 0.5, g: 0.5, b: 0.5, a: 0.7 },
      tabNotSelected: { r: 0.3, g: 0.3, b: 0.3, a: 0.7 },
      tabMouseOver: { r: 0.2, g: 0.6, b: 0.8, a: 0.7 },
      edgeColor: { r: 0.8, g: 0.8, b: 0.8, a: 0.7 },
      tabFontColor: { r: 0.85, g: 0.83, b: 0.7 },
    },
    vc: {
      size: {
        width: 558,
        height: 400,
        headerHeight: 25,
        headerHeightOffset: 8,
        gap: -4,
      },
    },
    tabHeight: 40,
    tabWidth: 158,
    tabOffset: 4,
    tabFont: "$(BOLD_FONT)|$(KB_20)soft-shadow-thick",
    houseDebug: false,
  },
  constants: {
    sendBasicString: SEND_BASIC_STRING,
    sendKeyWord: SEND_KEY_WORD,
    sendBasicComment: SEND_BASIC_COMMENT,
    controls: CONTROLS,
    TAB_HOUSE: 1,
    TAB_VC: 2,
    TAB_MYHOUSES: 3,
    TAB_LIBRARY: 4,
    SORT_ID_HOUSE: 1,
    SORT_ID_LOCATION: 2,
    FILTER_ID_NONE: 1,
    FILTER_ID_HIGHLIGHT: 2,
    FILTER_ID_LABYRINTH: 3,
    FILTER_ID_JUMPNRUN: 4,
    FILTER_ID_CRAFTING: 5,
    FILTER_ID_GUILD: 6,
    FILTER_ID_ROLEPLAY: 7,
    FILTER_ID_RAID: 8,
    FILTER_ID_HIDE_SEEK: 9,
    FILTER_ID_ERP: 10,
    LIBRARY_SORT_ID_NONE: 1,
    LIBRARY_SORT_ID_NAME: 2,
    LIBRARY_SORT_ID_HOUSE: 3,
    PORT_MODE_NONE: 1,
    PORT_MODE_ON_CLICK: 2,
    PORT_MODE_ON_DEACTIVATE: 3,
    PORT_TYPE_INSIDE: 1,
    PORT_TYPE_OUTSIDE: 2,
    menu: {},
  },
  controls: {
    favorites: [],
    searchResults: [],
    searchResultsBackdrop: [],
    libraryEntries: [],
    purchasedHouses: [],
  },
  addonState: {
    houseId: 0,
    isScrollable: false,
    isVCScrollable: false,
    isMyHousesScrollable: false,
    names: [],
    searchResultClicked: false,
    taintedVisitCards: true,
    selectedVisitCard: -1,
    highlightedVisitCard: undefined,
    windowCallback: undefined,
    selectedTab: 1,
    selectedLibraryFilter: 1,
    selectedLibrarySort: 1,
    categoryFilterInitialized: false,
    LibrarySortInitialized: false,
    selectedMyHousesSort: 1,
    sortInitialized: false,
  },
  defaults: DEFAULTS,
  savedVars: undefined,
  HOUSES: {},
  purchasedHouses: {},
  menu: portToFriendMenu,
  hacks: {
    callbackName: "PortToFriend.ContextMenuHack",
    callbackInterval: 500,
  },
})

export function getPtfSavedVars(this: void): SavedVars {
  const savedVars = portToFriend.savedVars
  if (savedVars === undefined) {
    throw new Error("PortToFriend saved variables read before initialization")
  }
  return savedVars
}
