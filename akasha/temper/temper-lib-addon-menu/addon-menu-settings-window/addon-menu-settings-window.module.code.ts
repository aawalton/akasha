import {
  createAddonList,
  createSearchFilterBox,
  getSearchFilterFunc,
  populateAddonList,
  scrollDataIntoView,
} from "../addon-menu-addon-list/addon-menu-addon-list.module.code.ts"
import {
  asControl,
  asHookTable,
  asLamControl,
  asLamFactory,
  asLamWidgetDataArray,
  asPanelData,
  asString,
  asZoFadeSceneFragment,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { MAJOR, MINOR } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import {
  handleLoadDefaultsPressed,
  handleReloadUIPressed,
  retrievePanelForReopening,
  showReloadDialogIfNeeded,
} from "../addon-menu-dialogs/addon-menu-dialogs.module.code.ts"
import {
  flushMessages,
  printLater,
} from "../addon-menu-messages/addon-menu-messages.module.code.ts"
import {
  closeCurrentPanel,
  initKeybindActions,
  openCurrentPanel,
  showSetHandlerWarning,
  toggleAddonPanels,
} from "../addon-menu-panel-options/addon-menu-panel-options.module.code.ts"
import {
  ADDON_TO_OPTIONS_MAP,
  ADDONS_FOR_LIST,
  em,
  LAMCC,
  lam,
  sm,
  wm,
} from "../addon-menu-state/addon-menu-state.module.code.ts"
import type {
  AddonListData,
  Lam,
  LamControl,
  LamWidgetData,
  PanelData,
} from "../addon-menu-types/addon-menu-types.module.code.ts"
import { L } from "../addon-menu-ui-strings/addon-menu-ui-strings.module.code.ts"

let safeToInitialize = false
let hasInitialized = false
const eventHandle = table.concat([MAJOR, MINOR], "r")

const locSettings = GetString(SI_GAME_MENU_SETTINGS)

function checkSafetyAndInitialize(this: void, addonID: string): undefined {
  if (!safeToInitialize) {
    const msg = string.format(
      "The panel with id '%s' was registered before addon loading has completed. This might break the AddOn Settings menu.",
      addonID
    )
    printLater(msg)
  }
  if (!hasInitialized) {
    hasInitialized = true
  }
}

function stripMarkup(this: void, str: string): string {
  const [step1] = string.gsub(str, "|[Cc]%x%x%x%x%x%x", "")
  const [result] = string.gsub(step1, "|[Rr]", "")
  return result
}

function openToPanel(this: Lam, panel: LamControl): undefined {
  const addonList = lam.addonList
  let selectedData: AddonListData | undefined

  for (const addonData of ADDONS_FOR_LIST) {
    if (addonData.panel === panel) {
      selectedData = addonData
      if (addonList !== undefined) {
        scrollDataIntoView(addonList, selectedData)
      }
      lam.pendingAddonPanel = addonData.panel
      break
    }
  }

  if (addonList !== undefined) {
    ZO_ScrollList_SelectData(addonList, selectedData)
    ZO_ScrollList_RefreshVisible(addonList)
  }

  const srchEdit = LAMAddonSettingsWindow.GetNamedChild<EditControl>("SearchFilterEdit")
  if (srchEdit !== undefined) {
    srchEdit.Clear()
  }

  const openAddonSettingsMenu = function (this: void): undefined {
    const gameMenu = ZO_GameMenu_InGame.gameMenu
    const settingsMenu = gameMenu.headerControls[locSettings]
    if (settingsMenu !== undefined) {
      const children = settingsMenu.GetChildren()
      const childCount = children !== undefined ? children.length : 0
      for (let i = 1; i <= childCount; i += 1) {
        const childNode = children?.[i - 1]
        if (childNode !== undefined) {
          const data = childNode.GetData()
          if (data !== undefined && data.id === lam.panelId) {
            childNode.GetTree().SelectNode(childNode)
            break
          }
        }
      }
    }
  }

  if (sm.GetScene("gameMenuInGame").GetState() === SCENE_SHOWN) {
    openAddonSettingsMenu()
  } else {
    sm.CallWhen("gameMenuInGame", SCENE_SHOWN, openAddonSettingsMenu)
    sm.Show("gameMenuInGame")
  }
}
lam.OpenToPanel = openToPanel

function registerAddonPanel(
  this: Lam,
  addonID: string,
  panelData: PanelData
): LamControl | undefined {
  let resolvedAddonID: string
  let resolvedPanelData: PanelData
  if (type(this) === "table") {
    resolvedAddonID = addonID
    resolvedPanelData = panelData
  } else {
    resolvedAddonID = asString(this)
    resolvedPanelData = asPanelData(addonID)
  }
  checkSafetyAndInitialize(resolvedAddonID)
  const container = lam.GetAddonPanelContainer()
  const panel = asLamFactory(LAMCC.panel)(
    asLamControl(container),
    resolvedPanelData,
    resolvedAddonID
  )
  panel.SetHidden(true)
  panel.SetAnchorFill(container)
  panel.SetHandler("OnEffectivelyShown", toggleAddonPanels)
  ZO_PreHook(asHookTable(panel), "SetHandler", showSetHandlerWarning)

  const filterParts: (string | number)[] = [tostring(resolvedPanelData.name)]
  if (resolvedPanelData.keywords !== undefined) {
    filterParts[filterParts.length] = resolvedPanelData.keywords
  }
  if (resolvedPanelData.author !== undefined) {
    filterParts[filterParts.length] = tostring(resolvedPanelData.author)
  }

  const addonData: AddonListData = {
    panel,
    name: stripMarkup(tostring(resolvedPanelData.name)),
    filterText: string.lower(stripMarkup(table.concat(filterParts, "\t"))),
  }

  ADDONS_FOR_LIST[ADDONS_FOR_LIST.length] = addonData

  if (resolvedPanelData.slashCommand !== undefined) {
    SLASH_COMMANDS[resolvedPanelData.slashCommand] = function (this: void): undefined {
      lam.OpenToPanel(panel)
    }
  }

  return panel
}
lam.RegisterAddonPanel = registerAddonPanel

function registerOptionControls(
  this: Lam,
  addonID: string,
  optionsTable: LamWidgetData[]
): undefined {
  let resolvedAddonID: string
  let resolvedOptionsTable: LamWidgetData[]
  if (type(this) === "table") {
    resolvedAddonID = addonID
    resolvedOptionsTable = optionsTable
  } else {
    resolvedAddonID = asString(this)
    resolvedOptionsTable = asLamWidgetDataArray(addonID)
  }
  ADDON_TO_OPTIONS_MAP[resolvedAddonID] = resolvedOptionsTable
}
lam.RegisterOptionControls = registerOptionControls

function createAddonSettingsMenuEntry(this: void): undefined {
  if (!IsKeyboardUISupported()) {
    return
  }
  const panelId = KEYBOARD_OPTIONS.currentPanelId
  const panelName = L.PANEL_NAME

  KEYBOARD_OPTIONS.currentPanelId = panelId + 1
  KEYBOARD_OPTIONS.panelNames[panelId] = panelName
  KEYBOARD_OPTIONS.controlTable[panelId] = {}

  lam.panelId = panelId

  let addonListSorted = false

  const callback = function (this: void): undefined {
    sm.AddFragment(lam.GetAddonSettingsFragment())
    KEYBOARD_OPTIONS.ChangePanels(panelId)

    const title = LAMAddonSettingsWindow.GetNamedChild<LabelControl>("Title")
    if (title !== undefined) {
      title.SetText(panelName)
    }

    if (!addonListSorted && ADDONS_FOR_LIST.length > 0) {
      const searchEdit = LAMAddonSettingsWindow.GetNamedChild<EditControl>("SearchFilterEdit")
      table.sort(
        ADDONS_FOR_LIST,
        function (this: void, a: AddonListData, b: AddonListData): boolean {
          return a.name < b.name
        }
      )
      const addonList = lam.addonList
      if (searchEdit !== undefined && addonList !== undefined) {
        populateAddonList(addonList, getSearchFilterFunc(searchEdit))
      }
      addonListSorted = true
    }
  }

  const unselectedCallback = function (this: void): undefined {
    sm.RemoveFragment(lam.GetAddonSettingsFragment())
    if (SetCameraOptionsPreviewModeEnabled !== undefined) {
      SetCameraOptionsPreviewModeEnabled(false)
    }
  }

  ZO_GameMenu_AddSettingPanel({ id: panelId, name: panelName, callback, unselectedCallback })
}

function createAddonSettingsWindow(this: void): Control {
  const tlw = wm.CreateTopLevelWindow("LAMAddonSettingsWindow")
  tlw.SetHidden(true)
  tlw.SetDimensions(1010, 914)

  ZO_ReanchorControlForLeftSidePanel(tlw)

  const bgLeft = wm.CreateControl("$(parent)BackgroundLeft", tlw, CT_TEXTURE)
  bgLeft.SetTexture("EsoUI/Art/Miscellaneous/centerscreen_left.dds")
  bgLeft.SetDimensions(1024, 1024)
  bgLeft.SetAnchor(TOPLEFT, undefined, TOPLEFT)
  bgLeft.SetDrawLayer(DL_BACKGROUND)
  bgLeft.SetExcludeFromResizeToFitExtents(true)

  const bgRight = wm.CreateControl("$(parent)BackgroundRight", tlw, CT_TEXTURE)
  bgRight.SetTexture("EsoUI/Art/Miscellaneous/centerscreen_right.dds")
  bgRight.SetDimensions(64, 1024)
  bgRight.SetAnchor(TOPLEFT, bgLeft, TOPRIGHT)
  bgRight.SetDrawLayer(DL_BACKGROUND)
  bgRight.SetExcludeFromResizeToFitExtents(true)

  const underlayLeft = wm.CreateControl("$(parent)UnderlayLeft", tlw, CT_TEXTURE)
  underlayLeft.SetTexture("EsoUI/Art/Miscellaneous/centerscreen_indexArea_left.dds")
  underlayLeft.SetDimensions(256, 1024)
  underlayLeft.SetAnchor(TOPLEFT, bgLeft, TOPLEFT)
  underlayLeft.SetDrawLayer(DL_BACKGROUND)
  underlayLeft.SetExcludeFromResizeToFitExtents(true)

  const underlayRight = wm.CreateControl("$(parent)UnderlayRight", tlw, CT_TEXTURE)
  underlayRight.SetTexture("EsoUI/Art/Miscellaneous/centerscreen_indexArea_right.dds")
  underlayRight.SetDimensions(128, 1024)
  underlayRight.SetAnchor(TOPLEFT, underlayLeft, TOPRIGHT)
  underlayRight.SetDrawLayer(DL_BACKGROUND)
  underlayRight.SetExcludeFromResizeToFitExtents(true)

  const title = wm.CreateControl("$(parent)Title", tlw, CT_LABEL)
  title.SetAnchor(TOPLEFT, undefined, TOPLEFT, 65, 70)
  title.SetFont("ZoFontWinH1")
  title.SetModifyTextType(MODIFY_TEXT_TYPE_UPPERCASE)

  const divider = wm.CreateControlFromVirtual("$(parent)Divider", tlw, "ZO_Options_Divider")
  divider.SetAnchor(TOPLEFT, undefined, TOPLEFT, 65, 108)

  const srchBox = createSearchFilterBox("$(parent)SearchFilter", tlw)
  srchBox.SetAnchor(TOPLEFT, undefined, TOPLEFT, 63, 120)
  srchBox.SetDimensions(260, 30)

  const addonList = createAddonList("$(parent)AddonList", tlw)
  addonList.SetAnchor(TOPLEFT, undefined, TOPLEFT, 65, 160)
  addonList.SetDimensions(285, 665)

  lam.addonList = addonList

  const panelContainer = wm.CreateControl("$(parent)PanelContainer", tlw, CT_CONTROL)
  panelContainer.SetAnchor(TOPLEFT, undefined, TOPLEFT, 365, 120)
  panelContainer.SetDimensions(645, 675)

  const defaultButton = wm.CreateControlFromVirtual(
    "$(parent)ResetToDefaultButton",
    tlw,
    "ZO_DialogButton"
  )
  ZO_KeybindButtonTemplate_Setup(
    defaultButton,
    "OPTIONS_LOAD_DEFAULTS",
    handleLoadDefaultsPressed,
    GetString(SI_OPTIONS_DEFAULTS)
  )
  defaultButton.SetAnchor(TOPLEFT, panelContainer, BOTTOMLEFT, 0, 2)
  lam.defaultButton = defaultButton

  const applyButton = wm.CreateControlFromVirtual("$(parent)ApplyButton", tlw, "ZO_DialogButton")
  ZO_KeybindButtonTemplate_Setup(
    applyButton,
    "OPTIONS_APPLY_CHANGES",
    handleReloadUIPressed,
    GetString(SI_ADDON_MANAGER_RELOAD)
  )
  applyButton.SetAnchor(TOPRIGHT, panelContainer, BOTTOMRIGHT, 0, 2)
  applyButton.SetHidden(true)
  lam.applyButton = applyButton

  return tlw
}

function onLoad(this: void, ..._args: unknown[]): undefined {
  em.UnregisterForEvent(eventHandle, EVENT_ADD_ON_LOADED)
  safeToInitialize = true
}
em.RegisterForEvent(eventHandle, EVENT_ADD_ON_LOADED, onLoad)

function onActivated(this: void, ...args: unknown[]): undefined {
  const initial = args[1]
  em.UnregisterForEvent(eventHandle, EVENT_PLAYER_ACTIVATED)
  flushMessages()

  const reopenPanel = retrievePanelForReopening()
  if (initial !== true && reopenPanel !== undefined) {
    lam.OpenToPanel(reopenPanel)
  }
}
em.RegisterForEvent(eventHandle, EVENT_PLAYER_ACTIVATED, onActivated)

function getAddonPanelContainer(this: Lam): Control {
  const fragment = lam.GetAddonSettingsFragment()
  const window = fragment.GetControl()
  return asControl(window.GetNamedChild("PanelContainer"))
}
lam.GetAddonPanelContainer = getAddonPanelContainer

function getAddonSettingsFragment(this: Lam): ZoFadeSceneFragment {
  assert(hasInitialized || safeToInitialize)
  let fragment = LAMAddonSettingsFragment
  if (fragment === undefined) {
    const window = createAddonSettingsWindow()
    fragment = asZoFadeSceneFragment(ZO_FadeSceneFragment.New(window, true, 100))
    LAMAddonSettingsFragment = fragment
    fragment.RegisterCallback(
      "StateChange",
      function (this: void, _oldState: number, newState: number): undefined {
        if (newState === SCENE_FRAGMENT_SHOWN) {
          initKeybindActions()
          PushActionLayerByName("OptionsWindow")
          openCurrentPanel()
        } else if (newState === SCENE_FRAGMENT_HIDDEN) {
          closeCurrentPanel()
          RemoveActionLayerByName("OptionsWindow")
          showReloadDialogIfNeeded()
        }
      }
    )
    createAddonSettingsMenuEntry()
  }
  return fragment
}
lam.GetAddonSettingsFragment = getAddonSettingsFragment
