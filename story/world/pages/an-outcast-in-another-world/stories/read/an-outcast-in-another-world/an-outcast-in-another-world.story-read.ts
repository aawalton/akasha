import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const anOutcastInAnotherWorld = {
  id: "01a0657d-ada7-75bb-a34f-e55053b0c740",
  type: "page-type/story-read",
  slug: "an-outcast-in-another-world",
  title: "An Outcast In Another World",
  world: "world/an-outcast-in-another-world",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09FZ1P41X",
      externalLink: "https://www.amazon.com/dp/B09FZ1P41X",
    },
  ],
  rank: "C",
  unit: "unit/words",
} as const satisfies StoryRead
