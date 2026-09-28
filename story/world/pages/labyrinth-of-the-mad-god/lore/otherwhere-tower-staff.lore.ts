import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereTowerStaff = {
  id: "01a0e9c5-5f89-79b7-98bd-d0dec951192e",
  type: "page-type/lore",
  slug: "otherwhere-tower-staff",
  title: "Staff of the Tower",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The tower employs many species as researchers, directors and security.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its divisions include Waste Disposal, Specimen Refinement and Extreme Environments.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Staff carry crystal assistant constructs sealed to their owners' biology.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
