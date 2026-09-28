import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereDreadbeastMonarchs = {
  id: "01a0e9c3-c617-7c4b-9a67-8fd99444b4a6",
  type: "page-type/lore",
  slug: "otherwhere-dreadbeast-monarchs",
  title: "The Dreadbeast Monarchs",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Five monarchs rule the quarantine zone, and they fight whenever they meet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A gargantuan bat of midnight wind rules the Cratered Lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A giant golden scorpion wreathed in lightning rules the Emerald Expanse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A crystal-winged moth rules the Misty Expanse and feeds on fear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A towering bear of living flame rules the Burning Wastes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A king whose body is a cloud of venomous insects rules the Hungering Mire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The scorpion's storm follows it like a dog on a leash and heals it with stolen power.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
