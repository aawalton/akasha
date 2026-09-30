import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiBrannaghTull = {
  id: "01a0ed31-66ed-7e34-9a01-fdec27eab40e",
  type: "page-type/lore",
  slug: "overwhere-iii-brannagh-tull",
  title: "Brannagh Tull",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-brannagh-tull",
  facts: [
    {
      fact: "Brannagh Tull is Merrowgate's herbwife and hedge-healer, seventy and bent, sharp as a thorn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her shop under a crooked green sign sells salves, teas and low potions at 30 copper a flask.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has a small green mana and a Healer's knack of Level 19, self-taught from her mother.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She talks to her cat, a one-eared gray tom called Reeve, more than to people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has treated two townsfolk bitten by blighted beasts; neither wound will close.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She trades in old stories and will tell them for honest help in her garden.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brannagh will buy up to forty more frostcaps this week at her shop, a copper each.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-marda-hesk",
      ],
    },
    {
      fact: "She checks every root cut, and pays a copper for each clean frostcap.",
      knowers: ["lore-disclosure/game-master", "character-other/overwhere-iii-brannagh-tull"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
