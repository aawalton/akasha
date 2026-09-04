export interface StepSpan {
  readonly startedAt: string | undefined
  readonly completedAt: string | undefined
}

function parseIsoMs(value: string | undefined): number | undefined {
  if (value === undefined) return undefined
  const ms = Date.parse(value)
  return Number.isNaN(ms) ? undefined : ms
}

export function computeSoloMs(spans: readonly StepSpan[]): readonly (number | undefined)[] {
  const solo: Array<number | undefined> = []
  const events: Array<{ t: number; delta: number; index: number }> = []

  for (const [index, span] of spans.entries()) {
    const start = parseIsoMs(span.startedAt)
    const end = parseIsoMs(span.completedAt)
    if (start === undefined || end === undefined || end < start) {
      solo.push(undefined)
      continue
    }
    solo.push(0)
    events.push({ t: start, delta: 1, index })
    events.push({ t: end, delta: -1, index })
  }

  events.sort((a, b) => a.t - b.t || b.delta - a.delta)

  const live = new Set<number>()
  let previous: number | undefined
  let cursor = 0
  while (cursor < events.length) {
    const t = events[cursor]?.t
    if (t === undefined) break
    if (previous !== undefined && live.size === 1) {
      const only = live.values().next().value
      if (only !== undefined) solo[only] = (solo[only] ?? 0) + (t - previous)
    }
    while (cursor < events.length) {
      const event = events[cursor]
      if (event === undefined || event.t !== t) break
      if (event.delta === 1) live.add(event.index)
      else live.delete(event.index)
      cursor += 1
    }
    previous = t
  }

  return solo
}
