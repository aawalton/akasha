import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXBlackTights = {
  id: "01a0ea80-f19c-774f-bafd-55df60a94ea3",
  type: "page-type/lore",
  slug: "otherwhere-x-black-tights",
  title: "Black Tights",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-black-tights",
  facts: [
    {
      fact: "The tights are a slick stretching cloth no one in this world can weave or has seen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To Plains eyes they look like hose worn with no skirt or breeches over them, and are shocking.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anyone who handles the cloth marks it as strange, far-off or noble-made.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A clothier or a curious miller would give two silver for them, and ask where they came from.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They hold a little warmth, shed dirt easily, and dry fast.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
