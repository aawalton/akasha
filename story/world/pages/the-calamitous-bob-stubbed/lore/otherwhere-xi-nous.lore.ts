import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNous = {
  id: "01a0ea7a-cc80-7181-8a52-b1e51c54fe3d",
  type: "page-type/lore",
  slug: "otherwhere-xi-nous",
  title: "Nous",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-nous",
  facts: [
    {
      fact: "Nous is the god of magic, of paths and of the interface.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Nous is called Nous the Mentor.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Nous is the only one of the light gods known to be dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The interface is Nous's blessing, a help and not a requirement.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Nous taught spells to the first shamans.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Nous shaped magic to empower the sapient peoples; dragons have no need of it.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Nous has no church or temples.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "At Helock's Academy a Nous-blessed obelisk cancels magic and repairs itself.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the in-between Nous shows as a distant nebula.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
