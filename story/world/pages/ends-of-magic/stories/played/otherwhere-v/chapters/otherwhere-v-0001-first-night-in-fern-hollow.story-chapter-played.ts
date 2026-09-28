import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const otherwhereV0001FirstNightInFernHollow = {
  id: "01a0ea3f-79a3-7877-92df-50cd48801dbe",
  type: "page-type/story-chapter-played",
  slug: "otherwhere-v-0001-first-night-in-fern-hollow",
  position: 1,
  unit: "unit/words",
  title: "First Night in Fern Hollow",
  story: "story-played/otherwhere-v",
  ownLength: 2603,
  prose: "txt",
  turnCovers: [
    { position: 1, cover: "image/image-8d0921372a03a72e" },
    { position: 2, cover: "image/image-a24fce681acae75e" },
    { position: 3, cover: "image/image-ca85394048dd2338" },
    { position: 4, cover: "image/image-6e25baffd6a1f965" },
    { position: 5, cover: "image/image-63641e8c29b449ba" },
    { position: 6, cover: "image/image-0032478a86c9dd9f" },
  ],
  lastTurn: "otherwhere-v-00-006",
  lastTurnPosition: 6,
  endsAt: "2026-09-28T19:10:00.000Z",
} as const satisfies StoryChapterPlayed
