import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00118 = {
  id: "01a106ee-01b5-7570-a91f-d65047d0e9fa",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-118",
  cover: "image/image-4ccf046de5c5b3f8",
  ownLength: 230,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 118,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“Only you and Grete as far as I’m aware. I figured with the seal it must be something someone cared about, but it’s not something I can hunt, so I never bothered to look inside.”",
  beats: "jsonl",
  issues: "txt",
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-odile-varne"],
  reviewedBy: ["story-reviewer/holdings", "story-reviewer/continuity", "story-reviewer/scene"],
  recordedBy: [
    "story-recorder/plan",
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T12:20:00.000Z",
  coverAfter: "She draws a clean sheet toward her, wets her pen, and holds it",
} as const satisfies StoryTurnPlayed
