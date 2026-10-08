import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const vaultOfTheMortalWorld = {
  id: "01a0655a-7b80-7ab8-ae0f-23cf269db9f4",
  type: "page-type/world-item",
  slug: "vault-of-the-mortal-world",
  title: "Vault of the Mortal World",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.808Z",
  updatedAt: "2026-09-22T13:30:32.000Z",
} as const satisfies WorldItem
