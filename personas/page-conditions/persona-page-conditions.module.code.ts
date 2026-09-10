import type { PageCondition } from "akasha/pages/core/page-types/page-types.module.code.ts"

export function personaCondition(persona: string): PageCondition {
  return { key: "persona", eq: persona }
}

export function relationshipLevelMatchCondition(level: number): PageCondition {
  return {
    or: [
      { key: "relationshipLevel", eq: level },
      { key: "relationshipLevel", eq: String(level) },
    ],
  }
}
