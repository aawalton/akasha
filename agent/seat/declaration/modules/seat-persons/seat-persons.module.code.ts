import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const JOINER = ","

export function personsOf(principal: string): readonly string[] {
  return principal.split(JOINER)
}

export function principalOfPersons(persons: readonly string[]): string {
  return persons.join(JOINER)
}

export function principalStatedIn(listed: unknown): string | null {
  if (!Array.isArray(listed)) return null
  const persons = listed.filter((one): one is string => typeof one === "string" && one !== "")
  return persons.length === 0 ? null : principalOfPersons(persons.map(slugOf))
}

export function onePersonIn(listed: unknown): string | null {
  const principal = principalStatedIn(listed)
  if (principal === null) return null
  const persons = personsOf(principal)
  return persons.length === 1 ? (persons[0] ?? null) : null
}
