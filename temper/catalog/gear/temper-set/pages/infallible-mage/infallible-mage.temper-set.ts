import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const infallibleMage = {
  id: "019e66ec-7b57-7669-9c39-ee235c827c35",
  type: "page-type/temper-set",
  slug: "infallible-mage",
  title: "Infallible Mage",
  key: "infallible-mage",
  esoSetId: 172,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
