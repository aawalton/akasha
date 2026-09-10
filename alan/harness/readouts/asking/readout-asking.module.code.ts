export type Row = { readonly values: Readonly<Record<string, unknown>> }

export type Answered =
  | { readonly ok: true; readonly rows: readonly Row[] }
  | { readonly ok: false; readonly why: string }

export type Asking = (query: Readonly<Record<string, unknown>>) => Promise<Answered>

export async function rowFor(
  ask: Asking,
  query: Readonly<Record<string, unknown>>,
  fault: string
): Promise<Row | null> {
  const asked = await ask(query)
  if (!asked.ok) throw new Error(`${fault}: ${asked.why}`)
  const [row] = asked.rows
  return row ?? null
}
