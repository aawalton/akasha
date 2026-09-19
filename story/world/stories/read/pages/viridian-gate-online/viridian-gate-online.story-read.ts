import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const viridianGateOnline = {
  id: "01a0657d-ada7-7bd7-aecf-b0083773f56b",
  type: "page-type/story-read",
  slug: "viridian-gate-online",
  title: "Viridian Gate Online",
  world: "world/viridian-gate-online",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0753JVZSM",
      externalLink: "https://www.amazon.com/dp/B0753JVZSM",
    },
  ],
  rank: "B",
  tags: ["VRMMO"],
  unit: "unit/words",
} as const satisfies StoryRead
