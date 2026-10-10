import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rhiaTwiSubstance = {
  id: "01a126c0-9836-75bc-8033-377b49953eeb",
  type: "page-type/initiative",
  slug: "rhia-twi-substance",
  domain: "domain/world-lore",
  persona: "persona/rhia",
  parent: "initiative/rhia-twi-analysis-book",
  intentStack: [
    {
      statement: "The book says how The Wandering Inn speaks to real issues without preaching.",
    },
  ],
  constraints: [
    'Alan names the dominant theme of The Wandering Inn as "What is the difference between a person and a monster?"',
    'Alan names Tolkien\'s theme as "Whose choices truly matter?", drawn from his experience of war.',
    'Alan names Sanderson\'s theme as "Why are broken people the ones who truly make a difference?"',
    "Alan sees all three works as taking part in the Great Conversation in Adler's sense.",
    "Alan finds recent seasons of Doctor Who preachy.",
  ],
  createdAt: "2026-10-10T16:58:38.517Z",
  updatedAt: "2026-10-10T16:58:38.517Z",
} as const satisfies Initiative
