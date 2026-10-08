import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const earthenContenders = {
  id: "01a0657d-ada7-7641-8425-09cf3f2ddd39",
  type: "page-type/story-read",
  slug: "earthen-contenders",
  title: "Earthen Contenders",
  world: "world/earthen-contenders",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CV85WPH7",
      externalLink: "https://www.amazon.com/dp/B0CV85WPH7",
    },
  ],
  grade: "C",
  following: true,
  tags: ["System Apocalypse"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
