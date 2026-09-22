import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const clawOfYolnahkriin = {
  id: "019e66ec-7a8f-721d-b96b-06a4d918c269",
  type: "page-type/temper-set",
  slug: "claw-of-yolnahkriin",
  title: "Claw of Yolnahkriin",
  key: "claw-of-yolnahkriin",
  esoSetId: 446,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
