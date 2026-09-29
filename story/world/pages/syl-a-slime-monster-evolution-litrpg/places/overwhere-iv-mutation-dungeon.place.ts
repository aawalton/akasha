import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvMutationDungeon = {
  id: "01a0ed38-6b56-7340-8616-36c81289d1b7",
  type: "page-type/place",
  slug: "overwhere-iv-mutation-dungeon",
  title: "The Mutation Dungeon",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Mutation Dungeon is a dungeon of three floors, run by adventurers out of Kaerlin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each floor lays one mutation theme on every creature that lives on it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orange slimes live in the Mutation Dungeon; their cores hold the explosive Nitro Slime.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ramshackle squad called the Misfits cleared it, with the elf mage Syl among them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clearing the Mutation Dungeon won Syl promotion to Gold rank in Kaerlin's guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sir Jet sent word ahead to organize that dungeon run.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
