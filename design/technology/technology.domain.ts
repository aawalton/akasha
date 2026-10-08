import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const technology = {
  id: "01a065a0-1406-75cf-a0c3-0f1b9a3842e7",
  type: "page-type/domain",
  slug: "technology",
  definition: "how an external service is used well",
  parts: ["domain/mcp", "domain/image"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A system's terms change without notice.",
    },
  ],
  createdAt: "2026-09-03T04:56:24.838Z",
  updatedAt: "2026-09-26T15:44:26.000Z",
} as const satisfies Domain
