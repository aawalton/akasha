import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const treasuresOfTheEarthforge = {
  id: "019e6484-6050-7e9d-9f15-8a3b20d9d997",
  type: "page-type/temper-set",
  slug: "treasures-of-the-earthforge",
  title: "Treasures of the Earthforge",
  key: "treasures-of-the-earthforge",
  esoSetId: 118,
  category: "temper-set-category/other",
  valid: ["maul", "ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
