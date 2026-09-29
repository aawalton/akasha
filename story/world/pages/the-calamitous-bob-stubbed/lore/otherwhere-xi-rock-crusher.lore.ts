import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRockCrusher = {
  id: "01a0ea83-ee7a-7d59-a48b-b217ffd4e88e",
  type: "page-type/lore",
  slug: "otherwhere-xi-rock-crusher",
  title: "Rock Crusher",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-rock-crusher",
  facts: [
    {
      fact: "Rock crushers are giant lobsters of the Perdition Gulf.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An adult rock crusher can grow to a monstrous size.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rock crusher meat is eaten with white wine, butter and citrus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The dark god Octas once fused a rock crusher with an abyssal octopus into a sea beast.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
