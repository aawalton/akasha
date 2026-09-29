import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMarus = {
  id: "01a0ea81-9b0a-79ff-ab34-bc91cc31f688",
  type: "page-type/lore",
  slug: "otherwhere-xi-marus",
  title: "Marus",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-marus",
  facts: [
    {
      fact: "Marus was a figure of the Harrakan Remnant Empire in the south.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marus is dead, fallen when New Harrak destroyed the Remnant Empire at Frostway.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
