export const COOLDOWN_SECONDS = 60

export type Candidate = {
  readonly slug: string
  readonly wants: boolean
  readonly deploying: boolean
  readonly deployedAt: number | null
  readonly deployEndedAt: number | null
  readonly cooldownSeconds: number
  readonly dependsOn: readonly string[]
}

export function cooledBy(one: Candidate, now: number): boolean {
  if (one.deployEndedAt === null) return true
  return now - one.deployEndedAt >= one.cooldownSeconds * 1000
}

export function heldBackBy(
  one: Candidate,
  every: ReadonlyMap<string, Candidate>
): readonly string[] {
  return one.dependsOn.filter((slug) => every.get(slug)?.wants === true)
}

export function byName(every: readonly Candidate[]): ReadonlyMap<string, Candidate> {
  return new Map(every.map((one) => [one.slug, one]))
}

export function ableIn(every: readonly Candidate[], now: number): readonly Candidate[] {
  const held = byName(every)
  return every.filter(
    (one) => one.wants && !one.deploying && cooledBy(one, now) && heldBackBy(one, held).length === 0
  )
}

export function furtherBehind(one: Candidate, two: Candidate): number {
  if (one.deployedAt !== two.deployedAt) {
    if (one.deployedAt === null) return -1
    if (two.deployedAt === null) return 1
    return one.deployedAt - two.deployedAt
  }
  return one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0
}

export function chosenFrom(every: readonly Candidate[], now: number): Candidate | null {
  const able = [...ableIn(every, now)].sort(furtherBehind)
  return able[0] ?? null
}
