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
} as const satisfies Lore
