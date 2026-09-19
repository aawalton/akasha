import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theSystemApocalypse = {
  id: "01a0657d-ada7-7d4e-8b2f-140d5d8fe5da",
  type: "page-type/story-read",
  slug: "the-system-apocalypse",
  title: "The System Apocalypse",
  world: "world/the-system-apocalypse",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B077LNLSZ7",
      externalLink: "https://www.amazon.com/dp/B077LNLSZ7",
    },
  ],
  rank: "B",
  tags: ["System Apocalypse"],
  unit: "unit/words",
} as const satisfies StoryRead
