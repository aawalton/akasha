import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVOlive = {
  id: "01a0e9ff-cb81-7923-9d63-88f8599eb010",
  type: "page-type/lore",
  slug: "otherwhere-v-olive",
  title: "Olive",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-olive",
  facts: [
    {
      fact: "Olives are grown and eaten in Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Olives and sweet bread are served at the council table of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orchards and crop fields surround Giantsrest and its satellite cities.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:50:50.241Z",
  updatedAt: "2026-09-28T21:50:54.000Z",
} as const satisfies Lore
