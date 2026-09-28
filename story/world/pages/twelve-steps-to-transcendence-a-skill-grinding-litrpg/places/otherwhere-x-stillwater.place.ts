import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXStillwater = {
  id: "01a0ea72-d93f-7101-99c5-d35a9fa3136e",
  type: "page-type/place",
  slug: "otherwhere-x-stillwater",
  title: "Stillwater",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-brackwood",
  facts: [
    {
      fact: "Stillwater is a spring pool in a mossy hollow three hours inside the Brackwood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pool never freezes, never stirs in wind, and tastes faintly sweet and cold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The air in the hollow is thick with ambient mana; skin tingles there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stillwater's water carries a trace of essence, far weaker than a rift's pond.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 0 who knows a cycling technique can draw a little essence from drinking it daily.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Without a cycling technique the essence passes through a drinker and is lost.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beasts come to drink at Stillwater; the wolves drink there at dawn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrow's old folk say Stillwater is lucky and that no one should sleep beside it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tobin Marsh knows the pool's worth and keeps its path to himself.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-x-brackwood",
      way: "down Harrow Brook's young stream through the trees",
      direction: "south",
    },
  ],
} as const satisfies Place
