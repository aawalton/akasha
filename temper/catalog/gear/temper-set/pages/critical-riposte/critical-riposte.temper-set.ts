import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const criticalRiposte = {
  id: "019e668e-9a3b-7e2b-8d45-bdd2abce0be9",
  type: "page-type/temper-set",
  slug: "critical-riposte",
  title: "Critical Riposte",
  key: "critical-riposte",
  esoSetId: 480,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
