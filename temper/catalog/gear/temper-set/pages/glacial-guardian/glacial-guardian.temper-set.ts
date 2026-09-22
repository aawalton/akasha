import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const glacialGuardian = {
  id: "019e66e6-a082-7e3c-9f5b-f6eaf77fe0c6",
  type: "page-type/temper-set",
  slug: "glacial-guardian",
  title: "Glacial Guardian",
  key: "glacial-guardian",
  esoSetId: 621,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
