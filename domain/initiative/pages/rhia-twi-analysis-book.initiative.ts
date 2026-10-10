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
    "The first fan fiction expands within the frame pirateaba set, telling stories she referenced but did not fully tell.",
    "The initiative builds understanding and writes no fiction.",
    "The Lord of the Rings and the Cosmere are the other works Alan places at that tier.",
    "At most 20 agents run at once.",
    "Alan's aspects are starting hypotheses the book tests against the text.",
    "Alan approves any aspect removed, changed in a major way, or added.",
    "Alan judges the book through agent critique and his conversations with Rhia about it.",
    "Judging the fiction that agents write from the book is outside this initiative.",
    "Alan rates as A tier: The Millennial Mage, The Primal Hunter, Path of Ascension, He Who Fights With Monsters, Metaworld Hopecore, How To Magic, Rise of The Living Forge.",
    "Alan rates as A tier: Beware of Chicken, Ends of Magic, Mark of the Fool, Dungeon of Knowledge, Azarinth Healer, The Calamitous Bob, Beneath The Dragoneye Moons.",
    "An A-tier work may be S tier or B tier on one aspect while A tier taken whole.",
    "Alan finds nearly every chapter and arc of The Wandering Inn S tier, rather than a few peaks.",
  ],
  createdAt: "2026-10-10T16:42:36.659Z",
  updatedAt: "2026-10-10T17:06:55.774Z",
} as const satisfies Initiative
