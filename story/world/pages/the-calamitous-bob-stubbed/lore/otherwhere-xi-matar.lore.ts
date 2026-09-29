import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMatar = {
  id: "01a0ea80-4334-7a0a-ad03-50ea3116c61e",
  type: "page-type/lore",
  slug: "otherwhere-xi-matar",
  title: "Matar",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-matar",
  facts: [
    {
      fact: "Matar is a gray-haired kark, former warchief of the Red Tribe and Marruk's father.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Matar wields the Red Spear of his tribe.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Matar handed the tribe to Marruk when she won the warchief contests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Matar wants his daughter married.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Matar fought beside Marruk against the Pure League of Luten.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Matar is with the Red Tribe beside Marruk after the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
