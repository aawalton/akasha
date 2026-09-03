export type PageAccessClient = unknown

export interface Page {
  readonly id: string
  readonly seq: number
  readonly [key: string]: unknown
}

export type WriteOutcome = "patched" | "created"

export type ReadonlyJSONValue =
  | string
  | number
  | boolean
  | null
  | readonly ReadonlyJSONValue[]
  | { readonly [key: string]: ReadonlyJSONValue }

export interface PropertyDefinition {
  readonly id: string
  readonly slug: string
  readonly kind?: string
  readonly [key: string]: unknown
}
