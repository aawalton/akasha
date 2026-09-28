import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiPartitionSwamp = {
  id: "01a0e9bb-b06e-7eea-9c58-d45bbeb5381e",
  type: "page-type/place",
  slug: "otherwhere-ii-partition-swamp",
  title: "The Partitioned Swamp",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-tower-of-rizzen",
  facts: [
    {
      fact: "The swamp level is one vast terrarium under an emerald sky full of harmless insects.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its rule is partition: each party is locked in its own region behind clear force walls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mud wraiths camouflage in the mud, ambush from behind and bind limbs with vines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A huge wraith patriarch roams between partitions and joins every final fight.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
