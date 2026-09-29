import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLeto = {
  id: "01a0ea8f-07e5-78a8-ab23-ba4dec1cba8b",
  type: "page-type/lore",
  slug: "otherwhere-xi-leto",
  title: "Leto",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-leto",
  facts: [
    {
      fact: "Leto is a boy who died, and whose soul now waits in Enttiku's hut.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enttiku keeps the souls of dead children like Leto to play until they are ready to move on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv met Leto in Enttiku's hut in the in-between at the end of the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
