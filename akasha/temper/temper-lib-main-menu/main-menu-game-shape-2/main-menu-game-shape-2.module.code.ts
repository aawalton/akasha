export {}

declare global {
  const MENU_CATEGORY_INVENTORY: number

  const MENU_CATEGORY_MARKET: number

  const CreateTopLevelWindow: <T extends TopLevelWindow = TopLevelWindow>(name: string) => T

  const ZO_CONTRAST_TEXT: ZoColorDef

  const ZO_MenuBar_ClearButtons: (menuBar: Control) => undefined

  const ZO_MenuBar_ClearSelection: (menuBar: Control) => undefined

  const ZO_MenuBar_GetButtonControl: (
    menuBar: Control,
    descriptor: number | string | undefined
  ) => Control | undefined

  const ZO_MenuBar_SetDescriptorEnabled: (
    menuBar: Control,
    descriptor: number | string,
    enabled: boolean
  ) => undefined

  const ZO_MenuBar_UpdateButtons: (menuBar: Control) => undefined
}
