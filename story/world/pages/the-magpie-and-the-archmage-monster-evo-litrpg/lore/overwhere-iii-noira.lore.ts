import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiNoira = {
  id: "01a0ed30-60cc-7477-804c-762e3cfdb4a8",
  type: "page-type/lore",
  slug: "overwhere-iii-noira",
  title: "Noira",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-noira",
  facts: [
    {
      fact: "Noira is the Guild Registration receptionist of the Cyene Adventurers Guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has black hair in a neat, professional bun.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She registers adventurers and familiars, reads mana signature cards, and assigns rooms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She handles class advancement by the Guild's special stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Liora's mana card glowed a strange light; Noira noticed, found it odd, and said nothing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is watchful and suspicious by nature, yet has come to like Liora.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Now she is at her desk in the Cyene Guild hall.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
