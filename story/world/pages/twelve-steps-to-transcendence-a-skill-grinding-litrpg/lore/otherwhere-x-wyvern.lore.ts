import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXWyvern = {
  id: "01a0ea76-0b82-78e1-9859-8c7015a10ae0",
  type: "page-type/lore",
  slug: "otherwhere-x-wyvern",
  title: "Wyvern",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-species/otherwhere-x-wyvern",
  facts: [
    {
      fact: "A wyvern is a huge winged draconic beast with leathery wings that breathes fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wyvern is treated as a natural disaster, feared even by strong fighters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 1 fighter is a liability in a fight against a wyvern.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wyverns come from a wyvern spawner that grows silently, raising mana levels around it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An out-of-control spawner looses a wyvern together with goblins, trolls and wolves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wyvern's fire can be drawn toward someone gathering huge amounts of mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wyvern and its monsters overran Sulon's border camp at night and set it burning.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
