export type PageAccessClient = unknown

export interface Page {
  readonly id: string
  readonly [key: string]: unknown
}

export interface AnsweredRow {
  readonly at: string
  readonly values: Readonly<Record<string, unknown>>
}

export type Answered =
  | {
      readonly ok: true
      readonly rows: readonly AnsweredRow[]
      readonly n: number
      readonly unfound: readonly string[]
    }
  | { readonly ok: false; readonly why: string }

export type Landed =
  | { readonly ok: true; readonly at: string }
  | { readonly ok: false; readonly why: string }
