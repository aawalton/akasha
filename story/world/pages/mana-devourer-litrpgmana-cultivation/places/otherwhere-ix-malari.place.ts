import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxMalari = {
  id: "01a0ea3f-b660-70e3-ba53-30d4a868a301",
  type: "page-type/place",
  slug: "otherwhere-ix-malari",
  title: "Malari",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "Malari is a land of lords and barons, each holding a fief of castle, gardens and serfs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Baron Samell Toth's castle stands on a hill in Malari.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Malari's lords buy evolving monsters from the demon Elasar, each with a Ring of Control.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Afflictions rumoured to go with vampirism are whispered of in Malari; most call them myths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villagers in Malari have begun to go missing near baronial castles.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
