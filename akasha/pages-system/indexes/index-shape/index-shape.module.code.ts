export type Listed = {
  readonly name: string
  readonly directory: boolean
}

export type Reading = {
  readonly holds: (at: string) => boolean
  readonly listing: (at: string) => readonly Listed[]
  readonly lines: (at: string) => readonly string[]
}

export type Filing = {
  readonly at: string
  readonly lines: readonly string[]
}
