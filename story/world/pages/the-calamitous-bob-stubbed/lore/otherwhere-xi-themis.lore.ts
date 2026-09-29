import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiThemis = {
  id: "01a0ea7e-3c79-71be-935c-a63e78fbc965",
  type: "page-type/lore",
  slug: "otherwhere-xi-themis",
  title: "Themis",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-themis",
  facts: [
    {
      fact: "Themis is a silverite golem, a daughter of Solfis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Themis has yellow eyes and speaks in capitals like her father.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Themis advised on the government buildings outside Kazar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Themis works with Abe on law and order, and patrols the old capital's green zone with Clio.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Themis works and earns money, like all of Solfis's children.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Themis is at work in New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
