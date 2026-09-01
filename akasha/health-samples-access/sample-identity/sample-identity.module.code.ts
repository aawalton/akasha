export function instantMs(iso: string): number {
  const ms = Date.parse(iso)
  if (Number.isNaN(ms)) {
    throw new Error(`health-samples: unparseable instant ${JSON.stringify(iso)}`)
  }
  return ms
}

export interface SampleIdentityParts {
  readonly metric: string
  readonly sourceName: string
  readonly startedAt: string
  readonly endedAt: string
}

export function sampleIdentity(parts: SampleIdentityParts): string {
  return JSON.stringify([
    parts.metric,
    parts.sourceName,
    instantMs(parts.startedAt),
    instantMs(parts.endedAt),
  ])
}
