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
} as const satisfies Lore
