import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSaryasGrid = {
  id: "01a0e9fc-7097-7522-96a5-d634fc24fed5",
  type: "page-type/lore",
  slug: "otherwhere-v-saryas-grid",
  title: "Sarya's Grid",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-saryas-grid",
  facts: [
    {
      fact: "Sarya's grid is four Questors from the far ends of Davrar: Sarya, Brox, Garna and Ushia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Keihona is the center of Sarya's grid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sarya's grid punishes the worst Questor abuses but barely takes part in the Questor game.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brox holds Gemore as his territory; Ushia leads Agmon's military and founded Itonia's Seers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garna and Ushia work together about once an Ending, with amazing results.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Ashen Accord is a major grid allied to Sarya's side.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sarya and her allies tried something like a conclave long ago, and it went badly.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
