import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theFirstBuried = {
  id: "01a0ddff-b8bd-72ca-bc39-bf99734c7f32",
  type: "page-type/lore",
  slug: "the-first-buried",
  title: "The First Buried",
  world: "world/cornerstone",
  about: "world-character/cornerstone-the-first-buried",
  secrets: "jsonl",
} as const satisfies Lore
