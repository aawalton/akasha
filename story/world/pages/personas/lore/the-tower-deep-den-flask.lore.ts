import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerDeepDenFlask = {
  id: "01a0d445-dc99-7d67-a140-beb6cb2a5bd1",
  type: "page-type/lore",
  slug: "the-tower-deep-den-flask",
  title: "The Scavenged Flask",
  world: "world/personas",
  about: "item/the-tower-deep-den-flask",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The flask in the Deep Den's midden holds one drink of real water.",
    "The flask in the Deep Den's midden holds the only honest water in the False Haven.",
  ],
} as const satisfies Lore
