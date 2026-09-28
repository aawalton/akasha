import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAlchemy = {
  id: "01a0e9f9-8fea-7c35-aa81-6b0e7aa56666",
  type: "page-type/lore",
  slug: "otherwhere-v-alchemy",
  title: "Alchemy",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-alchemy",
  facts: [
    {
      fact: "Alchemical ingredients can carry magical properties, magic resistance among them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Healing potions exist and can stem even massive bleeding, such as from lost legs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Diplomat's friend is a reagent vial that reacts to poison in a drink.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kalis once made plague-killing potions among its great works.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sungold is a millennia-old, irreplaceable liquor that feels like sunlight on the skin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enchanting materials and gemstones are traded as valuable goods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
