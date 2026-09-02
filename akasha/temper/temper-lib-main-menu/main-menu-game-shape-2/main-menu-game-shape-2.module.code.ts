export {}

declare global {
  interface MainMenuKeyboard {
    ShowSceneGroup: (this: unknown, sceneGroupName: string, sceneName?: string) => undefined

    ShowCategory: (this: MainMenuKeyboard, categoryConst: number) => undefined

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

  type ReleaseReferenceOptions = number

  interface Scene {
    GetName: (this: Scene) => string

    readonly name: string
    AddFragment: (this: unknown, fragment: SceneFragment) => undefined
    RemoveFragment: (this: unknown, fragment: SceneFragment) => undefined
    RegisterCallback: (
      this: unknown,
      event: string,
      callback: (oldState: number, newState: number) => undefined
    ) => undefined

    UnregisterCallback: (
      this: unknown,
      event: string,
      callback: (oldState: number, newState: number) => undefined
    ) => undefined
  }

  interface SceneFragment {
    readonly __brand: "SceneFragment"
    RegisterCallback: (
      this: unknown,
      event: string,
      callback: (oldState: number, newState: number) => undefined
    ) => undefined

    IsShowing: (this: unknown) => boolean
  }

  interface SceneGroup {
    SetActiveScene: (this: unknown, sceneName: string) => undefined
    GetActiveScene: (this: unknown) => string
    GetNumScenes: (this: unknown) => number
    GetSceneName: (this: unknown, index: number) => string
  }

  interface SceneManager {
    RegisterCallback: (
      this: SceneManager,
      event: string,
      callback: (this: void, scene: Scene, newState: number) => undefined
    ) => undefined

    Push: (this: SceneManager, sceneName: string) => undefined

    IsShowing: (this: unknown, sceneName: string) => boolean
    Toggle: (this: unknown, sceneName: string) => undefined
    Hide: (this: unknown, sceneName: string) => undefined

    readonly currentScene: Scene
    GetCurrentScene: ((this: SceneManager) => Scene) &
      ((this: SceneManager) => Scene) &
      ((this: unknown) => Scene)
    SetInUIMode: (this: unknown, inUIMode: boolean) => undefined
    GetScene: (this: unknown, sceneName: string) => Scene
    RegisterTopLevel: (this: unknown, control: Control, locksUIMode: boolean) => undefined
    ToggleTopLevel: (this: unknown, window: TopLevelWindow) => undefined
    Show: (this: unknown, sceneName: string) => undefined
    ShowBaseScene: ((this: unknown) => undefined) & ((this: unknown) => undefined)

    GetSceneGroup: (this: unknown, sceneGroupName: string) => SceneGroup
  }

  type TextType = number

  type TextureAddressMode = number

  type TextureBlendMode = number

  interface TextureControl extends Control {
    GetColor: (this: unknown) => LuaMultiReturn<[r: number, g: number, b: number, a: number]>

    SetTexture: (this: unknown, texture: string | undefined) => undefined
    SetTextureCoords: (
      this: unknown,
      left: number,
      right: number,
      top: number,
      bottom: number
    ) => undefined
    SetColor: (this: unknown, r: number, g: number, b: number, a?: number) => undefined
    SetHeight: (this: unknown, height: number) => undefined
    SetBlendMode: (this: unknown, blendMode: number) => undefined
  }

  interface TopLevelWindow extends Control {
    SetClampedToScreen: (this: unknown, clamped: boolean) => undefined
    SetMovable: (this: unknown, movable: boolean) => undefined
    GetLeft: (this: unknown) => number
    GetTop: (this: unknown) => number
    StartMoving: (this: unknown) => undefined
    StopMovingOrResizing: (this: unknown) => undefined
    BringWindowToTop: ((this: unknown) => undefined) & ((this: unknown) => undefined)

    AllowBringToTop: (this: unknown) => boolean
    SetAllowBringToTop: (this: unknown, allow?: boolean) => undefined
    SetDrawWhenGuiHidden: (this: unknown, drawWhenHidden?: boolean) => undefined
    SetTopmost: (this: unknown, isTopmost?: boolean) => undefined
  }

  type VirtualKeyboardType = number

  interface WindowManager {
    CreateTopLevelWindow: (this: unknown, name: string) => TopLevelWindow
    CreateControl: ((
      this: unknown,
      name: string | undefined,
      parent: Control | undefined,
      controlType: CtLabel
    ) => LabelControl) &
      ((
        this: unknown,
        name: string | undefined,
        parent: Control | undefined,
        controlType: CtTexture
      ) => TextureControl) &
      ((
        this: unknown,
        name: string | undefined,
        parent: Control | undefined,
        controlType: CtButton
      ) => ButtonControl) &
      ((
        this: unknown,
        name: string | undefined,
        parent: Control | undefined,
        controlType: CtEditBox
      ) => EditControl) &
      ((
        this: unknown,
        name: string | undefined,
        parent: Control | undefined,
        controlType: CtBackdrop
      ) => BackdropControl) &
      ((
        this: unknown,
        name: string | undefined,
        parent: Control | undefined,
        controlType: CtTopLevel
      ) => TopLevelWindow) &
      ((
        this: unknown,
        name: string | undefined,
        parent: Control | undefined,
        controlType: CtControl | CtScroll
      ) => Control)
    CreateControlFromVirtual: <T extends Control = Control>(
      this: unknown,
      name: string,
      parent: Control | undefined,
      virtualName: string
    ) => T
    GetControlByName: <T extends Control = Control>(
      this: unknown,
      name: string,
      namePrefix?: string
    ) => T | undefined
    GetMouseOverControl: (this: unknown) => Control | undefined
    SetMouseCursor: (this: unknown, cursor: number) => undefined

    IsSecureRenderModeEnabled: (this: unknown) => boolean
  }

  interface ZoSimpleSceneFragment {
    New: (this: unknown, control: Control) => SceneFragment
  }

  interface ZoColorDef {
    ToHex: (this: unknown) => string
    Colorize: (this: unknown, text: string) => string
    SetRGB: (this: unknown, r: number, g: number, b: number) => undefined
    SetRGBA: (this: unknown, r: number, g: number, b: number, a?: number) => undefined
    UnpackRGB: (this: unknown) => LuaMultiReturn<[red: number, green: number, blue: number]>
    UnpackRGBA: (
      this: unknown
    ) => LuaMultiReturn<[red: number, green: number, blue: number, alpha: number]>

    r: number
    g: number
    b: number
    a: number
  }

  interface ZoFadeSceneFragmentClass {
    New: (this: unknown, control: Control) => SceneFragment
  }

  const BOTTOM: number

  const CENTER: number

  const CT_BACKDROP: CtBackdrop

  const CT_BUTTON: CtButton

  const CT_CONTROL: CtControl

  const CT_EDITBOX: CtEditBox

  const CT_LABEL: CtLabel

  const CT_SCROLL: CtScroll

  const CT_TEXTURE: CtTexture

  const CT_TOPLEVELCONTROL: CtTopLevel

  const CreateControl: <T extends Control = Control>(
    name: string,
    parent: Control,
    controlType: number
  ) => T

  const CreateControlFromVirtual: <T extends Control = Control>(
    name: string,
    parent: Control | undefined,
    templateName: string,
    suffix?: string | number
  ) => T

  const CreateTopLevelWindow: <T extends TopLevelWindow = TopLevelWindow>(name: string) => T

  const EVENT_MANAGER: EventManager

  const EVENT_SECURE_RENDER_MODE_CHANGED: number

  const GetControl: (<T extends Control = Control>(name: string) => T | undefined) &
    (<T extends Control = Control>(
      control: Control | string,
      suffix: string | number
    ) => T | undefined) &
    (<T extends Control = Control>(control: Control, suffix: string) => T | undefined)

  const GetString: ((this: void, stringId: number) => string) &
    ((this: void, stringVariablePrefix: string, value: string | number) => string) &
    ((this: void, stringVariablePrefix?: string, contextId?: number) => string)

  const GuiRoot: Control

  const IsConsoleUI: (this: void) => boolean

  const MAIN_MENU_KEYBOARD: MainMenuKeyboard

  const MENU_CATEGORY_INVENTORY: number

  const MENU_CATEGORY_MARKET: number

  const RIGHT: number

  const SCENE_MANAGER: SceneManager

  const SCENE_SHOWING: number

  const TOP: number

  const WINDOW_MANAGER: WindowManager

  const ZO_CONTRAST_TEXT: ZoColorDef

  const ZO_FadeSceneFragment: ZoFadeSceneFragmentClass

  const ZO_HIGHLIGHT_TEXT: ZoColorDef

  const ZO_MenuBar_AddButton: (menuBar: Control, buttonData: object) => undefined

  const ZO_MenuBar_ClearButtons: (menuBar: Control) => undefined

  const ZO_MenuBar_ClearSelection: (menuBar: Control) => undefined

  const ZO_MenuBar_GetButtonControl: (
    menuBar: Control,
    descriptor: Descriptor | undefined
  ) => Control | undefined

  const ZO_MenuBar_GetSelectedDescriptor: (menuBar: Control) => Descriptor

  const ZO_MenuBar_SelectDescriptor: ((
    this: void,
    menuBar: object,
    descriptor: number
  ) => undefined) &
    ((menuBar: Control, descriptor: Descriptor, skipAnimation?: boolean) => boolean)

  const ZO_MenuBar_SelectFirstVisibleButton: (
    menuBar: Control,
    skipAnimation?: boolean
  ) => undefined

  const ZO_MenuBar_SetDescriptorEnabled: (
    menuBar: Control,
    descriptor: Descriptor,
    enabled: boolean
  ) => undefined

  const ZO_MenuBar_UpdateButtons: (menuBar: Control) => undefined

  const ZO_SimpleSceneFragment: ZoSimpleSceneFragment

  const error: (this: void, message: unknown, level?: number) => never

  const getmetatable: (this: void, object: unknown) => unknown

  const type: (
    this: void,
    v: unknown
  ) => "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  const unpack: (<T extends unknown[]>(this: void, list: T) => LuaMultiReturn<T>) &
    (<T>(this: void, list: T[], i: number, j?: number) => LuaMultiReturn<T[]>)
}
