import type { PageCondition } from "@akasha/pages-core/page-types"

export function personaSlugCondition(personaSlug: string): PageCondition {
  return {
    or: [
      { key: "persona", eq: personaSlug },
      { key: "personaSlug", eq: personaSlug },
    ],
  }
}

export function relationshipLevelMatchCondition(level: number): PageCondition {
  return {
    or: [
      { key: "relationshipLevel", eq: level },
      { key: "relationshipLevel", eq: String(level) },
    ],
  }
}
