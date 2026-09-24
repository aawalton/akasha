import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerTheHost01 = {
  id: "01a0d450-6b1e-78d5-9a73-adacfa0ec766",
  type: "page-type/lore",
  slug: "the-tower-the-host-01",
  title: "The Host",
  world: "world/personas",
  about: "character-other/the-tower-the-host-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Host is the loom that weaves the False Haven.",
    "The Host's weaving presses on a climber to relax, trust and do nothing.",
    "A strong will knows the Host's pull for something foreign and can refuse it.",
    "Threatened, the Host splits into identical decoys ringing its table.",
    "The Host's decoys fake every cheap tell at once: shadow, heat and reflection.",
    "Real fire salted through the Host's room shows every projection for a moment.",
    "The true Host loops least, stirs real dust, and sits at the table's head where the floor slopes.",
    "A blow at one of the Host's decoys draws the true Host's counter and a reshuffle.",
    "A true strike on the Host cracks the haven and raises its true form rather than killing it.",
    "The Host fights when a weapon is raised to it or its false exit is forced.",
  ],
} as const satisfies Lore
