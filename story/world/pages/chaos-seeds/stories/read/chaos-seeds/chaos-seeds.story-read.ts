import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const chaosSeeds = {
  id: "01a0657d-ada7-7480-9cc1-ea6f4ce3d95a",
  type: "page-type/story-read",
  slug: "chaos-seeds",
  title: "Chaos Seeds",
  world: "world/chaos-seeds",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074C4RFZN",
      externalLink: "https://www.amazon.com/dp/B074C4RFZN",
    },
  ],
  rank: "C",
  tags: ["Civilization Building", "Isekai"],
  unit: "unit/words",
} as const satisfies StoryRead
