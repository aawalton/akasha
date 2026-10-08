import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVRedeye = {
  id: "01a0e9fa-9425-70aa-b0d9-d5e94a87f3cb",
  type: "page-type/lore",
  slug: "otherwhere-v-redeye",
  title: "Redeye",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-redeye",
  facts: [
    {
      fact: "Redeyes are sea beasts that threaten ships on the open ocean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sailors count a redeye a lesser danger than a leviathan of the deeps.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:45:08.389Z",
  updatedAt: "2026-09-28T21:45:11.000Z",
} as const satisfies Lore
