import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const scavenger = {
  id: "01a0657e-024a-7f7c-ae64-6f1f731f7991",
  type: "page-type/world-class",
  slug: "scavenger",
  title: "Scavenger",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  aliases: ["scavengers"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.074Z",
  updatedAt: "2026-09-22T13:29:59.000Z",
} as const satisfies WorldClass
