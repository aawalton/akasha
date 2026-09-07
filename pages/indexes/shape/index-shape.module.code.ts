export type Child = {
  readonly name: string
  readonly directory: boolean
}

export type Reading = {
  readonly holds: (at: string) => boolean
  readonly listing: (at: string) => readonly Child[]
  readonly lines: (at: string) => readonly string[]
}

export type Filing = {
  readonly at: string
  readonly lines: readonly string[]
}

export type Schema = {
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug: string | null
  readonly unique: string | null
  readonly uniqueScope: string | null
  readonly slug: string
  readonly propertySlug: string
  readonly fileName: string | null
}
