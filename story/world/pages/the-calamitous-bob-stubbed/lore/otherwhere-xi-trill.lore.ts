import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTrill = {
  id: "01a0ea8a-f293-7c98-802e-8a5f5e199f08",
  type: "page-type/lore",
  slug: "otherwhere-xi-trill",
  title: "Trill",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-trill",
  facts: [
    {
      fact: "Trill is a feral Enorian girl in New Harrak, missing some fingers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trill hunts beastlings in Harrak's organized hunts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trill came before Viv at her first public audience in Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Trill is a grown woman of New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
