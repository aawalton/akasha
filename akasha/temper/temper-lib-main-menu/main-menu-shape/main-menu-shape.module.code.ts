export interface TabControl {
  sceneGroupName?: string
}

export interface Lib {
  name: string
  version: number
  initialized?: boolean

  CATEGORY_LAYOUT_INFO: LmmCategoryLayoutInfo[]
  control: Control
  categoryBar: Control
  categoryBarFragment: SceneFragment
  sceneGroupBar: Control
  sceneGroupBarLabel: LabelControl
  tabPressedCallback: (this: void, ctrl: TabControl) => undefined
  sceneShowCallback: (this: void, oldState: number, newState: number) => undefined
  sceneShowGroupName?: string
  categoryInfo: Record<number | string, LmmCategoryInfo>
  sceneInfo: Record<string, LmmSceneInfo>
  sceneGroupInfo: Record<string, LmmSceneGroupInfo>
  categoryAreaFragments: SceneFragment[]
  ignoreCallbacks?: boolean

  Init: (this: Lib) => undefined
  AddMenuItem: (
    this: Lib,
    a: number | string,
    b: string | LmmCategoryLayoutInfo,
    c?: LmmCategoryLayoutInfo,
    d?: string
  ) => undefined
  SelectMenuItem: (this: Lib, descriptor: number | string) => undefined
  Refresh: (this: Lib) => undefined
  SetupSceneGroupBar: (this: Lib, category: number, sceneGroupName: string) => undefined
  AddCategory: (this: Lib, data: LmmCategoryLayoutInfo) => number
  RefreshCategoryIndicators: (this: Lib) => undefined
  AddCategoryAreaFragment: (this: Lib, fragment: SceneFragment) => undefined
  OnCategoryClicked: (this: Lib, category: number) => undefined
  ShowCategory: (this: Lib, category: number) => undefined
  ShowScene: (this: Lib, sceneName: string) => undefined
  ShowSceneGroup: (this: Lib, sceneGroupName: string, specificScene?: string) => undefined
  Update: (this: Lib, category: number, sceneName: string) => undefined
  SetLastSceneName: (this: Lib, categoryInfo: LmmCategoryInfo, sceneName: string) => undefined
  SetLastSceneGroupName: (
    this: Lib,
    categoryInfo: LmmCategoryInfo,
    sceneGroupName: string
  ) => undefined
  IsShowing: (this: Lib) => boolean
  AddSceneGroup: (
    this: Lib,
    category: number,
    sceneGroupName: string,
    menuBarIconData: LmmMenuBarIconData[]
  ) => undefined
  HasLast: (this: Lib, categoryInfo: LmmCategoryInfo) => boolean
  AddRawScene: (
    this: Lib,
    sceneName: string,
    category: number,
    categoryInfo: LmmCategoryInfo,
    sceneGroupName?: string
  ) => Scene
  ToggleCategory: (this: Lib, category: number) => undefined
  ToggleSceneGroup: (this: Lib, sceneGroupName: string, specificScene?: string) => undefined
  ToggleScene: (this: Lib, sceneName: string) => undefined
  GetControl: (this: Lib) => Control
}
