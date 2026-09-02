import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-03"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-link-handler"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import "../next-boss-global/next-boss-global.module.code.ts"

import { makeUiStrings } from "../next-boss-ui-strings/next-boss-ui-strings.module.code.ts"

makeUiStrings()

import "../next-boss-timers/next-boss-timers.module.code.ts"
import "../next-boss-events/next-boss-events.module.code.ts"
import "../next-boss-gui/next-boss-gui.module.code.ts"
import "../next-boss-menu/next-boss-menu.module.code.ts"

import { SLASH_COMMAND } from "../next-boss-constants/next-boss-constants.module.code.ts"
import { initData } from "../next-boss-data/next-boss-data.module.code.ts"
import { setupBroadcast } from "../next-boss-events/next-boss-events.module.code.ts"
import { initUi } from "../next-boss-gui/next-boss-gui.module.code.ts"
import { ICT } from "../next-boss-state/next-boss-state.module.code.ts"

export function initNextBoss(this: void): undefined {
  initData()
  initUi()

  EVENT_MANAGER.RegisterForEvent(ICT.name, EVENT_PLAYER_ACTIVATED, ICT.onZoneChange)

  LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_MOUSE_UP_EVENT, ICT.handleClickEvent)
  LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_CLICKED_EVENT, ICT.handleClickEvent)

  ICT.initializeSettingsMenu()
  ICT.restoreUiPosition()
  ICT.onMapOpen()
  ICT.disableMapMouseWheelZoom()
  ICTMapTimers.SetDrawTier(DT_HIGH)

  setupBroadcast()

  ICT.editSpawnTime()

  ICT.running = false
  return undefined
}

SLASH_COMMANDS[SLASH_COMMAND] = function (this: void, districtId: string | undefined): undefined {
  if (districtId === undefined) {
    ZO_Alert(UI_ALERT_CATEGORY_ALERT, undefined, "Error")
    return undefined
  }
  const parsed = tonumber(districtId)
  if (parsed === undefined) {
    return undefined
  }
  ICT.markDistrict(parsed)
  return undefined
}
