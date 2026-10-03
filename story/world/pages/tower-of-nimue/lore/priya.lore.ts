import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const priya = {
  id: "01a0ddfb-8e7b-7dad-801d-f48187a67db7",
  type: "page-type/lore",
  slug: "priya",
  title: "Priya",
  world: "world/tower-of-nimue",
  about: "character-other/tower-of-nimue-priya",
  facts: [
    {
      fact: "Priya is a pediatrics nurse at St. Brigid's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Priya's night station is two doors from Nimue's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Priya is ascended.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "When the cull hit, Priya seized Nimue's wrist and begged for reassurance and a plan.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "Priya begged Nimue: what is it, tell me what to do, please.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "Priya wanted warm comfort.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "Nimue answered Priya with a clinical hand-squeeze, a transport-hold, and an order.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-priya"],
    },
    {
      fact: "Nimue ordered Priya to the south stairwell, away from the windows, now.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-priya"],
    },
    {
      fact: "Priya obeyed because Nimue's voice was the kind you obeyed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Priya was last seen alive, heading for the exit.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
