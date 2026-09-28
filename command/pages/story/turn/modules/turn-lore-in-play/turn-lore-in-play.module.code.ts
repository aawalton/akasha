export type LoreLooking = {
  readonly pathOf: (page: string) => string | null
  readonly personaOf: (character: string) => string | null
  readonly about: Iterable<readonly [path: string, about: string | null]>
  readonly withheld: readonly string[]
}

export function loreNamed(
  stated: readonly string[],
  characters: readonly string[],
  look: LoreLooking
): readonly string[] {
  const about = new Set([...characters, ...characters.flatMap((one) => look.personaOf(one) ?? [])])
  const found = new Set(stated.flatMap((one) => look.pathOf(one) ?? []))
  for (const [path, said] of look.about) if (said !== null && about.has(said)) found.add(path)
  return [...found].filter((path) => !look.withheld.includes(path)).sort()
}
