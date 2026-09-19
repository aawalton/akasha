import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const vaultOfSouls = {
  id: "01a0655a-7b80-7915-bddd-b397700e1be6",
  type: "page-type/world-item",
  slug: "vault-of-souls",
  title: "Vault of Souls",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
