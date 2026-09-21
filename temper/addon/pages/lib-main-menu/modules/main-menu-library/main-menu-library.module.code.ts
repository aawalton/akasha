import type { TextureFn } from "akasha/temper/addon/pages/lib-main-menu/modules/main-menu-casts/main-menu-casts.module.code.ts"
import {
  asLmmCategoryLayoutInfo,
  asLmmSceneGroupInfo,
  asMenuBarHost,
  asMultiIcon,
  asTextureArray,
} from "akasha/temper/addon/pages/lib-main-menu/modules/main-menu-casts/main-menu-casts.module.code.ts"
import { getMainMenu } from "akasha/temper/addon/pages/lib-main-menu/modules/main-menu-keyboard/main-menu-keyboard.module.code.ts"
import { installSceneNavigation } from "akasha/temper/addon/pages/lib-main-menu/modules/main-menu-scenes/main-menu-scenes.module.code.ts"
import { initMenu } from "akasha/temper/addon/pages/lib-main-menu/modules/main-menu-setup/main-menu-setup.module.code.ts"
import type { Lib } from "akasha/temper/addon/pages/lib-main-menu/modules/main-menu-shape/main-menu-shape.module.code.ts"
import {
  MAJOR,
  MINOR,
} from "akasha/temper/addon/pages/lib-main-menu/modules/main-menu-version/main-menu-version.module.code.ts"

export const LIB: Lib = { name: MAJOR, version: MINOR } as Lib

function addButton(
  descriptor: number | string,
  categoryLayoutInfo: LmmCategoryLayoutInfo
): undefined {
  categoryLayoutInfo.descriptor = descriptor
  ZO_MenuBar_AddButton(getMainMenu().categoryBar, categoryLayoutInfo)
}

function addScene(
  descriptor: number | string,
  sceneName: string,
  categoryLayoutInfo: LmmCategoryLayoutInfo,
  sceneGroupName?: string
): undefined {
  const menu = getMainMenu()
  const subcategoryBar = CreateControlFromVirtual(
    "ZO_MainMenuSubcategoryBar",
    menu.control,
    "ZO_MainMenuSubcategoryBar",
    descriptor
  )
  subcategoryBar.SetAnchor(TOP, menu.categoryBar, BOTTOM, 0, 7)

  const subcategoryBarFragment = ZO_SimpleSceneFragment.New(subcategoryBar)
  const categoryInfo: LmmCategoryInfo = {
    barControls: [],
    subcategoryBar: subcategoryBar,
    subcategoryBarFragment: subcategoryBarFragment,
    sceneName: sceneName,
  }

  LIB.CATEGORY_LAYOUT_INFO.push(categoryLayoutInfo)
  const category = LIB.CATEGORY_LAYOUT_INFO.length
  menu.categoryInfo[category] = categoryInfo
  menu.categoryInfo[descriptor] = categoryInfo

  const sceneInfo: LmmSceneInfo = {
    category: category,
    sceneName: sceneName,
    sceneGroupName: sceneGroupName,
  }
  menu.sceneInfo[sceneName] = sceneInfo

  const scene = SCENE_MANAGER.GetScene(sceneName)
  scene.AddFragment(categoryInfo.subcategoryBarFragment)
  for (const categoryAreaFragment of menu.categoryAreaFragments) {
    scene.AddFragment(categoryAreaFragment)
  }

  scene.RegisterCallback("StateChange", (_oldState: number, newState: number) => {
    if (newState === SCENE_SHOWING) {
      menu.ignoreCallbacks = true

      const skipAnimation = !menu.IsShowing()
      ZO_MenuBar_SelectDescriptor(menu.categoryBar, descriptor, skipAnimation)
      menu.lastCategory = category

      if (sceneGroupName !== undefined) {
        const sceneGroup = SCENE_MANAGER.GetSceneGroup(sceneGroupName)
        sceneGroup.SetActiveScene(sceneName)
      } else {
        menu.SetLastSceneName(categoryInfo, sceneName)
      }

      menu.ignoreCallbacks = false
    }
  })
}

function addButtonWithScene(
  descriptor: number | string,
  sceneName: string,
  categoryLayoutInfo: LmmCategoryLayoutInfo,
  sceneGroupName?: string
): undefined {
  addButton(descriptor, categoryLayoutInfo)
  addScene(descriptor, sceneName, categoryLayoutInfo, sceneGroupName)
}

LIB.Init = function (this: Lib): undefined {
  if (this.initialized !== true) {
    this.initialized = true
    initMenu(this)
  }
}

LIB.AddMenuItem = function (
  this: Lib,
  a: number | string,
  b: string | LmmCategoryLayoutInfo,
  c?: LmmCategoryLayoutInfo,
  d?: string
): undefined {
  if (c !== undefined) {
    addButtonWithScene(a, b as string, c, d)
  } else {
    addButton(a, asLmmCategoryLayoutInfo(b))
  }
}

