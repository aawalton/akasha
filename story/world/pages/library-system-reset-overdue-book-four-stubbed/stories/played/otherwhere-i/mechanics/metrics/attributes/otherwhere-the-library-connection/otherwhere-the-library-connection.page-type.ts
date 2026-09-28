import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereTheLibraryConnection = {
  id: "01a0e362-99c4-7c36-9de3-bf60e30afea0",
  type: "page-type/page-type",
  slug: "otherwhere-the-library-connection",
  definition: "how deep a character's link to a place in Otherwhere runs",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
