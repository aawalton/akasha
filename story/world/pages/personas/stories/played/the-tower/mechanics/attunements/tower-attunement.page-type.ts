import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerAttunement = {
  id: "01a0ca71-7e6e-7997-b7c4-3c218a335e36",
  type: "page-type/page-type",
  slug: "tower-attunement",
  definition: "how much control a character in the Tower has over an element",
  pluralSlug: "attunements",
  extends: ["page-type/attunement"],
  parts: ["module/tower-attunements-beside"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
