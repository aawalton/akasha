import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nobilityInDecay = {
  id: "019e6484-5fe4-71d7-bd87-5305193f871a",
  type: "page-type/temper-set",
  slug: "nobility-in-decay",
  title: "Nobility in Decay",
  key: "nobility-in-decay",
  esoSetId: 724,
  subcategoryId: "class",
  valid: ["*"],
  classId: "temper-class/necromancer",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
