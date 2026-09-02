import type { TemperSet } from "../../temper-set.page-type.ts"

export const nikulasHeavyArmor = {
  id: "01a05fdb-7d48-7315-9e6d-395b447e9bd1",
  pageTypeSlug: "temper-set",
  slug: "nikulas-heavy-armor",
  title: "Nikulas' Heavy Armor",
  key: "nikulas-heavy-armor",
  esoSetId: 72,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
