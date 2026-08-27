export type CatalogGirl = {
  readonly slug: string
  readonly name: string
  readonly level: number | null
  readonly stage: string
  readonly cover: string
}

export type Catalog = {
  readonly roster: readonly CatalogGirl[]
  readonly pools: Record<string, readonly string[]>
}
