import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEssenceInfusion = {
  id: "01a0de1f-035c-7edd-8eae-185de8865c0a",
  type: "page-type/lore",
  slug: "the-tower-essence-infusion",
  title: "Essence Infusion",
  world: "world/personas",
  about: "world-skill/the-tower-essence-infusion",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Essence Infusion extracts an essence from a raw source and binds it into a separate object.",
    "The object takes on the quality of the essence bound into it.",
    "An infusion takes its essence from outside the binder, lasts, and works with any element.",
    "Infusion is a motor technique rather than an element, so no attunement biases it.",
    "An essence held in transit drains focus for as long as it is held.",
    "At novice a bind is crude and unstable, weakening with use and fading.",
    "Each rank binds deeper and more lastingly.",
    "An essence of the pole opposite the binder's own costs more focus and binds shakier.",
    "That tax is heavy at novice, noticeable at journeyman, merely costly at master, gone at sage.",
    "At journeyman, a stable bind is made with the source in hand and time to work.",
  ],
} as const satisfies Lore
