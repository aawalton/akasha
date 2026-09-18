import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  type: "page-type/initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "persona/thea",
  intentStack: [],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
