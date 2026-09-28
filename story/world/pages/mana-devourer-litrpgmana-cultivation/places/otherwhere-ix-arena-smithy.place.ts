import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxArenaSmithy = {
  id: "01a0ea41-cb05-7578-854e-6a526d98c8c1",
  type: "page-type/place",
  slug: "otherwhere-ix-arena-smithy",
  title: "The Arena Smithy",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-arena-dungeon",
  facts: [
    {
      fact: "The arena smithy is a large open-plan forge off the dungeon's central hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smithy has support beams, bellows, a weapon rack, an oak test board and a workbench.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smithy is hot and smoky.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A huge boar-man smith runs it and outfits every master gladiator in the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smith's young son helps manage the forge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smith appraises items, forges fast, and sells gear such as flame-proof cuirasses.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The smithy faces the tavern across the walkway.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
