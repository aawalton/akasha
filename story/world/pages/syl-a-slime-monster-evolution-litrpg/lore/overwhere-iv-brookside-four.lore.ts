import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvBrooksideFour = {
  id: "01a0ed2e-0f6c-7f00-ab6f-6011bb59154c",
  type: "page-type/lore",
  slug: "overwhere-iv-brookside-four",
  title: "The Brookside Four",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Brookside Four are an adventurer party of bronze rank.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Dace is their warrior, proud, and LV 19.", knowers: ["lore-disclosure/game-master"] },
    { fact: "Wren is their scout, quiet and watchful.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Merrit is their fire mage, and he is jealous of any better caster.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merrit's touch lit the hall crystal a strong red, the brightest in Millbrook till now.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-brenna-holt",
        "character-other/overwhere-iv-wat",
        "character-other/overwhere-iv-dell",
        "character-other/overwhere-iv-ilsa-crane",
        "lore/overwhere-iv-oswin-pike",
        "lore/overwhere-iv-brookside-four",
      ],
    },
    {
      fact: "Merrit tells every newcomer about his red, and watches their touch to be sure of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Orla is their healer, and she is gentle.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "They take most of the wolf, boar and goblin work posted at the hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Brookside Four, of Millbrook's adventurers' hall, are good lads but green.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
    {
      fact: "Merrit wears a scorched red coat and names his magic as fire.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-brenna-holt",
        "character-other/overwhere-iv-wat",
        "character-other/overwhere-iv-dell",
        "character-other/overwhere-iv-ilsa-crane",
        "lore/overwhere-iv-oswin-pike",
        "lore/overwhere-iv-brookside-four",
      ],
    },
  ],
} as const satisfies Lore
