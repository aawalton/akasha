import type { TemperSet } from "../../temper-set.page-type.ts"

export const affliction = {
  id: "01a05fda-02df-7423-b349-1c80325559c8",
  pageTypeSlug: "temper-set",
  slug: "affliction",
  title: "Affliction",
  key: "affliction",
  esoSetId: 101,
  subcategoryId: "pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
