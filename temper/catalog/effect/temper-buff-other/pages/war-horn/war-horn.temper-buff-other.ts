import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const warHorn = {
  id: "01a15722-ecd1-761e-8cac-2e3e7210ee9a",
  type: "page-type/temper-buff-other",
  slug: "war-horn",
  title: "War Horn",
  key: "war-horn",
  description: "Increases your Max Magicka and Max Stamina by 10%.",
  effects: "jsonl",
  createdAt: "2026-10-20T02:27:49.072Z",
  updatedAt: "2026-10-20T02:27:49.072Z",
} as const satisfies TemperBuffOther
