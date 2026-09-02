import type { TemperSet } from "../../temper-set.page-type.ts"

export const combatPhysician = {
  id: "01a05fda-02fd-734e-9e37-003a79b38377",
  pageTypeSlug: "temper-set",
  slug: "combat-physician",
  title: "Combat Physician",
  key: "combat-physician",
  esoSetId: 194,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
