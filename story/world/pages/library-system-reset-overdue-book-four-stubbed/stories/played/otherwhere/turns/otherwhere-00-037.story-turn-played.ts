import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00037 = {
  id: "01a0e547-bdee-718f-b205-dbb170a5e61e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-037",
  ownLength: 162,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 37,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/writer",
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
    "Morning: the lights brighten again; she wakes rested and strong, but the bitten arm is still raw.",
    "The smell of fresh bread drifts in from somewhere beyond the hall.",
  ],
  issues: [
    "\"her arm's ache gone\" - arm is torn and mangled, and she has no healing power; one night can't",
  ],
  lore: ["place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
