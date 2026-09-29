import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRavinport = {
  id: "01a0ea87-5ff4-7647-a93d-d6a02e4d1467",
  type: "page-type/lore",
  slug: "otherwhere-xi-ravinport",
  title: "Ravinport",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-ravinport",
  facts: [
    {
      fact: "Ravinport is a white-walled neutral port of Vizim under a blue flag with two yellow dots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ravinport's fields are irrigated by water dancers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem conquered Ravinport in autumn, opening the Vizim war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bes of the Saritalagi was Ravinport's envoy before serving Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ravinport's scout Mar the Younger swore service to Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak means to free Ravinport now that Oleander is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
