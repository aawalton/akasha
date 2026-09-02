import type { TemperSet } from "../../temper-set.page-type.ts"

export const prophets = {
  id: "01a05fdc-971c-77c9-a1a5-add61df5ec6d",
  pageTypeSlug: "temper-set",
  slug: "prophets",
  title: "Prophet's",
  key: "prophets",
  esoSetId: 380,
  subcategoryId: "other",
  valid: [
    "axe",
    "dagger",
    "greatsword",
    "maul",
    "bow",
    "inferno-staff",
    "lightning-staff",
    "restoration-staff",
    "shield",
    "ring",
  ],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
