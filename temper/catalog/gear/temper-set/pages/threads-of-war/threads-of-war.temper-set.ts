import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const threadsOfWar = {
  id: "019e668e-9a6c-77dc-95f9-a53aeacba0df",
  type: "page-type/temper-set",
  slug: "threads-of-war",
  title: "Threads of War",
  key: "threads-of-war",
  esoSetId: 765,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
