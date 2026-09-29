import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiAbylport = {
  id: "01a0ed2f-54b4-77e4-9620-a2aa69725fcb",
  type: "page-type/place",
  slug: "overwhere-iii-abylport",
  title: "Abylport",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-hell-marsh",
      way: "Inland northwest toward the marsh and on to Cyene.",
    },
    { to: "place/overwhere-iii-corruption-island", way: "A short sail out from the harbor." },
    {
      to: "place/overwhere-iii-seabloom-island",
      way: "About an hour's sail, away from the corruption island.",
    },
    {
      to: "place/overwhere-iii-forestwind-academy",
      way: "About an hour's flight along the coast, then one forest path.",
    },
    {
      to: "place/overwhere-iii-volcanic-island",
      way: "Half a day's flight south over the sea.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "Abylport is a port city larger than Cyene, about two weeks southeast of it by land.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies many weeks of travel south of the Wrenmark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a hub for seasoned adventurers; its Guild hall is laid out like Cyene's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its Guildmaster is Loren Bernhard, one of Morgana's Elites.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has a main street, warehouses, a harbor, restaurants and street vendors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its market square once bustled with foreigners selling their wares.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "For months a sickening fog lay over it; the old, young and pregnant fell ill first.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Many fled, trade collapsed and fish left the harbor; five Guild expeditions failed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Morgana, Pillar of Azure Helm, came with her ship, and the fog cleared after.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The fog lifted this winter; people have returned and the city is reviving.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Carts, fishermen and children fill its streets again.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Coniferous forests lie near it; packs of steel-furred razor wolves roam them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The nearest city beyond it lies across the sea; the next by land is far off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The warm southern coast lies a good distance south along the shore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
