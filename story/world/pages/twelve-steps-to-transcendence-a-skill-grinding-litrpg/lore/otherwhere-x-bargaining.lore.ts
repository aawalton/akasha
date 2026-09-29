import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXBargaining = {
  id: "01a0eadc-5038-7275-b4d3-82ca885ee13f",
  type: "page-type/lore",
  slug: "otherwhere-x-bargaining",
  title: "Bargaining",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-bargaining",
  facts: [
    {
      fact: "Ten copper make a silver, and twenty silver a gold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cold dealer asks four tenths more, a friendly one a tenth less.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A trusting dealer asks a fifth less, and one who is hers three tenths less.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Haggling is her act first: a strong result takes a fifth off, a success a tenth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A failed haggle adds a tenth to the price.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A dealer who sees she is desperate or foreign asks a fifth more.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Selling, the same leanings raise what she is paid instead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her purse holds her money in copper and changes the turn it is spent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A farm hand's day pays three copper and a meal; the waystation pays four.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her Earth shirt and tights are strange cloth a dealer would pay a silver or two for.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No price shows as a sum of copper in the prose; coins are named as they change hands.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
