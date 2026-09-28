import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVOlita = {
  id: "01a0e9fa-ee0d-714e-a91d-f4b3fd640ea4",
  type: "page-type/lore",
  slug: "otherwhere-v-olita",
  title: "Olita",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-olita",
  facts: [
    {
      fact: "Olita, also said Olilta, is a dead god whose name is still sworn by.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Folk swear in Olilta's name; in Dawn's Concord, swearing by Olita's holy teats is blasphemy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Last Arrows of Olita are divine relics of a past Ending, able to wipe out an army.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Olita is long dead, one of the gods the Questors killed in Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
