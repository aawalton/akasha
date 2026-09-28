import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvCrimsonCrucibleCity = {
  id: "01a0ea0b-d8c6-7da5-8587-363021791a74",
  type: "page-type/place",
  slug: "otherwhere-iv-crimson-crucible-city",
  title: "Crimson Crucible City",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-red-phoenix-continent",
  facts: [
    {
      fact: "Crimson Crucible City, home of the Cloudy Sword Sect, is built into Cloudy Mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Crimson Crucible City was once ruled by the Tyrant of the Crucible, overthrown by scholars.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Crimson Crucible City hosts the Army Forged in the Crucible, equipped with Jade Armours.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Demon's Grave Ravine is a hellish rift the Crucible army and Cloudy Sword Sect purge in rotation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Crimson Crucible City's Great Fire spread because underfunded firefighters ignored the poor wards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After the Great Crucible Fire, a Cloudy Sword Sect Master beheaded the officials responsible.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Crimson Crucible City has a restaurant famed for char siu pork.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
