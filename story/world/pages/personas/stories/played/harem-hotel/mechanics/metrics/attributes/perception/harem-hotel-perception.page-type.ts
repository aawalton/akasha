import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelPerception = {
  id: "01a0de49-ed44-74ac-9688-2525c0dd47d0",
  type: "page-type/page-type",
  slug: "harem-hotel-perception",
  definition: "how much a character in the Harem Hotel notices",
  extends: ["page-type/harem-hotel-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
