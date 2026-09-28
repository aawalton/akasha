import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVTirien = {
  id: "01a0e9fb-6916-753f-9478-0004361b448a",
  type: "page-type/lore",
  slug: "otherwhere-v-tirien",
  title: "Tirien",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-tirien",
  facts: [
    {
      fact: "Tirien is a dead god of weddings, one of those the Questors killed in Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Tirien is long dead, slain in the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
