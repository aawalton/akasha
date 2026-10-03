import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00005 = {
  id: "01a0ea5a-e0a1-7012-89f2-f7e31c49b8c6",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-005",
  cover: "image/image-0bb69d259549550b",
  coverAfter: "Glass drives into your forearms and the soft insides of your arms.",
  ownLength: 201,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 5,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action:
    '"Well, you might want to hurry up then Firrelia!" I grunt as I try to tackle the beast and choke it.',
  beats: "jsonl",
  lore: ["lore/otherwhere-ix-shardback"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T15:36:00.000Z",
} as const satisfies StoryTurnPlayed
