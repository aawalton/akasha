export type Row = { readonly values: Readonly<Record<string, unknown>> }

export type Answered =
  | { readonly ok: true; readonly rows: readonly Row[] }
  | { readonly ok: false; readonly why: string }

export type Asking = (query: Readonly<Record<string, unknown>>) => Promise<Answered>
