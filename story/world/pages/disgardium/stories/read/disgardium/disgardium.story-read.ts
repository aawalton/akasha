import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const disgardium = {
  id: "01a0657d-ada7-78a6-bab6-e43c7a8999e1",
  type: "page-type/story-read",
  slug: "disgardium",
  title: "Disgardium",
  world: "world/disgardium",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07Q6M246J",
      externalLink: "https://www.amazon.com/dp/B07Q6M246J",
    },
  ],
  grade: "B",
  tags: ["VRMMO"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
