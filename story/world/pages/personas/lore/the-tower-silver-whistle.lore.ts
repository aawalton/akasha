import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerSilverWhistle = {
  id: "01a0d443-d66d-704e-9f0c-21211bc29d3f",
  type: "page-type/lore",
  slug: "the-tower-silver-whistle",
  title: "The Silver Whistle",
  world: "world/personas",
  about: "story-item/the-tower-silver-whistle",
  facts: [
    {
      fact: "The silver whistle's single note strikes every bronze plate in the nave at once.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-24T16:33:30.733Z",
  updatedAt: "2026-09-26T18:13:39.000Z",
} as const satisfies Lore
