import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00005 = {
  id: "01a0eaab-0901-7e4f-949a-c93a534a11fd",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-005",
  cover: "image/image-b4fb826c20d0488f",
  coverAfter: "Beside the door, on its post, the bell starts to ring. Slow",
  ownLength: 220,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 5,
  prose: "txt",
  characters: ["character-player/otherwhere-x-nala", "world-character/otherwhere-x-aldous-crane"],
  stepStatus: "step-status/player",
  action:
    '"None of these. I am from a place so far away that there are no reeve\'s, no tallies, and the roads are made from liquid stone."',
  beats: "jsonl",
  issues: [
    '"steps down onto the doorstone" - Aldous settles hard things indoors, not before the green',
    '"Will you go quiet to the Sheaf and wait for the patrol?" - No Prompt',
  ],
  lore: ["lore/otherwhere-x-aldous-crane", "place/otherwhere-x-harrow"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T18:41:00.000Z",
} as const satisfies StoryTurnPlayed
