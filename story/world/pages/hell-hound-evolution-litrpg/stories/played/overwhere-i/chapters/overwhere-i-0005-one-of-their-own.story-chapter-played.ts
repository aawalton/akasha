import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const overwhereI0005OneOfTheirOwn = {
  id: "01a0f257-2024-7fe6-9f32-c290edc4f441",
  type: "page-type/story-chapter-played",
  slug: "overwhere-i-0005-one-of-their-own",
  position: 5,
  unit: "unit/words",
  title: "One of Their Own",
  story: "story-played/overwhere-i",
  ownLength: 192,
  prose: "txt",
  beats: "jsonl",
  turnCovers: [
    {
      position: 25,
      cover: "image/image-ec1d7139589b042b",
      coverAfter: "In the back room the wooden tub steams. You peel off your",
    },
  ],
  lastTurn: "overwhere-i-00-025",
  lastTurnPosition: 25,
  endsAt: "2026-09-30T09:09:00.000Z",
} as const satisfies StoryChapterPlayed
