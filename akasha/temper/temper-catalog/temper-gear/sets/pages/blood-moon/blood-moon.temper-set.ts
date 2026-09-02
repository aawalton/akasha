import type { TemperSet } from "../../temper-set.page-type.ts"

export const bloodMoon = {
  id: "01a05fda-02f4-7bde-b8ad-1cb5db6d75bb",
  pageTypeSlug: "temper-set",
  slug: "blood-moon",
  title: "Blood Moon",
  key: "blood-moon",
  esoSetId: 400,
  subcategoryId: "dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
