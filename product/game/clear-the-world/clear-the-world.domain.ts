import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const clearTheWorld = {
  id: "01a06579-e4f7-7351-8560-e330582149a8",
  type: "page-type/domain",
  slug: "clear-the-world",
  definition: "a game about clearing landmines from the ground",
  parts: ["page-type/ctw-achievement", "page-type/ctw-team"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every player clears a single shared minefield.",
    },
  ],
  createdAt: "2026-09-03T04:14:42.423Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Domain
