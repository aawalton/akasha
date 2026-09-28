import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiRita = {
  id: "01a0e9cd-42e6-7523-b279-149c928dfdaf",
  type: "page-type/lore",
  slug: "otherwhere-ii-rita",
  title: "Rita the Blademaster",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Rita is a blademaster recognized by the System and a master blacksmith.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is about three feet tall, with copper scales in spirals instead of hair and dusty blue lips.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She wears a crimson kimono and carries Reaver, a thumb-wide curved sword that seems asleep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She teaches the School of the Ever-Surging Blade and its ten katas.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her armory holds hundreds of weapons whose auras are visible to the naked eye.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her amber-lit history magic can read a weapon's past and name.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She keeps a jil named Gred to clear her garden of pests.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
