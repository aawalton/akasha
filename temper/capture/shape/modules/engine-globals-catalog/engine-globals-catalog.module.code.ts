export interface EngineGlobalsCatalogData {
  readonly apiVersion: number
  readonly numbers: Record<string, number>
  readonly texts: Record<string, string>
  readonly tooLong: Record<string, number>
  readonly unwritable: readonly string[]
}
