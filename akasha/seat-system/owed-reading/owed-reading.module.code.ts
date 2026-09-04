export const OWED_VERDICTS = [
  "owed",
  "work-complete",
  "custodian-dead",
  "own-act-next",
  "no-binding",
] as const

export type OwedVerdict = (typeof OWED_VERDICTS)[number]

export interface OwedRow {
  readonly status: string
}

export interface OwedDecision {
  readonly verdict: OwedVerdict
}

export function decideOwed(opts: { readonly rows: readonly OwedRow[] }): OwedDecision {
  return { verdict: opts.rows.length === 0 ? "no-binding" : "own-act-next" }
}

export function readOwed(): OwedVerdict {
  return decideOwed({ rows: [] }).verdict
}
