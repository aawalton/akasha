import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAragan = {
  id: "01a0ea75-bc71-7a82-b6db-d8df9a6d665e",
  type: "page-type/lore",
  slug: "otherwhere-xi-aragan",
  title: "Aragan of the One Breath",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-aragan",
  facts: [
    {
      fact: "Aragan of the One Breath is a Shadowlander huntress of the Whispering Rocks tribe.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aragan is an archer, and was one of Nero Oleander's chosen lieutenants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aragan marched with the Kingdom of Maranor's army across Param in the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aragan surrendered to Harrak after the rout on the Plain of the Gods, and was let keep her bow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Aragan is a surrendered captive of Harrak, among the prisoners held by Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
