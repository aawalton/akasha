import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiHellMarsh = {
  id: "01a0ed2f-54b6-77fa-986c-3df8259c81e1",
  type: "page-type/place",
  slug: "overwhere-iii-hell-marsh",
  title: "The Hell Marsh",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-cyene",
      way: "Back northwest over forest and small villages to Cyene.",
    },
    { to: "place/overwhere-iii-abylport", way: "On southeast toward the coast and Abylport." },
  ],
  facts: [
    {
      fact: "The Hell Marsh is a swamp on the way southeast from Cyene toward Abylport.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies weeks of travel south of the northern hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Deathwillows, willow-like mangroves, snare prey in sticky tendrils and digest it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mossy islands dot murky water of unknown depth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marsh pythons, levels 22 to 32, lie underwater and sense body heat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marsh cranes spin in drilling strikes and spit water; paralysis does not touch them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giant dragonflies, fast and fragile, came to the marsh within the last thirty years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A great red-plated fish, the Bowfin Ravager, ruled its waters until it was killed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most of the marsh's monsters hunt by night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nearby, an underground warren holds giant moles that smell prey from kilometers off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An earth mana node lies inland toward the marsh.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
