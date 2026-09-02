export {}

declare global {
  type Descriptor = number | string

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
    descriptor?: Descriptor
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
    lastCategory: number
    ignoreCallbacks: boolean
    control: Control
    categoryBar: Control
    categoryInfo: Record<Descriptor, LmmCategoryInfo>
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

  interface WindowManager {
    IsSecureRenderModeEnabled: (this: unknown) => boolean
  }
}
