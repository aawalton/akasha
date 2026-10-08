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
  grade: "B",
  tags: ["System Apocalypse"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
