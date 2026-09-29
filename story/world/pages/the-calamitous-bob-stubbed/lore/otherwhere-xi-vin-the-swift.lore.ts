import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiVinTheSwift = {
  id: "01a0ea8b-9d76-7490-92c2-d7db171eddd2",
  type: "page-type/lore",
  slug: "otherwhere-xi-vin-the-swift",
  title: "Vin the Swift",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-vin-the-swift",
  facts: [
    {
      fact: "Vin the Swift was an archer of the Pure League's expedition against the kark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vin the Swift is dead, killed when the Red Tribe ambushed the expedition.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
