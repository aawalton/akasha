import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiJanitor = {
  id: "01a0e9c2-1a5b-70ff-baee-ac0b6704fe1b",
  type: "page-type/lore",
  slug: "otherwhere-ii-janitor",
  title: "The Janitor",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Janitor is an elephant-sized force monster that prowls the tower's waste level.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its white form is a six-legged eyeless shark with arms of pure force mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its clear form is a gelatinous blob that fires rotating force beams and force bombs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It regenerates fast after eating fresh corpses, and pure mana punches holes in its arms.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
