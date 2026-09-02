export const CATALOG_SAVED_VARIABLES = "TemperCatalog.lua"
export const MINED_SAVED_VARIABLES = "TemperDataMining.lua"

export interface TierEmit {
  readonly content: string
  readonly report: readonly string[]
  readonly warnings?: readonly string[]
}

export interface Tier {
  readonly slug: string
  readonly summary: string
  readonly savedVariables: string
  readonly outputPath: string
  readonly format: boolean
  readonly emit: (
    accountWide: Record<string, unknown>,
    apiVersion: string
  ) => Promise<TierEmit> | TierEmit
}
