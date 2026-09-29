import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXGreyShirt = {
  id: "01a0ea80-f1a0-74f2-9b28-65c0bbc322b0",
  type: "page-type/lore",
  slug: "otherwhere-x-grey-shirt",
  title: "Grey Shirt",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-grey-shirt",
  facts: [
    {
      fact: "The shirt is Earth cotton jersey, knit finer and more even than any loom in the Plains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its seams are tiny and machine-straight, and a small cloth tag at the neck bears foreign letters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To Plains eyes it looks like a man's undershirt, too thin to wear abroad.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A clothier or a curious miller would give a silver or two for it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It keeps out no wind and no rain.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
