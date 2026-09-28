import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00068 = {
  id: "01a0e83e-83fb-7207-a6b4-37df704c314c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-068",
  ownLength: 112,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 68,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/recorders",
  action:
    '"You must be the shelving helpers. Go ahead and work on shelving all the unshelved books on the main floor, starting from the counter."',
  beats: [
    "From the passage, Nala greets the two golems as the shelving helpers.",
    "She bids them shelve every loose book on the hall's main level, starting from the Counter.",
    "Neither answers in words; each folds at the waist in a slow, creaking bow.",
    "They turn together and step down to the heaps nearest the Counter, joints ticking.",
    "One stoops, gathers a book in long jointed fingers, and turns it as if reading its spine.",
    "Its arm unfolds, and unfolds again, up past the ladders' reach to a high shelf.",
    "It is slow, careful work; the first book is still rising while the second golem stoops.",
  ],
  lore: ["lore/otherwhere-golems"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
