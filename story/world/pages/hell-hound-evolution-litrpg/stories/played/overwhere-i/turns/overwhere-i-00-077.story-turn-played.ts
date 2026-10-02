import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00077 = {
  id: "01a0fd9f-4a47-73e7-b01e-289822865179",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-077",
  ownLength: 141,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 77,
  prose: "txt",
  characters: [
    "character-player/overwhere-i-nala",
    "character-other/overwhere-i-quarry-crewman-one",
    "character-other/overwhere-i-quarry-crewman-two",
  ],
  stepStatus: "step-status/game-master",
  action: "I circle around, as quietly as I can, trying to get eyes on any of the bandits.",
  beats: [
    "Nala slips back from her boulders and circles east through the pines, light on her hurt leg.",
    "She picks her way over loose stone without a sound.",
    "At the top of the goat path she finds boot prints of four men running north into the pines.",
    "She works along the east rim to the back wall, above the galleries.",
    "The back wall holds four gallery mouths, each cut about ten yards into the rock.",
    "From the rim, fifteen yards off and above, she can see into the easternmost gallery.",
    "Behind a heap of spoil, a burned blademan sits against the wall, his sword across his knees.",
    "Beside him the other burned blademan lies moaning.",
    "Neither has heard her; the sitting man keeps his sword in hand, his eyes on the pit floor.",
  ],
  issues: ['"Neither of them looks up." - Nobody Acts'],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-the-deserter-crew-2",
    "place/overwhere-i-greyback-and-east-road",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  endsAt: "2026-10-03T15:14:00.000Z",
} as const satisfies StoryTurnPlayed
