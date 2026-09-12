export interface CadwellCatalogPOI {
  name: string
  order: number
}

export interface CadwellCatalogZone {
  name: string
  order: number
  pois: Record<number, CadwellCatalogPOI>
}

export interface CadwellCatalogLevel {
  zones: Record<number, CadwellCatalogZone>
}
