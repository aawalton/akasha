import {
  asLmmCategoryInfo,
  asLmmSceneGroupInfo,
  asLmmSceneInfo,
} from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-casts/main-menu-casts.module.code.ts"
import { getMainMenu } from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-keyboard/main-menu-keyboard.module.code.ts"
import type { Lib } from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-shape/main-menu-shape.module.code.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-main-menu-bar/eso-main-menu-bar.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function installSceneNavigation(this: void, lib: Lib): undefined {
  lib.ShowCategory = function (this: Lib, category: number): undefined {
    const categoryInfo = asLmmCategoryInfo(this.categoryInfo[category])
    if (categoryInfo.lastSceneName !== undefined) {
      this.ShowScene(categoryInfo.lastSceneName)
    } else {
      this.ShowSceneGroup(categoryInfo.lastSceneGroupName as string)
    }
  }

  lib.Update = function (this: Lib, category: number, sceneName: string): undefined {
    this.ignoreCallbacks = true

    const categoryInfo = asLmmCategoryInfo(this.categoryInfo[category])

    const sceneInfo = asLmmSceneInfo(this.sceneInfo[sceneName])
    const skipAnimation = !this.IsShowing()
    ZO_MenuBar_SelectDescriptor(this.categoryBar, category, skipAnimation)
    getMainMenu().lastCategory = category

    this.SetLastSceneName(categoryInfo, sceneName)

    if (sceneInfo.sceneGroupName !== undefined) {
      const scene = SCENE_MANAGER.GetScene(sceneName)
      this.sceneShowGroupName = sceneInfo.sceneGroupName
      scene.RegisterCallback("StateChange", this.sceneShowCallback)
      const sceneGroup = SCENE_MANAGER.GetSceneGroup(sceneInfo.sceneGroupName)
      sceneGroup.SetActiveScene(sceneName)
      this.SetLastSceneGroupName(categoryInfo, sceneInfo.sceneGroupName)
    }

    SCENE_MANAGER.Show(sceneName)

    this.ignoreCallbacks = false
  }

  lib.SetLastSceneName = function (
    this: Lib,
    categoryInfo: LmmCategoryInfo,
    sceneName: string
  ): undefined {
    categoryInfo.lastSceneName = sceneName
    categoryInfo.lastSceneGroupName = undefined
  }

  lib.SetLastSceneGroupName = function (
    this: Lib,
    categoryInfo: LmmCategoryInfo,
    sceneGroupName: string
  ): undefined {
    categoryInfo.lastSceneGroupName = sceneGroupName
    categoryInfo.lastSceneName = undefined
  }

  lib.IsShowing = function (this: Lib): boolean {
    return this.categoryBarFragment.IsShowing()
  }

  lib.AddSceneGroup = function (
    this: Lib,
    category: number,
    sceneGroupName: string,
    menuBarIconData: LmmMenuBarIconData[]
  ): undefined {
    const categoryInfo = asLmmCategoryInfo(this.categoryInfo[category])
    const sceneGroup = SCENE_MANAGER.GetSceneGroup(sceneGroupName)

    for (let i = 1; i <= sceneGroup.GetNumScenes(); i++) {
      const sceneName = sceneGroup.GetSceneName(i)
      this.AddRawScene(sceneName, category, categoryInfo, sceneGroupName)
    }

    if (!this.HasLast(categoryInfo)) {
      this.SetLastSceneGroupName(categoryInfo, sceneGroupName)
    }

    const sceneGroupBarFragment = ZO_FadeSceneFragment.New(this.sceneGroupBar)
    for (const iconData of menuBarIconData) {
      const sceneName = iconData.descriptor
      const scene = SCENE_MANAGER.GetScene(sceneName)
      scene.AddFragment(sceneGroupBarFragment)
    }

    this.sceneGroupInfo[sceneGroupName] = {
      menuBarIconData: menuBarIconData,
      category: category,
      sceneGroupBarFragment: sceneGroupBarFragment,
    }
  }

  lib.HasLast = function (this: Lib, categoryInfo: LmmCategoryInfo): boolean {
    return categoryInfo.lastSceneName !== undefined || categoryInfo.lastSceneGroupName !== undefined
  }

  lib.AddRawScene = function (
    this: Lib,
    sceneName: string,
    category: number,
    _categoryInfo: LmmCategoryInfo,
    sceneGroupName?: string
  ): Scene {
    const scene = SCENE_MANAGER.GetScene(sceneName)

    const hideCategoryBar = asLmmCategoryInfo(this.categoryInfo[category]).hideCategoryBar
    if (hideCategoryBar === undefined || hideCategoryBar === false) {
      for (const categoryAreaFragment of this.categoryAreaFragments) {
        scene.AddFragment(categoryAreaFragment)
      }
    }

    const sceneInfo: LmmSceneInfo = {
      category: category,
      sceneName: sceneName,
      sceneGroupName: sceneGroupName,
    }

    this.sceneInfo[sceneName] = sceneInfo

    return scene
  }

  lib.ToggleCategory = function (this: Lib, category: number): undefined {
    if (WINDOW_MANAGER.IsSecureRenderModeEnabled()) {
      return
    }
    const categoryInfo = asLmmCategoryInfo(this.categoryInfo[category])
    if (categoryInfo.lastSceneName !== undefined) {
      this.ToggleScene(categoryInfo.lastSceneName)
    } else {
      this.ToggleSceneGroup(categoryInfo.lastSceneGroupName as string)
    }
  }

  lib.ToggleSceneGroup = function (
    this: Lib,
    sceneGroupName: string,
    specificScene?: string
  ): undefined {
    if (WINDOW_MANAGER.IsSecureRenderModeEnabled()) {
      return
    }
    const sceneGroupInfo = asLmmSceneGroupInfo(this.sceneGroupInfo[sceneGroupName])
    const specific =
      specificScene !== undefined
        ? specificScene
        : SCENE_MANAGER.GetSceneGroup(sceneGroupName).GetActiveScene()

    if (this.IsShowing() && getMainMenu().lastCategory === sceneGroupInfo.category) {
      SCENE_MANAGER.ShowBaseScene()
    } else {
      this.Update(sceneGroupInfo.category, specific)
    }
  }

  lib.ShowSceneGroup = function (
    this: Lib,
    sceneGroupName: string,
    specificScene?: string
  ): undefined {
    if (WINDOW_MANAGER.IsSecureRenderModeEnabled()) {
      return
    }
    const sceneGroupInfo = asLmmSceneGroupInfo(this.sceneGroupInfo[sceneGroupName])
    const specific =
      specificScene !== undefined
        ? specificScene
        : SCENE_MANAGER.GetSceneGroup(sceneGroupName).GetActiveScene()

    this.Update(sceneGroupInfo.category, specific)
  }

  lib.ShowScene = function (this: Lib, sceneName: string): undefined {
    if (WINDOW_MANAGER.IsSecureRenderModeEnabled()) {
      return
    }
    const sceneInfo = asLmmSceneInfo(this.sceneInfo[sceneName])
    if (sceneInfo.sceneGroupName !== undefined) {
      this.ShowSceneGroup(sceneInfo.sceneGroupName, sceneName)
    } else {
      this.Update(sceneInfo.category, sceneName)
    }
  }

  lib.ToggleScene = function (this: Lib, sceneName: string): undefined {
    if (WINDOW_MANAGER.IsSecureRenderModeEnabled()) {
      return
    }
    if (SCENE_MANAGER.IsShowing(sceneName)) {
      SCENE_MANAGER.ShowBaseScene()
    } else {
      this.ShowScene(sceneName)
    }
  }
}
