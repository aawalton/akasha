import type { Held, Stated } from "./stated.ts"

export interface Property {
  readonly name: string
  readonly slug: string
  readonly at: string
  readonly on: string
  readonly type: string
  readonly from: readonly string[]
  readonly back: string | null
  readonly expression: string | null
  readonly relation: string | null
  readonly reduction: string | null
  readonly over: string | null
  readonly required: boolean
  readonly secret: boolean
  readonly attachment: string | null
  readonly default: Held | null
  readonly computed: boolean
  readonly blank: boolean
  readonly oneOf: string | null
  readonly rows: string | null
  readonly uncommitted: boolean
  readonly target: string | null
  readonly mayBeGone: boolean
  readonly narrowsSlug: string | null
  readonly slugProperty: string | null
  readonly stated: Stated
}
