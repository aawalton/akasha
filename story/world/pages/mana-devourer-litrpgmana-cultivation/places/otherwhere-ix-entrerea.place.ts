import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxEntrerea = {
  id: "01a0ea3f-4543-7e97-adb1-06fe2179e118",
  type: "page-type/place",
  slug: "otherwhere-ix-entrerea",
  title: "Entrerea",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "Entrerea is a continent of Firrelia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Entrerea holds the Magul Empire, the desert zone of Materia, Sun City and Fanata.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Entrerea's land is carved into zones by colored magical barriers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Circus caravans travel between Entrerea's regions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Entrerean tax codes are thick, dense books of allowances, dowries and quarterly dues.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
