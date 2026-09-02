import type { TemperSet } from "../../temper-set.page-type.ts"

export const leviathan = {
  id: "01a05fdb-7d32-7341-ab86-76392a2e38e0",
  pageTypeSlug: "temper-set",
  slug: "leviathan",
  title: "Leviathan",
  key: "leviathan",
  esoSetId: 302,
  subcategoryId: "dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
