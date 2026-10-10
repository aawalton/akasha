import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rhiaTwiPlot = {
  id: "01a126c6-4f53-7b35-8a65-0a9788cd9b9a",
  type: "page-type/initiative",
  slug: "rhia-twi-plot",
  domain: "domain/world-lore",
  persona: "persona/rhia",
  parent: "initiative/rhia-twi-analysis-book",
  intentStack: [
    {
      statement:
        "The book says how the plot of The Wandering Inn is more complex, novel and consistent than A tier.",
    },
  ],
  constraints: ["Alan places the plots of The Wandering Inn and Sanderson's works at S tier."],
  createdAt: "2026-10-10T17:04:53.074Z",
  updatedAt: "2026-10-10T17:04:53.074Z",
} as const satisfies Initiative
