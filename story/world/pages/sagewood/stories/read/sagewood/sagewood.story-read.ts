import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const sagewood = {
  id: "01a0657d-ada7-7742-8710-6a8c5d7695f9",
  type: "page-type/story-read",
  slug: "sagewood",
  title: "Sagewood",
  world: "world/sagewood",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D5J7G9ZN",
      externalLink: "https://www.amazon.com/dp/B0D5J7G9ZN",
    },
  ],
  grade: "C",
  tags: ["Slice-Of-Life"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
