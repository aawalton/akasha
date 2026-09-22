import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const aeriesCry = {
  id: "019e6484-5fdc-7a08-926c-5d658d0eb3d4",
  type: "page-type/temper-set",
  slug: "aeries-cry",
  title: "Aerie's Cry",
  key: "aeries-cry",
  esoSetId: 781,
  subcategoryId: "class",
  valid: ["*"],
  classId: "temper-class/warden",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
