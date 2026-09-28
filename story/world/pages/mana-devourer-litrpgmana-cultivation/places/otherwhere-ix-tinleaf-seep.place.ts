import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxTinleafSeep = {
  id: "01a0ea42-0b6d-737a-8fed-55c3ada0a8d9",
  type: "page-type/place",
  slug: "otherwhere-ix-tinleaf-seep",
  title: "The Tinleaf Seep",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-glassgrass-flats",
  facts: [
    {
      fact: "Three tinleaf trees stand together an hour's walk east-northeast of where Nala woke.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Under the three tinleaf lies a seep pool an arm across, clear, cold and good to drink.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pair of grown shardbacks dens in the roots of the largest of the three tinleaf.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ground round the seep is bare mud, printed with the tracks of everything that drinks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fallen tinleaf branches make fair clubs and poles; the bark peels in long strips.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollowmanes drink at the seep after dark.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
