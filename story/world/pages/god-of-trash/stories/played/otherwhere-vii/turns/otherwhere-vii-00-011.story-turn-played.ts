import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00011 = {
  id: "01a0eacb-f7cc-757c-9e0a-04b92f1fd814",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-011",
  cover: "image/image-832e74551c3e255c",
  coverAfter: "Hild comes in with a basket on her arm, a bundle of",
  ownLength: 596,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 11,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vii-nala",
    "character-other/otherwhere-vii-aldo-reeve",
    "character-other/otherwhere-vii-tamsin",
    "character-other/otherwhere-vii-joan-reeve",
    "character-other/otherwhere-vii-hild",
  ],
  stepStatus: "step-status/player",
  action:
    "\"Thank you Ma'am, I appreciate your kindness. If there is anything I can do to help while I'm here, I'm eager to learn.\" I pull the dress over my head and put on the clogs.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-vii-aldo-reeve",
    "lore/otherwhere-vii-hild",
    "lore/otherwhere-vii-joan-reeve",
    "lore/otherwhere-vii-language",
    "lore/otherwhere-vii-nala",
    "lore/otherwhere-vii-tamsin",
    "place/otherwhere-vii-ashford",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T12:10:00.000Z",
} as const satisfies StoryTurnPlayed
