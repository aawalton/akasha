import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const crushingWall = {
  id: "019e6484-5fa4-7ff7-b288-ff59644ed30f",
  type: "page-type/temper-set",
  slug: "crushing-wall",
  title: "Crushing Wall",
  key: "crushing-wall",
  esoSetId: 373,
  category: "temper-set-category/arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
