import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const hollowmere0006SixtyTwoPounds = {
  id: "01a0fdf3-2a3b-70df-85ff-abe7cbd20b6b",
  type: "page-type/story-chapter-written",
  slug: "hollowmere-0006-sixty-two-pounds",
  cover: "image/image-4898630145bcfb65",
  completedAt: "2026-10-02T20:10:09.005Z",
  ownProgress: 4401,
  position: 6,
  unit: "unit/words",
  title: "Sixty-Two Pounds",
  story: "story-written/hollowmere",
  ownLength: 4401,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  issues: [
    '"A twenty, two tens, a five... another twenty" - sums to £65 plus coins, not sixty-two pounds',
  ],
  lore: [
    "lore/hollowmere-amara",
    "lore/hollowmere-bea",
    "lore/hollowmere-kit",
    "lore/hollowmere-lin",
    "lore/hollowmere-nala",
    "lore/hollowmere-priya",
    "place/hollowmere-academy",
    "place/hollowmere-kendal",
  ],
  characters: [
    "character-player/hollowmere-nala",
    "character-other/hollowmere-bea",
    "character-other/hollowmere-lin",
    "character-other/hollowmere-priya",
    "character-other/hollowmere-kit",
    "character-other/hollowmere-amara",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/mechanics",
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  scenes: [
    "image/image-a63df48a4dcb0612",
    "image/image-fa249f9a14aa3479",
    "image/image-51762549d74dd4a1",
    "image/image-8f70a45ff2ebfd52",
    "image/image-4898630145bcfb65",
    "image/image-96949eef3cbe20b8",
    "image/image-bc0efd2744326868",
    "image/image-e132a1bc4cd5a4c0",
  ],
  pictured: [
    {
      cover: "image/image-a63df48a4dcb0612",
      coverAfter:
        "You and Bea get plates piled high and sit down near the window, and you've barely",
      character: "character-other/hollowmere-lin",
      outfit: "soft grey jumper",
    },
    {
      cover: "image/image-fa249f9a14aa3479",
      coverAfter:
        "Then Priya arrives, in a pinafore the colour of a tangerine, with her curly hair",
      character: "character-other/hollowmere-priya",
      outfit: "tangerine pinafore over a striped long-sleeved top",
    },
    {
      cover: "image/image-51762549d74dd4a1",
      coverAfter: "The bus to Kendal goes from the village, and it's packed with Hollowmere girls.",
      setting: "the Kendal bus",
    },
    {
      cover: "image/image-8f70a45ff2ebfd52",
      coverAfter:
        "Kendal is grey stone. Grey stone houses, grey stone churches, grey stone walls and",
      setting: "the Kendal market square",
    },
    {
      cover: "image/image-4898630145bcfb65",
      coverAfter: "Off the square, down a narrow side street, there's a shop with a bow window",
      setting: "F. Harrowby & Daughters",
    },
    {
      cover: "image/image-96949eef3cbe20b8",
      coverAfter: "The bookshop has a café upstairs, and Bea leads the way.",
      setting: "the bookshop café",
    },
    {
      cover: "image/image-bc0efd2744326868",
      coverAfter: "The afternoon goes slow and golden. You wander, the four of you, and then,",
      setting: "the stone bridge over the river",
    },
    {
      cover: "image/image-e132a1bc4cd5a4c0",
      coverAfter: "The cinema is small and old and smells of popcorn and dust.",
      setting: "the cinema",
    },
  ],
} as const satisfies StoryChapterWritten
