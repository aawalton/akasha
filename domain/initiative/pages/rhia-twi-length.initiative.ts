import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rhiaTwiLength = {
  id: "01a126c0-3638-7d53-819e-86535c853faa",
  type: "page-type/initiative",
  slug: "rhia-twi-length",
  domain: "domain/world-lore",
  persona: "persona/rhia",
  parent: "initiative/rhia-twi-analysis-book",
  intentStack: [
    {
      statement:
        "The book says how the length and writing pace of The Wandering Inn raise its tier.",
    },
  ],
  constraints: [
    "Alan reads 16M+ words of one continuous narrative by one author in under a decade as unprecedented.",
  ],
  createdAt: "2026-10-10T16:58:13.431Z",
  updatedAt: "2026-10-10T16:58:13.431Z",
} as const satisfies Initiative
