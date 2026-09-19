import type { WorldBoon } from "akasha/story/world/mechanics/boons/world-boon.page-type.types.ts"

export const blessingOfFecundity = {
  id: "01a0655a-0687-7757-a896-3f156d62266c",
  type: "page-type/world-boon",
  slug: "blessing-of-fecundity",
  title: "Blessing of Fecundity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldBoon
