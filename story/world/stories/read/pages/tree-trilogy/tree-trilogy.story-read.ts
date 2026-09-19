import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const treeTrilogy = {
  id: "01a0657d-ada7-7171-8db8-753e7cf13e71",
  type: "page-type/story-read",
  slug: "tree-trilogy",
  title: "World-Tree Trilogy",
  world: "world/tree-trilogy",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07PGLH5GW",
      externalLink: "https://www.amazon.com/dp/B07PGLH5GW",
    },
  ],
  rank: "C",
  tags: ["VRMMO"],
  unit: "unit/words",
} as const satisfies StoryRead
