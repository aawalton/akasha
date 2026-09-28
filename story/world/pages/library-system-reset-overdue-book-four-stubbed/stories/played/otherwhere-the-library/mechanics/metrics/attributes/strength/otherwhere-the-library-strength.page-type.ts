import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereTheLibraryStrength = {
  id: "01a0e362-99c4-77cf-a95e-8685458c22cc",
  type: "page-type/page-type",
  slug: "otherwhere-the-library-strength",
  definition: "how strong a keeper of a place in Otherwhere is",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
