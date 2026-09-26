import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerDeepDenFlask = {
  id: "01a0d445-dc99-7d67-a140-beb6cb2a5bd1",
  type: "page-type/lore",
  slug: "the-tower-deep-den-flask",
  title: "The Scavenged Flask",
  world: "world/personas",
  about: "story-item/the-tower-deep-den-flask",
  facts: [
    {
      fact: "The flask in the Deep Den's midden holds one drink of real water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The flask in the Deep Den's midden holds the only honest water in the False Haven.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
