import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00037 = {
  id: "01a0e547-bdee-718f-b205-dbb170a5e61e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-037",
  cover: "image/image-324654993e050fc5",
  ownLength: 168,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 37,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/player",
  action:
    "I go fund the librarian’s quarters, strip out of my bloodied clothes and do my best to clean up in the cold water, then collapse into the bed, naked and exhausted.",
  beats: [
    "Nala finds the short passage behind the Check-in Counter; the quarters are a snug panelled room.",
    "She peels off her bloodied shirt and the rest of her clothes and leaves them in a heap.",
    "In the bathroom she scrubs off the blood and grime with the cold tap water, shivering.",
    "The bite on her arm stings in the cold water, but it is clean at last.",
    "She drags the dust sheet off the bed; underneath it is clean, soft and wide.",
    "She collapses into it naked and exhausted, and is asleep almost at once.",
    "The Library dims its lights to a low amber for the night; nothing disturbs her.",
    "Morning: the lights brighten; she wakes rested and strong, the bite knitted to a tender pink scar.",
    "The smell of fresh bread drifts in from somewhere beyond the hall.",
  ],
  lore: ["place/otherwhere-main-hall", "lore/otherwhere-universe"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture", "story-recorder/memory"],
} as const satisfies StoryTurnPlayed
