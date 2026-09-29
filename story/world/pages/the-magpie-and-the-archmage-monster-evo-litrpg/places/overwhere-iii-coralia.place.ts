import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiCoralia = {
  id: "01a0ed31-c668-78e7-93df-f589bb5f9e71",
  type: "page-type/place",
  slug: "overwhere-iii-coralia",
  title: "Coralia",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    { way: "North along the coast toward Abylport, a long journey." },
    { way: "Out into the surrounding jungle." },
  ],
  facts: [
    {
      fact: "Coralia is a port town on the Dominion's far southern coast, smaller than Abylport.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies far south of Abylport, and many weeks of travel south of the northern hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Winter is barely felt there; its trees keep their leaves all year.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a resort for rich tourists, with large mansions in a style all its own.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A promenade on the coast has elegant stalls of jewels, cloth and delicate snacks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Terrace restaurants with elegantly dressed waiters face the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its back alleys hide a dilapidated criminal pub, entered by password and a toll.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pub smells of alcohol and something sickly sweet; a scarred doorman keeps it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jungle rings the town: flowers, fruit and giant vine-draped trees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Spotted jaguar-like cats hunt the jungle, leaping tree to tree to snatch birds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oversized beetles, snakes and geckos crawl the jungle floor.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
