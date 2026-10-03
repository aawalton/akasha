import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXBessCrane = {
  id: "01a0ead7-7528-7667-8e62-179a6f5ca286",
  type: "page-type/lore",
  slug: "otherwhere-x-bess-crane",
  title: "Bess Crane",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "character-other/otherwhere-x-bess-crane",
  facts: [
    {
      fact: "Hob's mother is Bess Crane, Aldous's wife: stout, quick-tempered and quicker to feed people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bess came from Wexley to wed Aldous twenty years ago and never saw Nala Pike.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bess will not turn a barefoot woman away hungry, whatever Aldous thinks of her.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-bess-crane",
      ],
    },
    {
      fact: "The stout woman at the Cranes' door says anyone on her doorstep gets fed.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
    {
      fact: "Bess was born in Wexley, the daughter of a chandler, and has kin there still.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bess carries the whole village's gossip and settles half its quarrels at her board.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bess wants a daughter; she has buried two before Hob.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bess would take a woman like Nala into her kitchen for the winter on a day's trial.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bess keeps her mother's Wexley ways: she says what she means at the moment she means it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
