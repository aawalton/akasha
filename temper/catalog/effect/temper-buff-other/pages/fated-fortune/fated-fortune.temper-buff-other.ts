import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const fatedFortune = {
  id: "01a15c43-0eab-7f91-9607-25d231c52089",
  type: "page-type/temper-buff-other",
  slug: "fated-fortune",
  title: "Fated Fortune",
  key: "fated-fortune",
  description:
    "When you generate or consume Crux, your Critical Damage and Critical Healing increase by 12% for 7 seconds.",
  effects: "jsonl",
  createdAt: "2026-10-21T02:21:00.970Z",
  updatedAt: "2026-10-21T02:21:00.970Z",
} as const satisfies TemperBuffOther
