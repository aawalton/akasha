import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelStamina = {
  id: "01a0de48-465c-70df-9b58-50167d2765c0",
  type: "page-type/page-type",
  slug: "harem-hotel-stamina",
  definition: "the vigour a character in the Harem Hotel has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
