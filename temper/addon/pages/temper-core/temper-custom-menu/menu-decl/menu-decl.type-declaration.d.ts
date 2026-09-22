interface ZoCallbackObject {
  RegisterCallback: (
    this: ZoCallbackObject,
    key: number | string,
    callback: (this: void, ...args: unknown[]) => void,
    ...args: unknown[]
  ) => void
  FireCallbacks: (this: ZoCallbackObject, key: number | string, ...args: unknown[]) => void
}

declare const ZO_IsConsoleUI: (this: void) => boolean

declare const IgnoreMouseDownEditFocusLoss: (this: void, ...args: unknown[]) => void

declare const ZO_Menu_EnterItem: (this: void, control: Control) => void

declare const ZO_Menu_ExitItem: (this: void, control: Control) => void

declare const ZO_Menu_ClickItem: (this: void, control: Control, button: number) => void

declare const ZO_CheckButton_SetUnchecked: (this: void, checkButton: Control) => void

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

declare const FRIENDS_LIST: SocialListOwner

declare const IGNORE_LIST: SocialListOwner

declare const GROUP_LIST: SocialListOwner

declare const GUILD_ROSTER_KEYBOARD: SocialListOwner

declare const SharedChatSystem: SharedChatSystem
