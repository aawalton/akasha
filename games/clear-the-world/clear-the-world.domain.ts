import type { Domain } from "../../domains/domain.page-type.ts"

export const clearTheWorld = {
  id: "01a06579-e4f7-7351-8560-e330582149a8",
  pageTypeSlug: "domain",
  slug: "clear-the-world",
  definition: "a game about clearing landmines from the ground",
  parts: ["page-type/ctw-achievement", "page-type/ctw-team"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every player clears a single shared minefield.",
    },
  ],
} as const satisfies Domain
