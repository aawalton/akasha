import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereV00004 = {
  id: "01a0ea12-2400-791a-86c2-adbfe667b19c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-v-00-004",
  ownLength: 291,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-v"],
  position: 4,
  prose: "txt",
  characters: ["character-player/otherwhere-v-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "I quietly make my way back to the hollow trunk and crawl inside, hoping the narrow passage and smell of decay will hide me from threats.",
  beats: [
    "Nala turns from the clawed trunk and makes her way quietly toward the fallen log.",
    "The log's mouth is eighty yards off, down and across the hollow, out of sight in the black.",
    "She goes by feel: waist-high ferns, moss, roots, the hard edges of shed bark scales underfoot.",
    "She sets each bare foot down slowly and keeps her breath quiet.",
    "The drifting green specks give no light to walk by, only points to steer between.",
    "Her mouth is dry; she has drunk nothing since she landed.",
    "Around her the ferns tick and click as she passes.",
    "About halfway to the log, the ticking behind her stops.",
    "It stops in a patch, and the patch of silence is moving.",
    "It is closing in behind her, low in the ferns, coming on faster than she walks.",
    "She understands it: something large is moving under the ferns, toward her back.",
    "Ahead, the log's mouth is still some forty yards off in the dark.",
  ],
  lore: ["place/otherwhere-v-fern-hollow", "lore/otherwhere-v-gloamcat"],
  endsAt: "2026-09-28T19:01:00.000Z",
} as const satisfies StoryTurnPlayed
