import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rhiaTwiDensity = {
  id: "01a126c0-5447-7cf7-b0b9-7ea244d1dc16",
  type: "page-type/initiative",
  slug: "rhia-twi-density",
  domain: "domain/world-lore",
  persona: "persona/rhia",
  parent: "initiative/rhia-twi-analysis-book",
  intentStack: [
    {
      statement:
        "The book says how each chapter of The Wandering Inn does several narrative jobs at once.",
    },
  ],
  constraints: [
    "Alan sees each chapter advance setting, characters and plot together, as Sanderson's chapters do.",
  ],
  createdAt: "2026-10-10T16:58:21.126Z",
  updatedAt: "2026-10-10T16:58:21.126Z",
} as const satisfies Initiative
