export const COOLDOWN_SECONDS = 60

export const REFUSAL_SECONDS = 600

const A_SECOND = 1000

export type Candidate = {
  readonly slug: string
  readonly deploying: boolean
  readonly deployedAt: number | null
  readonly deployEndedAt: number | null
  readonly refusedAt: number | null
  readonly cooldownSeconds: number
  readonly dependsOn: readonly string[]
}

export type Wanting = (one: Candidate) => boolean

export function waitedBy(one: Candidate): number {
  if (one.refusedAt !== null && one.refusedAt === one.deployEndedAt) {
    return Math.max(one.cooldownSeconds, REFUSAL_SECONDS)
  }
  return one.cooldownSeconds
}

export function cooledBy(one: Candidate, now: number): boolean {
  if (one.deployEndedAt === null) return true
  return now - one.deployEndedAt >= waitedBy(one) * A_SECOND
}

export function heldBackBy(
  one: Candidate,
  every: ReadonlyMap<string, Candidate>,
  wants: Wanting
): readonly string[] {
  return one.dependsOn.filter((slug) => {
    const two = every.get(slug)
    return two !== undefined && wants(two)
  })
}

export function byName(every: readonly Candidate[]): ReadonlyMap<string, Candidate> {
  return new Map(every.map((one) => [one.slug, one]))
}

export function furtherBehind(one: Candidate, two: Candidate): number {
  if (one.deployedAt !== two.deployedAt) {
    if (one.deployedAt === null) return -1
    if (two.deployedAt === null) return 1
    return one.deployedAt - two.deployedAt
  }
  return one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0
}

export function chosenFrom(
  every: readonly Candidate[],
  now: number,
  wants: Wanting
): Candidate | null {
  const held = byName(every)
  for (const one of [...every].sort(furtherBehind)) {
    if (one.deploying) continue
    if (!cooledBy(one, now)) continue
    if (!wants(one)) continue
    if (heldBackBy(one, held, wants).length > 0) continue
    return one
  }
  return null
}
