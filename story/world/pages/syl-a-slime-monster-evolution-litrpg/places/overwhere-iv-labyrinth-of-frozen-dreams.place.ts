import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvLabyrinthOfFrozenDreams = {
  id: "01a0ed30-499a-7b0a-ba2d-1792c280ffa2",
  type: "page-type/place",
  slug: "overwhere-iv-labyrinth-of-frozen-dreams",
  title: "Labyrinth of Frozen Dreams",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Labyrinth of Frozen Dreams is a labyrinth dungeon on a mountain in the icy far north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Outside, it looks like a house-sized snow globe on a golden base.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A plaque on the base declares the challenge; a hand laid on it accepts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Challengers are shrunk down and set inside the globe, in a walled winter town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shrinking is a rule over all inside; even stored belongings resize to match.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Large beings inside can change size only slowly, if at all.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Space inside uses fractional coordinates, so teleporting takes extra steps.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dimension magic is weak there, and portals will not hold steady.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Touching the globe's edge from inside offers the challenger a chance to forfeit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town inside is Moonscar, and the challenge is bound up in its fate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its monsters give poor experience for the danger they pose.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cursed ice from wendigo claws inside can pierce even immunity to cold.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
