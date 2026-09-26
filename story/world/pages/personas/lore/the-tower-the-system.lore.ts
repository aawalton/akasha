import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerTheSystem = {
  id: "01a0de07-e06a-718b-a69e-e9449e27d077",
  type: "page-type/lore",
  slug: "the-tower-the-system",
  title: "The Tower's System",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "The System reports a climber's state and offers options, and says nothing else.",
    "The System gives every climber the same words in the same situation.",
    "The System never advises, foreshadows, judges or flatters.",
    "The System raises no warning or alarm; its readouts are flat.",
    "The Soul Appraisal shows a climber's eight attributes as numbers.",
    "The Soul Appraisal shows a climber's Vitae, Focus and Stamina.",
    "The Soul Appraisal shows no combat numbers, no item or dice numbers, and no traits.",
    "A climber sees more of his own sheet only as he earns a way to know it.",
  ],
} as const satisfies Lore
