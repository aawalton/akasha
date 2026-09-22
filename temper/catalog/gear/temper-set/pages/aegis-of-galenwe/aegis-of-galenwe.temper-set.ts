import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const aegisOfGalenwe = {
  id: "019e66ec-7a26-7ed5-a642-dd8406afada2",
  type: "page-type/temper-set",
  slug: "aegis-of-galenwe",
  title: "Aegis of Galenwe",
  key: "aegis-of-galenwe",
  esoSetId: 388,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
