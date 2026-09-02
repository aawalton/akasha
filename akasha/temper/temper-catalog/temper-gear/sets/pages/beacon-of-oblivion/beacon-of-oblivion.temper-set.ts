import type { TemperSet } from "../../temper-set.page-type.ts"

export const beaconOfOblivion = {
  id: "01a05fda-02ef-7112-b3ea-9a4a3fb46dd8",
  pageTypeSlug: "temper-set",
  slug: "beacon-of-oblivion",
  title: "Beacon of Oblivion",
  key: "beacon-of-oblivion",
  esoSetId: 779,
  subcategoryId: "class",
  valid: ["*"],
  classId: "sorcerer",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
