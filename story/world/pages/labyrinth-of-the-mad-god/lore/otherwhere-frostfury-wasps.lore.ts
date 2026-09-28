import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereFrostfuryWasps = {
  id: "01a0e9c2-1a5a-73be-9344-9a0423fbca3c",
  type: "page-type/lore",
  slug: "otherwhere-frostfury-wasps",
  title: "Frostfury Wasps",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Frostfury wasps are giant wasps with blue-striped carapaces and a faint green glow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their stings carry frost venom that freezes a target from the inside.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their venom runs dry after a few stings.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
