import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEldrim = {
  id: "01a0ea80-8c28-7f9f-8938-f365d2f71d9b",
  type: "page-type/lore",
  slug: "otherwhere-xi-eldrim",
  title: "Eldrim",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-eldrim",
  facts: [
    {
      fact: "Eldrim is the seneschal of Glastia, serving its royal house.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eldrim received the alliance leaders when they came to purge the beastlings from the wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Eldrim is thought to be in Glastia, serving still.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:11:28.168Z",
  updatedAt: "2026-09-29T00:11:32.000Z",
} as const satisfies Lore
