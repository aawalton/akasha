import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00114 = {
  id: "01a101ce-21f1-7370-816e-5624f1a6de9c",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-114",
  cover: "image/image-2605c7f4cf4617f2",
  ownLength: 344,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 114,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-harl-voss"],
  stepStatus: "step-status/player",
  action: "I hand it over, then travel back to town and turn in the fangs for the bounty",
  beats: "jsonl",
  issues: ['"What now, Nala Arthur?" - No Prompt'],
  lore: [
    "lore/overwhere-i-hobbs-mill-weir-2",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-wendlow-2",
    "lore/overwhere-i-wendlow-3",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/inventory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-06T14:37:00.000Z",
  coverAfter: "At Antler Hall you unwrap the cloth on the counter, and the two fangs",
} as const satisfies StoryTurnPlayed
