import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const guardianOfAsterFall = {
  id: "01a0657d-ada7-7b3c-945d-18b61143e3a7",
  type: "page-type/story-read",
  slug: "guardian-of-aster-fall",
  title: "Guardian of Aster Fall",
  world: "world/guardian-of-aster-fall",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09HJCYHT3",
      externalLink: "https://www.amazon.com/dp/B09HJCYHT3",
    },
  ],
  grade: "C",
  tags: ["Crafting", "Dungeon Delver"],
  unit: "unit/words",
  createdAt: "2026-09-03T04:18:50.407Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies StoryRead
