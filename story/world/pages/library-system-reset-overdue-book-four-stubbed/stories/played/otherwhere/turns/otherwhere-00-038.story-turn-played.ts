import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00038 = {
  id: "01a0e553-e3f4-7552-8ab9-1bf5b1457204",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-038",
  ownLength: 97,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 38,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/recorders",
  action:
    "I check the wardrobe to see what is available after several hundred years without a librarian.",
  beats: [
    "Nala opens the wardrobe; a smell of cedar comes out, not the dust she expected.",
    "Inside hang three robes of deep blue wool, whole and unmothed after all the centuries.",
    "They are plainly cut for someone taller; on her they would be long, but wearable.",
    "At the wardrobe's foot sit a pair of soft felt slippers.",
    "Beside them lies a leather belt with a drawstring pouch hung from it.",
    "Her own clothes still lie in their bloodied heap; the smell of fresh bread drifts in.",
  ],
  lore: ["place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
} as const satisfies StoryTurnPlayed
