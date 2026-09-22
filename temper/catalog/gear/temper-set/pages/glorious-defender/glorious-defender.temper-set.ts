import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const gloriousDefender = {
  id: "019e6484-5fb1-7a44-9db5-3fbecdf9b128",
  type: "page-type/temper-set",
  slug: "glorious-defender",
  title: "Glorious Defender",
  key: "glorious-defender",
  esoSetId: 213,
  category: "temper-set-category/arena",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
