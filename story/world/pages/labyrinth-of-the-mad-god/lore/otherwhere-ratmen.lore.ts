import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereRatmen = {
  id: "01a0e9c0-87b4-7fa2-bb2f-c58ab77b306b",
  type: "page-type/lore",
  slug: "otherwhere-ratmen",
  title: "Ratmen and Kastillans",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Ratmen are the blight-zombie remains of Kastilla's rat people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The living people are bipedal, shorter than humans, furred and wedge-headed, with blue eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The zombies are puppets of the Crimson Blight but keep faint traces of their old selves.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
