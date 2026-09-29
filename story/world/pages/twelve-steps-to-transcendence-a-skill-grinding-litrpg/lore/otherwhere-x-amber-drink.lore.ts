import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXAmberDrink = {
  id: "01a0ea7a-5bd8-77e6-9fd1-55ea0eecf5aa",
  type: "page-type/lore",
  slug: "otherwhere-x-amber-drink",
  title: "The Commander's Amber Drink",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-amber-drink",
  facts: [
    {
      fact: "The amber drink is a shimmering amber liquid that tastes sweet, like honey.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It erases fatigue at once, then brings on deep relaxation and heavy sleep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It loosens the tongue, yet it is not alcohol.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A jug of it costs more than an entire frontier village.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The old commander of Sulon's border camp kept a jug and served it to guests.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
