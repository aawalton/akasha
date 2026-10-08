import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveChaosPotential = {
  id: "01a0e9fa-71c1-7f4f-91b5-213eb8b6edcb",
  type: "page-type/lore",
  slug: "super-supportive-chaos-potential",
  title: "Chaos potential",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-chaos-potential",
  facts: [
    {
      fact: "Only Artonan wizards can tell who has it; humans cannot measure it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:44:59.585Z",
  updatedAt: "2026-09-29T02:44:54.000Z",
} as const satisfies Lore
