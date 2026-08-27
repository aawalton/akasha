export type Json =
  | string
  | number
  | boolean
  | null
  | readonly Json[]
  | { readonly [key: string]: Json }

export interface Page {
  readonly id: string
  readonly seq: number | null
  readonly title: string | null
  readonly slug: string | null
  readonly [key: string]: Json | undefined
}

export function pageOf(values: Readonly<Record<string, unknown>>): Page {
  return values as unknown as Page
}
