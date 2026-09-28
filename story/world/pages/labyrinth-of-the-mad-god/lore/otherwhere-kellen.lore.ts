import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereKellen = {
  id: "01a0e9ce-117f-77fd-9a4f-e25ee8c5c296",
  type: "page-type/lore",
  slug: "otherwhere-kellen",
  title: "Kellen and the Tower Researchers",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Kellen is a tower researcher with yellow parchment-like skin, huge blue eyes and no nose.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He was Deputy Director of Waste Disposal and once worked in research under Kestryl.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Groff heads the Disposal Division, and Grebble directs Specimen Refinement.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Quipep, head of waste disposal, has more than one heart and breeds insect variants.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
