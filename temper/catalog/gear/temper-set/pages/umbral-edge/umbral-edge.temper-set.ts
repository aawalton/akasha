import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const umbralEdge = {
  id: "019e6484-5fe9-7a79-8f46-ec9df21a58d5",
  type: "page-type/temper-set",
  slug: "umbral-edge",
  title: "Umbral Edge",
  key: "umbral-edge",
  esoSetId: 778,
  subcategoryId: "class",
  valid: ["*"],
  classId: "temper-class/nightblade",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
