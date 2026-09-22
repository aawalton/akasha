import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const arkasissGenius = {
  id: "019e66e6-a058-7df2-9483-5bd6c416b830",
  type: "page-type/temper-set",
  slug: "arkasiss-genius",
  title: "Arkasis's Genius",
  key: "arkasiss-genius",
  esoSetId: 518,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
