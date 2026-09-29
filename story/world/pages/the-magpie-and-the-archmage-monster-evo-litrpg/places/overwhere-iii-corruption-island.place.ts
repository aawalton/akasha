import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiCorruptionIsland = {
  id: "01a0ed2f-54b5-7b8e-848f-b80eed76ddde",
  type: "page-type/place",
  slug: "overwhere-iii-corruption-island",
  title: "The Corruption Island",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [{ to: "place/overwhere-iii-abylport", way: "A short sail back to Abylport's harbor." }],
  facts: [
    {
      fact: "The corruption island lies a short sail off Abylport and is no bigger than the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "For months it spewed miasma fog and monsters, thickest out at sea around it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Swarms of fishpeople, toads, reptiles and bugs crawled over it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A central pit has circling paths and many cave mouths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the pit's bottom three tunnels lead off: one lit, one foul, one dark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its fishpeople vanished into dust when the fog lifted this winter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The island lies quiet now; a research crew was to be sent to it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sailors spin three times and spit at the name of the skinweaver that lived there.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
