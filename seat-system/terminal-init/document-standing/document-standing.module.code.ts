import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { peopleStanding } from "@akasha/person-system/person-reading"
import { personasStanding } from "@akasha/persona-system/persona-reading"

export const SLUG_MARK = "<slug>"

export const PERSONA_FALLBACK = `persona-system/personas/${SLUG_MARK}/${SLUG_MARK}.persona.ts`

export const PERSON_FALLBACK = `person-system/people/pages/${SLUG_MARK}.person.ts`

export interface Named {
  readonly slug: string
  readonly path: string
}

// A DOCUMENT'S PLACE IS READ OFF THE PAGES STANDING RATHER THAN SPELLED HERE. The akasha tree is
// still being arranged, so a folder written into this file goes stale the next time a page type
// moves, and the shell function built from it then refuses a seat that is perfectly well declared.
// Reading one standing page's own path and blanking its slug survives every move that keeps a page
// named for its slug.
export function shapeOf(path: string, slug: string): string {
  const parts = path.split("/")
  return parts
    .map((part, at) => {
      if (at < parts.length - 2) return part
      if (part === slug) return SLUG_MARK
      if (part.startsWith(`${slug}.`)) return `${SLUG_MARK}${part.slice(slug.length)}`
      return part
    })
    .join("/")
}

export function shapesStanding(
  reading: () => readonly Named[],
  fallback: string
): readonly string[] {
  try {
    const held = reading().map((one) => shapeOf(one.path, one.slug))
    const found = [...new Set(held)].sort()
    return found.length === 0 ? [fallback] : found
  } catch {
    return [fallback]
  }
}

export function pathsFor(shapes: readonly string[], slugVar: string): readonly string[] {
  return shapes.map((shape) => `$_root/${shape.replaceAll(SLUG_MARK, `$${slugVar}`)}`)
}

export function standsShell(paths: readonly string[]): string {
  return paths.map((at) => `[ -f "${at}" ]`).join(" || ")
}

export function personaPaths(slugVar: string): readonly string[] {
  return pathsFor(
    shapesStanding(() => personasStanding(ownRepoRoot()), PERSONA_FALLBACK),
    slugVar
  )
}

export function personPaths(slugVar: string): readonly string[] {
  return pathsFor(
    shapesStanding(() => peopleStanding(ownRepoRoot()), PERSON_FALLBACK),
    slugVar
  )
}

export function personaDocumentStandsShell(slugVar: string): string {
  return standsShell(personaPaths(slugVar))
}

export function personDocumentStandsShell(slugVar: string): string {
  return standsShell(personPaths(slugVar))
}

export function personaDocumentGateLines(fnName: string, slugVar: string): readonly string[] {
  const paths = personaPaths(slugVar)
  const place = paths[0] ?? `$_root/${PERSONA_FALLBACK.replaceAll(SLUG_MARK, `$${slugVar}`)}`
  const missing = paths.map((at) => `[ ! -f "${at}" ]`).join(" && ")
  return [
    `  if ${missing}; then`,
    `    echo "${fnName}: '$${slugVar}' has no persona document — ${place} ` +
      `is not there. A project-bound seat has none by design, and a persona whose document ` +
      `has not migrated to the clean tree has none yet; either way there is no identity to seat ` +
      `and a fresh session cannot reseed one. To resume an existing session: sr $name" >&2`,
    "    return 1",
    "  fi",
  ]
}
