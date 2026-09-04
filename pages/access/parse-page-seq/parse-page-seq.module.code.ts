export function parsePageSeq(raw: unknown, context: string): number | null {
  if (raw === undefined || raw === null || raw === "") return null
  if (typeof raw === "number" && Number.isFinite(raw)) return raw
  if (typeof raw === "string" && /^\d+$/.test(raw)) {
    const n = Number(raw)
    if (Number.isFinite(n)) return n
  }
  console.warn(
    `parsePageSeq: ${context} states a page seq that is not a whole number — ${JSON.stringify(raw)} (${typeof raw}). Reading it as absent. A page carries the seq it was minted with or carries none; no minter issues 0, so 0 is never the answer here`
  )
  return null
}
