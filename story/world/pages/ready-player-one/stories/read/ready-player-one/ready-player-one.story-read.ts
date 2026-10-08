import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const readyPlayerOne = {
  id: "01a0657d-ada7-75e3-b5b5-19088b5dc940",
  type: "page-type/story-read",
  slug: "ready-player-one",
  title: "Ready Player One",
  world: "world/ready-player-one",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B083977FTN",
      externalLink: "https://www.amazon.com/dp/B083977FTN",
    },
  ],
  grade: "C",
  tags: ["VRMMO"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
