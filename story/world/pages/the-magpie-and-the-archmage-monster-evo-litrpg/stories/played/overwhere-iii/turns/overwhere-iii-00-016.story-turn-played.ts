import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00016 = {
  id: "01a0f1ef-3a42-715d-8311-cd4705080ce1",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-016",
  ownLength: 151,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 16,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala"],
  stepStatus: "step-status/game-master",
  action:
    "I finish harvesting the four in this cluster, then follow the currents to find two more to finish off.",
  beats: [
    "Nala walks back along the edge path to the old beech and the dead rabbit.",
    "She kneels at the root and cuts the four whole frostcaps free, one by one, clean at the root.",
    "Eighteen, wrapped in the front of her shirt.",
    "A blue current runs on west from the old beech, and she follows it.",
    "The frost is thinning in the sun now, melting to dark wet patches between the roots.",
    "A quarter hour along, the current brushes the roots of a beech split down the middle by lightning.",
    "On its north side, in the last of the frost, four pale mushrooms stand in a huddle.",
    "Three hold a faint cold glow. The fourth holds none, and it smells of wet ash.",
    "She cuts two of the glowing ones at the root and leaves the rest.",
    "Twenty frostcaps, all whole, wrapped in her shirt against the cold.",
  ],
  issues: [
    '"wrapped in the front of her shirt" - What It Is',
    '"Twenty frostcaps, every one whole, wrapped in your shirt" - Leave It Open',
  ],
  lore: ["lore/overwhere-iii-nala", "place/overwhere-iii-wrenwood"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  endsAt: "2026-09-30T10:23:00.000Z",
} as const satisfies StoryTurnPlayed
