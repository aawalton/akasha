import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"

import { initializeSavedVariables } from "akasha/temper/addon/pages/hud/temper-events/modules/next-boss-saved-variables/next-boss-saved-variables.module.code.ts"
import { ICT } from "akasha/temper/addon/pages/hud/temper-events/modules/next-boss-state/next-boss-state.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import "akasha/temper/addon/pages/hud/temper-events/next-boss-declarations/next-boss-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const PANEL_ID = "ICTS"

ICT.initializeSettingsMenu = function (this: void): undefined {
  initializeSavedVariables()

  const panelData: LamPanelData = {
    type: "panel",
    name: "IC The Next Boss",
    displayName: "|c1E90FFIC|r The Next Boss",
    author: "ownedbynico & akamatsu02",
    version: ICT.version,
  }

  const optionsData: LamControlData[] = [
    {
      type: "description",
      text: GetString(SI_ICTHENEXTBOSS_OPTION_DESCRIPTION),
    },
    {
      type: "divider",
    },
    {
      type: "checkbox",
      name: GetString(SI_ICTHENEXTBOSS_OPTION_TIMETABLE),
      getFunc: (): boolean => ICT.savedVariables.timetable,
      setFunc: (value: boolean): undefined => {
        ICT.savedVariables.timetable = value
        if (value === true) {
          HUD_SCENE.AddFragment(ICT.ui.timetable)
          HUD_UI_SCENE.AddFragment(ICT.ui.timetable)
          ICTTimeTable.SetHidden(false)
        } else {
          ICTTimeTable.SetHidden(true)
          HUD_SCENE.RemoveFragment(ICT.ui.timetable)
          HUD_UI_SCENE.RemoveFragment(ICT.ui.timetable)
        }
        return undefined
      },
      width: "full",
    },
    {
      type: "checkbox",
      name: GetString(SI_ICTHENEXTBOSS_OPTION_MAPTIMERS),
      tooltip: GetString(SI_ICTHENEXTBOSS_OPTION_MAPTIMERS_TOOLTIP),
      getFunc: (): boolean => ICT.savedVariables.maptimers,
      setFunc: (value: boolean): undefined => {
        ICT.savedVariables.maptimers = value
        return undefined
      },
      width: "full",
    },
    {
      type: "checkbox",
      name: GetString(SI_ICTHENEXTBOSS_OPTION_EVENT_TIMERS),
      getFunc: (): boolean => ICT.savedVariables.eventtimers,
      setFunc: (value: boolean): undefined => {
        ICT.savedVariables.eventtimers = value
        ICT.editSpawnTime()
        return undefined
      },
      width: "full",
    },
    {
      type: "checkbox",
      name: "Debug",
      getFunc: (): boolean => ICT.savedVariables.chatdebug,
      setFunc: (value: boolean): undefined => {
        ICT.savedVariables.chatdebug = value
        return undefined
      },
      width: "full",
    },
    {
      type: "checkbox",
      name: GetString(SI_ICTHENEXTBOSS_OPTION_RUN_DIRECTION),
      getFunc: (): boolean => ICT.savedVariables.ccw_cw,
      setFunc: (value: boolean): undefined => {
        ICT.savedVariables.ccw_cw = value
        return undefined
      },
      width: "full",
    },
  ]

  registerPanel(TemperAddonMenu, PANEL_ID, panelData, optionsData)
  return undefined
}
