import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiFallenEmpire = {
  id: "01a0ea41-4b62-7ae4-bcf0-996162d27fb7",
  type: "page-type/place",
  slug: "otherwhere-vii-fallen-empire",
  title: "The fallen Vurix Empire",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "The Vurix Empire's lands lie east past the Alliance's border, beyond Purple Dawn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its cities are broad and white-paved; its soldiers wore white and flew white swords.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Empress took mages' cores and gave them back to the loyal; mages there were her tools.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Empire kept camps and mines where coreless mages laboured as prisoners.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "With the Empress dead, noble houses and mage bands fight over its cities.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
