export {}

declare global {
  interface ZoFadeSceneFragmentClass {
    New: (this: unknown, control: Control) => SceneFragment
  }

  const MENU_CATEGORY_INVENTORY: number

  const MENU_CATEGORY_MARKET: number

  const CreateControl: <T extends Control = Control>(
    name: string,
    parent: Control,
    controlType: number
  ) => T

  const CreateTopLevelWindow: <T extends TopLevelWindow = TopLevelWindow>(name: string) => T

  const ZO_CONTRAST_TEXT: ZoColorDef

  const ZO_FadeSceneFragment: ZoFadeSceneFragmentClass

  const ZO_MenuBar_ClearButtons: (menuBar: Control) => undefined

  const ZO_MenuBar_ClearSelection: (menuBar: Control) => undefined

  const ZO_MenuBar_GetButtonControl: (
    menuBar: Control,
    descriptor: Descriptor | undefined
  ) => Control | undefined

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
}
