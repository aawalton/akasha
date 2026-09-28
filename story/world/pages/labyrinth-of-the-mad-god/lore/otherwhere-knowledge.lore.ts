import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereKnowledge = {
  id: "01a0e9a4-b08b-78ab-a665-52039f0708a6",
  type: "page-type/lore",
  slug: "otherwhere-knowledge",
  title: "Knowledge Points and the Encyclopedia",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Knowledge points are earned in tutorials, often from chests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Knowledge points unlock encyclopedia entries explaining System terms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Entries cover topics like species grade, bloodlines, genelines, classes and builds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Knowledge points can also be spent on custom questions to the System.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Unlocked entries can be copied into journals and shared with others.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An entry on one beast, plant or hazard costs 5 knowledge points; a System term 10.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A custom question to the System costs 20 knowledge points.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
