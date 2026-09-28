import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvLishu = {
  id: "01a0ea13-7037-7966-821d-9c511d702de9",
  type: "page-type/lore",
  slug: "otherwhere-iv-lishu",
  title: "Master Lishu",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Master Lishu heads the Shrouded Mountain Sect's Medical Pavilion and reformed its methods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Master Lishu mentored Ri Zu at the Medical Pavilion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lishu is stern and exacting, rarely angry openly, yet protective of his disciples.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Master Lishu judges disciples partly on ethics.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Master Lishu once shattered a negligent disciple's cultivation and expelled him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Master Lishu can ban a whole family and its allies from all Medical Pavilion services.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
