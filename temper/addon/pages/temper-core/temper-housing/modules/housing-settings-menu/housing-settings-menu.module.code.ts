import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import {
  getHouseSavedVars,
  houseTravel,
} from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import type { LamOption } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state-types/housing-state-types.module.code.ts"
import type { SavedVars } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-types/housing-types.module.code.ts"
import { dropdown } from "akasha/temper/addon/shared/settings-panel/modules/dropdown/dropdown.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"

const houseTravelMenu = houseTravel.menu

function asLamPanelData(this: void, value: unknown): LamPanelData {
  return value as LamPanelData
}
type LamControlDataList = LamControlData[]
function asLamControlDataList(this: void, value: unknown): LamControlDataList {
  return value as LamControlDataList
}

function asString(this: void, value: string | undefined): string {
  return value as string
}

function initialize(this: void, menuName: string, vars: SavedVars): undefined {
  houseTravelMenu.lam.optionsData = houseTravelMenu.CreateMenuFromVars(vars)
  houseTravelMenu.lam.panel = registerPanel(
    TemperAddonMenu,
    menuName,
    asLamPanelData(houseTravelMenu.lam.panelData),
    asLamControlDataList(houseTravelMenu.lam.optionsData)
  )
}
houseTravelMenu.Initialize = initialize

function createMenuFromVars(this: void, _vars: SavedVars): LamOption[] {
  const constants = houseTravel.constants
  const menu = constants.menu
  return [
    {
      type: "header",
      name: menu.TITLE,
      width: "full",
    },
    {
      type: "description",
      title: undefined,
      text: menu.DESCRIPTION,
      width: "full",
    },
    {
      type: "checkbox",
      name: menu.G1,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.g1
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.g1 = value
      },
    },
    {
      type: "checkbox",
      name: menu.O1,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.o1
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.o1 = value
      },
    },
    {
      type: "checkbox",
      name: menu.G2,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.g2
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.g2 = value
      },
    },
    {
      type: "checkbox",
      name: menu.O2,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.o2
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.o2 = value
      },
    },
    {
      type: "checkbox",
      name: menu.G3,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.g3
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.g3 = value
      },
    },
    {
      type: "checkbox",
      name: menu.O3,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.o3
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.o3 = value
      },
    },
    {
      type: "checkbox",
      name: menu.G4,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.g4
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.g4 = value
      },
    },
    {
      type: "checkbox",
      name: menu.O4,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.o4
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.o4 = value
      },
    },
    {
      type: "checkbox",
      name: menu.G5,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.g5
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.g5 = value
      },
    },
    {
      type: "checkbox",
      name: menu.O5,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.o5
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.o5 = value
      },
    },
    {
      type: "checkbox",
      name: menu.EMOTE,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.emote
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.emote = value
      },
    },
    {
      type: "checkbox",
      name: menu.SAY,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.say
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.say = value
      },
    },
    {
      type: "checkbox",
      name: menu.YELL,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.yell
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.yell = value
      },
    },
    {
      type: "checkbox",
      name: menu.GROUP,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.group
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.group = value
      },
    },
    {
      type: "checkbox",
      name: menu.TELL,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.tell
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.tell = value
      },
    },
    {
      type: "checkbox",
      name: menu.ZONE,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.zone
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.zone = value
      },
    },
    {
      type: "checkbox",
      name: menu.ENZONE,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.enzone
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.enzone = value
      },
    },
    {
      type: "checkbox",
      name: menu.FRZONE,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.frzone
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.frzone = value
      },
    },
    {
      type: "checkbox",
      name: menu.DEZONE,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.dezone
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.dezone = value
      },
    },
    {
      type: "checkbox",
      name: menu.JPZONE,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc_chatAllowed.jpzone
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc_chatAllowed.jpzone = value
      },
    },
    {
      type: "checkbox",
      name: menu.ALLOW_SELF,
      getFunc: function (this: void): boolean {
        return getHouseSavedVars().vc.allowSelf
      },
      setFunc: function (this: void, value: boolean): undefined {
        getHouseSavedVars().vc.allowSelf = value
      },
    },
    dropdown({
      name: asString(menu.PORT_MODE),
      choices: [
        asString(menu.PORT_MODE_NONE),
        asString(menu.PORT_MODE_CLICK),
        asString(menu.PORT_MODE_DEACTIVATE),
      ],
      get: () => getHouseSavedVars().port_mode - 1,
      set: (index) => {
        getHouseSavedVars().port_mode = index + 1
      },
      defaultIndex: constants.PORT_MODE_ON_DEACTIVATE - 1,
      width: "full",
    }),
    dropdown({
      name: asString(menu.DEFAULT_TAB),
      choices: [
        asString(constants.TAB_HOUSE_TITLE),
        asString(constants.TAB_VC_TITLE),
        asString(constants.TAB_MYHOUSES_TITLE),
        asString(constants.TAB_LIBRARY_TITLE),
      ],
      get: () => getHouseSavedVars().defaultTab - 1,
      set: (index) => {
        const tabId = index + 1
        getHouseSavedVars().defaultTab = tabId
        houseTravel.TabSelected(tabId)
      },
      defaultIndex: constants.TAB_HOUSE - 1,
      width: "full",
    }),
  ]
}
houseTravelMenu.CreateMenuFromVars = createMenuFromVars
