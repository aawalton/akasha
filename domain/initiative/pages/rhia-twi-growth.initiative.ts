import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rhiaTwiGrowth = {
  id: "01a126c0-b6e9-773e-9b12-f7406c47d416",
  type: "page-type/initiative",
  slug: "rhia-twi-growth",
  domain: "domain/world-lore",
  persona: "persona/rhia",
  parent: "initiative/rhia-twi-analysis-book",
  intentStack: [
    {
      statement:
        "The book says how The Wandering Inn grows better rather than duller as it lengthens.",
    },
  ],
  constraints: ["Alan sees the Cosmere share this, and neither story is finished."],
  createdAt: "2026-10-10T16:58:46.377Z",
  updatedAt: "2026-10-10T16:58:46.377Z",
} as const satisfies Initiative
