import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rhiaTwiCharacters = {
  id: "01a126c0-869b-752b-b3ff-3914dacf6773",
  type: "page-type/initiative",
  slug: "rhia-twi-characters",
  domain: "domain/world-lore",
  persona: "persona/rhia",
  parent: "initiative/rhia-twi-analysis-book",
  intentStack: [
    {
      statement:
        "The book says how the characters of The Wandering Inn read as real people who matter.",
    },
  ],
  constraints: [
    "Alan values the depth, breadth and reality of the characters of The Wandering Inn.",
    "Alan finds most characters in fiction, and most written by models, to be caricatures.",
  ],
  createdAt: "2026-10-10T16:58:34.011Z",
  updatedAt: "2026-10-10T16:58:34.011Z",
} as const satisfies Initiative
