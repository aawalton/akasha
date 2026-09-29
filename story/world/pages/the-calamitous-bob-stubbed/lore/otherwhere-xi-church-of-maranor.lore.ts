import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiChurchOfMaranor = {
  id: "01a0ea80-64d2-7faf-b36c-0107309842d7",
  type: "page-type/lore",
  slug: "otherwhere-xi-church-of-maranor",
  title: "The Church of Maranor",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-religion/otherwhere-xi-church-of-maranor",
  facts: [
    {
      fact: "The Church of Maranor is a powerful old order devoted to the goddess of order.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maranor's clergy include bishops, priestesses, archpriests and a high priest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maranor's questors are warrior-priest chaplains who lead squads in battle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maranor's temples have red columns, gold filigree, war trophies and crimson glass.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Food in Maranor's temples is frugal.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Maranor's clergy use portable communication altars more than any other church.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The soul presence of Maranor's clergy is a red wave of compliance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Church of Maranor has temples in Helock and Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maranor's temple in Mornyr kept surveillance golems.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Church of Maranor held Enoria's Prince Gil hostage in Mornyr to watch King Sangor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An archpriest of Maranor in Lesso died lifting a curse by taking the sin upon himself.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
