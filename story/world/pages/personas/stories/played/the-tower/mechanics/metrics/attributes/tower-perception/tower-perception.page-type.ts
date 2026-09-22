import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerPerception = {
  id: "01a0c9f8-162a-7188-9342-52e4f83219de",
  type: "page-type/page-type",
  slug: "tower-perception",
  definition: "how much a character in the Tower notices",
  extends: ["page-type/tower-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
