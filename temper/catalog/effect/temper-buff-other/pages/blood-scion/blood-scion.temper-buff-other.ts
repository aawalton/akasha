import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const bloodScion = {
  id: "01a15722-ecd1-7b2c-b760-0a18184f710a",
  type: "page-type/temper-buff-other",
  slug: "blood-scion",
  title: "Blood Scion",
  key: "blood-scion",
  description: "While transformed, your Max Health, Magicka, and Stamina are increased by 10000",
  effects: "jsonl",
  createdAt: "2026-10-20T02:27:49.072Z",
  updatedAt: "2026-10-20T02:27:49.072Z",
} as const satisfies TemperBuffOther
