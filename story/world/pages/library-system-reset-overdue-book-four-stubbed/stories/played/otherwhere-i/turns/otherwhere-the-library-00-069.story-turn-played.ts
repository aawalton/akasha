import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereTheLibrary00069 = {
  id: "01a0e843-ed51-7a30-89b1-ffc79de768d2",
  type: "page-type/story-turn-played",
  slug: "otherwhere-the-library-00-069",
  cover: "image/image-0ccf7583c28e22d1",
  ownLength: 89,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-i"],
  position: 69,
  prose: "txt",
  characters: ["character-player/otherwhere-i-alan", "character-other/otherwhere-i-links"],
  stepStatus: "step-status/player",
  action: "**Links, how long until the main floor is cleared at this rate?**",
  beats: [
    "Nala asks Links, silently, how long the golems will take to clear the main level at this pace.",
    "Links answers in her head: some 2,880 loose books still lie across the hall.",
    '"Each shelver does about thirty an hour, a book every two minutes, as you do with Shelf Sight."',
    "\"They don't tire and they don't sleep. Sixty an hour between them, day and night: about two days.\"",
    "By the Counter, the first golem's arm folds back down, empty, and it stoops for the next book.",
  ],
  lore: ["lore/otherwhere-i-golems"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-29T06:36:00.000Z",
} as const satisfies StoryTurnPlayed
