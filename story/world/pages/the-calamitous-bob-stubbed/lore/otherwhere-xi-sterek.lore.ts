import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSterek = {
  id: "01a0ea86-00cd-7230-8572-f542097580c2",
  type: "page-type/lore",
  slug: "otherwhere-xi-sterek",
  title: "Sterek",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sterek",
  facts: [
    {
      fact: "Magister Sterek was a researcher of Helock, sponsored by the archmage Elunath.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sterek is dead, killed by Solfis on the river Shal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sterek stole Sidjin's teleport research and ran a secret teleport effort from it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sterek's sponsors were Helock's military, a bank and the builders' guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sterek expected outlanders to bring otherworldly magic, and found Viv had none.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv and Sidjin raided Sterek's lab, and Sidjin's portal ruined him.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
