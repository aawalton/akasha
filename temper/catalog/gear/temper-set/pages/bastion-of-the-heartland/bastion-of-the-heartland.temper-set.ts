import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bastionOfTheHeartland = {
  id: "019e66ec-7632-79af-a1a2-50d031559c64",
  type: "page-type/temper-set",
  slug: "bastion-of-the-heartland",
  title: "Bastion of the Heartland",
  key: "bastion-of-the-heartland",
  esoSetId: 131,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
