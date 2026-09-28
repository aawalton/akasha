import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiLemurs = {
  id: "01a0e9c0-87b3-7d93-b327-2c22fc0161e6",
  type: "page-type/lore",
  slug: "otherwhere-ii-lemurs",
  title: "Lemurs",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The lemurs of the Searing Isle are long-limbed primates who run on three legs with a weapon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They fight with clubs, bone-tipped spears and thrown stones in planned formations.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A white-furred elder leads the tribe and receives the first coconut.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bands merge into a tribe of a hundred or more.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They harvest coconuts by swinging a climber on a living chain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They defend their ground to the death and hurl themselves at the lurk to save the rest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
