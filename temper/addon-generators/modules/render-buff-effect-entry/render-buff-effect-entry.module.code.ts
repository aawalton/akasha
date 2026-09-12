export type BuffEffectEntry = {
  readonly metricId: string
  readonly effectType: string
  readonly effectValue: number | { readonly value: number; readonly seconds: number }
}

export function renderBuffEffectEntry(entry: BuffEffectEntry): string {
  if (typeof entry.effectValue === "number") {
    return `      { metricId: ${JSON.stringify(entry.metricId)} as const, effectType: ${JSON.stringify(entry.effectType)} as const, effectValue: ${entry.effectValue} }`
  }
  return `      { metricId: ${JSON.stringify(entry.metricId)} as const, effectType: ${JSON.stringify(entry.effectType)} as const, effectValue: { value: ${entry.effectValue.value}, seconds: ${entry.effectValue.seconds} } }`
}
