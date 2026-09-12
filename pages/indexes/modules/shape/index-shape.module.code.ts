export type Child = {
  readonly name: string
  readonly directory: boolean
}

export type Reading = {
  readonly holds: (at: string) => boolean
  readonly listing: (at: string) => readonly Child[]
  readonly lines: (at: string) => readonly string[]
  readonly read: (path: string) => string | null
}

export type Filing = {
  readonly at: string
  readonly came: readonly string[]
  readonly went: readonly string[]
}

export type Shape = {
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug: string | null
  readonly unique: string | null
  readonly uniquePropertySlug: string | null
  readonly slug: string
  readonly propertySlug: string
  readonly fileName: string | null
  readonly folderName: string | null
  readonly sorted: boolean
}
