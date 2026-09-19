import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theGiftOfLoot = {
  id: "01a0657d-ada5-7bb6-89e4-a83e2e103895",
  type: "page-type/story-read",
  slug: "the-gift-of-loot",
  title: "The Gift of Loot",
  world: "world/the-gift-of-loot",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "160377",
      externalLink: "https://www.royalroad.com/fiction/160377/the-gift-of-loot",
    },
  ],
  author: "Jack_Golightly",
  following: true,
  publicationStatus: "ongoing",
  externalTags: [
    "LitRPG",
    "Progression",
    "Male Lead",
    "Strong Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Apocalypse",
    "Crafting",
    "GameLit",
    "Magic",
    "Survival",
    "System Invasion",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
