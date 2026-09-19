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
  rank: "C",
  tags: ["Crafting", "Dungeon Delver"],
  unit: "unit/words",
} as const satisfies StoryRead
