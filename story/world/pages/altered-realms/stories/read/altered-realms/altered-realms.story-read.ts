import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const alteredRealms = {
  id: "01a0657d-ada7-7657-b89e-760551fc179d",
  type: "page-type/story-read",
  slug: "altered-realms",
  title: "Altered Realms",
  world: "world/altered-realms",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0881H29XP",
      externalLink: "https://www.amazon.com/dp/B0881H29XP",
    },
  ],
  grade: "D",
  tags: ["VRMMO"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
