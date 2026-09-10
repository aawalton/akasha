import type { WorldItem } from "../../world-item.page-type.types.ts"

export const vaultOfSouls = {
  id: "01a0655a-7b80-7915-bddd-b397700e1be6",
  pageTypeSlug: "world-item",
  type: "world-item",
  slug: "vault-of-souls",
  title: "Vault of Souls",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
