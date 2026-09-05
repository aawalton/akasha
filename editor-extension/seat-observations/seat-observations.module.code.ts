export interface SweepObservation {
  readonly swept: number
  readonly read: number
  readonly noProcess: number
  readonly neverAnswered: number
  readonly boundMs: number
  readonly worstMs: number
  readonly worstAt: string
  readonly worstTrigger: string
}

export type Outcome = "ok" | "failed"

type ActivationState = "activated" | "failed" | "still running"

export interface Observation {
  readonly at: string
  readonly activation?: { readonly state: ActivationState; readonly ms: number }
  readonly outcome?: Outcome
  readonly failure?: string
  readonly sweep?: SweepObservation
  readonly counts?: Readonly<Record<string, number>>
}

const TIMESTAMP_KEYS = new Set(["at", "worstAt"])

// WHAT SAYS TWO READINGS DIFFER, WITH THE TIMES THEY WERE TAKEN LEFT OUT. Every reading carries the
// moment it was taken, so comparing readings whole says they differ every time; leaving those
// moments out is what lets a reading that changed nothing be written nowhere. Keys are sorted so
// that the order two readings happened to set them in never reads as a difference.
export function changeKey(features: Readonly<Record<string, Observation>>): string {
  return JSON.stringify(features, (key, value: unknown) => {
    if (TIMESTAMP_KEYS.has(key) && typeof value === "string") {
      return undefined
    }
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return value
    }
    const sorted: Record<string, unknown> = {}
    for (const name of Object.keys(value as Record<string, unknown>).sort()) {
      sorted[name] = (value as Record<string, unknown>)[name]
    }
    return sorted
  })
}
