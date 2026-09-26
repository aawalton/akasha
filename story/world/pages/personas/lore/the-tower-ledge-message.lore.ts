import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerLedgeMessage = {
  id: "01a0d444-bd8e-7731-b996-6ec1bbc6ad54",
  type: "page-type/lore",
  slug: "the-tower-ledge-message",
  title: "The Ledge Message",
  world: "world/personas",
  about: "story-item/the-tower-ledge-message",
  facts: [
    {
      fact: 'The ledge message says "the stones do not move on their own. The thing at the top moves them."',
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The ledge message says the thing at the top sleeps in the chain and wakes near the grey light.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The ledge message's writer spent three days on the ledge and could not get past the thing.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: 'The ledge message says "the weight is the whole of it, the chain and the drum it turns on".',
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: 'The ledge message breaks off at "the catch that holds the—".',
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
