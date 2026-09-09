interface TemperAddonsApi {
  ReloadTheUI: (this: void) => void
  ShowActivePackInChat: (this: void) => void
  LoadPackByKeybind: (this: void, slot: number) => void
  SelectAddons: (this: void, selectAll: boolean) => void
  ToggleCurrentAddonState: (this: void) => void
  StartAddonSearch: (this: void) => void
  assignPackToKeybind: (this: void, slot: number, packName: string, charName: string) => void
  removePackFromKeybind: (this: void, slot: number) => void
}

declare var TemperAddons: TemperAddonsApi
