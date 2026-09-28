import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00046 = {
  id: "01a0e58e-7c63-7e09-9c63-e11698269515",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-046",
  ownLength: 103,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 46,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/reviewers",
  action:
    "“Not enough, eh? I guess I’m sleeping here tonight, try again in the morning.” I close my eyes and fall asleep.",
  beats: [
    "Nala tells Links she'll sleep right here and try again in the morning, and closes her eyes.",
    "She sleeps where she lies, in the scatter of salt from the burst sack.",
    "The Library dims its lights to low amber for the night.",
    "The worm keeps clear of the salt, but it is restless: now and then it roars from the gloom.",
    "Each roar half wakes her; each time she drifts off again.",
    "Morning: the lights brighten; she wakes stiff and sticky but whole, the bite knitted to a scar.",
    "Far back in the gloom, the worm is chewing again.",
  ],
  lore: ["place/otherwhere-hall-back"],
  reviewedBy: ["story-reviewer/style"],
} as const satisfies StoryTurnPlayed
