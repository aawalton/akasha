import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const renaldsResolve = {
  id: "019e66e6-a0b6-7433-b8b0-94ed07600eeb",
  type: "page-type/temper-set",
  slug: "renalds-resolve",
  title: "Renald's Resolve",
  key: "renalds-resolve",
  esoSetId: 454,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
