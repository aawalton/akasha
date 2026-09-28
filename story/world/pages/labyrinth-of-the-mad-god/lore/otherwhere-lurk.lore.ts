import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereLurk = {
  id: "01a0e9c0-87b3-72f2-aaf1-723f7c9e1eba",
  type: "page-type/lore",
  slug: "otherwhere-lurk",
  title: "The Lurk",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The lurk is the Searing Isle's apex predator, a furred dinosaur as big as a bull elephant.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It runs on two taloned legs, balances with a whip tail and has teeth like ivory daggers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shaggy gray fur covers it, like an allosaurus crossed with a puppet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It ambushes from the tree line with leaps so fast it blurs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After a kill it pretends to leave and waits ten minutes to catch hiding prey.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "All animal noise goes silent while it is near, and lying flat and still can hide a person.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
