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
  rank: "C",
  tags: ["Slice-Of-Life"],
  unit: "unit/words",
} as const satisfies StoryRead
