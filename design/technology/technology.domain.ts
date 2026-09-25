import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const technology = {
  id: "01a065a0-1406-75cf-a0c3-0f1b9a3842e7",
  type: "page-type/domain",
  slug: "technology",
  definition: "how external services should be used",
  parts: ["domain/mcp"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A system's terms change without notice.",
    },
  ],
} as const satisfies Domain
