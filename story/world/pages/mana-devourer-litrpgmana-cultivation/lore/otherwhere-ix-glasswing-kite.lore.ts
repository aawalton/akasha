import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxGlasswingKite = {
  id: "01a0ea3d-5212-766b-9b1f-ea8f9b82b0a6",
  type: "page-type/lore",
  slug: "otherwhere-ix-glasswing-kite",
  title: "Glasswing Kite",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-glasswing-kite",
  facts: [
    {
      fact: "Glasswing kites are G Grade birds no bigger than a hand, with clear, glassy wings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They hover on the wind over the Flats and snap up insects; they harm no one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kites flying low and in close flocks mean a glass storm is coming.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kites vanish from the sky before rain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A kite holds a G Grade Wind core worth a copper or two.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
