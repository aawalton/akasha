import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRosea = {
  id: "01a0ea7f-3b42-788c-956e-285decdec4b9",
  type: "page-type/lore",
  slug: "otherwhere-xi-rosea",
  title: "Rosea",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-rosea",
  facts: [
    {
      fact: "Queen Rosea of Baran is the daughter of Lady Azar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rosea was married against her will to Baran's aged King Erezak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "King Erezak jailed Rosea; Azar's loyalists freed her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rosea held Siden and led Baran's rebels against Erezak and Oleander.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rosea joined the alliance and pressed Viv on questions of sovereignty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hadal Irao killed Rosea's husband Erezak; King Marzak took his side's crown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Rosea leads Baran's rebel side, allied to Harrak, after the victory.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
