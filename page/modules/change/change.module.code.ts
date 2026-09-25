import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

export type Change = {
  readonly root: string
  readonly base?: string
  readonly pages?: Reading
  readonly changed: readonly string[]
  readonly carried?: readonly string[]
  readonly before: (path: string) => Uint8Array | null
  readonly after: (path: string) => Uint8Array | null
}
