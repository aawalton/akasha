import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00031 = {
  id: "01a0f392-e321-70da-bdfe-a39eefee1669",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-031",
  cover: "image/image-240ef556bed23f4f",
  ownLength: 129,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 31,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-bet-harrow",
    "character-other/overwhere-iii-brannagh-tull",
    "character-other/overwhere-iii-tobin-wick",
  ],
  stepStatus: "step-status/player",
  action:
    "“Did some harvesting for the Post, so I can pay my own way now. I’d happily buy some more clothes if you’re willing to sell cheap.”",
  beats: [
    '"Did some harvesting for the Post," Nala says, "so I can pay my own way now."',
    "\"I'd happily buy some more clothes, if you're willing to sell cheap.\"",
    'Bet laughs, loud enough to turn heads. "Frostcaps, was it? Brannagh\'ll be glad of a steady picker."',
    "She hauls a box out from under the counter and roots through it.",
    "She lays out a wool tunic, a gray hooded cloak, and two pairs of wool stockings.",
    "\"No skirts or trousers your size. The tights you've got under'll serve with the tunic.\"",
    '"Tunic\'s three copper. Cloak five. Stockings a copper a pair."',
    "She looks Nala over again, closer this time, at the gray in her face.",
    '"And you\'ve not eaten, have you. Mutton and onion pie tonight, new bread. Three copper."',
  ],
  lore: [
    "lore/overwhere-iii-bet-harrow",
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-tobin-wick",
    "place/overwhere-iii-crook-and-candle",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/picture",
    "story-recorder/memory",
  ],
  endsAt: "2026-09-30T18:35:00.000Z",
} as const satisfies StoryTurnPlayed
