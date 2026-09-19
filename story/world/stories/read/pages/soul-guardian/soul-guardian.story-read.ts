import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const soulGuardian = {
  id: "01a0657d-ada7-79c0-bb79-a63c1d270335",
  type: "page-type/story-read",
  slug: "soul-guardian",
  title: "Soul Guardian",
  world: "world/soul-guardian",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DTGF4TKM",
      externalLink: "https://www.amazon.com/dp/B0DTGF4TKM",
    },
  ],
  rank: "B",
  following: true,
  tags: ["Slice-Of-Life"],
  unit: "unit/words",
} as const satisfies StoryRead
