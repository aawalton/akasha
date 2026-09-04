import type { Domain } from "../../domains/domains/domain.page-type.ts"

export const clearTheWorld = {
  id: "01a06579-e4f7-7351-8560-e330582149a8",
  pageTypeSlug: "domain",
  slug: "clear-the-world",
  definition: "a game about clearing landmines from the ground",
  partSlugs: ["page-type/ctw-achievement", "page-type/ctw-team"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every player clears the one shared minefield.",
    },
  ],
} as const satisfies Domain
