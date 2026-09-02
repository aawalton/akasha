import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-addon-library-types/lib-addon-menu"

import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { initializeSavedVariables } from "../next-boss-saved-variables/next-boss-saved-variables.module.code.ts"
import { ICT } from "../next-boss-state/next-boss-state.module.code.ts"

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

  registerPanel(LibAddonMenu2, PANEL_ID, panelData, optionsData)
  return undefined
}
