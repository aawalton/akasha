import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiShely = {
  id: "01a0ea86-c326-7436-ae31-e3dac83944fa",
  type: "page-type/lore",
  slug: "otherwhere-xi-shely",
  title: "Shely",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-shely",
  facts: [
    {
      fact: "Shely is an old woman of a Harrakan coastal village below the lone dragon's peak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shely wears a straw hat; her husband is a gardener with a knack for brown magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shely has grown children, bakes bread in the afternoon and bets iron bits on village doings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shely hosted Viv and Arthur when they came to discipline the dragon Old White Death.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Shely lives in her village in New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
