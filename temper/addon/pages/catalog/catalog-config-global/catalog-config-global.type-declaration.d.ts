interface TemperCatalogConfigGlobal {
  readonly version: number
  readonly invalidateVersion: number
  readonly invalidateDomains?: readonly string[]
  readonly minedItemsUploaded?: {
    readonly apiVersion: string
    readonly throughItemId: number
  }
}

declare var TemperCatalogConfig: TemperCatalogConfigGlobal | undefined
