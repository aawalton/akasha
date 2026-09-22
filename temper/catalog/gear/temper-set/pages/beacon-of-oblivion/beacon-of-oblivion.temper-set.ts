import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const beaconOfOblivion = {
  id: "019e6484-5fdf-7d68-8c00-78f2a31154d3",
  type: "page-type/temper-set",
  slug: "beacon-of-oblivion",
  title: "Beacon of Oblivion",
  key: "beacon-of-oblivion",
  esoSetId: 779,
  category: "temper-set-category/class-set",
  valid: ["*"],
  classId: "temper-class/sorcerer",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
