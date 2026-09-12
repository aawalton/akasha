export type MetricEffect = {
  readonly metricId: string
  readonly effectType: "integer" | "fractional-change"
  readonly effectValue: number
}

export function renderConstEffect(effect: MetricEffect): string {
  return `{ metricId: ${JSON.stringify(effect.metricId)} as const, effectType: ${JSON.stringify(effect.effectType)} as const, effectValue: ${effect.effectValue} }`
}

export function renderPlainEffect(effect: MetricEffect): string {
  return `{ metricId: ${JSON.stringify(effect.metricId)} as const, effectType: ${JSON.stringify(effect.effectType)}, effectValue: ${effect.effectValue} }`
}

export function renderEffects(
  effects: readonly MetricEffect[],
  renderOne: (effect: MetricEffect) => string
): string {
  if (effects.length === 0) return "[]"
  return `[${effects.map(renderOne).join(", ")}]`
}
