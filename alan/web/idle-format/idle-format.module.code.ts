export function pct(fraction: number): number {
  return Number.isFinite(fraction) ? Math.round(fraction * 100) : 0
}

export function signedPct(syn: number): { text: string; negative: boolean } {
  const negative = syn < 0
  return { text: `${negative ? "−" : "+"}${pct(Math.abs(syn))}%`, negative }
}
