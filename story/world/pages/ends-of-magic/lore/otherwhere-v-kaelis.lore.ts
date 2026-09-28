import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVKaelis = {
  id: "01a0e9fc-9998-72d2-8f6d-d9197d38eff9",
  type: "page-type/lore",
  slug: "otherwhere-v-kaelis",
  title: "Kaelis Valthorne",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-kaelis",
  facts: [
    {
      fact: "Kaelis Valthorne is a Questor who leads the Ashen Accord, a large grid of fighters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He has been on Davrar since the Ending of Wrath and fought in the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is grizzled and old-looking but muscular, in a battered breastplate and leather skirt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kaelis carries divine mana and fights with a halo of hiltless blades that split in two.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He reads others' builds by sight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Accord keeps a campus and arena for new Questors, and a board of about a dozen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garna of Sarya's grid is an old friend of his.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Kaelis leads the Accord in its old feud with the Aleph grid.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
