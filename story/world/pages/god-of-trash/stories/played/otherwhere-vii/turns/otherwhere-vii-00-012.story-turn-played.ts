import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00012 = {
  id: "01a0eaeb-61b3-7536-a194-ee782bbcf88a",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-012",
  cover: "image/image-c12ac7ab1b34d6bf",
  coverAfter: "She reaches into her basket and sets a small pot of grease",
  ownLength: 314,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 12,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vii-nala",
    "character-other/otherwhere-vii-joan-reeve",
    "character-other/otherwhere-vii-hild",
  ],
  stepStatus: "step-status/player",
  action:
    "\"From far enough away you haven't heard the name, and no one's who still walks this earth.\"",
  beats: "jsonl",
  issues: [
    '"a child dies of this fever here most autumns" - the fever takes a child only some years',
  ],
  lore: [
    "lore/otherwhere-vii-hild",
    "lore/otherwhere-vii-joan-reeve",
    "lore/otherwhere-vii-nala",
    "place/otherwhere-vii-ashford",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T12:18:00.000Z",
} as const satisfies StoryTurnPlayed
