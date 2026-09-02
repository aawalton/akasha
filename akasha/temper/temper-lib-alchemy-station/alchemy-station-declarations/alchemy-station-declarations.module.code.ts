declare global {
  type AnyNotNil = {}

  function pairs<T>(this: void, t: T): Iterable<[keyof T, NonNullable<T[keyof T]>]>

  interface Control {
    SetHidden: (hidden: boolean) => undefined
    SetWidth: (width: number) => undefined
    SetAnchor: (
      point: number,
      relativeTo?: Control,
      relativePoint?: number,
      offsetX?: number,
      offsetY?: number
    ) => undefined
    SetAnchorFill: (parent?: Control) => undefined
    SetExcludeFromResizeToFitExtents: (exclude: boolean) => undefined
    GetNamedChild: (name: string) => Control | undefined
  }

  interface LabelControl extends Control {
    SetText: (text: string) => undefined
  }

  const TOPLEFT: number
  const BOTTOMLEFT: number
  const CT_CONTROL: number

  const ZO_AlchemyTopLevel: Control
  const ZO_SharedRightPanelBackground: Control

  interface WindowManager {
    CreateControl: (name: string, parent: Control | undefined, controlType: number) => Control
  }
  const WINDOW_MANAGER: WindowManager

  const SecurePostHook: <T extends object>(
    this: void,
    target: T,
    methodName: string,
    hook: (this: void, ...args: never[]) => undefined
  ) => undefined

  const ZO_MenuBar_AddButton: (
    this: void,
    menuBar: Control,
    buttonData: object
  ) => Control | undefined

  const ZO_MenuBar_SelectDescriptor: (
    this: void,
    menuBar: Control,
    descriptor: number | string,
    animate: boolean
  ) => boolean

  const ZO_MenuBar_GetSelectedDescriptor: (this: void, menuBar: Control) => number | string

  const GetString: (this: void, stringId: number | string) => string

  interface AlchemyStation {
    mode: number | string
    modeBar: Control
    modeBarLabel: LabelControl
    control: Control
    SetMode: (this: AlchemyStation, mode: number | string) => undefined
  }
  const ALCHEMY: AlchemyStation
}

export {}
