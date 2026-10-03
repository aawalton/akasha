import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00085 = {
  id: "01a0ff74-0d99-76cb-b9ad-8e79768b93ad",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-085",
  cover: "image/image-4b13673d2b04b694",
  ownLength: 128,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 85,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-edda-crane",
    "character-other/overwhere-iii-mother-sallow",
    "character-other/overwhere-iii-marda-hesk",
  ],
  stepStatus: "step-status/player",
  action:
    "“Whose house was that and how long have you known them? There was a woman there who commanded the wolves, but she was corrupted. When I confronted her, her face changed.”",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-iii-edda-crane",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-marda-hesk-2",
    "lore/overwhere-iii-mother-sallow",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-08T16:40:00.000Z",
  coverAfter: 'She stares down the road toward the wood. "A false face. Gods."',
} as const satisfies StoryTurnPlayed
