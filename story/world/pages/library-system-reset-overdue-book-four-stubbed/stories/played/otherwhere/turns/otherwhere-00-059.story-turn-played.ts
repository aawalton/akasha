import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00059 = {
  id: "01a0e7ef-37ac-797b-9847-eb6a916664ba",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-059",
  cover: "image/image-e70c43c6c7c408fd",
  ownLength: 84,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 59,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/player",
  action: "**Okay, that pile is done, what's next?**",
  beats: [
    "Nala aims a thought at Links: that pile's done; what's next?",
    "Before he can answer, a low hum rises up through the hall from the core below.",
    "A window opens in her sight: Synchronization Requested. Proceed to the core.",
    'Links: "Ah. That. The Library\'s been waiting for you to earn another one."',
    'Links: "Go down and sync, and it\'ll show you what it wants from you next. Tasks, in its own words."',
    'Links: "Or ignore it and keep shelving. It will keep asking."',
  ],
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture", "story-recorder/memory"],
} as const satisfies StoryTurnPlayed
