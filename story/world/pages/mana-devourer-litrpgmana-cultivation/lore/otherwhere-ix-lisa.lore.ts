import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxLisa = {
  id: "01a0ea3f-a3e9-7c90-9dc5-fc8a45b16e90",
  type: "page-type/lore",
  slug: "otherwhere-ix-lisa",
  title: "Lisa",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-lisa",
  facts: [
    {
      fact: "Lisa is a serving girl at Baron Toth's castle in Malari, under Steward Marley.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lisa delivers the baron's gifts to villagers, schedules his meetings and ferries guests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Lisa is no longer seen about the castle.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
