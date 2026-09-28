import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiGearSwarm = {
  id: "01a0e9c1-484c-70a7-adaa-c6918ff41ce6",
  type: "page-type/lore",
  slug: "otherwhere-ii-gear-swarm",
  title: "The Gear Swarm",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The gear swarm is a collective of clockwork constructs on the tower's waste level.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gear-rats are chihuahua-sized brass rodents whose teeth unmake flesh and metal but not stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gear-rats hunt by hearing, leap twenty-five feet and follow blood trails.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A badly damaged construct teleports away with a glow and a pop.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gear-scorpions fire invisible force bolts, and gear-turtles carry tuned shield domes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The swarm learns from every loss and grows shields against the magic that killed it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
