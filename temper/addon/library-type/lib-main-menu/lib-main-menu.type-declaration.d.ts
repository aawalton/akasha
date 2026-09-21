interface LibMainMenu2CategoryData {
  binding?: string
  categoryName?: string | number
  normal?: string
  pressed?: string
  highlight?: string
}

interface LibMainMenu2SceneIconData {
  categoryName?: string | number
  descriptor?: string
  normal?: string
  pressed?: string
  highlight?: string
}

interface LibMainMenu2 {
  AddCategory: (this: LibMainMenu2, categoryData: LibMainMenu2CategoryData) => unknown
  AddSceneGroup: (
    this: LibMainMenu2,
    category: unknown,
    sceneGroupKey: string,
    iconData: readonly LibMainMenu2SceneIconData[]
  ) => void
  ToggleCategory: (this: LibMainMenu2, category: unknown) => void
}

declare const LibMainMenu2: LibMainMenu2 | undefined
