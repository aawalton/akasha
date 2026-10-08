import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const somniaOnline = {
  id: "01a0657d-ada7-74c1-b812-9efb8f243801",
  type: "page-type/story-read",
  slug: "somnia-online",
  title: "Somnia Online",
  world: "world/somnia-online",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07GVDX3G8",
      externalLink: "https://www.amazon.com/dp/B07GVDX3G8",
    },
  ],
  tags: ["VRMMO"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-19T12:03:55.000Z",
} as const satisfies StoryRead
