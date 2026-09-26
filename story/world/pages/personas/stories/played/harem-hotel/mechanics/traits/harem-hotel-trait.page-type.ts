import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelTrait = {
  id: "01a0de50-a8f2-7ceb-ad4f-f5a9b170dcc8",
  type: "page-type/page-type",
  slug: "harem-hotel-trait",
  definition: "a lasting way the rules bend for one character in the Harem Hotel",
  pluralSlug: "traits",
  extends: ["page-type/character-trait"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
