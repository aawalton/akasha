import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiHarrien = {
  id: "01a0ea80-a39d-74ca-9554-328f023708f0",
  type: "page-type/lore",
  slug: "otherwhere-xi-harrien",
  title: "Harrien",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-harrien",
  facts: [
    {
      fact: "Harriens are small forest animals, common game across Param and Halluria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hunters with slings and snares take harriens for the pot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mages test new spells on harriens.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "'A harrien's fart' is a common way to call something worthless.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
