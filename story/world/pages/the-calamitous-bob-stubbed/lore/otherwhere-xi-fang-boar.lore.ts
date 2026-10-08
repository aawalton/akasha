import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiFangBoar = {
  id: "01a0ea84-e791-7e0e-968b-d929a46fe17a",
  type: "page-type/lore",
  slug: "otherwhere-xi-fang-boar",
  title: "Fang Boar",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-fang-boar",
  facts: [
    {
      fact: "Fang boars roam the wild country along Param's roads between Enoria and Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Country knights keep boar spears for beasts like fang boars.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:16:13.713Z",
  updatedAt: "2026-09-29T00:16:21.000Z",
} as const satisfies Lore
