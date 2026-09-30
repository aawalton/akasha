import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00042 = {
  id: "01a0f415-b698-77ff-9653-492ddaba6d28",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-042",
  ownLength: 102,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 42,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-hild-wendle",
    "character-other/overwhere-iii-brannagh-tull",
  ],
  stepStatus: "step-status/recorders",
  action:
    "“I’m sorry for the scar, but that’s the best I can do with the mana I have. If you catch me tomorrow, I may be able to do a bit better, free of charge.”",
  beats: [
    '"I\'m sorry for the scar," Nala tells Hild. "That\'s the best I can do with the mana I have."',
    '"If you catch me tomorrow, I may be able to do a bit better. Free of charge."',
    "Hild flaps a hand. \"A scar's nothing, love. Nothing! I've worse off the wagon brake.\"",
    'Then, quickly: "But I\'ll come at noon. Here. I will."',
    "Her husband, gruff and red in the face, clears his throat.",
    '"Anywhere on the north road, you want a wagon ride, it\'s yours. For the asking."',
    'Brannagh nods slowly at the free mending. "Kindness now fills my bench later."',
  ],
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-hild-wendle",
    "lore/overwhere-iii-mending-weave",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory"],
  endsAt: "2026-10-01T17:48:00.000Z",
} as const satisfies StoryTurnPlayed
