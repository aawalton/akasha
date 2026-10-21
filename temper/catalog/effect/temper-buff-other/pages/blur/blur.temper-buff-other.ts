import type { TemperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.types.ts"

export const blur = {
  id: "01a15f21-2b80-72eb-a873-9dbbe121e11a",
  type: "page-type/temper-buff-other",
  slug: "blur",
  title: "Blur",
  key: "blur",
  description:
    "The Nightblade ability's buff, cutting the next Roll Dodge's cost by 10% for each direct hit taken while it is up; the game reports it with no stack count, and the sheet shows the 10% of one hit.",
  effects: "jsonl",
  createdAt: "2026-10-21T15:42:51.775Z",
  updatedAt: "2026-10-21T15:42:51.775Z",
} as const satisfies TemperBuffOther
