interface TemperCatalogConfigGlobal {
  readonly version: number
  readonly invalidateVersion: number
  readonly invalidateDomains?: readonly string[]
  readonly minedItemsUploaded?: {
    readonly apiVersion: string
    readonly throughItemId: number
  }
  readonly landedCatalogs?: {
    readonly [domainKey: string]: {
      readonly apiVersion: string
      readonly invalidateVersion: number
    }
  }
}

declare var TemperCatalogConfig: TemperCatalogConfigGlobal | undefined
