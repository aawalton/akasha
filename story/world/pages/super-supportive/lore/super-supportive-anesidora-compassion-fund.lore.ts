import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveAnesidoraCompassionFund = {
  id: "01a0e9fa-71c1-7dc1-a17b-eb79929f7228",
  type: "page-type/lore",
  slug: "super-supportive-anesidora-compassion-fund",
  title: "Anesidora Compassion Fund",
  world: "world/super-supportive",
  about: "world-organization/super-supportive-anesidora-compassion-fund",
  facts: [
    {
      fact: "The fund helps people injured in superhuman incidents.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:44:59.585Z",
  updatedAt: "2026-10-27T19:29:08.137Z",
} as const satisfies Lore
