declare const ZO_DEFAULT_ENABLED_COLOR: ZoColorDef

declare const ZO_DEFAULT_DISABLED_MOUSEOVER_COLOR: ZoColorDef

declare const ZO_SECOND_CONTRAST_TEXT: ZoColorDef

declare const ZO_LinkHandler_OnLinkClicked: (this: void, ...args: unknown[]) => unknown

interface EsoDialogTextField {
  text: string | number
}

interface EsoDialogButton {
  text: string | number
  callback?: (this: void, dialog?: unknown) => void
}

interface EsoDialogDescriptor {
  canQueue?: boolean
  title: EsoDialogTextField
  mainText: EsoDialogTextField
  buttons: EsoDialogButton[]
  noChoiceCallback?: (this: void, ...args: unknown[]) => void
}

declare const ZO_ScrollList_GetHeight: (this: void, list: object) => number

declare const ZO_ScrollList_MouseEnter: (this: void, list: object, control: Control) => void

declare const ZO_ScrollList_MouseExit: (this: void, list: object, control: Control) => void

interface ZoScrollListObjectPool {
  m_Factory: (this: void, pool: ZoScrollListObjectPool) => Control
}

interface ZoScrollListDataTypeTable {
  pool: ZoScrollListObjectPool
}

interface ZoFadeSceneFragment {
  GetControl: (this: ZoFadeSceneFragment) => Control
  RegisterCallback: (
    this: ZoFadeSceneFragment,
    event: string,
    callback: (this: void, oldState: number, newState: number) => void
  ) => void
}

interface ZoFadeSceneFragmentClass {
  New: (
    this: ZoFadeSceneFragmentClass,
    control: Control,
    alwaysAnimate?: boolean,
    duration?: number
  ) => ZoFadeSceneFragment
}

declare const ZO_GameMenu_AddSettingPanel: (this: void, panelData: unknown) => void

declare const ZO_ReanchorControlForLeftSidePanel: (this: void, control: Control) => void

declare const ZO_Ingame_SavedVariables: Record<string, unknown>

declare const TemperAddonMenuSettingsWindow: Control

declare let TemperAddonMenuSettingsFragment: ZoFadeSceneFragment | undefined
