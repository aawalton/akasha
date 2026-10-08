import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerGalleryMirrors = {
  id: "01a0d445-c274-7cea-84dd-26628776e0a2",
  type: "page-type/lore",
  slug: "the-tower-gallery-mirrors",
  title: "The Gallery Mirrors",
  world: "world/personas",
  about: "story-item/the-tower-gallery-mirrors",
  facts: [
    {
      fact: "Real presences reflect in the Long Gallery's mirrors; woven figures do not.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-24T16:35:36.692Z",
  updatedAt: "2026-09-26T18:13:39.000Z",
} as const satisfies Lore
