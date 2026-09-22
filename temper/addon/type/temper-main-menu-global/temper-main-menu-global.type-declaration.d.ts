interface TemperMainMenuCategoryData {
  binding?: string
  categoryName?: string | number
  normal?: string
  pressed?: string
  highlight?: string
}

interface TemperMainMenuSceneIconData {
  categoryName?: string | number
  descriptor?: string
  normal?: string
  pressed?: string
  highlight?: string
}

interface TemperMainMenu {
  AddCategory: (this: TemperMainMenu, categoryData: TemperMainMenuCategoryData) => unknown
  AddSceneGroup: (
    this: TemperMainMenu,
    category: unknown,
    sceneGroupKey: string,
    iconData: readonly TemperMainMenuSceneIconData[]
  ) => void
  ToggleCategory: (this: TemperMainMenu, category: unknown) => void
}

declare const TemperMainMenu: TemperMainMenu | undefined

interface TemperMainMenu {
  Init: (this: TemperMainMenu) => undefined
  AddMenuItem: (this: TemperMainMenu, descriptor: string, data: TemperMainMenuItemData) => undefined
}