LIB.SelectMenuItem = function (this: Lib, descriptor: number | string): undefined {
  if (WINDOW_MANAGER.IsSecureRenderModeEnabled()) {
    return
  }

  const categoryInfo = this.categoryInfo[descriptor]
  if (categoryInfo === undefined) {
    error("descriptor not found")
  }

  const categoryBar = getMainMenu().categoryBar
  const button = asMenuBarHost(categoryBar).m_object.ButtonObjectForDescriptor(descriptor)
  if (button === undefined) {
    return
  }
  const buttonData = button.m_buttonData

  const visibleFn = buttonData.visible
  const visible = visibleFn !== undefined ? visibleFn(buttonData) : true

  if (visible) {
    if (ZO_MenuBar_GetSelectedDescriptor(categoryBar) === descriptor) {
      if (buttonData.callback !== undefined) {
        buttonData.callback(buttonData)
      }
    } else {
      ZO_MenuBar_SelectDescriptor(categoryBar, descriptor, true)
    }
  } else {
    ZO_MenuBar_ClearSelection(categoryBar)
    if (buttonData.callback !== undefined) {
      buttonData.callback(buttonData)
    }
  }
}

LIB.Refresh = function (this: Lib): undefined {
  ZO_MenuBar_UpdateButtons(getMainMenu().categoryBar)
}

LIB.SetupSceneGroupBar = function (this: Lib, category: number, sceneGroupName: string): undefined {
  if (WINDOW_MANAGER.IsSecureRenderModeEnabled()) {
    return
  }

  if (this.sceneGroupInfo[sceneGroupName] !== undefined) {
    ZO_MenuBar_ClearButtons(this.sceneGroupBar)

    const sceneGroup = SCENE_MANAGER.GetSceneGroup(sceneGroupName)
    const menuBarIconData = asLmmSceneGroupInfo(this.sceneGroupInfo[sceneGroupName]).menuBarIconData
    for (const layoutData of menuBarIconData) {
      const sceneName = layoutData.descriptor
      layoutData.callback = () => {
        if (this.ignoreCallbacks !== true) {
          sceneGroup.SetActiveScene(sceneName)
          this.Update(category, sceneName)
        }
      }
      ZO_MenuBar_AddButton(this.sceneGroupBar, layoutData)
      ZO_MenuBar_SetDescriptorEnabled(
        this.sceneGroupBar,
        layoutData.descriptor,
        layoutData.enabled === undefined || layoutData.enabled === true
      )
    }

    const activeSceneName = sceneGroup.GetActiveScene()
    let activeLayoutData: LmmMenuBarIconData | undefined
    for (const candidate of menuBarIconData) {
      if (candidate.descriptor === activeSceneName) {
        activeLayoutData = candidate
        break
      }
    }

    this.ignoreCallbacks = true

    if (activeLayoutData !== undefined) {
      if (!ZO_MenuBar_SelectDescriptor(this.sceneGroupBar, activeSceneName)) {
        this.ignoreCallbacks = false
        ZO_MenuBar_SelectFirstVisibleButton(this.sceneGroupBar, true)
      }

      this.sceneGroupBarLabel.SetHidden(false)
      this.sceneGroupBarLabel.SetText(GetString(activeLayoutData.categoryName))
    }

    this.ignoreCallbacks = false
  }
}

LIB.AddCategory = function (this: Lib, data: LmmCategoryLayoutInfo): number {
  this.Init()

  LIB.CATEGORY_LAYOUT_INFO.push(data)
  const n = LIB.CATEGORY_LAYOUT_INFO.length
  data.descriptor = n

  const subcategoryBar = CreateControl(`libMainMenuSubcategoryBar${n}`, this.control, CT_CONTROL)
  const subcategoryBarFragment = ZO_FadeSceneFragment.New(subcategoryBar)
  this.categoryInfo[n] = {
    barControls: [],
    subcategoryBar: subcategoryBar,
    subcategoryBarFragment: subcategoryBarFragment,
  }

  this.RefreshCategoryIndicators()
  this.AddCategoryAreaFragment(this.categoryBarFragment)

  return n
}

LIB.RefreshCategoryIndicators = function (this: Lib): undefined {
  for (const categoryLayoutData of LIB.CATEGORY_LAYOUT_INFO) {
    const indicators = categoryLayoutData.indicators
    if (indicators !== undefined) {
      const buttonControl = ZO_MenuBar_GetButtonControl(
        this.categoryBar,
        categoryLayoutData.descriptor
      )
      if (buttonControl !== undefined) {
        const indicatorTexture = asMultiIcon(buttonControl.GetNamedChild("Indicator"))
        let textures: readonly string[] | undefined
        if (type(indicators) === "table") {
          textures = asTextureArray(indicators)
        } else if (type(indicators) === "function") {
          textures = (indicators as TextureFn)()
        }
        if (textures !== undefined && textures.length > 0) {
          indicatorTexture.ClearIcons()
          for (const texture of textures) {
            indicatorTexture.AddIcon(texture)
          }
          indicatorTexture.Show()
        } else {
          indicatorTexture.Hide()
        }
      }
    }
  }
}

LIB.AddCategoryAreaFragment = function (this: Lib, fragment: SceneFragment): undefined {
  this.categoryAreaFragments.push(fragment)
}

LIB.OnCategoryClicked = function (this: Lib, category: number): undefined {
  if (this.ignoreCallbacks !== true) {
    this.ShowCategory(category)
  }
}

LIB.GetControl = function (this: Lib): Control {
  return this.control
}

installSceneNavigation(LIB)
