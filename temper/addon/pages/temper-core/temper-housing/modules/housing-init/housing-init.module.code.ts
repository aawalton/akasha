import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-publish/housing-publish.module.code.ts"

import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-chat-capture/housing-chat-capture.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-comboboxes/housing-comboboxes.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-context-menu/housing-context-menu.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-dropdowns/housing-dropdowns.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-favorites-helpers/housing-favorites-helpers.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-favorites-render/housing-favorites-render.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-house-list/housing-house-list.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-hover/housing-hover.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-library-lookup/housing-library-lookup.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-library-tab/housing-library-tab.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-my-houses/housing-my-houses.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-porting/housing-porting.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-search/housing-search.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-settings-menu/housing-settings-menu.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-slash/housing-slash.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-sliders/housing-sliders.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-tabs/housing-tabs.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-visit-card-send/housing-visit-card-send.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-visit-cards-interact/housing-visit-cards-interact.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-visit-cards-render/housing-visit-cards-render.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-visit-cards-view/housing-visit-cards-view.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-window-controls/housing-window-controls.module.code.ts"

import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import { buildHouseTab } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-build-house-tab/housing-build-house-tab.module.code.ts"
import { buildLibraryTab } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-build-library-tab/housing-build-library-tab.module.code.ts"
import { buildMyHousesTab } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-build-my-houses-tab/housing-build-my-houses-tab.module.code.ts"
import { buildVcTab } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-build-visit-cards-tab/housing-build-visit-cards-tab.module.code.ts"
import { buildWindow } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-build-window/housing-build-window.module.code.ts"
import {
  SAVED_VARS_NAME,
  SAVED_VARS_VERSION,
  SLASH_CMD,
} from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-constants/housing-constants.module.code.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import type { SavedVars } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-types/housing-types.module.code.ts"
import { registerUiStrings } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-ui-strings/housing-ui-strings.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"

registerUiStrings()

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

function houseSlashCommand(this: void, param: string): undefined {
  d(houseTravel.slashCmd + " " + param)
  const trimmed = zo_strtrim(param)
  const [cmd, rest] = houseTravel.ParseCmd("", trimmed)

  if (cmd === "port") {
    const [lastWordCapture] = string.match(rest, ".* ()")
    const lastWordRaw = parseLuaCapture(lastWordCapture)
    const lastWordIndex = lastWordRaw !== undefined ? tonumber(lastWordRaw) : undefined
    if (lastWordIndex !== undefined) {
      const index = tonumber(string.sub(rest, lastWordIndex))
      if (index !== undefined) {
        let target = zo_strtrim(string.sub(rest, 0, lastWordIndex - 1))
        if (target === GetUnitName("player")) {
          target = GetDisplayName()
        }
        houseTravel.JumpToHouse(target, index)
      } else {
        houseTravel.JumpToDefaultHouse(rest)
      }
    } else {
      houseTravel.JumpToDefaultHouse(rest)
    }
  } else if (cmd === "show") {
    for (const [key, house] of pairs(houseTravel.HOUSES)) {
      if (house !== undefined) {
        d(tostring(key) + ": " + house)
      }
    }
  } else if (cmd === "open") {
    houseTravel.OpenWindow()
  } else if (cmd === "fav") {
    const favId = tonumber(rest)
    if (favId !== undefined && favId > 0) {
      houseTravel.PortToFavoriteBinding(favId)
    } else {
      d(houseTravel.constants.INVALID_FAVORITE_ID ?? "")
    }
  } else if (cmd === "favi") {
    const favId = tonumber(rest)
    if (favId !== undefined && favId > 0) {
      houseTravel.PortToMyHouseBinding(favId, houseTravel.constants.PORT_TYPE_INSIDE)
    } else {
      d(houseTravel.constants.INVALID_FAVORITE_ID ?? "")
    }
  } else if (cmd === "favo") {
    const favId = tonumber(rest)
    if (favId !== undefined && favId > 0) {
      houseTravel.PortToMyHouseBinding(favId, houseTravel.constants.PORT_TYPE_OUTSIDE)
    } else {
      d(houseTravel.constants.INVALID_FAVORITE_ID ?? "")
    }
  } else if (cmd === "menu") {
    if (TemperAddonMenu !== undefined) {
      TemperAddonMenu.OpenToPanel(houseTravel.menu.lam.panel)
    }
  } else {
    houseTravel.ShowHelp()
  }
}

SLASH_COMMANDS[SLASH_CMD] = houseSlashCommand

