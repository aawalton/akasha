import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameNatalie = {
  id: "01a0de59-9645-71c1-b311-00d9bbcd9975",
  type: "page-type/lore",
  slug: "the-dating-game-natalie",
  title: "Natalie",
  world: "world/personas",
  about: "persona/natalie",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Natalie runs a small Southern breakfast cafe a few blocks from Apple Avenue.",
    "Natalie is at her cafe from five in the morning, and it closes at two in the afternoon.",
    "Natalie is an Avowed Rabbit from South Carolina who can cook a feeling into a dish.",
    "Natalie notices who skipped a meal and sets a warm plate down before they ask.",
  ],
} as const satisfies Lore
