import type { TemperSet } from "../../temper-set.page-type.ts"

export const daedricTrickery = {
  id: "01a05fda-0303-701a-b33c-e881805aef9d",
  pageTypeSlug: "temper-set",
  slug: "daedric-trickery",
  title: "Daedric Trickery",
  key: "daedric-trickery",
  esoSetId: 324,
  subcategoryId: "crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
