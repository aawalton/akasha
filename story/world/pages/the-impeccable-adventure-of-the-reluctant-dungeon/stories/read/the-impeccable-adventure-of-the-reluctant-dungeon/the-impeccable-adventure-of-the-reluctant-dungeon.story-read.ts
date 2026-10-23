import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theImpeccableAdventureOfTheReluctantDungeon = {
  id: "01a167bc-5906-7c79-a967-bfae898fd2bd",
  type: "page-type/story-read",
  slug: "the-impeccable-adventure-of-the-reluctant-dungeon",
  author: "Lise Eclaire",
  following: false,
  unit: "unit/words",
  title: "The Impeccable Adventure of the Reluctant Dungeon",
  world: "world/the-impeccable-adventure-of-the-reluctant-dungeon",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "56068",
      externalLink:
        "https://www.royalroad.com/fiction/56068/the-impeccable-adventure-of-the-reluctant-dungeon",
    },
  ],
  externalTags: ["Comedy", "Adventure", "Fantasy", "Dungeon Core", "High Fantasy"],
  readLater: true,
  createdAt: "2026-10-23T07:49:19.238Z",
  updatedAt: "2026-10-23T07:49:19.238Z",
} as const satisfies StoryRead
