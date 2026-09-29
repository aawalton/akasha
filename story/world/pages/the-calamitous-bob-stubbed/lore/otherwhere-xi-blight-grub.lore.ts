import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiBlightGrub = {
  id: "01a0ea83-059d-7553-b188-75f82e3251ca",
  type: "page-type/lore",
  slug: "otherwhere-xi-blight-grub",
  title: "Blight Grub",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-blight-grub",
  facts: [
    {
      fact: "A blight grub is a burrowing parasite, and an extremely dangerous one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Blight grubs live in the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
