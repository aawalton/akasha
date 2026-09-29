import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNaden = {
  id: "01a0ea81-9b15-7695-b5a8-3cc4d72248e1",
  type: "page-type/lore",
  slug: "otherwhere-xi-naden",
  title: "Naden",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-naden",
  facts: [
    {
      fact: "Naden, also called Neren, is a priestess of Enttiku, part northern by blood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Naden served the royalist army when it held Viv prisoner.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Naden said Enttiku would help Viv's healing ritual for Prince Kule.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Naden surrendered when the royalists fell at Green Edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Naden is a priestess of Enttiku somewhere in Enoria's lands, unheard of for years.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
