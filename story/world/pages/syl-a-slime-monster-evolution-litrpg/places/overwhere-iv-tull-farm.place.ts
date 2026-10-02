import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvTullFarm = {
  id: "01a0fd44-9eb0-751a-830b-1fbf3b17fef8",
  type: "page-type/place",
  slug: "overwhere-iv-tull-farm",
  title: "Tull Farm",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Tull Farm lies two miles south-west of Millbrook, where the Tangle's edge meets the brook ford.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-ilsa-crane",
      ],
    },
    {
      fact: "Farmer Tull is a lean, grim widower in his fifties, with one grown son, Aldo.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the night of Nala's fifth day, goblins raided Tull Farm and drove off six sheep.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-ilsa-crane",
      ],
    },
    {
      fact: "Aldo ran out with a lantern and was clubbed senseless; he lives, with a split scalp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tull saw seven raiders by lantern: six goblins and a bigger one with a horn, leading.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-ilsa-crane",
      ],
    },
    {
      fact: "Tull rode his cob to town at first light, and his word was in Ilsa's ledger by breakfast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tull's son ran out at the raid with a lantern and got his scalp split; he'll live.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-ilsa-crane",
      ],
    },
  ],
} as const satisfies Place
