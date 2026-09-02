import type { TemperSet } from "../../temper-set.page-type.ts"

export const burningSpellweave = {
  id: "01a05fda-02f8-75d0-9480-f3c8c6b97d67",
  pageTypeSlug: "temper-set",
  slug: "burning-spellweave",
  title: "Burning Spellweave",
  key: "burning-spellweave",
  esoSetId: 160,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
