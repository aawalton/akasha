import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerPresence = {
  id: "01a0c9f8-360e-7730-8d24-e99143f25029",
  type: "page-type/page-type",
  slug: "tower-presence",
  definition: "how strongly a character in the Tower carries a room",
  extends: ["page-type/character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
