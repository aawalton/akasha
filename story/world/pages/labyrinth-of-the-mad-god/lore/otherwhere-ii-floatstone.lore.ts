import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiFloatstone = {
  id: "01a0e9d1-a3d9-764b-b6fa-653128baafb2",
  type: "page-type/lore",
  slug: "otherwhere-ii-floatstone",
  title: "Floatstone",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Floatstone is a mineral that cancels gravity and keeps floating islands and airships aloft.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Airships carry a strip of floatstone in the keel and a rune-covered lump at their core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A machine of crystals and pipes regulates how much lift the stone gives.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Without its regulator a ship's floatstone falters and the vessel plunges.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fist-sized lump can lift nearly five hundred pounds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Floatstone in a weight-limited storage bag both lightens it and raises what it can hold.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
