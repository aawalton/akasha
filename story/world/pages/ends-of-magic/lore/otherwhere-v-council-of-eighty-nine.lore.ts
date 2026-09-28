import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVCouncilOfEightyNine = {
  id: "01a0ea01-0e96-73da-bc89-b64b8f9d902e",
  type: "page-type/lore",
  slug: "otherwhere-v-council-of-eighty-nine",
  title: "The Council of Eighty-Nine",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-council-of-eighty-nine",
  facts: [
    {
      fact: "Davrar was ruled by a council of eighty-nine seats, each with an equal vote.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The council's members are the elder, original Questors; Sarya holds a seat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Davrar carries out the council's will as Davrar judges best.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Changing the Mandate of Davrar takes a council vote of all members but one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Since the Ending of Gods that rule has not been how decisions are made.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The council's veto system broke, and the council was dissolved as a ruling body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Now Conclaves are held, and council members are sworn to vote as the Conclave wills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Conclaves were demanded after Davrar's Questor population surged.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
