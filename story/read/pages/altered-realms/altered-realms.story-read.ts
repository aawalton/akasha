import type { StoryRead } from "akasha/story/read/story-read.page-type.types.ts"

export const alteredRealms = {
  id: "01a0657d-ada7-7657-b89e-760551fc179d",
  type: "story-read",
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
  rank: "D",
  tags: ["VRMMO"],
  unit: "unit/words",
} as const satisfies StoryRead
