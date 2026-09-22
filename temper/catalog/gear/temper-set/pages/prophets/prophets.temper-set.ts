import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const prophets = {
  id: "019e6484-604c-7134-aae2-1ff64635300d",
  type: "page-type/temper-set",
  slug: "prophets",
  title: "Prophet's",
  key: "prophets",
  esoSetId: 380,
  category: "temper-set-category/other",
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
