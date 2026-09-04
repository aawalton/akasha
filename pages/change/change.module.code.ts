export type Change = {
  readonly root: string
  readonly changed: readonly string[]
  readonly before: (path: string) => Uint8Array | null
  readonly after: (path: string) => Uint8Array | null
}
