import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rhiaTwiAnalysisBook = {
  id: "01a126b1-eaf4-711f-a33b-137d06b7e97d",
  type: "page-type/initiative",
  slug: "rhia-twi-analysis-book",
  domain: "domain/world-lore",
  persona: "persona/rhia",
  intentStack: [
    {
      statement:
        "A book for agents says why and how The Wandering Inn reaches a tier above other fiction.",
    },
  ],
  constraints: [
    "The book prepares agents to write fiction at that tier, starting with fan fiction of The Wandering Inn.",
    "The initiative builds understanding and writes no fiction.",
    "The Lord of the Rings and the Cosmere are the other works Alan places at that tier.",
    "At most 20 agents run at once.",
    "Alan's aspects are starting hypotheses the book tests against the text.",
    "Alan approves any aspect removed, changed in a major way, or added.",
    "Alan judges the book through agent critique and his conversations with Rhia about it.",
    "Judging the fiction that agents write from the book is outside this initiative.",
  ],
  createdAt: "2026-10-10T16:42:36.659Z",
  updatedAt: "2026-10-10T17:00:47.749Z",
} as const satisfies Initiative
