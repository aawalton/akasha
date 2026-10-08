import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveArtonanConsulate = {
  id: "01a0e9fa-71c1-7b40-bd9e-1c7e366340ab",
  type: "page-type/lore",
  slug: "super-supportive-artonan-consulate",
  title: "Artonan consulates",
  world: "world/super-supportive",
  about: "world-organization/super-supportive-artonan-consulate",
  facts: [
    {
      fact: "Consulates also teach culture, Beginners Wordchaining and an intro to one Artonan script.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Students leave their shoes in cubbies, since shoes are rude before an Artonan teacher.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:44:59.585Z",
  updatedAt: "2026-09-29T01:48:47.000Z",
} as const satisfies Lore
