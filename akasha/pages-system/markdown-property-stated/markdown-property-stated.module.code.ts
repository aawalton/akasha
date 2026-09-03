export type Held = string | readonly Held[] | { readonly [key: string]: Held }

export type Stated = {
  readonly pattern: string | null
  readonly backstop: string | null
  readonly values: Held | null
  readonly max: string | null
}