function isSavedVars(value: unknown): value is SavedVars {
  if (!isObjectRecord(value)) return false
  if (!isObjectRecord(value.favorites)) return false
  const vc = value.vc
  if (!isObjectRecord(vc) || !isObjectRecord(vc.receivedCards)) return false
  if (!isObjectRecord(value.vc_chatAllowed)) return false
  if (!isObjectRecord(value.myHousesFavorites)) return false
  if (typeof value.port_mode !== "number") return false
  if (typeof value.defaultTab !== "number") return false
  return true
}

function seedSavedVarsTables(raw: Record<string, unknown>): undefined {
  if (raw.favorites === undefined) {
    raw.favorites = []
  }
  const vc = raw.vc
  if (!isObjectRecord(vc)) {
    raw.vc = { allowSelf: false, receivedCards: [] }
  } else if (vc.receivedCards === undefined) {
    vc.receivedCards = []
  }
  if (raw.myHousesFavorites === undefined) {
    raw.myHousesFavorites = {}
  }
}

function houseTravelOnInitialize(this: void): undefined {
  const raw: unknown = ZO_SavedVars.NewAccountWide(
    SAVED_VARS_NAME,
    SAVED_VARS_VERSION,
    undefined,
    houseTravel.defaults
  )
  if (!isObjectRecord(raw)) {
    throw new Error("HouseTravel SavedVariables is not a table")
  }
  seedSavedVarsTables(raw)
  if (!isSavedVars(raw)) {
    throw new Error("HouseTravel SavedVariables failed validation")
  }
  houseTravel.savedVars = raw

  for (let i = 0; i < houseTravel.savedVars.favorites.length; i += 1) {
    houseTravel.Version12NameFix(i)
  }

  if (houseTravel.savedVars.selectedMyHousesSort !== undefined) {
    houseTravel.addonState.selectedMyHousesSort = houseTravel.savedVars.selectedMyHousesSort
  }
  if (houseTravel.savedVars.selectedLibraryFilter !== undefined) {
    houseTravel.addonState.selectedLibraryFilter = houseTravel.savedVars.selectedLibraryFilter
  }
  if (houseTravel.savedVars.selectedLibrarySort !== undefined) {
    houseTravel.addonState.selectedLibrarySort = houseTravel.savedVars.selectedLibrarySort
  }

  if (
    houseTravel.savedVars.myHousesFavorites[houseTravel.constants.PORT_TYPE_INSIDE] === undefined
  ) {
    houseTravel.savedVars.myHousesFavorites[houseTravel.constants.PORT_TYPE_INSIDE] = {}
  }
  if (
    houseTravel.savedVars.myHousesFavorites[houseTravel.constants.PORT_TYPE_OUTSIDE] === undefined
  ) {
    houseTravel.savedVars.myHousesFavorites[houseTravel.constants.PORT_TYPE_OUTSIDE] = {}
  }

  houseTravel.HOUSES = houseTravel.CreateHouseList()

  buildWindow()
  buildHouseTab()
  buildVcTab()
  buildMyHousesTab()
  buildLibraryTab()

  houseTravel.addonState.selectedTab = houseTravel.savedVars.defaultTab
  houseTravel.TabOnMouseExit(houseTravel.addonState.selectedTab)
  houseTravel.TabSelected(houseTravel.addonState.selectedTab)

  EVENT_MANAGER.RegisterForEvent(
    houseTravel.addonName,
    EVENT_CHAT_MESSAGE_CHANNEL,
    houseTravel.ChatMessageReceived
  )
  EVENT_MANAGER.RegisterForEvent(
    houseTravel.addonName,
    EVENT_COLLECTIBLE_NOTIFICATION_NEW,
    houseTravel.CollectibleNotification
  )

  houseTravel.menu.Initialize(houseTravel.menu.name, houseTravel.savedVars)

  EVENT_MANAGER.RegisterForUpdate(
    houseTravel.hacks.callbackName,
    houseTravel.hacks.callbackInterval,
    houseTravel.ContextMenuHackOnUpdate
  )
  EVENT_MANAGER.RegisterForEvent(
    houseTravel.callbackName,
    EVENT_PLAYER_DEACTIVATED,
    houseTravel.OnPlayerDeactivated
  )
}
houseTravel.HouseTravelOnInitialize = houseTravelOnInitialize

export function initHouseTravel(this: void): undefined {
  houseTravel.HouseTravelOnInitialize()
  return undefined
}
