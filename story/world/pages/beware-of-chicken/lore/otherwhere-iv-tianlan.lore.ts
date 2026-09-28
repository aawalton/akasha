import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvTianlan = {
  id: "01a0ea0f-b790-735f-8fc6-a2771309590b",
  type: "page-type/lore",
  slug: "otherwhere-iv-tianlan",
  title: "Tianlan, Spirit of the Azure Hills",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Legend says founding king Xiaoshi and his Dao Companion Tianlan beat the Azure Emperor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Xiaoshi and Tianlan built the realm of the Azure Mountains, as the Hills were once called.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Before the Breaking, beasts and humans lived together under the 'Azure Banner'.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A demonic invasion long ago broke the province, ending Xiaoshi and Tianlan's rule.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ancient memory crystals record techniques and history from Xiaoshi's era.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Xiaoshi is remembered as a Martyr of the Age of Heroes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
