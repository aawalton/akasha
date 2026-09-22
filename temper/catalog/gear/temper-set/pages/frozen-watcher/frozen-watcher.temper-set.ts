import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const frozenWatcher = {
  id: "019e66e6-a081-7c2d-bf69-f10bbe475a45",
  type: "page-type/temper-set",
  slug: "frozen-watcher",
  title: "Frozen Watcher",
  key: "frozen-watcher",
  esoSetId: 433,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
