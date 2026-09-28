import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXPortals = {
  id: "01a0ea73-310d-7c25-bded-945b01d44185",
  type: "page-type/lore",
  slug: "otherwhere-x-portals",
  title: "Spatial Portals and Teleporting",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-portals",
  facts: [
    {
      fact: "A spatial mage can open a glowing portal that teleports people far away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Space is a rare affinity.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Opening a spatial portal takes gathering huge amounts of mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gathering that much mana can draw monster attacks, like a wyvern's fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Passing a portal feels like tumbling through a tunnel of colors in cold, empty space.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tunnel is a chaotic swirl of light, much like the colors of a rift.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A portal's far end can open in mid-air, dropping travelers from a height.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Powerful mages can teleport themselves soundlessly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A space user can make objects appear in their hands out of nowhere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Escape scrolls teleport their user; they are meant to carry one to the next town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A teleport through a regional wall would need an extremely high-tier scroll.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
