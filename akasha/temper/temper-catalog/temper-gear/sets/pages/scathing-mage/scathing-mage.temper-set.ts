import type { TemperSet } from "../../temper-set.page-type.ts"

export const scathingMage = {
  id: "01a05fdc-972b-7524-8bc5-cc8e47b7a1f3",
  pageTypeSlug: "temper-set",
  slug: "scathing-mage",
  title: "Scathing Mage",
  key: "scathing-mage",
  esoSetId: 190,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
