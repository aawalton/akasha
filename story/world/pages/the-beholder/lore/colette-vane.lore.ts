import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const coletteVane = {
  id: "01a0ddf8-63fc-7743-afaf-b7f56d2f6b72",
  type: "page-type/lore",
  slug: "colette-vane",
  title: "Colette Vane",
  world: "world/the-beholder",
  about: "character-other/the-beholder-colette-vane",
  facts: [
    {
      fact: "Colette could change her mind in the air, landing a different shape than she left the ground.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette's changes in the air came faster than the decision should have traveled.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette read emotions and secrets; she read rooms like sheet music and saw everyone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette Vane was murdered by Pearl after a performance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette had no Onset power.",
      knowers: ["lore-disclosure/game-master", "character-player/the-beholder-pearl"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
