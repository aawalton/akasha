import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00055 = {
  id: "01a0f461-9c03-7f53-8367-a325a4321807",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-055",
  cover: "image/image-e39d09b275fe8019",
  coverAfter: "You brush the dirt away: two pieces of pale blue crystal, each",
  ownLength: 78,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 55,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "I use an earth attunement to pull out the hard knots, curious to see what they might be.",
  beats: [
    "Nala kneels by the drowned pine and reaches into the root-bound soil with an earth working.",
    "The soil loosens around the two cold knots and draws them up to the surface between the roots.",
    "She brushes the dirt away: two pieces of pale blue crystal, each about a thumb-joint long.",
    "They are cold to hold, and in the shade of the roots they glow faintly.",
    "Held in her palm, each one hums faintly against the mana inside her.",
  ],
  issues: ['"from drowned pine roots" - What It Is'],
  lore: [
    "lore/overwhere-i-fenwatch-2",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-western-march",
    "place/overwhere-i-fenwatch",
    "place/overwhere-i-the-greyfen",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-01T13:57:00.000Z",
} as const satisfies StoryTurnPlayed
