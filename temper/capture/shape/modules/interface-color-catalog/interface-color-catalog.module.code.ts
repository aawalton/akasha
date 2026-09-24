export interface InterfaceColorEntry {
  readonly type: number
  readonly field: number
  readonly red: number
  readonly green: number
  readonly blue: number
  readonly alpha: number
}

export interface InterfaceColorCatalogData {
  readonly apiVersion: number
  readonly colors: readonly InterfaceColorEntry[]
}
