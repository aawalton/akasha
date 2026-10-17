import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const blueBoxes00003 = {
  id: "01a14b13-7198-7e6c-ba0e-337e00f11c1b",
  type: "page-type/story-turn-played",
  slug: "blue-boxes-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/blue-boxes"],
  position: 3,
  prose: "txt",
  characters: ["character-player/blue-boxes-nala", "character-other/blue-boxes-iris"],
  stepStatus: "step-status/recorders",
  action:
    "\"Oh. Isekai is the name of a type of story where someone gets transported to another world, often one with game-like mechanics. Since I saw that status page in front of me, I assume that's what happened to me. Either that or I've gone completely insane, and not much I can do about that. Um...but normally the System doesn't talk like a person...\"",
  beats: "jsonl",
  lore: ["lore/blue-boxes-gods-and-the-system", "lore/the-dating-game-iris"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/plan",
    "story-recorder/memory",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T18:15:27.896Z",
  updatedAt: "2026-10-17T18:46:19.932Z",
  ownLength: 192,
  endsAt: "2026-10-17T16:49:00.000Z",
} as const satisfies StoryTurnPlayed
