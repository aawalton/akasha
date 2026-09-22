import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const basaltBloodedWarrior = {
  id: "019e6484-5fde-7b83-a3ef-2dd11eccaf68",
  type: "page-type/temper-set",
  slug: "basalt-blooded-warrior",
  title: "Basalt-Blooded Warrior",
  key: "basalt-blooded-warrior",
  esoSetId: 723,
  category: "temper-set-category/class-set",
  valid: ["*"],
  classId: "temper-class/dragonknight",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
