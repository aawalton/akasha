import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const fairweatherNoor = {
  id: "01a111fb-f875-76b6-864a-6cc24ab7f2ca",
  type: "page-type/lore",
  slug: "fairweather-noor",
  title: "Noor",
  world: "world/fairweather",
  about: "character-other/fairweather-noor",
  facts: [
    {
      fact: "Noor Haddad is twenty-three, a Hexer: bad luck bends toward whoever is near her.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-noor"],
    },
    {
      fact: "Noor is slender and long-limbed, with warm ivory skin, long straight black hair and kohl-lined eyes.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-noor"],
    },
    {
      fact: "Noor always wears black gloves and a long dark green coat.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-noor"],
    },
    {
      fact: "People step away from Noor in the street, and two parties have broken up around her.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-noor",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "Noor is dry, sharp and lonely, and certain that everyone leaves.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-noor"],
    },
    {
      fact: "The luck Noor bends is small and near: a spilled cup, a snapped lace, a stumble, a dropped coin.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-noor"],
    },
    {
      fact: "A Hexer bends bad luck toward those near her, and the bad luck never lands on the Hexer herself.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-noor",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "Noor rents a room above a chandler shop on Wick Lane, and eats alone.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-noor"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
