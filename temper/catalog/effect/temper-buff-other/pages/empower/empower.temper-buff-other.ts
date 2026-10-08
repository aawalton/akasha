import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const empower = {
  id: "01a05fc5-f6c2-7bab-84a2-3bec7b17121b",
  type: "page-type/temper-buff-other",
  slug: "empower",
  title: "Empower",
  key: "empower",
  description: "Increases Heavy Attack damage against monsters by 70%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.418Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffOther
