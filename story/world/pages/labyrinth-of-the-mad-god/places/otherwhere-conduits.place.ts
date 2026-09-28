import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereConduits = {
  id: "01a0e9be-c9bd-74ac-b5ca-4c8a603d54a9",
  type: "page-type/place",
  slug: "otherwhere-conduits",
  title: "The Conduits",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A conduit is stable space strung across the void, covering hundreds of miles per step.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The conduit nearest Earth looks like a rusted, mildewed sewer pipe a mile wide.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farther on, a river of oil-slick sludge runs between concrete platforms as wide as highways.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Conduits have day and night even where lit by gems, magelights or glowing fungi.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Recycled biomes lie inside: grasslands, glaciers, jungles, mountains and deserts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A System arrow guides quest travelers along the right route.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Side branches, floating doorways and roof hatches lead to hidden nodes, loot or death.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Parties inside conduits are limited to four members.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tree monsters, wagon-sized blood-red owls and termite packs haunt the forested stretches.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rifts to nodes are swirling gashes behind double doors, and a bigger rift means a bigger node.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
