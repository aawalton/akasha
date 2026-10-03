import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const emberdeep0004TheWarmPools = {
  id: "01a0fe70-ebea-7333-a55e-a8f950c9bda6",
  type: "page-type/story-chapter-written",
  slug: "emberdeep-0004-the-warm-pools",
  cover: "image/image-a945aea509f864e0",
  position: 4,
  unit: "unit/words",
  title: "The Warm Pools",
  story: "story-written/emberdeep",
  ownLength: 4081,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  issues: [
    '"a dark soft shadow between her thighs" - Emberdeep Explicitness',
    '"your belly, between your legs" - Emberdeep Explicitness',
    '"Twelve copper pennies, the whole of yesterday" - only eight were earned Sixthday; four were older',
  ],
  lore: [
    "lore/emberdeep-elowen",
    "lore/emberdeep-nala",
    "lore/emberdeep-wren",
    "place/emberdeep-corbel-house",
    "place/emberdeep-town",
  ],
  characters: [
    "character-player/emberdeep-nala",
    "character-other/emberdeep-wren",
    "character-other/emberdeep-elowen",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/mechanics",
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  scenes: [
    "image/image-a945aea509f864e0",
    "image/image-4c5acb54e3f8f507",
    "image/image-3dc0b7da37cdc548",
    "image/image-6a85df03cfb11da9",
  ],
  pictured: [
    {
      cover: "image/image-a945aea509f864e0",
      coverAfter:
        "They're shelves in the mountainside, one above another, like steps: wide hollows in",
      setting: "the Warm Pools",
    },
    {
      cover: "image/image-4c5acb54e3f8f507",
      coverAfter: "Wren doesn't stop. She pulls her shirt off over her head on the way",
      character: "character-other/emberdeep-wren",
      outfit: "naked",
    },
    {
      cover: "image/image-3dc0b7da37cdc548",
      coverAfter: "Elowen undresses slowly. She turns her back half to you and the pools, and",
      character: "character-other/emberdeep-elowen",
      outfit: "naked",
    },
    {
      cover: "image/image-6a85df03cfb11da9",
      coverAfter: "Then you turn round, both of you in your nightshirts, and stand there, and",
      character: "character-other/emberdeep-elowen",
      outfit: "linen nightshirt",
    },
  ],
} as const satisfies StoryChapterWritten
