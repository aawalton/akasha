import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const priya = {
  id: "01a0ddfb-8e7b-7dad-801d-f48187a67db7",
  type: "page-type/lore",
  slug: "priya",
  title: "Priya",
  world: "world/tower-of-nimue",
  loreDisclosure: "lore-disclosure/wiki",
  facts: [
    "Priya is a pediatrics nurse at St. Brigid's.",
    "Priya's night station is two doors from Nimue's.",
    "Priya is ascended.",
    "When the cull hit, Priya seized Nimue's wrist and begged for reassurance and a plan.",
    "Priya begged Nimue: what is it, tell me what to do, please.",
    "Priya wanted warm comfort.",
    "Nimue answered Priya with a clinical hand-squeeze, a transport-hold, and an order.",
    "Nimue ordered Priya to the south stairwell, away from the windows, now.",
    "Priya obeyed because Nimue's voice was the kind you obeyed.",
    "Priya was last seen alive, heading for the exit.",
  ],
} as const satisfies Lore
