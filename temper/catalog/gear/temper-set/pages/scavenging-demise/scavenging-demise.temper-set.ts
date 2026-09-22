import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const scavengingDemise = {
  id: "019e66e6-a0be-7035-8b84-062292ed86a0",
  type: "page-type/temper-set",
  slug: "scavenging-demise",
  title: "Scavenging Demise",
  key: "scavenging-demise",
  esoSetId: 434,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
