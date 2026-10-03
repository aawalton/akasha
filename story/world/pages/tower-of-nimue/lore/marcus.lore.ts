import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const marcus = {
  id: "01a0ddfb-8e7b-7cf7-823d-dfffc1bcbcca",
  type: "page-type/lore",
  slug: "marcus",
  title: "Marcus",
  world: "world/tower-of-nimue",
  about: "character-other/tower-of-nimue-marcus",
  facts: [
    {
      fact: "Marcus is a boy of about nine with a cast on one arm.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "Marcus was a patient in room 218, a four-bed bay, at St. Brigid's.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "Marcus is ascended.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "The three other patients in Marcus's bay were unascended and died.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "A Threshold Warden came through the vanished window, hunting Marcus by sound.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "Nimue saved Marcus from the warden.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/tower-of-nimue-nimue",
        "character-other/tower-of-nimue-marcus",
      ],
    },
    {
      fact: "Marcus sobbed into the front of Nimue's scrubs and gave her his name.",
      knowers: ["lore-disclosure/game-master", "character-other/tower-of-nimue-nimue"],
    },
    {
      fact: "Nimue told Marcus not to stop for anyone who wasn't moving.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/tower-of-nimue-nimue",
        "character-other/tower-of-nimue-marcus",
      ],
    },
    {
      fact: "At Nimue's order Marcus ran for the south stairwell to find the nurse Priya and get out.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/tower-of-nimue-nimue",
        "character-other/tower-of-nimue-marcus",
      ],
    },
    {
      fact: "Marcus was last seen alive, leaving the hospital.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
