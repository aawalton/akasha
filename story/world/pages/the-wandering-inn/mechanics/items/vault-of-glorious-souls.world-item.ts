import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const vaultOfGloriousSouls = {
  id: "01a0655a-7b80-7ed9-ac15-3940f7bb86af",
  type: "page-type/world-item",
  slug: "vault-of-glorious-souls",
  title: "Vault of Glorious Souls",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.808Z",
  updatedAt: "2026-09-22T13:30:32.000Z",
} as const satisfies WorldItem
