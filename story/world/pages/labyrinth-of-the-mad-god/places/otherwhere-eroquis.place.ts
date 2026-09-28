import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereEroquis = {
  id: "01a0e9be-c9bd-724f-9b3a-3613e6fbce30",
  type: "page-type/place",
  slug: "otherwhere-eroquis",
  title: "The Lost City of Eroquis",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Eroquis is a dead city in a minor node, once the capital of the planet Nimmer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thousands of floating platforms, some larger than a city, hang in the node.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gravity magic holds the platforms up, and the bridges and ladders between them lie broken.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arrivals come through an industrial station of rusted airships that also ride rails.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No wind, sun or rain reaches the node, so the ruins stay well preserved.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A sphere of glowing, oily yellow webbing encloses the whole node.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Monsters fill three strata, each deeper one far deadlier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Building mimics copy warehouses and ruins, battle damage included, to ambush prey.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A palace at the bottom pours out mana and countless kinds of essence.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
