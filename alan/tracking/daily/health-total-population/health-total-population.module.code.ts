import { UNAVAILABLE_POINTS_SOURCE_KIND } from "../points-source-writer/points-source-writer.module.code.ts"

function writesCumulativeTotal(pointsSourceKind: string | undefined): boolean {
  return pointsSourceKind !== UNAVAILABLE_POINTS_SOURCE_KIND
}

export function healthPersonaPopulation<T extends { readonly valueSlug?: string | undefined }>(
  personas: readonly T[],
  healthValueSlug: string
): readonly T[] {
  return personas.filter((p) => p.valueSlug === healthValueSlug)
}

export function healthTotalPopulation<T extends { readonly pointsSourceKind?: string | undefined }>(
  personas: readonly T[]
): readonly T[] {
  return personas.filter((p) => writesCumulativeTotal(p.pointsSourceKind))
}

export function selectHealthPersonas<T>(
  population: readonly T[],
  slugOf: (persona: T) => string,
  slugs: readonly string[] | undefined
): { readonly selected: readonly T[]; readonly unmatched: readonly string[] } {
  const asked = (slugs ?? []).map((s) => s.trim().toLowerCase()).filter((s) => s !== "")
  if (asked.length === 0) return { selected: population, unmatched: [] }
  const wanted = new Set(asked)
  const present = new Set(population.map(slugOf))
  return {
    selected: population.filter((p) => wanted.has(slugOf(p))),
    unmatched: [...wanted].filter((s) => !present.has(s)),
  }
}
