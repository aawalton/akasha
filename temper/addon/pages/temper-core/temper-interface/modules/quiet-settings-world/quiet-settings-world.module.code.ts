import {
  disableChatMinimize,
  dontRotateGameCamera,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-camera/quiet-camera.module.code.ts"
import { hookCraftBagNotifications } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-craft-bag/quiet-craft-bag.module.code.ts"
import { DEFAULTS } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-defaults/quiet-defaults.module.code.ts"
import { setHouseIcons } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-map-pins/quiet-map-pins.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { header } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-settings-header/quiet-settings-header.module.code.ts"
import { STRINGS } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-strings/quiet-strings.module.code.ts"
import {
  doDisableChatAutoComplete,
  dontReadBooks,
  hookAcceptOfferedQuest,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-world/quiet-world.module.code.ts"
import { dropdown } from "akasha/temper/addon/shared/settings-panel/modules/dropdown/dropdown.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"

export function buildWorldSections(this: void): LamControlData[] {
  const savedVars = getSavedVariables()
  return [
    header(STRINGS.QUIET_CAMERA_HEADER),
    {
      type: "checkbox",
      name: STRINGS.QUIET_CAMERA_INTERRUPT,
      tooltip: STRINGS.QUIET_CAMERA_INTERRUPT_TOOLTIP,
      getFunc: () => savedVars.nonstopHarvest,
      setFunc: (value) => {
        savedVars.nonstopHarvest = value
      },
      default: DEFAULTS.nonstopHarvest,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_CAMERA_ROTATE,
      tooltip: STRINGS.QUIET_CAMERA_ROTATE_TOOLTIP,
      getFunc: () => savedVars.noCameraSpin,
      setFunc: (value) => {
        savedVars.noCameraSpin = value
        dontRotateGameCamera()
      },
      default: DEFAULTS.noCameraSpin,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_CAMERA_ROTATE_STATS,
      tooltip: STRINGS.QUIET_CAMERA_ROTATE_STATS_TOOLTIP,
      getFunc: () => savedVars.noCameraSpinStats,
      setFunc: (value) => {
        savedVars.noCameraSpinStats = value
        dontRotateGameCamera()
      },
      default: DEFAULTS.noCameraSpinStats,
      disabled: () => savedVars.noCameraSpin === false,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_CAMERA_ROTATE_INV,
      tooltip: STRINGS.QUIET_CAMERA_ROTATE_INV_TOOLTIP,
      getFunc: () => savedVars.noCameraSpinInv,
      setFunc: (value) => {
        savedVars.noCameraSpinInv = value
        dontRotateGameCamera()
      },
      default: DEFAULTS.noCameraSpinInv,
      disabled: () => savedVars.noCameraSpin === false,
    },
    header(GetString(SI_WINDOW_TITLE_LORE_LIBRARY)),
    {
      type: "checkbox",
      name: STRINGS.QUIET_NOLOREREADER,
      tooltip: STRINGS.QUIET_NOLOREREADER_TOOLTIP,
      getFunc: () => savedVars.dontReadBooks,
      setFunc: (value) => {
        savedVars.dontReadBooks = value
        dontReadBooks()
      },
      default: DEFAULTS.dontReadBooks,
    },
    dropdown({
      name: STRINGS.QUIET_NOLOREDISCOVERIES,
      tooltip: STRINGS.QUIET_NOLOREDISCOVERIES_TOOLTIP,
      choices: STRINGS.AVA_MODE_OPTION,
      get: () => savedVars.dontShowLoreDiscoveries,
      set: (index) => {
        savedVars.dontShowLoreDiscoveries = index
      },
      defaultIndex: DEFAULTS.dontShowLoreDiscoveries,
    }),
    header(GetString(SI_NOTIFICATIONTYPE15)),
    {
      type: "checkbox",
      name: STRINGS.QUIET_NOCRAFTBAG_NOTIF,
      tooltip: STRINGS.QUIET_NOCRAFTBAG_NOTIF_TOOLTIP,
      getFunc: () => savedVars.craftBag,
      setFunc: (value) => {
        savedVars.craftBag = value
        hookCraftBagNotifications()
      },
      default: DEFAULTS.craftBag,
    },
    header(GetString(SI_WINDOW_TITLE_SKILLS)),
    dropdown({
      name: STRINGS.QUIET_NOSKILLSPROGRESS,
      tooltip: STRINGS.QUIET_NOSKILLSPROGRESS_TOOLTIP,
      choices: STRINGS.AVA_MODE_OPTION,
      get: () => savedVars.dontShowSkillProgression,
      set: (index) => {
        savedVars.dontShowSkillProgression = index
      },
      defaultIndex: DEFAULTS.dontShowSkillProgression,
    }),
    header(zo_strformat(GetString(SI_MAIN_MENU_INVENTORY))),
    {
      type: "checkbox",
      name: STRINGS.QUIET_NOREPORTONITEMS,
      tooltip: STRINGS.QUIET_NOREPORTONITEMS_TOOLTIP,
      getFunc: () => savedVars.noReportOnItems,
      setFunc: (value) => {
        savedVars.noReportOnItems = value
      },
      default: DEFAULTS.noReportOnItems,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_NOBINDALERT,
      tooltip: STRINGS.QUIET_NOBINDALERT_TOOLTIP,
      getFunc: () => savedVars.noBindAlert,
      setFunc: (value) => {
        savedVars.noBindAlert = value
      },
      default: DEFAULTS.noBindAlert,
    },
    header(GetString(SI_MAIN_MENU_MAP)),
    {
      type: "checkbox",
      name: STRINGS.QUIET_TAMRIEL,
      tooltip: STRINGS.QUIET_TAMRIEL_TOOLTIP,
      getFunc: () => savedVars.hideTamriel,
      setFunc: (value) => {
        savedVars.hideTamriel = value
      },
      default: DEFAULTS.hideTamriel,
    },
    dropdown({
      name: STRINGS.QUIET_WAYSHRINES,
      tooltip: STRINGS.QUIET_WAYSHRINES_TOOLTIP,
      choices: STRINGS.WAYSHRINE_OPTION,
      get: () => savedVars.hideTamrielWayhsrines,
      set: (index) => {
        savedVars.hideTamrielWayhsrines = index
      },
      defaultIndex: DEFAULTS.hideTamrielWayhsrines,
      disabled: () => savedVars.hideTamriel,
    }),
    dropdown({
      name: STRINGS.QUIET_DUNGEONS,
      tooltip: STRINGS.QUIET_DUNGEONS_TOOLTIP,
      choices: STRINGS.DUNGEONS_OPTION,
      get: () => savedVars.hideTamrielDungeons,
      set: (index) => {
        savedVars.hideTamrielDungeons = index
      },
      defaultIndex: DEFAULTS.hideTamrielDungeons,
      disabled: () => savedVars.hideTamriel,
    }),
    dropdown({
      name: STRINGS.QUIET_UNOWNED_HOUSES,
      tooltip: STRINGS.QUIET_UNOWNED_HOUSES_TOOLTIP,
      choices: STRINGS.UNOWNED_HOUSES_OPTION,
      get: () => savedVars.unownedHouses,
      set: (index) => {
        savedVars.unownedHouses = index
        setHouseIcons()
      },
      defaultIndex: DEFAULTS.unownedHouses,
    }),
    dropdown({
      name: STRINGS.QUIET_OWNED_HOUSES,
      tooltip: STRINGS.QUIET_OWNED_HOUSES_TOOLTIP,
      choices: STRINGS.UNOWNED_HOUSES_OPTION,
      get: () => savedVars.ownedHouses,
      set: (index) => {
        savedVars.ownedHouses = index
        setHouseIcons()
      },
      defaultIndex: DEFAULTS.ownedHouses,
    }),
    header(zo_strformat(GetString(SI_JOURNAL_MENU_QUESTS))),
    {
      type: "checkbox",
      name: STRINGS.QUIET_NOWRITQUESTS,
      tooltip: STRINGS.QUIET_NOWRITQUESTS_TOOLTIP,
      getFunc: () => savedVars.dontAcceptWritQuest,
      setFunc: (value) => {
        savedVars.dontAcceptWritQuest = value
        hookAcceptOfferedQuest(true)
      },
      default: DEFAULTS.dontAcceptWritQuest,
    },
    header(zo_strformat(GetString(SI_CHAT_TAB_GENERAL))),
    {
      type: "checkbox",
      name: STRINGS.QUIET_NOCHATAUTOCOMPLETE,
      tooltip: STRINGS.QUIET_NOCHATAUTOCOMPLETE_TOOLTIP,
      getFunc: () => savedVars.disableChatAutoComplete,
      setFunc: (value) => {
        savedVars.disableChatAutoComplete = value
        doDisableChatAutoComplete()
      },
      default: DEFAULTS.disableChatAutoComplete,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_NOCHATDISABLE,
      tooltip: STRINGS.QUIET_NOCHATDISABLE_TOOLTIP,
      getFunc: () => savedVars.chatForTradingHouse,
      setFunc: (value) => {
        savedVars.chatForTradingHouse = value
        disableChatMinimize()
      },
      default: DEFAULTS.chatForTradingHouse,
    },
  ]
}
