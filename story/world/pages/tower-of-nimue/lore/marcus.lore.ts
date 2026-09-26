import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const marcus = {
  id: "01a0ddfb-8e7b-7cf7-823d-dfffc1bcbcca",
  type: "page-type/lore",
  slug: "marcus",
  title: "Marcus",
  world: "world/tower-of-nimue",
  loreDisclosure: "lore-disclosure/wiki",
  facts: [
    "Marcus is a boy of about nine with a cast on one arm.",
    "Marcus was a patient in room 218, a four-bed bay, at St. Brigid's.",
    "Marcus is one of the 0.6% ascended.",
    "The three other patients in Marcus's bay were unascended and died.",
    "A Threshold Warden came through the vanished window, hunting Marcus by sound.",
    "Nimue put her body between Marcus and the warden.",
    "Nimue killed the warden with a torn-free IV pole.",
    "Marcus sobbed into the front of Nimue's scrubs and gave her his name.",
    "At Nimue's order Marcus ran for the south stairwell to find the nurse Priya and get out.",
    "Nimue told Marcus not to stop for anyone who wasn't moving.",
    "Marcus was last seen alive, leaving the hospital.",
  ],
} as const satisfies Lore
