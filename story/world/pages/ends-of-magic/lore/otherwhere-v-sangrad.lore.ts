import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSangrad = {
  id: "01a0e9fa-527b-72e2-b3d4-469f8d5068d5",
  type: "page-type/lore",
  slug: "otherwhere-v-sangrad",
  title: "Sangrad",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-sangrad",
  facts: [
    {
      fact: "Sangrad is an underground cavern-city ruled by the Questor Badud as its Archlord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Badud rules Sangrad with a triumvirate and keeps his seat in its Seal Fortress.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangrad is a stronghold of Badud's grid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangrad has an artifice guild that holds auctions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangrad is a major exporter of magical materials and goods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangrad's men-of-war have a fearsome reputation at sea.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
