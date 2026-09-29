import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiWamiri = {
  id: "01a0ea7d-3779-700e-b4c3-32ad62776068",
  type: "page-type/lore",
  slug: "otherwhere-xi-wamiri",
  title: "Wamiri",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-wamiri",
  facts: [
    {
      fact: "Wamiri is the wife of the blademaster Solar, from Vizim across the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wamiri and Solar have children together.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wamiri sews.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Wamiri is at home in New Harrak with her children.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
