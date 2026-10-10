import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rhiaTwiWorld = {
  id: "01a126c0-65d2-7916-98b9-9c580834581c",
  type: "page-type/initiative",
  slug: "rhia-twi-world",
  domain: "domain/world-lore",
  persona: "persona/rhia",
  parent: "initiative/rhia-twi-analysis-book",
  intentStack: [
    {
      statement:
        "The book says what makes the world of The Wandering Inn deeper and more coherent than A tier.",
    },
  ],
  constraints: [
    "Alan places The Wandering Inn, the Cosmere and Tolkien's world at S tier, and most other great fantasy at A tier.",
    "Alan sees Tolkien as pioneering this depth of world.",
    "Alan finds coherence and thoughtfulness, rather than detail alone, set these worlds apart.",
  ],
  createdAt: "2026-10-10T16:58:25.617Z",
  updatedAt: "2026-10-10T16:58:25.617Z",
} as const satisfies Initiative
