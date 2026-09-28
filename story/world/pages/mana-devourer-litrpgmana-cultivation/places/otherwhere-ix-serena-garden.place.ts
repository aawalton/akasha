import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxSerenaGarden = {
  id: "01a0ea42-fcc1-7617-957d-9a9b1facfacb",
  type: "page-type/place",
  slug: "otherwhere-ix-serena-garden",
  title: "Serena's Garden",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "Serena's garden is a quiet garden with a big tree, birdsong, a table and wooden chairs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serena brings guests to her garden by teleporting them there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In her garden Serena first offered Markus Brown the place of her Champion; he refused then.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
