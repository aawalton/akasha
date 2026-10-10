import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rhiaTwiProse = {
  id: "01a126c0-c7d7-78c0-a06c-8143ddad23a6",
  type: "page-type/initiative",
  slug: "rhia-twi-prose",
  domain: "domain/world-lore",
  persona: "persona/rhia",
  parent: "initiative/rhia-twi-analysis-book",
  intentStack: [
    {
      statement:
        "The book says what prose craft The Wandering Inn holds as table stakes for its tier.",
    },
  ],
  constraints: [
    "Alan rates the prose of all three works A tier, and the early chapters of The Wandering Inn weaker.",
    "Alan sees prose as table stakes rather than what sets the three works apart.",
    "Alan favors window-pane prose, which puts attention on the substance of a story rather than its style.",
  ],
  createdAt: "2026-10-10T16:58:50.711Z",
  updatedAt: "2026-10-10T16:58:50.711Z",
} as const satisfies Initiative
