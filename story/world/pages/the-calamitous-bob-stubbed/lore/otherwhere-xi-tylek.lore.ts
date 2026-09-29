import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTylek = {
  id: "01a0ea8a-f293-761b-807c-a49dfc69e2db",
  type: "page-type/lore",
  slug: "otherwhere-xi-tylek",
  title: "Tylek",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tylek",
  facts: [
    {
      fact: "Tylek the Shadow-Hunter is a gray-haired kark hunter of the Red Tribe.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tylek hunts with a bone bow and is a swift runner.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tylek fought in the Red Tribe's war on the Pure League and sat at the peace talks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tylek is with the Red Tribe after the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
