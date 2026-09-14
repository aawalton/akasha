import type { PageCondition } from "akasha/pages/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/pages/modules/address/page-address.module.code.ts"

const PERSONA = "persona"

export function personaCondition(persona: string): PageCondition {
  return { key: PERSONA, eq: namedAs(PERSONA, persona, null) }
}

export function relationshipLevelMatchCondition(level: number): PageCondition {
  return {
    or: [
      { key: "relationshipLevel", eq: level },
      { key: "relationshipLevel", eq: String(level) },
    ],
  }
}
