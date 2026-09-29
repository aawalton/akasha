import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiShahira = {
  id: "01a0ea87-7eb4-79cc-b59f-102c5169f8b0",
  type: "page-type/lore",
  slug: "otherwhere-xi-shahira",
  title: "Shahira",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-shahira",
  facts: [
    {
      fact: "Shahira the Swift was a figure of the old Shaded Lands, long ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shahira was sacrificed by Kor the Baleful, the ancient tyrant of Korrim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shahira is long dead; her tale is told among the exiles of the Shadowlands.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
