export interface Fold<Out> {
  readonly outcome: "value"
  readonly value: Out
  readonly because: string
}

export interface Refusal {
  readonly outcome: "refuse"
  readonly because: string
}

export type Choice<Out> = Fold<Out> | Refusal

export const folds = <Out>(value: Out, because: string): Fold<Out> => ({
  outcome: "value",
  value,
  because,
})

export const refuses = (because: string): Refusal => ({ outcome: "refuse", because })

export type CollapseTable<K extends string, Out> = { readonly [P in K]: Choice<Out> }

export interface Sealed<K extends string> {
  readonly fold: <Out>(table: CollapseTable<K, Out>) => Out
}

export class CollapseRefused extends Error {
  override readonly name = "CollapseRefused"
}

function apply<K extends string, Out>(
  reading: K,
  table: CollapseTable<K, Out>,
  cause: unknown
): Out {
  const choice = table[reading]
  if (choice.outcome === "value") return choice.value
  if (cause !== undefined) throw cause
  throw new CollapseRefused(`refused to collapse \`${reading}\` — ${choice.because}`)
}

export const seal = <K extends string>(reading: K, cause: unknown): Sealed<K> => ({
  fold: <Out>(table: CollapseTable<K, Out>): Out => apply(reading, table, cause),
})

export function collapse<K extends string, Out>(
  reading: K | Sealed<K>,
  table: CollapseTable<K, Out>
): Out {
  return typeof reading === "string" ? apply(reading, table, undefined) : reading.fold(table)
}
