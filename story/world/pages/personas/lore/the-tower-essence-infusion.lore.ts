import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEssenceInfusion = {
  id: "01a0de1f-035c-7edd-8eae-185de8865c0a",
  type: "page-type/lore",
  slug: "the-tower-essence-infusion",
  title: "Essence Infusion",
  world: "world/personas",
  about: "world-skill/the-tower-essence-infusion",
  facts: [
    {
      fact: "Essence Infusion extracts an essence from a raw source and binds it into a separate object.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The object takes on the quality of the essence bound into it.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "An infusion takes its essence from outside the binder, lasts, and works with any element.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Infusion is a motor technique rather than an element, so no attunement biases it.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "An essence held in transit drains focus for as long as it is held.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "At novice a bind is crude and unstable, weakening with use and fading.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Each rank binds deeper and more lastingly.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "An essence of the pole opposite the binder's own costs more focus and binds shakier.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "That tax is heavy at novice, noticeable at journeyman, merely costly at master, gone at sage.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "At journeyman, a stable bind is made with the source in hand and time to work.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
