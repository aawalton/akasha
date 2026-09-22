import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const gazeOfSithis = {
  id: "019e6484-602d-709f-b5b4-039483724c7c",
  type: "page-type/temper-set",
  slug: "gaze-of-sithis",
  title: "Gaze of Sithis",
  key: "gaze-of-sithis",
  esoSetId: 593,
  category: "temper-set-category/mythic",
  valid: ["head:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
