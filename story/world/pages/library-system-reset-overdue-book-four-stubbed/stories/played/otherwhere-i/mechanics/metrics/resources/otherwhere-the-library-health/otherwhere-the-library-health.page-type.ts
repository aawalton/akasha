import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereTheLibraryHealth = {
  id: "01a0e362-5fe1-7e74-a2bf-1a67097db3fc",
  type: "page-type/page-type",
  slug: "otherwhere-the-library-health",
  definition: "the health a character in Otherwhere has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
