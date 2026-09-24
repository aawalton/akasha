import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerPlinthGolem01 = {
  id: "01a0d44f-6473-7a8f-9ed8-5bb71bac30ac",
  type: "page-type/lore",
  slug: "the-tower-plinth-golem-01",
  title: "The Plinth Golem",
  world: "world/personas",
  about: "character-other/the-tower-plinth-golem-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Plinth Golem is slow.",
    "The Plinth Golem's body is solid, and blows to its torso or limbs barely mark it.",
    "The Plinth Golem's whole mass rests on one keystone plinth at its sternum.",
    "A clean strike on the Plinth Golem's keystone can stagger it or bring it down.",
    "Finding the Plinth Golem's keystone takes a reading eye, and striking it a placed blow, not might.",
    "The Plinth Golem is banked full of heat, and drawing that heat out of it kills it.",
    "The Plinth Golem is dead, drained of its heat and broken to slag, its core taken.",
  ],
} as const satisfies Lore
