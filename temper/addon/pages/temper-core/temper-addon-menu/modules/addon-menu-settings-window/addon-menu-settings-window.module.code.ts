import {
  getSearchFilterFunc,
  populateAddonList,
  scrollDataIntoView,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-addon-list/addon-menu-addon-list.module.code.ts"
import {
  asControl,
  asHookTable,
  asLamControl,
  asLamFactory,
  asLamWidgetDataArray,
  asPanelData,
  asString,
  asZoFadeSceneFragment,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-casts/addon-menu-casts.module.code.ts"
import {
  MAJOR,
  MINOR,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-constants/addon-menu-constants.module.code.ts"
import {
  retrievePanelForReopening,
  showReloadDialogIfNeeded,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-dialogs/addon-menu-dialogs.module.code.ts"
import {
  flushMessages,
  printLater,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-messages/addon-menu-messages.module.code.ts"
import {
  closeCurrentPanel,
  initKeybindActions,
  openCurrentPanel,
  showSetHandlerWarning,
  toggleAddonPanels,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-panel-options/addon-menu-panel-options.module.code.ts"
import { createAddonSettingsWindow } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-settings-layout/addon-menu-settings-layout.module.code.ts"
import {
  ADDON_TO_OPTIONS_MAP,
  ADDONS_FOR_LIST,
  em,
  lam,
  sm,
  TEMPER_ADDON_MENU_CREATE_CONTROL,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-state/addon-menu-state.module.code.ts"
import type {
  AddonListData,
  Lam,
  LamControl,
  LamWidgetData,
  PanelData,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import { L } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-ui-strings/addon-menu-ui-strings.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-eso-window/addon-menu-eso-window.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-string-ids/addon-menu-string-ids.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-inventory/eso-inventory.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-keybindings/eso-keybindings.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-options-menu/eso-options-menu.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-scroll-list-extra/eso-scroll-list-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

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

  const srchEdit = TemperAddonMenuSettingsWindow.GetNamedChild<EditControl>("SearchFilterEdit")
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
  const panel = asLamFactory(TEMPER_ADDON_MENU_CREATE_CONTROL.panel)(
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

    const title = TemperAddonMenuSettingsWindow.GetNamedChild<LabelControl>("Title")
    if (title !== undefined) {
      title.SetText(panelName)
    }

    if (!addonListSorted && ADDONS_FOR_LIST.length > 0) {
      const searchEdit =
        TemperAddonMenuSettingsWindow.GetNamedChild<EditControl>("SearchFilterEdit")
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
  let fragment = TemperAddonMenuSettingsFragment
  if (fragment === undefined) {
    const window = createAddonSettingsWindow()
    fragment = asZoFadeSceneFragment(ZO_FadeSceneFragment.New(window, true, 100))
    TemperAddonMenuSettingsFragment = fragment
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
