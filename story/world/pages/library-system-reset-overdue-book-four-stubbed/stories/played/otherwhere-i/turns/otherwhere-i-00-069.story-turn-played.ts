import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereI00069 = {
  id: "01a0e843-ed51-7a30-89b1-ffc79de768d2",
  type: "page-type/story-turn-played",
  slug: "otherwhere-i-00-069",
  cover: "image/image-f7e64c8a81fd7597",
  coverAfter: "By the Counter, the first golem's arm folds back down, empty, and",
  ownLength: 89,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-i"],
  position: 69,
  prose: "txt",
  characters: ["character-player/otherwhere-i-alan", "character-other/otherwhere-i-links"],
  stepStatus: "step-status/player",
  action: "**Links, how long until the main floor is cleared at this rate?**",
  beats: "jsonl",
  lore: ["lore/otherwhere-i-golems"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-29T06:36:00.000Z",
} as const satisfies StoryTurnPlayed
