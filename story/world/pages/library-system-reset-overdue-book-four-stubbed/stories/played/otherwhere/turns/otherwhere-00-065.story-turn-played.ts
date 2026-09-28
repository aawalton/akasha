import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00065 = {
  id: "01a0e81f-eacb-780f-9733-f45c4e027ae8",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-065",
  ownLength: 152,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 65,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/reviewers",
  action: "I go back to the basement and sync with the core again.",
  beats: [
    "Nala winds down the spiral staircase into the round chamber, the amber light fading behind her.",
    "She crosses to the trunk and lays her palms on the two pulsing knots of light.",
    "The burn runs up her arms and through her veins, and the chamber drops away.",
    "She sees the main hall long ago, every shelf full, lamps lit gold, in one quiet night.",
    "Then books tear from the shelves by the hundred and scatter, and no hand she can see throws them.",
    "The vision thins; she is back at the trunk, arms tingling, breath ragged, unhurt.",
    "A window opens: Synchronization Complete.",
    "A second window unfolds beside the tasks, new to her: a map of the Library.",
    "Rooms with power glow lit on it: the main hall, the kitchen, the quarters, the core below.",
    "The rest lies dark, the hospital wing among it.",
  ],
  lore: ["lore/otherwhere-universe"],
  reviewedBy: ["story-reviewer/style"],
} as const satisfies StoryTurnPlayed
