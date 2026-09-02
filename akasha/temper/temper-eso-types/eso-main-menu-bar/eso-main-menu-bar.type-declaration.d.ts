declare const MENU_CATEGORY_INVENTORY: number

declare const MENU_CATEGORY_MARKET: number

declare const CreateTopLevelWindow: <T extends TopLevelWindow = TopLevelWindow>(name: string) => T

declare const ZO_CONTRAST_TEXT: ZoColorDef

declare const ZO_MenuBar_ClearButtons: (menuBar: Control) => undefined

declare const ZO_MenuBar_ClearSelection: (menuBar: Control) => undefined

declare const ZO_MenuBar_GetButtonControl: (
  menuBar: Control,
  descriptor: number | string | undefined
) => Control | undefined

declare const ZO_MenuBar_SetDescriptorEnabled: (
  menuBar: Control,
  descriptor: number | string,
  enabled: boolean
) => undefined

declare const ZO_MenuBar_UpdateButtons: (menuBar: Control) => undefined

interface LmmButtonData {
  visible?: (this: void, buttonData: LmmButtonData) => boolean
  callback?: (this: void, buttonData: LmmButtonData) => undefined
  [key: string]: unknown
}

interface LmmCategoryInfo {
  barControls: unknown[]
  subcategoryBar: Control
  subcategoryBarFragment: SceneFragment
  sceneName?: string
  lastSceneName?: string
  lastSceneGroupName?: string
  hideCategoryBar?: boolean
}

interface LmmCategoryLayoutInfo {
  descriptor?: number | string
  indicators?: unknown
  [key: string]: unknown
}

interface LmmMenuBarIconData {
  descriptor: string
  categoryName: number
  callback?: (this: void) => undefined
  enabled?: boolean
  [key: string]: unknown
}

interface LmmSceneGroupInfo {
  menuBarIconData: LmmMenuBarIconData[]
  category: number
  sceneGroupBarFragment: SceneFragment
}

interface LmmSceneInfo {
  category: number
  sceneName: string
  sceneGroupName?: string
}

interface MainMenuKeyboard {
  RefreshCategoryIndicators: (this: unknown) => undefined
  IsShowing: (this: unknown) => boolean
  SetLastSceneName: (this: unknown, categoryInfo: LmmCategoryInfo, sceneName: string) => undefined
  ignoreCallbacks: boolean
  control: Control
  categoryInfo: Record<number | string, LmmCategoryInfo>
  sceneInfo: Record<string, LmmSceneInfo>
  sceneGroupInfo: Record<string, LmmSceneGroupInfo>
  categoryAreaFragments: SceneFragment[]
}

interface Scene {
  UnregisterCallback: (
    this: unknown,
    event: string,
    callback: (oldState: number, newState: number) => undefined
  ) => undefined
}

interface SceneFragment {
  IsShowing: (this: unknown) => boolean
}

interface SceneGroup {
  SetActiveScene: (this: unknown, sceneName: string) => undefined
  GetActiveScene: (this: unknown) => string
  GetNumScenes: (this: unknown) => number
  GetSceneName: (this: unknown, index: number) => string
}

interface SceneManager {
  GetSceneGroup: (this: unknown, sceneGroupName: string) => SceneGroup
}
