import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const overwhereI0001Starfall = {
  id: "01a0f139-8e29-794d-bd51-43e62c999fe5",
  type: "page-type/story-chapter-played",
  slug: "overwhere-i-0001-starfall",
  position: 1,
  unit: "unit/words",
  title: "Starfall",
  story: "story-played/overwhere-i",
  ownLength: 909,
  prose: "txt",
  turnCovers: [
    {
      position: 1,
      cover: "image/image-9f67aa201a67ff7d",
      coverAfter: "Your arms are thin, the wrists narrow, the hands small and pale",
    },
    {
      position: 2,
      cover: "image/image-96d43189f2d1bdb3",
      coverAfter: "A shaggy black beast the size of a small bear shoulders out",
    },
    {
      position: 3,
      cover: "image/image-a4b45c127147a806",
      coverAfter: "Heat pours up your arm. A thin line of white-gold fire leaps",
    },
  ],
  lastTurn: "overwhere-i-00-003",
  lastTurnPosition: 3,
  endsAt: "2026-09-29T10:11:00.000Z",
} as const satisfies StoryChapterPlayed
