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
  grade: "C",
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
