export {}

declare global {
  type AllowMarkupType = number

  interface BackdropControl extends Control {
    SetCenterTexture: ((this: unknown, textureFile: string) => undefined) &
      ((
        this: unknown,
        filename?: string,
        tilingInterval?: number,
        addressMode?: TextureAddressMode
      ) => undefined)
    SetCenterColor: ((this: unknown, r: number, g: number, b: number, a?: number) => undefined) &
      ((this: unknown, r?: number, g?: number, b?: number, a?: number) => undefined)
    SetEdgeColor: ((this: unknown, r: number, g: number, b: number, a?: number) => undefined) &
      ((this: unknown, r?: number, g?: number, b?: number, a?: number) => undefined)
    SetEdgeTexture: ((
      this: unknown,
      texture: string | undefined,
      width: number,
      height: number,
      padding: number
    ) => undefined) &
      ((
        this: unknown,
        filename?: string,
        edgeFileWidth?: number,
        edgeFileHeight?: number,
        cornerSize?: number,
        edgeFilePadding?: number
      ) => undefined)
    SetAnchorFill: (this: unknown, control?: Control) => undefined

    GetBlendMode: (this: unknown) => TextureBlendMode
    GetCenterColor: (this: unknown) => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
    GetCenterTextureFileName: (this: unknown) => string
    GetEdgeColor: (this: unknown) => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
    GetEdgeTextureFileName: (this: unknown) => string
    IsPixelRoundingEnabled: (this: unknown) => boolean
    SetBlendMode: (this: unknown, blendMode?: TextureBlendMode) => undefined
    SetCenterTextureFileName: (this: unknown, filename?: string) => undefined
    SetEdgeTextureFileName: (this: unknown, filename?: string) => undefined
    SetInsets: (
      this: unknown,
      left?: number,
      top?: number,
      right?: number,
      bottom?: number
    ) => undefined
    SetIntegralWrapping: (this: unknown, integralWrappingEnabled?: boolean) => undefined
    SetPixelRoundingEnabled: (this: unknown, enabled?: boolean) => undefined
    SetTextureReleaseOption: (this: unknown, releaseOption?: ReleaseReferenceOptions) => undefined
  }

  interface BuffDebuffIconControl extends Control {
    readonly data?: { readonly abilityId?: number }
  }

  interface ButtonControl extends Control {
    GetState: ((this: unknown) => number) & ((this: unknown) => number)
    SetState: ((this: unknown, state: number) => undefined) &
      ((this: unknown, state: number, locked?: boolean) => undefined)

    SetText: (this: unknown, text: string) => undefined
    SetEnabled: (this: unknown, enabled: boolean) => undefined
    SetNormalTexture: (this: unknown, texture: string) => undefined
    SetPressedTexture: (this: unknown, texture: string) => undefined
    SetMouseOverTexture: (this: unknown, texture: string) => undefined
    SetClickSound: (this: unknown, sound: string) => undefined
  }

  interface Control {
    GetCenter: (this: unknown) => LuaMultiReturn<[x: number, y: number]>
    SetHeight: (this: unknown, height: number) => undefined
    GetResizeToFitDescendents: (this: unknown) => boolean
    SetHandler: ((
      this: unknown,
      event: string,
      handler: ((...args: unknown[]) => undefined) | undefined,
      name: string
    ) => undefined) &
      ((
        this: unknown,
        event: string,
        handler: ((...args: unknown[]) => undefined) | undefined
      ) => undefined) &
      ((event: string, handler: (this: void, ...args: never[]) => undefined) => undefined)

    GetScreenRect: (
      this: unknown
    ) => LuaMultiReturn<[left: number, top: number, right: number, bottom: number]>
    SetDimensionConstraints: ((
      this: unknown,
      minX: number,
      minY: number,
      maxX: number,
      maxY: number
    ) => undefined) &
      ((
        this: unknown,
        minWidth?: number,
        minHeight?: number,
        maxWidth?: number,
        maxHeight?: number
      ) => undefined)

    GetName: (this: unknown) => string
    SetHidden: (this: unknown, hidden: boolean) => undefined
    IsHidden: (this: unknown) => boolean
    SetAlpha: (this: unknown, alpha: number) => undefined
    GetAlpha: (this: unknown) => number
    SetDimensions: (this: unknown, width: number, height: number) => undefined
    GetWidth: (this: unknown) => number
    GetHeight: (this: unknown) => number
    GetDimensions: (this: unknown) => LuaMultiReturn<[number, number]>
    SetAnchor: (
      this: unknown,
      point: number,
      relativeTo?: Control,
      relativePoint?: number,
      offsetX?: number,
      offsetY?: number,
      constrains?: number
    ) => undefined
    ClearAnchors: (this: unknown) => undefined
    SetParent: (this: unknown, parent: Control) => undefined
    GetParent: <T extends Control = Control>(this: unknown) => T | undefined
    GetChild: (<T extends Control = Control>(this: unknown, name: string) => T | undefined) &
      (<T extends Control = BuffDebuffIconControl>(this: unknown, index: number) => T | undefined)
    GetNumChildren: (this: unknown) => number
    GetNamedChild: (<T extends Control = Control>(this: unknown, name: string) => T | undefined) &
      ((this: unknown, name: string) => Control)
    SetMouseEnabled: (this: unknown, enabled: boolean) => undefined
    GetHandler: (this: unknown, event: string) => ((...args: unknown[]) => undefined) | undefined
    GetLeft: (this: unknown) => number
    GetRight: (this: unknown) => number
    GetTop: (this: unknown) => number
    GetBottom: (this: unknown) => number
    GetAnchor: (
      this: unknown,
      index: number
    ) => LuaMultiReturn<[boolean, number, Control | undefined, number, number, number, number]>
    SetAnchorFill: (this: unknown, control?: Control) => undefined
    SetResizeToFitDescendents: (this: unknown, resize: boolean) => undefined
    SetWidth: (this: unknown, width: number) => undefined
    SetScale: (this: unknown, scale: number) => undefined
    SetDrawTier: (this: unknown, tier: number) => undefined
    SetDrawLayer: (this: unknown, layer: number) => undefined
    SetDrawLevel: (this: unknown, level: number) => undefined
    GetDimensionConstraints: (this: unknown) => LuaMultiReturn<[number, number, number, number]>
    GetType: (this: unknown) => number
  }

  type CtBackdrop = number & { readonly __ct: "CT_BACKDROP" }

  type CtButton = number & { readonly __ct: "CT_BUTTON" }

  type CtControl = number & { readonly __ct: "CT_CONTROL" }

  type CtEditBox = number & { readonly __ct: "CT_EDITBOX" }

  type CtLabel = number & { readonly __ct: "CT_LABEL" }

  type CtScroll = number & { readonly __ct: "CT_SCROLL" }

  type CtTexture = number & { readonly __ct: "CT_TEXTURE" }

  type CtTopLevel = number & { readonly __ct: "CT_TOPLEVELCONTROL" }

  type Descriptor = number | string

  interface EditControl extends Control {
    SelectAll: ((this: unknown) => undefined) & ((this: unknown) => undefined)

    GetText: ((this: unknown) => string) & ((this: unknown) => string)
    SetText: ((this: unknown, text: string) => undefined) &
      ((this: unknown, text?: string, suppressCallbackHandler?: boolean) => undefined)
    SetDefaultText: ((this: unknown, text: string) => undefined) &
      ((this: unknown, defaultText?: string) => undefined)
    SetDefaultTextColor: ((
      this: unknown,
      r: number,
      g: number,
      b: number,
      a?: number
    ) => undefined) &
      ((this: unknown, r?: number, g?: number, b?: number, a?: number) => undefined)
    SetFont: ((this: unknown, font: string) => undefined) &
      ((this: unknown, font?: string) => undefined)
    SetColor: ((this: unknown, r: number, g: number, b: number, a?: number) => undefined) &
      ((this: unknown, r?: number, g?: number, b?: number, a?: number) => undefined)
    SetMaxInputChars: ((this: unknown, maxChars: number) => undefined) &
      ((this: unknown, maxChars?: number) => undefined)
    TakeFocus: ((this: unknown) => undefined) & ((this: unknown) => undefined)
    LoseFocus: ((this: unknown) => undefined) & ((this: unknown) => undefined)
    Clear: ((this: unknown) => undefined) & ((this: unknown) => undefined)

    AddValidCharacter: (this: unknown, validCharacter?: string) => undefined
    ClearSelection: (this: unknown) => undefined
    CopyAllTextToClipboard: (this: unknown) => undefined
    GetAllowMarkupType: (this: unknown) => AllowMarkupType
    GetCopyEnabled: (this: unknown) => boolean
    GetCursorPosition: (this: unknown) => number
    GetDefaultText: (this: unknown) => string
    GetEditEnabled: (this: unknown) => boolean
    GetFont: (this: unknown) => string
    GetFontFaceName: (this: unknown) => string
    GetFontHeight: (this: unknown) => number
    GetFontSize: (this: unknown) => number
    GetFontStyle: (this: unknown) => string
    GetIMECompositionExclusionArea: (
      this: unknown
    ) => LuaMultiReturn<
      [
        leftControlSpace: number,
        topControlSpace: number,
        rightControlSpace: number,
        bottomControlSpace: number,
      ]
    >
    GetMaxInputChars: (this: unknown) => number
    GetNewLineEnabled: (this: unknown) => boolean
    GetPasteEnabled: (this: unknown) => boolean
    GetScrollExtents: (this: unknown) => number
    GetSelectAllOnFocus: (this: unknown) => boolean
    GetTextLength: (this: unknown) => number
    GetTextType: (this: unknown) => TextType
    GetTopLineIndex: (this: unknown) => number
    HasFocus: (this: unknown) => boolean
    HasSelection: (this: unknown) => boolean
    InsertText: (this: unknown, text?: string) => undefined
    IsComposingIMEText: (this: unknown) => boolean
    IsMultiLine: (this: unknown) => boolean
    IsPassword: (this: unknown) => boolean
    RemoveAllValidCharacters: (this: unknown) => undefined
    SetAllowMarkupType: (this: unknown, allowMarkupType?: AllowMarkupType) => undefined
    SetAsPassword: (this: unknown, isPassword?: boolean) => undefined
    SetCopyEnabled: (this: unknown, enabled?: boolean) => undefined
    SetCursorPosition: (this: unknown, cursorPosition?: number) => undefined
    SetEditEnabled: (this: unknown, enabled?: boolean) => undefined
    SetMultiLine: (this: unknown, isMultiLine?: boolean) => undefined
    SetNewLineEnabled: (this: unknown, enabled?: boolean) => undefined
    SetPasteEnabled: (this: unknown, enabled?: boolean) => undefined
    SetSelectAllOnFocus: (this: unknown, enabled?: boolean) => undefined
    SetSelection: (
      this: unknown,
      selectionStartIndex?: number,
      selectionEndIndex?: number
    ) => undefined
    SetSelectionColor: (this: unknown, r?: number, g?: number, b?: number, a?: number) => undefined
    SetTextType: (this: unknown, textType?: TextType) => undefined
    SetTopLineIndex: (this: unknown, index?: number) => undefined
    SetVirtualKeyboardType: (this: unknown, keyboardType?: VirtualKeyboardType) => undefined
    WasLastChangeVirtualKeyboard: (this: unknown) => boolean
  }

  interface EventManager {
    RegisterForEvent: <T extends unknown[] = unknown[]>(
      this: unknown,
      namespace: string,
      event: number,
      callback: (eventCode: number, ...args: T) => undefined
    ) => boolean
    UnregisterForEvent: (this: unknown, namespace: string, event: number) => boolean
    AddFilterForEvent: (
      this: unknown,
      namespace: string,
      event: number,
      filterType: number,
      ...args: unknown[]
    ) => boolean
    RegisterForUpdate: (
      this: unknown,
      namespace: string,
      interval: number,
      callback: () => undefined
    ) => boolean
    UnregisterForUpdate: (this: unknown, namespace: string) => boolean
  }

  interface LabelControl extends Control {
    SetText: (this: unknown, text: string | number) => undefined
    GetText: (this: unknown) => string
    GetTextWidth: (this: unknown) => number
    GetStringWidth: (this: unknown, text?: string) => number
    GetTextHeight: (this: unknown) => number
    SetHeight: (this: unknown, height: number) => undefined
    SetFont: (this: unknown, font: string) => undefined
    SetColor: (this: unknown, r: number, g: number, b: number, a?: number) => undefined
    SetHorizontalAlignment: (this: unknown, alignment: number) => undefined
    SetVerticalAlignment: (this: unknown, alignment: number) => undefined
    SetWrapMode: (this: unknown, wrapMode: number) => undefined
    SetLinkEnabled: (this: unknown, enabled: boolean) => undefined
  }

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

  type LuaMultiReturn<T extends unknown[]> = T & {
    readonly __tstlMultiReturn: unknown
  }
}
