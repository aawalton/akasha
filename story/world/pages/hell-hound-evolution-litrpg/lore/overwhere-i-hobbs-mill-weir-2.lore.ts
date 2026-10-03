import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIHobbsMillWeir2 = {
  id: "01a101b8-73b5-7546-836f-10f87548934e",
  type: "page-type/lore",
  slug: "overwhere-i-hobbs-mill-weir-2",
  title: "Hobb's Mill Weir, continued",
  world: "world/hell-hound-evolution-litrpg",
  about: "place/overwhere-i-hobbs-mill-weir",
  facts: [
    {
      fact: "Nala found the wyrm's bile sac whole, but her blade slipped cutting it free; it burst, worthless.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
    {
      fact: "The burst wyrm bile stung Nala's wrists and forearms like nettles.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
  ],
} as const satisfies Lore
