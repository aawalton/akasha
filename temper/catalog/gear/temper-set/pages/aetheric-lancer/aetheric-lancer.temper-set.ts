import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const aethericLancer = {
  id: "019e6484-5fdd-7a3b-91bf-4a134f3e17a3",
  type: "page-type/temper-set",
  slug: "aetheric-lancer",
  title: "Aetheric Lancer",
  key: "aetheric-lancer",
  esoSetId: 780,
  subcategoryId: "class",
  valid: ["*"],
  classId: "temper-class/templar",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
