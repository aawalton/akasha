import type {
  GlobalTable,
  IpairsFn,
} from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-casts/main-menu-casts.module.code.ts"
import {
  asCategoryLayoutArray,
  asIpairsFn,
  asLmmSceneGroupInfo,
  asMenuMetatable,
  asRefreshFn,
  asTabClickable,
} from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-casts/main-menu-casts.module.code.ts"
import { getMainMenu } from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-keyboard/main-menu-keyboard.module.code.ts"
import type { Lib } from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-shape/main-menu-shape.module.code.ts"
import { MAIN_MENU_GLOBAL } from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-version/main-menu-version.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-custom-menu/custom-menu-declarations/custom-menu-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-main-menu-bar/eso-main-menu-bar.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function initMenu(self: Lib): undefined {
  const menu = getMainMenu()
  const menuClass = asMenuMetatable(getmetatable(menu)).__index
  const orgRefreshCategoryIndicators = asRefreshFn(menuClass.RefreshCategoryIndicators)
  const glob = globalThis as GlobalTable

  function getCategories(this: void, ...args: unknown[]): unknown {
    menuClass.RefreshCategoryIndicators = orgRefreshCategoryIndicators
    const savedIpairs = asIpairsFn(glob.ipairs)
    const replacement: IpairsFn = (categories) => {
      self.CATEGORY_LAYOUT_INFO = asCategoryLayoutArray(categories)
      glob.ipairs = savedIpairs
      return savedIpairs(categories)
    }
    glob.ipairs = replacement
    return orgRefreshCategoryIndicators(...args)
  }
  menuClass.RefreshCategoryIndicators = getCategories
  menu.RefreshCategoryIndicators()

  EVENT_MANAGER.UnregisterForEvent(MAIN_MENU_GLOBAL, EVENT_SECURE_RENDER_MODE_CHANGED)
  EVENT_MANAGER.RegisterForEvent<[enabled: boolean]>(
    MAIN_MENU_GLOBAL,
    EVENT_SECURE_RENDER_MODE_CHANGED,
    (_eventCode, enabled) => {
      if (!enabled && getMainMenu().lastCategory === MENU_CATEGORY_MARKET) {
        getMainMenu().lastCategory = MENU_CATEGORY_INVENTORY
        ZO_MenuBar_ClearSelection(getMainMenu().categoryBar)
      }
    }
  )

  const mainMenuWindow = CreateTopLevelWindow("TemperMainMenuXML")
  mainMenuWindow.SetAnchor(CENTER, GuiRoot, undefined, 0, 28)
  const categoryBar = CreateControlFromVirtual(
    "$(parent)CategoryBar",
    mainMenuWindow,
    "ZO_MenuBarTemplate"
  )
  categoryBar.SetAnchor(TOP)
  const sceneGroupBar = CreateControlFromVirtual(
    "$(parent)SceneGroupBar",
    mainMenuWindow,
    "ZO_LabelButtonBar"
  )
  sceneGroupBar.SetAnchor(RIGHT, GuiRoot, undefined, -40, -340)

  const subcategoryButton = CreateControl<LabelControl>(
    "temperMainMenuSubcategoryButton",
    GuiRoot,
    CT_LABEL
  )
  const [cr, cg, cb, ca] = ZO_CONTRAST_TEXT.UnpackRGBA()
  subcategoryButton.SetColor(cr, cg, cb, ca)
  subcategoryButton.SetFont("ZoFontHeader3")
  subcategoryButton.SetHandler("OnMouseEnter", (ctrl: unknown) => {
    const label = ctrl as LabelControl
    const [hr, hg, hb, ha] = ZO_HIGHLIGHT_TEXT.UnpackRGBA()
    label.SetColor(hr, hg, hb, ha)
  })
  subcategoryButton.SetHandler("OnMouseExit", (ctrl: unknown) => {
    const label = ctrl as LabelControl
    const [xr, xg, xb, xa] = ZO_CONTRAST_TEXT.UnpackRGBA()
    label.SetColor(xr, xg, xb, xa)
  })
  subcategoryButton.SetMouseEnabled(true)

  self.control = mainMenuWindow

  self.categoryBar = GetControl(self.control, "CategoryBar") as Control
  self.categoryBarFragment = ZO_SimpleSceneFragment.New(self.categoryBar)

  self.sceneGroupBar = GetControl(self.control, "SceneGroupBar") as Control
  self.sceneGroupBarLabel = GetControl(self.control, "SceneGroupBarLabel") as LabelControl

  self.tabPressedCallback = (ctrl) => {
    if (ctrl.sceneGroupName !== undefined) {
      asTabClickable(self).OnSceneGroupTabClicked(ctrl.sceneGroupName)
    }
  }

  self.sceneShowCallback = (_oldState, newState) => {
    if (newState === SCENE_SHOWING) {
      const sceneGroupInfo = asLmmSceneGroupInfo(
        self.sceneGroupInfo[self.sceneShowGroupName as string]
      )
      self.SetupSceneGroupBar(sceneGroupInfo.category, self.sceneShowGroupName as string)
      const scene = SCENE_MANAGER.GetCurrentScene()
      scene.UnregisterCallback("StateChange", self.sceneShowCallback)
    }
  }

  menu.lastCategory = MENU_CATEGORY_INVENTORY

  self.categoryInfo = menu.categoryInfo
  self.sceneInfo = menu.sceneInfo
  self.sceneGroupInfo = menu.sceneGroupInfo
  self.categoryAreaFragments = menu.categoryAreaFragments
}
