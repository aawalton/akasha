export interface EngineGlobalsCatalogData {
  readonly apiVersion: number
  readonly numbers: Record<string, number>
  readonly named: readonly string[]
  readonly unwritable: readonly string[]
}
