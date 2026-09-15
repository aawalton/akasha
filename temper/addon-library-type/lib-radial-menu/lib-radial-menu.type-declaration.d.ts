interface LibRadialMenuApi {
  RegisterAddon: (this: LibRadialMenuApi, addonName: string, displayName: string) => unknown
  RegisterEntry: (
    this: LibRadialMenuApi,
    addonName: string,
    label: string,
    key: string,
    iconPath: string,
    callback: (this: void) => void,
    tooltip?: string
  ) => unknown
}

declare const LibRadialMenu: LibRadialMenuApi | undefined
