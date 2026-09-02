declare global {
  const zo_clamp: (this: void, value: number, min: number, max: number) => number

  interface ZoCallbackObject {
    RegisterCallback: (
      this: ZoCallbackObject,
      key: number | string,
      callback: (this: void, ...args: unknown[]) => void,
      ...args: unknown[]
    ) => void
    FireCallbacks: (this: ZoCallbackObject, key: number | string, ...args: unknown[]) => void
  }

  const ZO_Menus: Control

  const ZO_IsConsoleUI: (this: void) => boolean

  const IgnoreMouseDownEditFocusLoss: (this: void, ...args: unknown[]) => void

  const ZO_Menu_EnterItem: (this: void, control: Control) => void

  const ZO_Menu_ExitItem: (this: void, control: Control) => void

  const ZO_Menu_ClickItem: (this: void, control: Control, button: number) => void

  const ZO_Menu_SetLastCommandWasFromMenu: (this: void, fromMenu: boolean) => void

  const ZO_CheckButton_OnClicked: (this: void, checkButton: Control, button: number) => void

  const ZO_CheckButton_SetUnchecked: (this: void, checkButton: Control) => void

  const ZO_ScrollList_GetData: (this: void, control: Control) => unknown

  const ZO_WHITE: ZoColorDef

  const ZO_DEFAULT_DISABLED_COLOR: ZoColorDef

  interface ZoInventorySlotActions {
    m_contextMenuMode?: boolean
    Show: (this: ZoInventorySlotActions) => void
    AddSlotAction: (this: ZoInventorySlotActions, ...args: unknown[]) => void
    GetPrimaryActionName: (this: ZoInventorySlotActions, ...args: unknown[]) => unknown
    AddCustomSlotAction?: (this: ZoInventorySlotActions, ...args: unknown[]) => void
  }

  interface SocialListOwner {
    [handlerName: string]: ((this: void, ...args: unknown[]) => unknown) | undefined
  }

  const FRIENDS_LIST: SocialListOwner

  const IGNORE_LIST: SocialListOwner

  const GROUP_LIST: SocialListOwner

  const GUILD_ROSTER_KEYBOARD: SocialListOwner

  interface Control {
    CreateControl: <T extends Control = Control>(name: string, controlType: number) => T
    GetDrawLayer: () => number
    GetDrawTier: () => number
    GetDrawLevel: () => number
    GetOwningWindow: () => Control
    SetClampedToScreen: (clamped: boolean) => void
  }

  interface LabelControl {
    SetMaxLineCount: (count: number) => void
  }

  interface TextureControl {
    SetAddressMode: (mode: number) => void
  }

  interface TooltipControl {
    GetOwner: () => Control | undefined
  }

  interface SharedChatSystem {
    ShowPlayerContextMenu: (
      this: SharedChatSystem,
      playerName: string,
      rawName: string,
      ...rest: unknown[]
    ) => unknown
  }

  const SharedChatSystem: SharedChatSystem
}

export {}
