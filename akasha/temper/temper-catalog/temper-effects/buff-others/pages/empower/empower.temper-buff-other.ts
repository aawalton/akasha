import type { TemperBuffOther } from "../../temper-buff-other.page-type.ts"

export const empower = {
  id: "01a05fc5-f6c2-7bab-84a2-3bec7b17121b",
  pageTypeSlug: "temper-buff-other",
  slug: "empower",
  title: "Empower",
  key: "empower",
  description: "Increases Heavy Attack damage against monsters by 70%",
  effects: "jsonl",
} as const satisfies TemperBuffOther
