import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerChainWhip = {
  id: "01a0de1f-035b-7cd3-82e0-1ebf78e6606b",
  type: "page-type/lore",
  slug: "the-tower-chain-whip",
  title: "Chain Whip",
  world: "world/personas",
  about: "world-skill/the-tower-chain-whip",
  facts: [
    {
      fact: "Chain Whip is a spinning sweep through a full circle, leaving no back exposed to a flanker.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The chain bashes anything that enters the circle.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Stamina sustains the spin.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Ember Channel run along the chain adds a burning edge to its strikes.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Feeling the core's stored torque ride the spin steadies Alan's control of it.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
