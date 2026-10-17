import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const thornford0002TheFirstFitting = {
  id: "01a14bdf-e525-774a-be3b-2e06ab24bc78",
  type: "page-type/story-chapter-played",
  slug: "thornford-0002-the-first-fitting",
  position: 2,
  unit: "unit/words",
  title: "The First Fitting",
  story: "story-played/thornford",
  ownLength: 1014,
  prose: "txt",
  beats: "jsonl",
  turnCovers: [
    { position: 7, cover: "image/image-7d35a27cfefc4e30", coverAfter: "She unpins her cloak." },
    {
      position: 8,
      cover: "image/image-9c18caff5ca63c83",
      coverAfter: '"Dress me, then, seamstress," she says, and holds it out to you.',
    },
    {
      position: 9,
      cover: "image/image-4c71555e8ba172a1",
      coverAfter: "She keeps your hand where it is.",
    },
    {
      position: 10,
      cover: "image/image-a08202f8bbffaea3",
      coverAfter: "She lets go of your hand and slides the tape from around your neck,",
    },
    {
      position: 11,
      cover: "image/image-71bc81ff3c5b6b37",
      coverAfter:
        "Shaestrel slides off the table, gathers it up and drapes it over your shoulders.",
    },
    {
      position: 12,
      cover: "image/image-00b979815bd5704d",
      coverAfter: "She lets the lock slip free, takes your hand from the silk and brings it up,",
    },
  ],
  lastTurn: "thornford-00-012",
  lastTurnPosition: 12,
  endsAt: "2026-04-29T22:33:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-17T21:58:46.821Z",
  updatedAt: "2026-10-17T22:02:36.732Z",
} as const satisfies StoryChapterPlayed
