import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldEnchantment = {
  id: "01a06558-a991-75d7-9cdc-b80a17f534a1",
  type: "page-type/page-type",
  slug: "world-enchantment",
  definition: "a power worked into a made thing",
  pluralSlug: "enchantments",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-09-19T11:25:39.000Z",
} as const satisfies PageType
