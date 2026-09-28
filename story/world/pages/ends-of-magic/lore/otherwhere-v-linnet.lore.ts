import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLinnet = {
  id: "01a0ea05-3117-7ea4-b7df-a099bdb71ccb",
  type: "page-type/lore",
  slug: "otherwhere-v-linnet",
  title: "Linnet Brand",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-linnet",
  facts: [
    {
      fact: "Linnet Brand is the smith's daughter, a girl of nine.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Linnet is skinny and freckled, with two dark braids, scabbed knees and often bare feet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Linnet is level two and has no class.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Linnet follows every stranger in Serrinford everywhere, at a distance she thinks is sly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Linnet would make a game of teaching a stranger words, and laugh at every mistake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Linnet wants stories, a friend, and one day to see Harrowmere and the world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Linnet knows every lane, gap and loose plank in Serrinford's palisade.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
